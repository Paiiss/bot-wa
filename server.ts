import { WASocket } from '@adiwajshing/baileys'
import express from 'express'
import path from 'path'
import qrcode from 'qrcode'

function connect(client: WASocket, PORT = 3000) {
    let app = express(),
        _qr = 'invalid'
    client.ev.on('connection.update', async (json) => {
        // console.log(json.qr)
        _qr = json.qr
    })

    app.use(express.static(path.join(__dirname, 'views')))
    app.use(async (req, res) => {
        let __buffer = await qrcode.toBuffer(_qr)
        res.setHeader('content-type', 'image/png')
        console.log(__buffer)
        res.end(__buffer)
    })

    app.listen(PORT, () => console.log('App listened on port', PORT))
}

export default connect
