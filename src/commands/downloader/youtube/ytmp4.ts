import { ICommand } from '@constants'
import { getYoutubeID, youtube } from '@utils/downloader/youtube.utils'
import { ytparse } from '@utils/helper.utils'

export default {
    aliases: ['ytv', 'ytvideo'],
    category: 'Downloader',
    description: 'Youtube Music Downloader',
    consume: 1,
    callback: async ({ msg, args, client, shortMessage }) => {
        if (args.length < 1) return msg.reply(shortMessage.require.link)
        const { url } = ytparse(args.join(' '))
        if (url === '') return msg.reply(shortMessage.wronglink)

        const youtube_id = getYoutubeID(url)
        const result = await youtube(youtube_id, 'mp4')
        await client.sendMessage(msg.from, { image: { url: result.thumbnail }, caption: `${result.title} - ${result.size}` })
        await client.sendMessage(msg.from, { video: { url: result.link }, mimetype: 'video/mp4' })
    },
} as ICommand
