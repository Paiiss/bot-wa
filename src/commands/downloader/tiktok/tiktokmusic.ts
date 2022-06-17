import { ICommand } from '@constants'
import { tiktok } from '@utils/downloader/tiktok.utils'
import { ttparse } from '@utils/helper.utils'

export default {
    aliases: ['tta', 'ttaudio', 'ttmp3', 'ttmusic'],
    category: 'Downloader',
    description: 'Tiktok Downloader',
    consume: 1,
    callback: async ({ msg, args, client, shortMessage }) => {
        if (args.length < 1) return msg.reply(shortMessage.require.link)
        const { url } = ttparse(args.join(' '))
        if (url === '') return msg.reply(shortMessage.wronglink)
        const result = await tiktok(args[0], 'mp3')
        await client.sendMessage(msg.from, { audio: { url: result.mp3[result.mp3.length - 1] }, mimetype: 'audio/mp4' })
    },
} as ICommand
