import { ICommand } from '@constants'
import axios from 'axios'

const sticker = axios.create({
    baseURL: 'https://sticker-api-tpe3wet7da-uc.a.run.app',
})

export default {
    aliases: ['s'],
    category: 'Sticker',
    description: 'Sticker Maker',
    callback: async ({ msg, client, message, shortMessage }) => {
        const file = (await msg.download()) || (msg.quoted && (await msg.quoted.download()))
        if (msg.typeCheck.isImage || msg.typeCheck.isQuotedImage) {
            const data = {
                image: `data:image/jpeg;base64,${file.toString('base64')}`,
                stickerMetadata: {
                    pack: 'AllenBOT',
                    author: 'created by @mfa_daffa',
                    keepScale: true,
                    circle: false,
                    removebg: false,
                },
            }
            sticker.post('/prepareWebp', data).then((res) => {
                client.sendMessage(msg.from, { sticker: Buffer.from(res.data.webpBase64, 'base64') }, { quoted: message })
            })
        } else if (msg.typeCheck.isVideo || msg.typeCheck.isQuotedVideo) {
            const data = {
                file: `data:video/mp4;base64,${file.toString('base64')}`,
                stickerMetadata: {
                    pack: 'AllenBOT',
                    author: 'created by @mfa_daffa',
                    keepScale: true,
                },
                processOptions: {
                    crop: false,
                    fps: 10,
                    startTime: '00:00:00.0',
                    endTime: '00:00:7.0',
                    loop: 0,
                },
            }
            sticker.post('/convertMp4BufferToWebpDataUrl', data).then((data) => {
                client.sendMessage(msg.from, { sticker: Buffer.from(data.data.split(';base64,')[1], 'base64') }, { quoted: message })
            })
        } else {
            msg.reply(shortMessage.sticker)
        }
    },
} as ICommand
