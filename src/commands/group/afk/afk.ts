import { PREFIX } from '@config'
import { ICommand } from '@constants'
import { userMongo } from '@schema'
import { setAfk } from '@utils/user.utils'

export default {
    description: 'To show that you are afk',
    category: 'group',
    use: `${PREFIX}afk <reason>`,
    maintenance: true,
    callback: async ({ msg, User, args }) => {
        const { sender } = msg
        // return msg.reply(`@${sender.split('@')[0]} entered afk mode, with reason: ${args.join() || '-'}`, true).then(() => {
        //     userMongo.findOneAndUpdate({ sender }, { $set: { afk: 1, afkReason: `${args.join() || null}` } })
        // })
        setAfk(sender, true, args.join() || null)
            .then(() => {
                return msg.reply(`@${sender.split('@')[0]} entered afk mode, with reason: ${args.join() || '-'}`, true)
            })
            .catch((e) => {
                msg.error(e)
            })
    },
} as ICommand
