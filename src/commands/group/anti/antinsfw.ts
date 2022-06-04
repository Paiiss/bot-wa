import { ICommand } from '@constants/command.constant'
import { findGroup } from '@utils/group.utils'
import gSchema from '@schema/group.schema'

export default {
    aliases: ['ansfw'],
    description: 'Anti content 18+ in the group! (be wise in using the menu)',
    category: 'group',
    adminGroup: true,
    callback: async ({ msg, client }) => {
        const { from } = msg
        let fGroup = await findGroup(from)
        let sAnti = !fGroup.antiNsfw
        await gSchema.findOneAndUpdate({ id: fGroup.id }, { $set: { antiNsfw: sAnti } })
        return msg.reply(`The anti nsfw state becomes: ${sAnti ? 'Active' : 'not active'}`)
    },
} as ICommand
