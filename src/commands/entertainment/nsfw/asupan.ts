import { ICommand } from '@constants'
import { getJson } from '@utils/helper.utils'
import * as config from '@config'

export default {
    description: 'Asupan coy',
    category: 'nsfw',
    consume: 3,
    nsfw: true,
    callback: async ({ msg, client, message }) => {
        const { from, sender } = msg
        let json = await getJson(`https://api.lolhuman.xyz/api/asupan?apikey=${config.lolhuman}`)
        return client.sendMessage(from, { video: { url: json.result }, mentions: [sender] }, { quoted: message })
    },
} as ICommand
