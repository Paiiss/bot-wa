import { ICommand } from '@constants'
import { memeText } from '@utils/helper.utils'
import axios from 'axios'

const sticker = axios.create({
    baseURL: 'https://sticker-api-tpe3wet7da-uc.a.run.app',
})

export default {
    aliases: ['smeme'],
    category: 'Sticker',
    description: 'Sticker Meme Maker',
    callback: async ({ msg, client, message, shortMessage, args }) => {
        const file = (await msg.download()) || (msg.quoted && (await msg.quoted.download()))
        if (msg.typeCheck.isImage || msg.typeCheck.isQuotedImage) {
            let arg = args.join(' ')
            let top = arg.split('|')[0] || '_'
            let bottom = arg.split('|')[1] || '_'
            let memeImg = await memeText(file, top.toString(), bottom.toString())
            const data = {
                image: `data:image/jpeg;base64,${memeImg.toString('base64')}`,
                stickerMetadata: {
                    pack: 'AllenBOT',
                    author: 'create by @mfa_daffa',
                    keepScale: true,
                    circle: false,
                    removebg: false,
                },
            }
            sticker.post('/prepareWebp', data).then((res) => {
                client.sendMessage(msg.from, { sticker: Buffer.from(res.data.webpBase64, 'base64') }, { quoted: message })
            })
        } else {
            msg.reply(shortMessage.stickerMeme)
        }
    },
} as ICommand
