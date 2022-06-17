import { ICommand } from '@constants'

export default {
    category: 'general',
    description: 'Send voice, need voice url',
    callback: async ({ msg, client, args, shortMessage }) => {
        const { from } = msg
        if (args.length < 1) return msg.error(shortMessage.require.link)
        return client.sendMessage(from, { audio: { url: args[0] }, mimetype: 'audio/mp4', ptt: false }).catch((e) => {
            msg.error('Unable to send audio, please check the link')
        })
    },
} as ICommand
