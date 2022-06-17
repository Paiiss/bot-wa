import { tebakgambar, tebakgambarjson } from '@bochilteam/scraper'
import { Collection } from '@constants'
import { ICommand } from '@constants'
import { getBuffer } from '@utils/helper.utils'
const __collection = new Collection<string, null>()

export default {
    description: 'Guess the picture game',
    category: 'game-guess',
    consume: 2,

    callback: async ({ msg, client, shortMessage }) => {
        const { from, sender } = msg
        if (__collection.get(from)) return msg.error(shortMessage.quiz.already, true)
        let __tebakgambar: any = await tebakgambar()
        console.log(__tebakgambar)

        let __buffer = await getBuffer(__tebakgambar.img)
        __collection.set(from, null)

        await client.sendMessage(from, { image: __buffer, jpegThumbnail: __buffer, caption: `Time 60 seconds!` })

        const collector = await msg.createMessageCollector({
            filter: new RegExp(__tebakgambar.jawaban, 'i'),
            max: 1,
            time: 60 * 1000,
        })

        collector.on('collect', (m) => {
            return client.sendMessage(from, { text: `${shortMessage.quiz.winner}\n\nDesc: {desc}`.format({ winner: '@' + m.sender.split('@')[0], desc: __tebakgambar.deskripsi }), mentions: [m.sender] })
        })

        collector.on('end', (res) => {
            __collection.delete(from)
            if (res === 'limit') return
            else if (res === 'timeout') return msg.reply(shortMessage.quiz.timeout + `\n\n- Ans: ${__tebakgambar.jawaban}\n${__tebakgambar.deskripsi}`)
        })
    },
} as ICommand
