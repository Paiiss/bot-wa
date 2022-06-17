import { ICommand } from '@constants'
import { getJson } from '@utils/helper.utils'
import { lolhuman, footer } from '@config'

export default {
    aliases: ['latestdoujin'],
    description: 'New doujin update',
    category: 'weeaboo',
    nsfw: true,
    callback: async ({ msg, client, prefix }) => {
        const { from, sender } = msg

        let desuJson = await getJson(`https://api.lolhuman.xyz/api/doujindesulatest?apikey=${lolhuman}`)

        let desu = { title: 'Doujindesu', rows: [] }
        for (let i = 0; i < desuJson.result.length; i++) {
            desu.rows.push({ title: desuJson.result[i].title + ` - ` + desuJson.result[i].episode, rowId: prefix + `doujindesu ${desuJson.result[i].link}` })
        }

        return client.sendMessage(from, { title: 'Latest release doujin', mentions: [sender], text: 'Doujin lates', sections: [desu], footer, buttonText: 'Click here to see the list' })
    },
} as ICommand
