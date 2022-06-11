import { ICommand } from '@constants/command.constant'
import { findUserRpg, editRpg } from '@utils/rpg.utils'

export default {
    description: 'RPG games for adventure',
    category: 'game/rpg',

    callback: async ({ msg, client, User, args }) => {
        const { sender } = msg
        let __rpg = await findUserRpg(sender)
        if (Date.now() - __rpg.lastmonthly < cooldown) return msg.reply(`You've already picked up the monthly reward!`, true)
        let text = ''
        for (let reward of Object.keys(rewards))
            if (reward in __rpg) {
                __rpg[reward] += rewards[reward]
                text += `⮕ ${global.rpg.emoticon(reward)} ${reward}: ${rewards[reward]}\n`
            }
        __rpg.lastmonthly = Date.now() * 1
        await editRpg(sender, __rpg)
        return msg.reply(`*––––『 MONTHLY REWARD 』––––*\n\n${text}`)
    },
} as ICommand

const rewards = {
    exp: 50000,
    money: 49999,
    potion: 10,
    mythic: 3,
    legendary: 1,
}

const cooldown = 2592000000
