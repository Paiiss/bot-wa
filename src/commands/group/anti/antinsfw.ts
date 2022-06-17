import { ICommand } from '@constants'
import { findGroup } from '@utils/group.utils'
import { groupMongo } from '@schema'

export default {
    aliases: ['ansfw'],
    description: 'Anti content 18+ in the group! (be wise in using the menu)',
    category: 'group',
    adminGroup: true,
    callback: async ({ msg, client }) => {
        const { from } = msg
        let fGroup = await findGroup(from)
        let sAnti = !fGroup.safe
        await groupMongo.findOneAndUpdate({ id: fGroup.id }, { $set: { safe: sAnti } })
        return msg.reply(`The anti nsfw state becomes: ${sAnti ? 'Active' : 'not active'}`)
    },
} as ICommand
