import { ICommand } from '@constants'
import { getJson } from '@utils/helper.utils'
import { lolhuman } from '@config'

export default {
    description: 'Download songs from soundcloud',
    consume: 10,
    cooldown: 30,
    category: 'download',
    callback: async ({ client, msg, args, shortMessage, message }) => {
        const { from } = msg
        if (args.length < 1) return msg.error(shortMessage.require.link)
        let json = await getJson(`https://api.lolhuman.xyz/api/soundcloud?apikey=${lolhuman}&url=${args.join(' ')}`)
        if (json.error) return msg.error(shortMessage.error.nosong)
        await msg.reply(`*Soundcloud*\n\nTitle: ${json.result.title}\n\n\`\`\`Waiting audio\`\`\` `)
        return client.sendMessage(from, { audio: { url: json.result.link }, ptt: false }, { quoted: message })
    },
} as ICommand
