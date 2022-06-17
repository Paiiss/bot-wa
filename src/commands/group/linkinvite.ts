import { ICommand } from '@constants'
import { sleep } from '@utils/helper.utils'

export default {
    aliases: ['linkcode', 'link', 'getlink'],
    category: 'group',
    description: 'To get the group link',
    adminGroup: true,
    groupOnly: true,

    callback: async ({ client, msg, shortMessage }) => {
        try {
            let code = await client.groupInviteCode(msg.from)
            let text = `• https://chat.whatsapp.com/${code}`
            msg.reply(text)
        } catch (e) {
            msg.error(shortMessage.error.failGetLink)
        }
    },
} as ICommand
