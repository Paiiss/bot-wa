import { Collection } from '@constants'
import { ICommand } from '@constants'
import { getJson } from '@utils/helper.utils'
const __collection = new Collection<string, null>()

export default {
    description: 'guess!',
    category: 'game-guess',
    consume: 2,

    callback: async ({ msg, client, shortMessage }) => {
        const { from, sender } = msg
        if (__collection.get(from)) return msg.error(shortMessage.quiz.already, true)
        let __getJson: { jawaban: string; soal: string; deskripsi: string }[] = await getJson('https://raw.githubusercontent.com/BochilTeam/database/master/games/caklontong.json')
        let __quiz = __getJson[Math.floor(Math.random() * __getJson.length)]
        __collection.set(from, null)
        await client.sendMessage(from, { text: "*Quiz*\n{soal}\n\nTime 60's".format({ soal: __quiz.soal }) })
        const collector = await msg.createMessageCollector({
            filter: new RegExp(__quiz.jawaban, 'i'),
            max: 1,
            time: 60 * 1000,
        })

        collector.on('collect', (m) => {
            return client.sendMessage(from, { text: `${shortMessage.quiz.winner}\n\nDesc: {desc}`.format({ winner: '@' + m.sender.split('@')[0], desc: __quiz.deskripsi }), mentions: [m.sender] })
        })

        collector.on('end', (res) => {
            __collection.delete(from)
            if (res === 'limit') return
            else if (res === 'timeout') return msg.reply(shortMessage.quiz.timeout + `\n\n- Ans: ${__quiz.jawaban}\n${__quiz.deskripsi}`)
        })
    },
} as ICommand
