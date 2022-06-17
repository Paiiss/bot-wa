import makeWASocket, { ConnectionState, DisconnectReason, makeWALegacySocket, MessageUpdateType, useSingleFileAuthState, useSingleFileLegacyAuthState, WAMessage, fetchLatestBaileysVersion, WASocket } from '@adiwajshing/baileys'
import { writeFileSync, readFileSync, existsSync } from 'fs'
import { CommandHandler } from '@handlers/command.handler'
import { Boom } from '@hapi/boom'
import qrcode from 'qrcode'
import chalk from 'chalk'
import P from 'pino'
import { GroupHandler } from '@handlers/group.handler'
import { protoType } from '@constants'
protoType()

// start a connection
export const startConnection = async () => {
    const commandHandler = new CommandHandler()
    const groupHandler = new GroupHandler()
    console.log(chalk.whiteBright('╭─── [ LOG ]'))
    let client: WASocket
    const { version, isLatest } = await fetchLatestBaileysVersion()
    console.log(chalk.whiteBright('├'), chalk.keyword('aqua')('[  STATS  ]'), `using WA v${version.join('.')}, isLatest: ${isLatest}`)
    const { state, saveState } = useSingleFileAuthState('./session.json')
    client = makeWASocket({
        logger: P({ level: 'error' }),
        printQRInTerminal: true,
        auth: state,
        browser: ['Allen', 'Safari', '1.0'],
        version,
    })
    client.ev.on('creds.update', saveState)

    commandHandler.registerCommand()
    client.ev.on('messages.upsert', (m: { messages: WAMessage[]; type: MessageUpdateType }) => {
        commandHandler.messageHandler(m, client)
    })

    client.ev.on('group-participants.update', (log) => {
        groupHandler.joinhandler(log, client)
    })

    client.ev.on('connection.update', async (update: ConnectionState) => {
        const { connection, lastDisconnect } = update
        if (global.opts['server']) global.qr_code = update.qr || 'invalid'
        if (connection === 'close') {
            if ((lastDisconnect.error as Boom)?.output?.statusCode !== DisconnectReason.loggedOut) {
                startConnection()
            } else {
                console.log('connection closed')
            }
        }
        console.log(chalk.whiteBright('├'), chalk.keyword('aqua')('[  STATS  ]'), `Connection : ${update?.connection}`)
    })
    /* client.ev.on('presence.update', (json) => console.log(json)) Will continue when the afk feature is ready!  */

    return client
}
