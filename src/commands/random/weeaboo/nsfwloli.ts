import { ICommand } from '@constants'
import { getBuffer } from '@utils/helper.utils'
import { lolhuman, footer } from '@config'

export default {
    description: 'loli random (nsfw)',
    category: 'weeaboo-random',
    consume: 3,
    nsfw: true,
    callback: async ({ client, msg, prefix }) => {
        const { from, sender } = msg
        let __buff = await getBuffer(`https://api.lolhuman.xyz/api/random/nsfw/loli?apikey=${lolhuman}`)
        return client.sendMessage(from, { image: __buff, jpegThumbnail: __buff, mentions: [sender] })
    },
} as ICommand
