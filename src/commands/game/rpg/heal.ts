import { ICommand } from '@constants/command.constant'
import { findUserRpg, editRpg } from '@utils/rpg.utils'

export default {
    description: 'RPG games for adventure',
    category: 'game/rpg',

    callback: async ({ msg, client, User, args }) => {
        const { sender } = msg
        let __rpg = await findUserRpg(sender)
        if (__rpg.health >= 100) return msg.reply(`Your ❤️health is full!`)
        const heal = 40 + __rpg.cat * 4
        let count = Math.max(1, Math.min(Number.MAX_SAFE_INTEGER, (isNumber(args[0]) && parseInt(args[0])) || Math.round((100 - __rpg.health) / heal))) * 1
        if (__rpg.potion < count) return msg.reply(`You're short on potions!`)
        __rpg.potion -= count * 1
        __rpg.health += heal * count
        if (__rpg.health >= 100) return msg.reply(`Can't use ${count} 🥤 potion, your blood will be excess if you use`)
        await editRpg(sender, __rpg)
        return msg.reply(`Successfully used ${count} 🥤potions to restore blood`)
    },
} as ICommand

function isNumber(number) {
    if (!number) return number
    number = parseInt(number)
    return typeof number == 'number' && !isNaN(number)
}
