import { ICommand } from '@constants'
import { deleteRent } from '@utils/group.utils'

export default {
    aliases: ['dellr'],
    category: 'private',
    isAdminBot: true,
    ownerOnly: true,

    callback: async ({ msg, args, prefix }) => {
        let { from, isGroup } = msg
        // if (args!.length < 1) return msg.reply(`Use ${prefix}addr IDGUILD`);
        if (!isGroup) return msg.reply(`Please enter the idgroup / use the command in the group`)
        let ID = isGroup ? from : args.join(' ')
        try {
            deleteRent(ID)
            return msg.reply(`Successfully delete rent ID ${ID}`)
        } catch (error) {
            console.log(error)
            msg.reply(error)
        }
    },
} as ICommand
