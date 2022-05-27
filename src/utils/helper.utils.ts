import { downloadContentFromMessage, proto } from '@adiwajshing/baileys'
import fetch from 'node-fetch'

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
