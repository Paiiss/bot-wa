import makeWASocket, { AnyWASocket, ConnectionState, DisconnectReason, makeWALegacySocket, MessageUpdateType, useSingleFileAuthState, useSingleFileLegacyAuthState, WAMessage, fetchLatestBaileysVersion } from '@adiwajshing/baileys'
import { writeFileSync, readFileSync, existsSync } from 'fs'
import { CommandHandler } from '@handlers/command.handler'
import { Boom } from '@hapi/boom'
import qrcode from 'qrcode'
import chalk from 'chalk'
import P from 'pino'
import { GroupHandler } from '@handlers/group.handler'
import { protoType } from '@constants/global.constant'
protoType()

// start a connection
export const startConnection = async (type: 'md' | 'legacy', jadibot: boolean = false, jid?: string) => {
    const commandHandler = new CommandHandler()
    const groupHandler = new GroupHandler()
    if (!jadibot) console.log(chalk.whiteBright('╭─── [ LOG ]'))
    let client: AnyWASocket
    const { version, isLatest } = await fetchLatestBaileysVersion()
    console.log(chalk.whiteBright('├'), chalk.keyword('aqua')('[  STATS  ]'), `using WA v${version.join('.')}, isLatest: ${isLatest}`)
    if (type == 'md') {
        const { state, saveState } = useSingleFileAuthState('./session.json')
        client = makeWASocket({
            logger: P({ level: 'error' }),
            printQRInTerminal: jadibot ? false : true,
            auth: jadibot ? null : state,
            browser: ['Allen', 'Safari', '1.0'],
        })
        if (!jadibot) client.ev.on('creds.update', saveState)
    } else {
        const { state, saveState } = useSingleFileLegacyAuthState('./session.json')
        client = makeWALegacySocket({
            logger: P({ level: 'silent' }),
            version,
            printQRInTerminal: jadibot ? false : true,
            browser: ['Allen', 'Safari', '1.0'],
            auth: jadibot ? null : state,
        })
        if (!jadibot) client.ev.on('creds.update', saveState)
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
            await client.sendMessage('62858505609094@s.whatsapp.net', {
                image: await qrcode.toBuffer(qr, { scale: 8 }),
                caption: 'Scan QR ini untuk jadi bot sementara\n\n1. Klik titik tiga di pojok kanan atas\n2. Klik Perangkat tertaut\n3. Klik Tautkan Perangkat\n4. Scan QR Ini',
            })
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
    /* client.ev.on('presence.update', (json) => console.log(json)) Will continue when the afk feature is ready!  */

    return client
}
