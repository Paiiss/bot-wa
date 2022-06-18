import { WASocket } from '@adiwajshing/baileys'
import { setAfk } from '@utils/user.utils'
import afk from '../data/afk.json'
import { Ipresence } from '@constants'

export class PresenceHandler {
    async afkHandler(presence: Ipresence, client: WASocket) {
        let __obj = Object.keys(presence.presences)
        if (afk.hasOwnProperty(__obj[0])) {
            setAfk(__obj[0], false)
            return client.sendMessage(presence.id, { text: `@${__obj[0].split('@')[0]} detected typing, you automatically exit afk mode!`, mentions: [__obj[0]] })
        }
    }
}
