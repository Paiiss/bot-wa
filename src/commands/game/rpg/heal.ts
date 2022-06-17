import { ICommand } from '@constants'
import { findUserRpg, editRpg } from '@utils/rpg.utils'

export default {
    description: 'RPG games for adventure',
    category: 'game/rpg',

    callback: async ({ msg, client, User, args }) => {
        const { sender } = msg
        let { rpg } = await findUserRpg(sender)
        if (rpg.health >= 100) return msg.reply(`Your ❤️health is full!`)
        const heal = 40 + rpg.cat * 4
        let count = Math.max(1, Math.min(Number.MAX_SAFE_INTEGER, (isNumber(args[0]) && parseInt(args[0])) || Math.round((100 - rpg.health) / heal))) * 1
        if (rpg.potion < count) return msg.reply(`You're short on potions!`)
        rpg.potion -= count * 1
        rpg.health += heal * count
        if (rpg.health >= 100) rpg.health = 100
        await editRpg(sender, { rpg })
        return msg.reply(`Successfully used ${count} 🥤potions to restore blood`)
    },
} as ICommand

function isNumber(number) {
    if (!number) return number
    number = parseInt(number)
    return typeof number == 'number' && !isNaN(number)
}
