import { ICommand } from '@constants/command.constant'
import { findGroup } from '@utils/group.utils'
import gSchema from '@schema/group.schema'

export default {
    aliases: ['alink'],
    description: 'Anti link group',
    category: 'group',
    adminGroup: true,
    callback: async ({ msg, client }) => {
        const { from } = msg
        let fGroup = await findGroup(from)
        let sAnti = !fGroup.antiLinkGroup
        await gSchema.findOneAndUpdate({ id: fGroup.id }, { $set: { antiNsfw: sAnti } })
        return msg.reply(`The anti link group state becomes: ${sAnti ? 'Active' : 'not active'}`)
    },
} as ICommand
