import { ICommand } from '@constants'

export default {
    aliases: ['htag'],
    description: 'Tag all members (hiden)',
    category: 'group',
    adminGroup: true,
    callback: async ({ msg, client, args, message }) => {
        const { from } = msg
        let tag = []
        let str = args.join(' ') || `Yo!`
        for (let i of msg.groupMetadata.participants) tag.push(i.id)
        await client.sendMessage(from, { text: str, mentions: tag }, { quoted: message })
    },
} as ICommand
