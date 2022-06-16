import { ICommand } from '@constants'
import { getBuffer } from '@utils/helper.utils'
import { lolhuman } from '@config'

export default {
    description: 'write text on paper',
    category: 'general',
    consume: 2,
    callback: async ({ args, msg, client, shortMessage, message }) => {
        const { from } = msg
        if (args.length < 1) return msg.error(shortMessage.require.text)
        let buff = await getBuffer(`https://api.lolhuman.xyz/api/nulis?apikey=${lolhuman}&text=${args.join(' ')}`)
        return client.sendMessage(from, { image: buff, jpegThumbnail: buff, ptt: true }, { quoted: message })
    },
} as ICommand
