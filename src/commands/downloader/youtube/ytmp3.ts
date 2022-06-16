import { ICommand } from '@constants'
import { getYoutubeID, youtube } from '@utils/downloader/youtube.utils'
import { ytparse } from '@utils/helper.utils'

export default {
    aliases: ['yta', 'ytaudio'],
    category: 'Downloader',
    description: 'Youtube Music Downloader',
    consume: 1,
    callback: async ({ msg, args, client, shortMessage }) => {
        if (args.length < 1) return msg.reply(shortMessage.require.link)
        const { url } = ytparse(args.join(' '))
        if (url === '') return msg.reply(shortMessage.wronglink)

        const youtube_id = getYoutubeID(url)
        const result = await youtube(youtube_id, 'mp3')
        await client.sendMessage(msg.from, { image: { url: result.thumbnail }, caption: `${result.title} - ${result.size}` })
        await client.sendMessage(msg.from, { audio: { url: result.link }, mimetype: 'audio/mp4' })
    },
} as ICommand
