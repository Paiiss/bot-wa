import { ICommand } from '@constants/command.constant'
import { editUser } from '@utils/user.utils'

export default {
    description: 'Features for registering age',
    category: 'registration',
    aliases: ['reg', 'regi', 'registration', 'daftar'],
    callback: async ({ msg, client, args, shortMessage, User }) => {
        const { from, sender } = msg
        let nbr = args.join(' ')
        if (User.age) return msg.error(shortMessage.register.already)
        if (args.length < 1) return msg.error(shortMessage.register.needAge)
        if (!Number(nbr)) return msg.error(shortMessage.register.ageNumber)
        if (Number(nbr) < 6) return msg.error(shortMessage.register.young)
        if (Number(nbr) > 60) return msg.error(shortMessage.register.old)

        await editUser(sender, { age: Number(nbr) }).catch((e) => {
            console.log(e)
            return msg.error(shortMessage.register.error)
        })
        return msg.reply(shortMessage.register.success)
    },
} as ICommand
