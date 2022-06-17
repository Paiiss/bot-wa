import { ICommand } from '@constants'

export default {
    description: 'To set the group title!',
    category: 'group',
    groupOnly: true,
    isBotAdmin: true,
    adminGroup: true,
    callback: async ({ msg, client, args }) => {
        const { from } = msg
        if (args.length < 1) return msg.error(`Please enter a new group name!`)
        await client
            .groupUpdateSubject(from, args.join(' '))
            .then(() => {
                return msg.react(`👍`)
            })
            .catch((e) => {
                console.log(e)
                msg.error(`Can't change group name`)
            })
    },
} as ICommand
