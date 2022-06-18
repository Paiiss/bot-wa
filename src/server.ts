import express, { Request, Response } from 'express'
import qrcode from 'qrcode'
import chalk from 'chalk'

export default async () => {
    const app = express()

    app.use(async (req: Request, res: Response) => {
        res.setHeader('content-type', 'image/png')
        res.end(await qrcode.toBuffer(global.qr_code))
    })

    app.listen(process.env.PORT || 4000, () => {
        console.log(chalk.whiteBright('├'), chalk.keyword('aqua')('[  STATS  ]'), 'App listened on port', process.env.PORT || 4000)
    })
}
