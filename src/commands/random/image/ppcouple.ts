import { ICommand } from '@constants'
import { getBuffer, getJson } from '@utils/helper.utils'
import { lolhuman, footer } from '@config'

export default {
    description: 'Copel profile photo for again & girls',
    category: 'image',
    consume: 4,
    callback: async ({ client, msg, prefix }) => {
        const { from, sender } = msg
        let { result } = await getJson(`https://api.lolhuman.xyz/api/random/ppcouple?apikey=${lolhuman}`)
        let __buff = await getBuffer(result.male)
        let __buff2 = await getBuffer(result.female)
        await client.sendMessage(from, { image: __buff, jpegThumbnail: __buff })
        await client.sendMessage(from, { image: __buff2, jpegThumbnail: __buff2 })
        return client.sendMessage(from, { mentions: [sender], text: 'Do you like it?', footer, templateButtons: [{ index: 3, quickReplyButton: { displayText: 'Request again', id: prefix + 'ppcouple' } }] })
    },
} as ICommand
