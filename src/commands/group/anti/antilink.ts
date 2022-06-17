import { ICommand } from '@constants'
import { findGroup } from '@utils/group.utils'
import { groupMongo } from '@schema'

export default {
    aliases: ['alink'],
    description: 'Anti link group',
    category: 'group',
    adminGroup: true,
    callback: async ({ msg, client }) => {
        const { from } = msg
        let fGroup = await findGroup(from)
        let sAnti = !fGroup.safelinkgroup

        await groupMongo.findOneAndUpdate({ id: fGroup.id }, { $set: { safelinkgroup: sAnti } })

        return msg.reply(`The anti link group state becomes: ${sAnti ? 'Active' : 'not active'}`)
    },
} as ICommand
