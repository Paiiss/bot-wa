import { ICommand } from '@constants'
import { timeFormat } from '@utils/helper.utils'

export default {
    description: 'Owner number',
    category: 'bot-info',
    callback: async ({ msg, client, message }) => {
        const { from, sender } = msg
        const vcard = 'BEGIN:VCARD\n' + 'VERSION:3.0\n' + 'FN:Pais\n' + 'ORG:Ashoka Uni;\n' + 'TEL;type=CELL;type=VOICE;waid=6285805609094:+62 858 0560 9094\n' + 'END:VCARD'
        return client.sendMessage(
            from,
            {
                contacts: {
                    displayName: 'Pais',
                    contacts: [{ vcard }],
                },
                mentions: [sender],
            },
            { quoted: message }
        )
    },
} as ICommand
