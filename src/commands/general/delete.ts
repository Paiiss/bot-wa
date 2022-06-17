import { ICommand } from '@constants'

export default {
    description: 'delete messages from bots',
    aliases: ['dell', 'del'],
    category: 'general',
    callback: async ({ msg, shortMessage }) => {
        if (msg.quoted.key.fromMe) return msg.quoted.delete(), msg.react('👍🏻')
        else msg.reply(shortMessage.reply)
    },
} as ICommand
