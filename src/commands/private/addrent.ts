import { ICommand } from '@constants'
import { addRentGroup } from '@utils/group.utils'
import { toTime } from '@utils/helper.utils'

export default {
    aliases: ['addr'],
    category: 'private',
    isAdminBot: true,
    ownerOnly: true,

    callback: async ({ msg, args, prefix, client }) => {
        let { from, isGroup } = msg
        if (args!.length < 1) return msg.reply(`Use  ${prefix}addr 3D|IDGUILD`)
        let arg = args.join(' ').split('|')
        if (!isGroup && arg[1].length < 1) return msg.reply(`Please enter the idgroup / use the command in the group`)
        let meta = isGroup ? msg.groupMetadata : await client.groupMetadata(arg[1])
        if (meta == null) return msg.reply(`Invalid group ID-`)

        addRentGroup(meta.id, arg[0] || '3d')
            .then(async (res: number | null) => {
                return await msg.reply(`⍟――――――――――――――⍟\nGroup name: ${meta.subject}\nID: ${meta.id}\nMember group: ${meta.participants.length}\nRent will run out in: ${toTime(res)}\n⍟――――――――――――――⍟`)
            })
            .catch(async (e) => {
                console.log(e)
                return msg.reply(e)
            })
    },
} as ICommand
