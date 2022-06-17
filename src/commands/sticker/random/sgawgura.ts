import { ICommand } from '@constants'
import { lolhuman } from '@config'

export default {
    description: 'Sticker gawgura',
    category: 'sticker',
    consume: 2,
    callback: async ({ msg, client, message }) => {
        const { from } = msg
        return client.sendMessage(from, { sticker: { url: `https://api.lolhuman.xyz/api/sticker/gawrgura?apikey=${lolhuman}` } }, { quoted: message })
    },
} as ICommand
