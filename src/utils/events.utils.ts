import { AnyWASocket, MessageUpdateType, WAMessage } from '@adiwajshing/baileys'
import { MessageCollectorOptions, MessageSerialize } from '@constants/message.constant'
import { serialize } from '@utils/serialize.utils'
import { EventEmitter } from 'events'

export class MessageCollector extends EventEmitter {
    private client: AnyWASocket
    private options: MessageCollectorOptions
    private countMessage: number = 0
    private _timeout: any
    private msg: MessageSerialize

    constructor(client: AnyWASocket, options: MessageCollectorOptions, msg: MessageSerialize) {
        super()

        this.client = client
        this.options = options
        this.msg = msg

        this._timeout = setTimeout(() => this.stop('timeout'), this.options.time || 60000)

        this.messageHandler = this.messageHandler.bind(this)
        this.client.ev.on('messages.upsert', this.messageHandler)

        this.on('end', () => {
            clearTimeout(this._timeout)
            this._timeout = null
            this.client.ev.removeListener('messages.upsert', this.messageHandler)
        })
    }

    async messageHandler(m: { messages: WAMessage[]; type: MessageUpdateType }) {
        const message = m.messages[0]
        if (m.type !== 'notify') return
        if (message.key && message.key.remoteJid === 'status@broadcast') return
        if (!message.message) return

        const msg = await serialize(message, this.client)
        if (this.msg.from !== msg.from) return
        if (this.options.filter.test(msg.body)) {
            this.countMessage++
            if (this.countMessage > this.options.max) {
                return this.stop('limit')
            }
            return this.emit('collect', msg)
        }
    }

    stop(reason: string) {
        this.emit('end', reason)
    }
}
