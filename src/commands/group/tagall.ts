import { ICommand } from '@constants'

export default {
    aliases: ['everyone'],
    description: 'Tag all members',
    category: 'group',
    adminGroup: true,
    callback: async ({ msg, client, args, message }) => {
        const { from } = msg
        let tag = []
        let str = (args.join(' ') || `Tag all`) + '\n\n'
        for (let i of msg.groupMetadata.participants) tag.push(i.id), (str += `@${i.id.split('@')[0]}\n`)
        await client.sendMessage(from, { text: str, mentions: tag }, { quoted: message })
    },
} as ICommand
