import { ICommand } from '@constants/command.constant'
import { findUserRpg } from '@utils/rpg.utils'
import { editUser } from '@utils/user.utils'

export default {
    description: 'RPG games for adventure',
    category: 'game/rpg',

    callback: async ({ msg, client, User, args }) => {
        const { sender } = msg
        let user = await findUserRpg(sender)
        if (user.health >= 100) return msg.reply(`Your ❤️health is full!`)
        const heal = 40 + user.cat * 4
        let count = Math.max(1, Math.min(Number.MAX_SAFE_INTEGER, (isNumber(args[0]) && parseInt(args[0])) || Math.round((100 - user.health) / heal))) * 1
        if (user.potion < count) return msg.reply(`You're short on potions!`)
        user.potion -= count * 1
        user.health += heal * count
        if (user.health >= 100) return msg.reply(`Can't use ${count} 🥤 potion, your blood will be excess if you use`)
        await editUser(sender, { rpg: user })
        return msg.reply(`Successfully used ${count} 🥤potions to restore blood`)
    },
} as ICommand

function isNumber(number) {
    if (!number) return number
    number = parseInt(number)
    return typeof number == 'number' && !isNaN(number)
}
