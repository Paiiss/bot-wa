import { ICommand } from '@constants'
import { sleep } from '@utils/helper.utils'

export default {
    aliases: [],
    category: 'group',
    description: 'To promote to be admin',
    adminGroup: true,
    groupOnly: true,
    callback: async ({ client, msg, shortMessage }) => {
        try {
            let { isGroup, from, myId, groupMetadata } = msg
            if (msg.mentions.length === 0) return msg.reply(shortMessage.group.mentions)
            if (msg.mentions.includes(groupMetadata.owner)) return msg.reply(shortMessage.promote.owner)
            if (msg.mentions.includes(msg.sender)) return msg.reply(shortMessage.promote.self)
            if (msg.mentions.includes(myId)) return msg.reply(shortMessage.promote.bot)

            await client.groupParticipantsUpdate(msg.from, msg.mentions, 'promote')
            msg.reply(shortMessage.promote.succes)
        } catch (e) {
            msg.reply(shortMessage.promote.error)
        }
    },
} as ICommand
