import { ConnectionState, WASocket } from '@adiwajshing/baileys'
import express, { Request, Response } from 'express'
import qrcode from 'qrcode'
import chalk from 'chalk'

export default async (client: WASocket) => {
    const app = express()

    let qr = 'invalid'
    app.get('/', async (req: Request, res: Response) => {
        res.setHeader('content-type', 'image/png')
        res.end(await qrcode.toBuffer(qr, { type: 'png' }))
    })
    client.ev.on('connection.update', (update: ConnectionState) => {
        console.log(update.qr)
        qr = update?.qr || 'invalid'
    })

    app.listen(process.env.PORT || 4000, () => {
        console.log(chalk.whiteBright('├'), chalk.keyword('aqua')('[  STATS  ]'), 'App listened on port', process.env.PORT || 4000)
    })
}
