import { ICommand } from '@constants'
import * as config from '@config'
import { getBuffer } from '@utils/helper.utils'

export default {
    description: 'Indonesian meme jokes (Indonesian language)',
    category: 'joke',
    consume: 1,
    callback: async ({ msg, message, client }) => {
        let { from, sender } = msg
        let buffer: any = await getBuffer(`https://api.lolhuman.xyz/api/meme/memeindo?apikey=${config.lolhuman}`)
        return client.sendMessage(from, { image: buffer, jpegThumbnail: buffer, mentions: [sender], fileName: 'meme.png' }, { quoted: message })
    },
} as ICommand
