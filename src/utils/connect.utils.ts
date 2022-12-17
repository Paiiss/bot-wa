import makeWASocket, { ConnectionState, DisconnectReason, useMultiFileAuthState, WAMessage, fetchLatestBaileysVersion, WASocket, PresenceData, MessageUpsertType } from '@adiwajshing/baileys'
import { CommandHandler } from '@handlers/command.handler'
import { Boom } from '@hapi/boom'
import chalk from 'chalk'
import P from 'pino'
import { GroupHandler } from '@handlers/group.handler'
import { Ipresence, protoType } from '@constants'
import { PresenceHandler } from '@handlers/presence.handler'
protoType()

console.log(chalk.whiteBright('╭─── [ LOG ]'))

// start a connection
export const startConnection = async () => {
    const commandHandler = new CommandHandler()
    const groupHandler = new GroupHandler()
    const presenceHandler = new PresenceHandler()

    let client: WASocket
    const { version, isLatest } = await fetchLatestBaileysVersion()
    console.log(chalk.whiteBright('├'), chalk.keyword('aqua')('[  STATS  ]'), `using WA v${version.join('.')}, isLatest: ${isLatest}`)
    const { state, saveCreds } = await useMultiFileAuthState('./mysession')
    client = makeWASocket({
        logger: P({ level: 'error' }),
        printQRInTerminal: true,
        auth: state,
        browser: ['Allen', 'Safari', '1.0'],
        version,
    })
    client.ev.on('creds.update', saveCreds)

    commandHandler.registerCommand()
    client.ev.on('messages.upsert', (m: { messages: WAMessage[]; type: MessageUpsertType }) => {
        commandHandler.messageHandler(m, client)
    })

    client.ev.on('group-participants.update', (log) => {
        groupHandler.joinhandler(log, client)
    })

    client.ev.on('connection.update', async (update: ConnectionState) => {
        const { connection, lastDisconnect, qr } = update
        if (global.opts['server']) global.qr_code = qr || 'invalid'
        if (connection === 'close') {
            if ((lastDisconnect.error as Boom)?.output?.statusCode !== DisconnectReason.loggedOut) {
                startConnection()
            } else {
                console.log('connection closed')
            }
        }
        console.log(chalk.whiteBright('├'), chalk.keyword('aqua')('[  STATS  ]'), `Connection : ${update?.connection}`)
    })
    client.ev.on('presence.update', (json: Ipresence) => {
        presenceHandler.afkHandler(json, client)
    })

    return client
}
