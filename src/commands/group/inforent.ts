import { ICommand } from '@constants'
import { toTime } from '@utils/helper.utils'
import toMs from 'ms'

export default {
    category: 'group',
    description: '',
    groupOnly: true,
    callback: async ({ client, msg, Group }) => {
        let ex = Group.expired

        if (ex === null) return msg.reply(`Your group doesn't have a trial/rental`)
        return msg.reply(`Ends in: ${toTime(ex)}`)
    },
} as ICommand
