import { ICommand } from '@constants'
import { editUser } from '@utils/user.utils'

export default {
    category: 'settings',
    cooldown: 1,
    description: 'To turn off the level up notification',
    callback: async ({ msg, User, prefix, command }) => {
        const { sender } = msg
        let __status = !User.autolevelup
        await editUser(sender, { autolevelup: __status })
        return msg.button(`Notification status: ${__status ? 'Active' : 'not active'}`, [{ quickReplyButton: { displayText: 'Change', id: prefix + command } }])
    },
} as ICommand
