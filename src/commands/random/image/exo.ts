import { ICommand } from '@constants'
import { getBuffer } from '@utils/helper.utils'
import { lolhuman, footer } from '@config'

export default {
    description: 'Random photo exo k-pop',
    category: 'image',
    consume: 4,
    callback: async ({ client, msg, prefix }) => {
        const { from, sender } = msg
        let __buff = await getBuffer(`https://api.lolhuman.xyz/api/random/exo?apikey=${lolhuman}`)
        return client.sendMessage(from, { image: __buff, jpegThumbnail: __buff })
    },
} as ICommand
