import { ICommand } from '@constants/command.constant'
import { getJson } from '@utils/helper.utils'
import { lolhuman } from '@config'

export default {
    description: 'Doujin desu',
    category: 'weeaboo',
    nsfw: true,
    consume: 10,
    callback: async ({ msg, client, args, shortMessage }) => {
        const { from, sender } = msg

        if (args.length < 1) return msg.error(shortMessage.require.link)
        let { result } = await getJson(`https://api.lolhuman.xyz/api/doujindesu?apikey=${lolhuman}&url=${args.join(' ')}`)
        return client.sendMessage(from, { mentions: [sender], text: `*${result.title}*`, templateButtons: [{ index: 1, urlButton: { url: result.link_dl, displayText: 'Link donwload' } }] })
    },
} as ICommand
