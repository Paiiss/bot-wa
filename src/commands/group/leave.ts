import { ICommand } from '@constants'
import { leaveGroup } from '@utils/group.utils'
import { sleep } from '@utils/helper.utils'

export default {
    aliases: ['out', 'keluar'],
    category: 'group',
    description: 'To remove a bot from a group',
    adminGroup: true,
    groupOnly: true,
    callback: async ({ client, msg, shortMessage, args }) => {
        if (args.join(' ') !== '') {
            if (!args.join(' ').split('@')[0]) return
            try {
                await client.sendMessage(args.join(' '), { text: 'Sayonara 🐱👋🏻' })
                return client.groupLeave(args.join(' '))
            } catch (error) {
                msg.reply(error)
                return console.log(error)
            }
        }
        try {
            msg.reply(shortMessage.group.leave)
            await sleep(3500)
            await leaveGroup(msg.from, client)
        } catch (e) {
            msg.reply(shortMessage.error.failLeave + `\n${e}`)
        }
    },
} as ICommand
