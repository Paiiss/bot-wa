import { ICommand } from '@constants'

export default {
    aliases: ['j'],
    description: 'Asking bots to join the group',
    category: 'group',
    callback: async ({ client, msg, args, shortMessage, message }) => {
        let { from, sender, quoted } = msg
        const rex1 = /chat.whatsapp.com\/([\w\d]*)/g
        const code = args.join(' ').match(rex1)
        if (args.join(' ') != '') {
            if (code === null) return await msg.reply('No invite url detected.')
            let c = code[0].replace('chat.whatsapp.com/', '')

            await client
                .groupAcceptInvite(c)
                .then((res) => {
                    return msg.reply(shortMessage.join.succes)
                })
                .catch((e) => {
                    console.log(e)
                    return msg.reply(shortMessage.join.error)
                })
        } else if (message.message.groupInviteMessage || quoted.message.groupInviteMessage) {
            // let p = message.message.groupInviteMessage ? message.message.groupInviteMessage : quoted.message.groupInviteMessage;

            // await client
            //   .groupAcceptInviteV4(p.groupJid, p)
            //   .then((res) => {
            //     msg.reply(shortMessage.join.succes);
            //   })
            //   .catch((e) => {
            //     console.log(e);
            //     msg.reply(shortMessage.join.error);
            //   });
            return msg.reply(`Sorry, currently it doesn't support invite via, you can only use the link!`)
        } else if (quoted && code !== null) {
            await client
                .groupAcceptInvite(quoted.message.conversation)
                .then((res) => {
                    return msg.reply(shortMessage.join.succes)
                })
                .catch((e) => {
                    console.log(e)
                    return msg.reply(shortMessage.join.error)
                })
        } else {
            return msg.reply(shortMessage.join.alert)
        }
    },
} as ICommand
