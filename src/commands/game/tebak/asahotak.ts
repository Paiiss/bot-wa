import { asahotak } from '@bochilteam/scraper'
import { Collection } from '@constants'
import { ICommand } from '@constants'
const __collection = new Collection<string, null>()

export default {
    description: 'guess!',
    category: 'game-guess',
    consume: 2,

    callback: async ({ msg, client, shortMessage }) => {
        const { from, sender } = msg
        if (__collection.get(from)) return msg.error(shortMessage.quiz.already, true)
        let __quiz: any = await asahotak()
        console.log(__quiz)

        __collection.set(from, null)

        await client.sendMessage(from, { text: "*Quiz*\n{soal}\n\nTime 60's".format({ soal: __quiz.soal }) })

        const collector = await msg.createMessageCollector({
            filter: new RegExp(__quiz.jawaban, 'i'),
            max: 1,
            time: 60 * 1000,
        })

        collector.on('collect', (m) => {
            return m.reply(`${shortMessage.quiz.winner}`.format({ winner: '@' + m.sender.split('@')[0] }), true)
        })

        collector.on('end', (res) => {
            __collection.delete(from)
            if (res === 'limit') return
            else if (res === 'timeout') return msg.reply(shortMessage.quiz.timeout + `\n\n- Ans: ${__quiz.jawaban}\n`)
        })
    },
} as ICommand
