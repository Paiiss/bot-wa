import { footer, PREFIX } from '@config'
import { ICommand } from '@constants'
import { getJson } from '@utils/helper.utils'

export default {
    aliases: ['stumble', 'stumblehighscore'],
    description: 'Taking the hightscore from stumble guys',
    consume: 1,
    callback: async ({ msg, client, args }) => {
        const { from } = msg
        let sec = ``
        if (args[0]?.toLocaleLowerCase() === 'id') sec = 'ID'
        let { scores } = await getJson(`http://kitkabackend.eastus.cloudapp.azure.com:5010/highscore/rank/list?start=0&count=100&country=${sec}`)
        let str: string = sec ? 'Stumble trophy leaderboard guys *IND*\n\n' : 'Stumble trophy leaderboard guys *Global*\n\n'
        for (let i = 0; i < scores.length; i++) {
            str += `${[i + 1]}. *${scores[i].User.Username}* | Tropy ${scores[i].User.SkillRating} | Country ${scores[i].User.Country}\n`
        }
        let __crown = await getJson(`http://kitkabackend.eastus.cloudapp.azure.com:5010/highscore/crowns/list?country=${sec}`)
        str += `\nCrown :\n\n`
        for (let i = 0; i < scores.length; i++) {
            str += `${[i + 1]}. *${__crown.scores[i].User.Username}* | Tropy ${__crown.scores[i].User.Crowns} | Country ${__crown.scores[i].User.Country}\n`
        }
        await client.sendMessage(from, {
            text: str,
            title: sec ? 'IND' : 'Global',
            footer,
            buttons: [{ buttonId: PREFIX + 'stumble id', buttonText: { displayText: 'Stumble ID' } }],
        })
    },
} as ICommand
