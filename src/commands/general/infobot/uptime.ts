import { ICommand } from '@constants'
import { timeFormat } from '@utils/helper.utils'

export default {
    description: 'Bot time running',
    category: 'bot-info',
    callback: async ({ msg }) => {
        let uptime = process.uptime()
        msg.reply(`Runtime: ${timeFormat(uptime)}`)
    },
} as ICommand
