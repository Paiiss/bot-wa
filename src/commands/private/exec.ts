import { ICommand } from '@constants'
import { exec } from 'child_process'

export default {
    aliases: [],
    ownerOnly: true,
    category: 'private',
    callback: async ({ msg, client, message, User, args, Group }) => {
        try {
            exec(args.join(' '), (error, stdout, stderr) => {
                if (error) return msg.reply(error.message)
                console.log(stdout)
                msg.reply(stdout)
            })
        } catch (error) {
            console.log(error)
            msg.reply(error)
        }
    },
} as ICommand
