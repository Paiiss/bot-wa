import { ICommand } from '@constants'
import * as config from '@config'
import { getBuffer } from '@utils/helper.utils'

export default {
    description: 'meme maker 2',
    category: 'joke',
    consume: 2,
    callback: async ({ msg, message, client, args, shortMessage }) => {
        let { from, sender } = msg
        let arg = args.join(' ').split('|')

        if (arg.length > 1) msg.error(shortMessage.require.text)
        if (arg.length > 2) msg.error(shortMessage.require.text2)
        let buffer: any = await getBuffer(`https://api.lolhuman.xyz/api/creator/meme8?apikey=${config.lolhuman}&text1=${arg[0]}&text2=${arg[1]}`)
        return client.sendMessage(from, { image: buffer, jpegThumbnail: buffer, mentions: [sender], fileName: 'meme.png' }, { quoted: message })
    },
} as ICommand
