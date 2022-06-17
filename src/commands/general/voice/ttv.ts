import { ICommand } from '@constants'
import { lolhuman } from '@config'

export default {
    description: 'Change text to voice',
    category: 'general',
    consume: 2,
    callback: async ({ args, msg, client, shortMessage, message }) => {
        const { from } = msg
        if (args.length < 1) return msg.error(shortMessage.require.text)
        return client.sendMessage(from, { audio: { url: `https://api.lolhuman.xyz/api/gtts/id?apikey=${lolhuman}&text=${args.join(' ')}` }, ptt: true }, { quoted: message })
    },
} as ICommand
