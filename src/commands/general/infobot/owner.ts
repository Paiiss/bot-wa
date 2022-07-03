import { ICommand } from '@constants'
import { timeFormat } from '@utils/helper.utils'

export default {
    description: 'Owner number',
    category: 'bot-info',
    callback: async ({ msg, client, message }) => {
        const { from, sender } = msg
        const vcard = 'BEGIN:VCARD\n' + 'VERSION:3.0\n' + 'FN:Tio\n' + 'ORG:Ashoka Uni;\n' + 'TEL;type=CELL;type=VOICE;waid=6282221792667:+62 822 2179 2667\n' + 'END:VCARD'
        return client.sendMessage(
            from,
            {
                contacts: {
                    displayName: 'Tio',
                    contacts: [{ vcard }],
                },
                mentions: [sender],
            },
            { quoted: message }
        )
    },
} as ICommand
