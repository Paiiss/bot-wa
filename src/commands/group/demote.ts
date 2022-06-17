import { ICommand } from '@constants'
import { sleep } from '@utils/helper.utils'

export default {
    aliases: [],
    category: 'group',
    description: 'To demote from admin',
    adminGroup: true,
    groupOnly: true,
    isBotAdmin: true,
    callback: async ({ client, msg, shortMessage }) => {
        try {
            let { isGroup, from, myId, groupMetadata } = msg
            if (msg.mentions.length === 0) return msg.reply(shortMessage.group.mentions)
            if (msg.mentions.includes(groupMetadata.owner)) return msg.reply(shortMessage.demote.owner)
            if (msg.mentions.includes(msg.sender)) return msg.reply(shortMessage.demote.self)
            if (msg.mentions.includes(myId)) return msg.reply(shortMessage.demote.bot)

            await client.groupParticipantsUpdate(msg.from, msg.mentions, 'demote')
            msg.reply(shortMessage.demote.succes)
        } catch (e) {
            msg.reply(shortMessage.promote.error)
        }
    },
} as ICommand
