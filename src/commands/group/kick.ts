import { ICommand } from '@constants'
import { sleep } from '@utils/helper.utils'

export default {
    aliases: [],
    category: 'group',
    description: 'To kick a member of the group',
    adminGroup: true,
    groupOnly: true,
    callback: async ({ client, msg, shortMessage }) => {
        try {
            let { isGroup, from, myId, groupMetadata } = msg
            if (msg.mentions.length === 0) return msg.reply(shortMessage.group.mentions)
            if (msg.mentions.includes(groupMetadata.owner)) return msg.reply(shortMessage.kick.owner)
            if (msg.mentions.includes(msg.sender)) return msg.reply(shortMessage.kick.self)
            if (msg.mentions.includes(myId)) return msg.reply(shortMessage.kick.bot)

            await client.groupParticipantsUpdate(msg.from, msg.mentions, 'remove')
            msg.reply(shortMessage.kick.succes)
        } catch (e) {
            msg.reply(shortMessage.kick.error)
        }
    },
} as ICommand
