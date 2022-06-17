import { ICommand } from '@constants'
import { getBuffer, getJson } from '@utils/helper.utils'
import { lolhuman } from '@config'

export default {
    description: 'Search songs from spotify',
    consume: 10,
    cooldown: 30,
    category: 'download',
    callback: async ({ client, msg, args, shortMessage, message, prefix }) => {
        const { from } = msg
        // console.log(msg)
        if (args.length < 1) return msg.error(shortMessage.require.find)
        let json = await getJson(`https://api.lolhuman.xyz/api/spotifysearch?apikey=${lolhuman}&query=${args.join(' ')}`)
        if (json.error) return msg.error(shortMessage.error.nosong)
        const sec = []
        let result = json.result
        let title = []

        result.forEach((res) => {
            title.push(res.title)
        })
        title = [...new Set(title)]

        title.forEach((res) => {
            let rows = []
            for (let i = 0; i < result.length; i++) {
                if (result[i].title != res) continue
                rows.push({ title: `artists - ${result[i].artists}`, rowId: prefix + `spotify  ` + result[i].external_urls.spotify })
            }
            sec.push({
                title: res,
                rows: rows,
            })
        })

        let listMessage = {
            text: 'Please choose a song below',
            footer: 'api by https://api.lolhuman.xyz/',
            title: 'Spotify search',
            buttonText: 'list',
            sections: sec,
        }

        client.sendMessage(from, listMessage)
    },
} as ICommand
