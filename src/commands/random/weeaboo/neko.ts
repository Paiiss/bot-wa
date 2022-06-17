import { ICommand } from '@constants'
import { getBuffer } from '@utils/helper.utils'
import axios from 'axios'
import { footer } from '@config'

export default {
    aliases: ['nekoo', 'cat', 'kucing'],
    description: 'Random cat man drawing (neko)',
    category: 'weeaboo-random',
    consume: 3,
    callback: async ({ msg, client, shortMessage }) => {
        const { from, sender } = msg
        const { data } = await axios(`https://nekos.life/api/v2/img/neko`)
        let __buff = await getBuffer(data.url)
        return client.sendMessage(from, { image: __buff, jpegThumbnail: __buff, mentions: [sender] })
    },
} as ICommand
