import { ICommand } from '@constants'
import { getBuffer } from '@utils/helper.utils'
import { lolhuman } from '@config'

export default {
    description: 'Dice',
    category: 'sticker',
    consume: 2,
    callback: async ({ msg, client, message }) => {
        const { from } = msg
        let __buff = await getBuffer(`https://api.lolhuman.xyz/api/sticker/dadu?apikey=${lolhuman}`)
        return client.sendMessage(from, { sticker: __buff, gifPlayback: true }, { quoted: message })
    },
} as ICommand
