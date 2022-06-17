import { ICommand } from '@constants'
import { lolhuman } from '@config'

export default {
    description: 'Random sticker',
    category: 'sticker',
    consume: 2,
    callback: async ({ msg, client, message }) => {
        const { from, sender } = msg
        return client.sendMessage(from, { sticker: { url: `https://api.lolhuman.xyz/api/sticker/patrick?apikey=${lolhuman}` }, mentions: [sender] }, { quoted: message })
    },
} as ICommand
