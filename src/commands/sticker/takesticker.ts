import { ICommand } from '@constants'
import axios from 'axios'

const sticker = axios.create({
    baseURL: 'https://sticker-api-tpe3wet7da-uc.a.run.app',
})

export default {
    aliases: ['takes', 'curi', 'tsticker'],
    category: 'Sticker',
    description: 'Sticker Maker',
    use: `Ex: %p%takesticker Allen|Pais`,
    callback: async ({ msg, client, message, shortMessage, User, args }) => {
        let arg = args.join(' ')
        let pack = arg.split('|')[0] || 'AllenBOT'
        let author = arg.split('|')[1] || 'created by @mfa_daffa'
        const file = (await msg.download()) || (msg.quoted && (await msg.quoted.download()))
        console.log(msg)
        if (msg.typeCheck.isQuotedSticker) {
            const data = {
                image: `data:image/jpeg;base64,${file.toString('base64')}`,
                stickerMetadata: {
                    pack: User.premium ? pack : 'AllenBOT',
                    author: User.premium ? author : 'created by @mfa_daffa',
                    keepScale: true,
                    circle: false,
                    removebg: false,
                },
            }
            sticker.post('/prepareWebp', data).then((res) => {
                client.sendMessage(msg.from, { sticker: Buffer.from(res.data.webpBase64, 'base64') }, { quoted: message })
            })
        } else {
            msg.reply(shortMessage.sticker)
        }
    },
} as ICommand
