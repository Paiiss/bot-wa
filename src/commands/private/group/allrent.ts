import { groupRent, ICommand } from '@constants'
import { groupMongo } from '@schema'
import { toTime } from '@utils/helper.utils'
const group: groupRent = require('../../../data/g.json')

export default {
    description: '',
    category: 'private',
    isAdminBot: true,
    callback: async ({ msg, client }) => {
        const { from } = msg
        const allGroup: any = await groupMongo.find()
        let __str = `\`\`\`Data.json\`\`\`\n\n`
        for (let ind of group) {
            __str += ind.id + ` - ` + toTime(ind.expired) + `\n`
        }
        __str += `\n\`\`\`Mongo\`\`\`\n\n`
        allGroup.filter((r) => r.actived)
        for (let ind of allGroup) {
            __str += ind.id + ` - ` + toTime(ind.expired) + `\n`
        }
        msg.reply(__str)
    },
} as ICommand
