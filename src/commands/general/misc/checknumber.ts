import { ICommand } from '@constants'

export default {
    description: `Check the number available on whatsapp`,
    category: 'misc',
    aliases: ['check'],
    callback: async ({ msg, client, args, command, prefix }) => {
        if (args.length < 1) return msg.error(`Please enter sample number: ${prefix + command} 12345`)
        await client
            .onWhatsApp(args[0])
            .then((res) => {
                if (res[0].exists) return msg.button(`Number available on whatsapp!`, [{ index: 1, urlButton: { displayText: 'Click here', url: `https://wa.me/${res[0].jid.split('@')[0]}` } }])
                else return msg.error(`ID not found!`)
            })
            .catch((e) => msg.error(`ID not found!`))
    },
} as ICommand
