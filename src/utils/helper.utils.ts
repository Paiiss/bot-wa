import { downloadContentFromMessage, proto } from '@adiwajshing/baileys'
import fetch from 'node-fetch'
import toMs from 'ms'
import fs, { createReadStream } from 'fs'
import axios from 'axios'
import { sizeFormatter } from 'human-readable'
import { join } from 'path'
import BodyForm from 'form-data'
import Bluebird from 'bluebird'
import { randomBytes } from 'crypto'
const moment = require('moment')

export const downloadMedia = async (msg: proto.IMessage): Promise<Buffer> => {
    try {
        const type = Object.keys(msg)[0]
        const mimeMap = {
            imageMessage: 'image',
            videoMessage: 'video',
            stickerMessage: 'sticker',
            documentMessage: 'document',
            audioMessage: 'audio',
        }
        const stream = await downloadContentFromMessage(msg[type], mimeMap[type])
        let buffer = Buffer.from([])
        for await (const chunk of stream) {
            buffer = Buffer.concat([buffer, chunk])
        }
        return buffer
    } catch {
        return null
    }
}

export const uploaderAPI = (fileData, type) =>
    new Bluebird(async (resolve, reject) => {
        const postFile = async (fileData, type) => {
            const { fileTypeFromBuffer } = await (eval('import("file-type")') as Promise<typeof import('file-type')>)
            const { ext, mime } = await fileTypeFromBuffer(fileData)
            const filePath = join('src', 'tmp', mime.split('/')[0] + getRandom(`.${ext}`))
            const form = new BodyForm()
            await fs.promises.writeFile(filePath, fileData)

            // Start Uploading
            if (type === 'telegraph') {
                form.append('file', createReadStream(filePath))
                const { data } = await axios.post('https://telegra.ph/upload', form, {
                    responseType: 'json',
                    headers: { ...form.getHeaders() },
                })
                if (data.error) reject(data.error)
                return { host: 'telegraph', data: { name: filePath.replace('src/tmp/', ''), url: 'https://telegra.ph' + data[0].src, size: formatSize(fileData.length) } }
            } else if (type === 'uguu') {
                form.append('files[]', createReadStream(filePath))
                const { data } = await axios.post('https://uguu.se/upload.php', form, {
                    responseType: 'json',
                    headers: { ...form.getHeaders() },
                })
                return { host: 'uguu', data: { url: data.files[0].url, name: data.files[0].name, size: formatSize(parseInt(data.files[0].size)) } }
            } else if (type === 'anonfiles') {
                form.append('file', createReadStream(filePath))
                const { data } = await axios.post('https://api.anonfiles.com/upload', form, {
                    responseType: 'json',
                    headers: { ...form.getHeaders() },
                })
                if (!data.status) reject(data.error.message)
                return { host: 'anonfiles', data: { url: data.data.file.url.short, name: data.data.file.metadata.name, size: data.data.file.metadata.size.readable } }
            }
        }
        try {
            const result = await postFile(fileData, type)
            fs.unlinkSync(join('src', 'tmp', result.data.name))
            resolve(result)
        } catch (e) {
            reject(e)
        }
    })

export const memeText = (imageData, top, bottom) =>
    new Bluebird(async (resolve, reject) => {
        try {
            if (!imageData) reject('No imageData')
            const imageUrl = (await uploaderAPI(imageData, 'uguu')).data.url
            let topText = top.trim().replace(/\s/g, '_').replace(/\?/g, '~q').replace(/\%/g, '~p').replace(/\#/g, '~h').replace(/\//g, '~s')
            let bottomText = bottom.trim().replace(/\s/g, '_').replace(/\?/g, '~q').replace(/\%/g, '~p').replace(/\#/g, '~h').replace(/\//g, '~s')

            let result = `https://api.memegen.link/images/custom/${topText}/${bottomText}.png?background=${imageUrl}`
            let binResult = await getBuffer(result)
            console.log(binResult)
            resolve(binResult)
            binResult = null
        } catch (e) {
            reject(e)
        }
    })

export const getBuffer = async (url: string) => {
    const res = await fetch(url, { headers: { 'User-Agent': 'okhttp/4.5.0' }, method: 'GET' })
    if (!res.ok) throw 'Error while fetching data'
    const buff: any = await res.buffer()
    if (buff) return buff
}

export const getRandom = (ext) => {
    return randomBytes(7).toString('hex').toUpperCase() + ext
}
export const post = async (url: string, formdata: {}) => {
    return fetch(url, {
        method: 'POST',
        headers: {
            accept: '*/*',
            'accept-language': 'en-US,en;q=0.9',
            'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
        },
        body: Object.keys(formdata)
            .map((key) => `${key}=${encodeURIComponent(formdata[key])}`)
            .join('&'),
    })
        .then((res) => res.json())
        .then((res) => {
            return res
        })
}

export const sleep = async (ms) => {
    return new Promise((resolve) => setTimeout(resolve, ms))
}

export const formatSize = sizeFormatter({
    std: 'JEDEC',
    decimalPlaces: 2,
    keepTrailingZeroes: false,
    render: (literal, symbol) => `${literal} ${symbol}B`,
})

export const calculatePing = function (timestamp, now) {
    return moment.duration(now - moment(timestamp * 1000)).asSeconds()
}

export const ttparse = (text) => {
    const rex = /(?:https:?\/{2})?(?:w{3}|vm|vt|t)?\.?tiktok.com\/([^\s&]+)/gi
    const url = text.match(rex)
    return { url: url == null ? '' : url[0] }
}

export const ytparse = (text) => {
    const rex = /http(?:s?):\/\/(?:www\.)?youtu(?:be\.com\/watch\?v=|\.be\/)([\w\-\_]*)(&(amp;)?‌​[\w\?‌​=]*)?/gi
    const url = text.match(rex)
    return { url: url == null ? '' : url[0] }
}

export const toTime = (time: number) => {
    let result: number = toMs(time - Date.now(), { long: true })
    return result
}

export function makeid(length) {
    var result: string = ''
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    var charactersLength = characters.length
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength))
    }
    return result
}
