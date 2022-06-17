import { WA_DEFAULT_EPHEMERAL } from '@adiwajshing/baileys'
import { ICommand } from '@constants'

export default {
    description: 'will send as a disappearing message',
    category: 'misc',
    callback: async ({ msg, client }) => {
        const { from } = msg
        await client
            .sendMessage(from, { disappearingMessagesInChat: WA_DEFAULT_EPHEMERAL })
            .then(() => {
                return msg.reply(`Successfully activate temporary message`)
            })
            .catch(() => msg.error(`Failed to activate temporary message`))
    },
} as ICommand
