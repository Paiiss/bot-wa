import { ICommand } from '@constants/command.constant'
import { editUser } from '@utils/user.utils'

export default {
    description: 'RPG games for adventure',
    category: 'game/rpg',

    callback: async ({ msg, client, User, args }) => {
        const { sender } = msg
        let user = User.rpg
        if (Date.now() - user.lastclaim < cooldown) return msg.reply(`You have claimed today, please wait for the cooldown to finish`, true)
        let text = ''
        for (let reward of Object.keys(rewards)) {
            if (!(reward in user)) continue
            user[reward] += rewards[reward]
            text += `⮕ ${global.rpg.emoticon(reward)} ${reward}: ${rewards[reward]}\n`
        }

        user.lastclaim = Date.now() * 1
        await editUser(sender, { rpg: user })
        return msg.reply(`*––––『 DAILY REWARD 』––––*\n\n${text}`)
    },
} as ICommand

const cooldown = 79200000
const rewards = {
    exp: 9999,
    money: 4999,
    potion: 5,
}
