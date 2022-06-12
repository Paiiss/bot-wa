import { ICommand } from '@constants/command.constant'
import { menjadiBot } from '@utils/helper.utils'

export default {
    callback: async ({ msg, client }) => {
        return menjadiBot(client, msg.from)
    },
} as ICommand
