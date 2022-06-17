import { ICommand } from '@constants'
import { editRpg, findUserRpg } from '@utils/rpg.utils'
import { editUser } from '@utils/user.utils'

export default {
    description: 'RPG games for adventure',
    category: 'game/rpg',
    // maintenance: true,
    callback: async ({ msg, prefix }) => {
        const { sender } = msg
        const cooldown = 300000
        let __date: any = new Date()
        let { rpg } = await findUserRpg(sender)
        let timers = cooldown - (__date - rpg.lastadventure)
        if (rpg.health < 80) return msg.button(`You need blood for adventure`, [{ index: 1, quickReplyButton: { displayText: 'HEAL', id: prefix + 'heal' } }])
        if (__date - rpg.lastadventure <= cooldown) return msg.reply(`Please wait for the cooldown adventure! ⏱️ ${(timers / 1000).toFixed(1)} second(s)`, true)
        const rewards = reward(rpg)
        let text = "You've been adventure and decrease"
        for (const lost in rewards.lost)
            if (rpg[lost]) {
                const total = rewards.lost[lost].getRandom()
                rpg[lost] -= total * 1
                if (total) text += `\n${global.rpg.emoticon(lost)}${lost}: ${total}`
            }
        text += '\n\n🔖 ᴀᴅᴠᴇɴᴛᴜʀᴇ ʀᴇᴡᴀʀᴅ ʀᴇᴄᴇɪᴠᴇᴅ :'
        for (const rewardItem in rewards.reward)
            if (rewardItem in rpg) {
                const total = rewards.reward[rewardItem].getRandom()
                rpg[rewardItem] += total * 1
                if (total) text += `\n⮕ ${global.rpg.emoticon(rewardItem)}${rewardItem}: ${total}`
            }
        rpg.lastadventure = Date.now() * 1
        await editRpg(sender, { rpg: rpg })
        return msg.reply(text)
    },
} as ICommand

function reward(user = null) {
    return {
        reward: {
            money: 201,
            exp: 301,
            trash: 101,
            potion: 2,
            rock: 2,
            wood: 2,
            string: 2,
            common: 2 * ((user.dog && (user.dog > 2 ? 2 : user.dog) * 1.2) || 1),
            uncommon: [0, 0, 0, 1, 0].concat(new Array(5 - ((user.dog > 2 && user.dog < 6 && user.dog) || (user.dog > 5 && 5) || 2)).fill(0)),
            mythic: [0, 0, 0, 0, 0, 1, 0, 0, 0].concat(new Array(8 - ((user.dog > 5 && user.dog < 8 && user.dog) || (user.dog > 7 && 8) || 3)).fill(0)),
            legendary: [0, 0, 0, 0, 0, 0, 0, 1, 0, 0].concat(new Array(10 - ((user.dog > 8 && user.dog) || 4)).fill(0)),
            iron: [0, 0, 0, 1, 0, 0],
            gold: [0, 0, 0, 0, 0, 1, 0],
            diamond: [0, 0, 0, 0, 0, 0, 1, 0].concat(new Array(5 - ((user.fox < 6 && user.fox) || (user.fox > 5 && 5) || 0)).fill(0)),
        },
        lost: {
            health: 101 - user.cat * 4,
            armordurability: (15 - user.armor) * 7,
        },
    }
}
