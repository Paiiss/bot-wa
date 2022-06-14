import { ICommand } from '@constants/command.constant'
import { menjadiBot } from '@utils/helper.utils'

export default {
    description: 'menjadi bot',
    category: 'premium',
    privateOnly: true,
    maintenance: true,
    callback: async ({ msg, client }) => {
        return menjadiBot(client, msg.from)
    },
} as ICommand
