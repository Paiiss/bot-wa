import makeWASocket, { AnyWASocket, ConnectionState, DisconnectReason, makeWALegacySocket, MessageUpdateType, useSingleFileAuthState, useSingleFileLegacyAuthState, WAMessage, fetchLatestBaileysVersion } from '@adiwajshing/baileys'
import { writeFileSync, readFileSync, existsSync } from 'fs'
import { CommandHandler } from '@handlers/command.handler'
import { Boom } from '@hapi/boom'
import qrcode from 'qrcode'
import chalk from 'chalk'
import P from 'pino'
import { GroupHandler } from '@handlers/group.handler'

// start a connection
export const startConnection = async (type: 'md' | 'legacy', jadibot: boolean = false, jid?: string) => {
    const commandHandler = new CommandHandler()
    const groupHandler = new GroupHandler()
    console.log(chalk.whiteBright('╭─── [ LOG ]'))
    let client: AnyWASocket
    const { version, isLatest } = await fetchLatestBaileysVersion()
    console.log(chalk.whiteBright('├'), chalk.keyword('aqua')('[  STATS  ]'), `using WA v${version.join('.')}, isLatest: ${isLatest}`)
    if (type == 'md') {
        const { state, saveState } = useSingleFileAuthState('./session_md.json')
        client = makeWASocket({
            logger: P({ level: 'error' }),
            printQRInTerminal: true,
            auth: state,
            browser: ['Allen', 'Safari', '1.0'],
        })
        client.ev.on('creds.update', saveState)
    } else {
        const { state, saveState } = useSingleFileLegacyAuthState('./session_legacy.json')
        client = makeWALegacySocket({
            logger: P({ level: 'silent' }),
            version,
            printQRInTerminal: true,
            browser: ['Allen', 'Safari', '1.0'],
            auth: state,
        })
        client.ev.on('creds.update', saveState)
    }

    commandHandler.registerCommand()
    client.ev.on('messages.upsert', (m: { messages: WAMessage[]; type: MessageUpdateType }) => {
        commandHandler.messageHandler(m, client)
    })

    client.ev.on('group-participants.update', (log) => {
        groupHandler.joinhandler(log, client)
    })

    client.ev.on('connection.update', async (update: ConnectionState) => {
        const { connection, lastDisconnect, qr } = update
        if (qr && jadibot && jid) {
            client.sendMessage(jid, { image: await qrcode.toBuffer(qr, { scale: 8 }), caption: 'Scan QR ini untuk jadi bot sementara\n\n1. Klik titik tiga di pojok kanan atas\n2. Klik Perangkat tertaut\n3. Klik Tautkan Perangkat\n4. Scan QR Ini' })
        }
        if (connection === 'close') {
            if ((lastDisconnect.error as Boom)?.output?.statusCode !== DisconnectReason.loggedOut) {
                startConnection(type)
            } else {
                console.log('connection closed')
            }
        }
        console.log(chalk.whiteBright('├'), chalk.keyword('aqua')('[  STATS  ]'), `Connection : ${update?.connection}`)
    })
    return client
}
