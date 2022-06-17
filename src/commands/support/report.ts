import { ICommand } from '@constants'
import { groupId } from '@config'

export default {
    aliases: ['rep', 'ask'],
    description: 'feature to report problems or ask for help',
    category: 'support',
    callback: async ({ msg, args, prefix, client, message }) => {
        const { from, sender } = msg
        if (args.length < 1) return msg.error(`Please enter the problem, for example: ${prefix}report my limit did not reset`)
        await msg.reply(`Your problem will be processed`)
        await msg.react()
        let str = `report  ${sender}  \n\nMessage: ${args.join(' ')}`
        return client.sendMessage(groupId, { text: str }, { quoted: message })
    },
} as ICommand
