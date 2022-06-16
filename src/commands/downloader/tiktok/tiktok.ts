import { ICommand } from '@constants'
import { tiktok } from '@utils/downloader/tiktok.utils'
import { ttparse } from '@utils/helper.utils'

export default {
    aliases: ['tt', 'ttdl'],
    category: 'Downloader',
    description: 'Tiktok Downloader',
    consume: 1,
    callback: async ({ msg, args, client, shortMessage }) => {
        if (args.length < 1) return msg.reply(shortMessage.require.link)
        const { url } = ttparse(args.join(' '))
        if (url === '') return msg.reply(shortMessage.wronglink)
        const result = await tiktok(url, 'mp4')
        await client.sendMessage(msg.from, { video: { url: result.mp4[result.mp4.length - 1] }, mimetype: 'video/mp4' })
    },
} as ICommand
