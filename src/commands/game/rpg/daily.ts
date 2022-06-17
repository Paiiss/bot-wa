import { ICommand } from '@constants'
import { editRpg, findUserRpg } from '@utils/rpg.utils'
import { editUser } from '@utils/user.utils'

export default {
    description: 'RPG games for adventure',
    category: 'game/rpg',

    callback: async ({ msg, client, User, args }) => {
        const { sender } = msg
        let { rpg } = await findUserRpg(sender)
        if (Date.now() - rpg.lastclaim < cooldown) return msg.reply(`You have claimed today, please wait for the cooldown to finish`, true)
        let text = ''
        for (let reward of Object.keys(rewards)) {
            if (!(reward in rpg)) continue
            rpg[reward] += rewards[reward]
            text += `⮕ ${global.rpg.emoticon(reward)} ${reward}: ${rewards[reward]}\n`
        }

        rpg.lastclaim = Date.now() * 1
        await editRpg(sender, { rpg: rpg })
        return msg.reply(`*––––『 DAILY REWARD 』––––*\n\n${text}`)
    },
} as ICommand

const cooldown = 79200000
const rewards = {
    exp: 9999,
    money: 4999,
    potion: 5,
}
