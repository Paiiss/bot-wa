import { ICommand } from '@constants'

export default {
    description: '',
    aliases: ['check'],
    category: 'private',
    isAdminBot: true,
    callback: async ({ msg, client, args }) => {
        if (args.length < 1) return msg.reply('please input id group!')
        await client
            .groupMetadata(args.join(' '))
            .then((res) => {
                let str = `*Group Check*\n\n`
                str += `*Subject*: ${res.subject}\n` + `Total Mems: ${res.participants.length}`
                msg.reply(str, true)
            })
            .catch((e) => msg.reply(`No group id/bot has left the group!`))
    },
} as ICommand
