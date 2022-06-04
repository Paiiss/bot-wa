import { ICommand } from '@constants/command.constant'
import { calculatePing } from '../utils/helper.utils'

export default {
    category: 'general',
    description: `To find out the response from the bot`,
    callback: async ({ msg, User, args, message, client }) => {
        // console.log(msg.groupMetadata);
        msg.reply(`*_${calculatePing(msg.messageTimestamp, Date.now())} second(s)_*`)
    },
} as ICommand
