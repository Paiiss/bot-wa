import { ICommand } from '@constants/command.constant'
import { editUser } from '@utils/user.utils'

export default {
    category: 'settings',
    cooldown: 1,
    description: 'To turn off the level up notification',
    callback: async ({ msg, User, prefix, command }) => {
        const { sender } = msg
        let __status = !User.autolevelup
        await editUser(sender, { autolevelup: __status })
        return msg.reply(`Notification status: ${__status ? 'Active' : 'not active'}`, true, [{ quickReplyButton: { displayText: 'Change', id: prefix + command } }])
    },
} as ICommand
