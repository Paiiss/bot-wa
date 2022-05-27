import { ICommand } from '@constants/command.constant'
import { getYoutubeID, youtube } from '@utils/downloader/youtube.utils'

export default {
    aliases: ['ytv', 'ytvideo'],
    category: 'Downloader',
    description: 'Youtube Music Downloader',
    callback: async ({ msg, args, client }) => {
        const youtube_id = getYoutubeID(args[0])
        const result = await youtube(youtube_id, 'mp4')
        await client.sendMessage(msg.from, { image: { url: result.thumbnail }, caption: `${result.title} - ${result.size}` })
        await client.sendMessage(msg.from, { video: { url: result.link }, mimetype: 'video/mp4' })
    },
} as ICommand
