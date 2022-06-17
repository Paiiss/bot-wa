import { ICommand } from '@constants'
import { sleep } from '@utils/helper.utils'

export default {
    aliases: [],
    category: 'group',
    description: 'To get id group',
    adminGroup: true,
    groupOnly: true,

    callback: async ({ client, msg, shortMessage }) => {
        try {
            let { isGroup, from, myId, groupMetadata } = msg
            return msg.reply(`GroupID : ` + from)
        } catch (e) {
            msg.reply(shortMessage.error.server)
        }
    },
} as ICommand
