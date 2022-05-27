import { downloadContentFromMessage, proto } from '@adiwajshing/baileys'
import fetch from 'node-fetch'
import toMs from 'ms'
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
