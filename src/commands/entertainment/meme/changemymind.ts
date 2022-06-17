import { ICommand } from '@constants'
import * as config from '@config'
import { getBuffer } from '@utils/helper.utils'

export default {
    description: 'Change my mind meme maker',
    category: 'joke',
    consume: 2,
    callback: async ({ msg, message, client, args, shortMessage }) => {
        let { from, sender } = msg
        if (args.length > 1) msg.error(shortMessage.require.text)
        let buffer: any = await getBuffer(`https://api.lolhuman.xyz/api/creator/changemymind?apikey=${config.lolhuman}&text=${args.join(' ')}`)
        return client.sendMessage(from, { image: buffer, jpegThumbnail: buffer, mentions: [sender], fileName: 'meme.png' }, { quoted: message })
    },
} as ICommand
