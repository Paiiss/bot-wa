import { ICommand } from '@constants/command.constant'
import { findUserRpg } from '@utils/rpg.utils'
import { editUser } from '@utils/user.utils'

export default {
    description: 'RPG games for adventure',
    category: 'game/rpg',
    maintenance: true,

    callback: async ({ msg, client, User, args }) => {
        const { sender } = msg
        let user = await findUserRpg(sender)
        if (Date.now() - user.lastmonthly < cooldown) return msg.reply(`You have claimed today, please wait for the cooldown to finish`, true)
        let text = ''
        for (let reward of Object.keys(rewards))
            if (reward in user) {
                user[reward] += rewards[reward]
                text += `⮕ ${global.rpg.emoticon(reward)} ${reward}: ${rewards[reward]}\n`
            }
        user.lastclaim = Date.now() * 1
        await editUser(sender, { rpg: user })
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
