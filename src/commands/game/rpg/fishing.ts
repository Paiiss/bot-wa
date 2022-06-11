import { ICommand } from '@constants/command.constant'
import { findUserRpg, editRpg } from '@utils/rpg.utils'

export default {
    description: 'Fishing to add food',
    category: 'game/rpg',
    callback: async ({ msg }) => {
        const { from, sender } = msg
        let { rpg } = await findUserRpg(sender),
            __date: any = new Date()
        let timers = cooldown - (__date - rpg.lastadventure)
        if (__date - rpg.lastfishing <= cooldown) return msg.reply(`You feel tired!, just wait ⏱️ ${(timers / 1000).toFixed(1)} second(s)`, true)
        const rewards = reward(rpg)
        let text = "You've been adventure and decrease"
        for (const lost in rewards.lost)
            if (rpg[lost]) {
                const total = rewards.lost[lost].getRandom()
                rpg[lost] -= total * 1
                if (total) text += `\n${global.rpg.emoticon(lost)}${lost}: -${total}`
            }
        text += '\n\n🔖 𝐅𝐢𝐬𝐡𝐢𝐧𝐠 ʀᴇᴡᴀʀᴅ ʀᴇᴄᴇɪᴠᴇᴅ :'
        for (const rewardItem in rewards.reward)
            if (rewardItem in rpg) {
                const total = rewards.reward[rewardItem].getRandom()
                rpg[rewardItem] += total * 1
                if (total) text += `\n⮕ ${global.rpg.emoticon(rewardItem)}${rewardItem}: ${total}`
            }
        rpg.lastfishing = Date.now() * 1
        await editRpg(sender, { rpg: rpg })
        return msg.reply(text, true)
    },
} as ICommand

export const cooldown = 300000

function reward(user = null) {
    return {
        reward: {
            trash: 120,
            food: timeFishing(),
        },
        lost: {
            fishingroddurability: 98,
        },
    }
}

const timeFishing = () => {
    let __time = new Date().getHours()
    let __total = 0
    if (__time < 10) {
        __total = 10
    } else if (__time < 20) {
        __total = 30
    } else {
        __total = 80
    }
    return __total
}
