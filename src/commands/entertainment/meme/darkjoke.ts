import { ICommand } from '@constants'
import * as config from '@config'
import { getBuffer } from '@utils/helper.utils'

export default {
    description: "Dark joke (don't take it to heart)",
    category: 'joke',
    consume: 1,
    callback: async ({ msg, message, client }) => {
        let { from, sender } = msg
        let buffer: any = await getBuffer(`https://api.lolhuman.xyz/api/meme/darkjoke?apikey=${config.lolhuman}`)
        return client.sendMessage(from, { image: buffer, jpegThumbnail: buffer, mentions: [sender], fileName: 'meme.png' }, { quoted: message })
    },
} as ICommand
