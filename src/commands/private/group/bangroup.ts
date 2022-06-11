import { ICommand } from '@constants/command.constant'
import { findGroup } from '@utils/group.utils'
import group from '@schema/group.schema'

export default {
    description: 'To ban groups that can crash bots',
    isAdminBot: true,
    groupOnly: true,
    category: 'private/group',
    callback: async ({ msg }) => {
        const { from } = msg
        let __data = await findGroup(from),
            __status = !__data.isBan
        await group.findOneAndUpdate({ id: from }, { $set: { isBan: __status } })
        return msg.reply(`Group status: ${__status ? 'banned' : 'not banned'}`, true)
    },
} as ICommand
