import { Collection } from '@constants'
import { ICommand } from '@constants'
import { getJson } from '@utils/helper.utils'
const __collection = new Collection<string, null>()

export default {
    description: 'Guess !',
    category: 'game-guess',
    consume: 2,

    callback: async ({ msg, client, shortMessage }) => {
        const { from, sender } = msg
        if (__collection.get(from)) return msg.error(shortMessage.quiz.already, true)
        let __getJson: { jawaban: string[]; soal: string }[] = await getJson('https://raw.githubusercontent.com/BochilTeam/database/master/games/family100.json')
        let __quiz = __getJson[Math.floor(Math.random() * __getJson.length)]
        __collection.set(from, null)

        await client.sendMessage(from, { text: "*Quiz*\n{soal}\n\nTime 60's".format({ soal: __quiz.soal }) })

        const collector = await msg.createMessageCollector({
            filter: new RegExp(__quiz.jawaban.join('|'), 'i'),
            max: 1,
            time: 60 * 1000,
        })

        collector.on('collect', (m) => {
            return m.reply(`${shortMessage.quiz.winner}`.format({ winner: '@' + m.sender.split('@')[0] }), true)
        })

        collector.on('end', (res) => {
            __collection.delete(from)
            if (res === 'limit') return
            else if (res === 'timeout') return msg.reply(shortMessage.quiz.timeout + `\n\n- Ans: ${__quiz.jawaban.join(' - ')}\n`)
        })
    },
} as ICommand
