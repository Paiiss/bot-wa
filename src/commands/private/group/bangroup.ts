import { ICommand } from '@constants'
import { findGroup } from '@utils/group.utils'
import { groupMongo } from '@schema'

export default {
    description: 'To ban groups that can crash bots',
    isAdminBot: true,
    groupOnly: true,
    category: 'private/group',
    callback: async ({ msg }) => {
        const { from } = msg
        let __data = await findGroup(from),
            __status = !__data.ban
        await groupMongo.findOneAndUpdate({ id: from }, { $set: { ban: __status } })
        return msg.reply(`Group status: ${__status ? 'banned' : 'not banned'}`, true)
    },
} as ICommand
