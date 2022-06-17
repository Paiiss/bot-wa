import { ICommand } from '@constants'
import { findUserRpg, editRpg } from '@utils/rpg.utils'

export default {
    description: 'RPG games for adventure',
    category: 'game/rpg',
    aliases: ['sell', 'buy'],
    maintenance: true,

    callback: async ({ msg, client, User, args, command, prefix }) => {
        const { sender, from } = msg
        let { rpg } = await findUserRpg(sender)
        if (command == 'shop') return msg.reply(`Use it by ${prefix}buy / ${prefix}sell`)
        const listItems: any = Object.fromEntries(Object.entries(items[command.toLowerCase()]).filter(([v]) => v && v in rpg))

        let text = ''
        let footer = ''
        let buttons
        text =
            command.toLowerCase() == 'buy'
                ? `
*––––––––『 BUY 』––––––––*
`.trim()
                : `
*––––––––『 SELL 』––––––––*
`.trim()
        footer =
            command.toLowerCase() == 'buy'
                ? `
🔖 ɪᴛᴇᴍs ʟɪsᴛ :
${Object.keys(listItems)
    .map((v) => {
        let paymentMethod = Object.keys(listItems[v]).find((v) => v in rpg)
        return `⮕ 1 ${global.rpg.emoticon(v)}${v} ﹫ ${listItems[v][paymentMethod]} ${global.rpg.emoticon(paymentMethod)}${paymentMethod}`.trim()
    })
    .join('\n')}
–––––––––––––––––––––––––
💁🏻‍♂ ᴛɪᴩ :
⮕ ᴛᴏ ʙᴜʏ ɪᴛᴇᴍs:
${prefix}${command} [item] [quantity]
★ ᴇxᴀᴍᴩʟᴇ:
${prefix}${command} potion 10
`.trim()
                : `
🔖 ɪᴛᴇᴍs ʟɪsᴛ :
${Object.keys(listItems)
    .map((v) => {
        let paymentMethod = Object.keys(listItems[v]).find((v) => v in rpg)
        return `⮕ 1 ${global.rpg.emoticon(v)}${v} ﹫ ${listItems[v][paymentMethod]} ${global.rpg.emoticon(paymentMethod)}${paymentMethod}`.trim()
    })
    .join('\n')}
–––––––––––––––––––––––––
💁🏻‍♂ ᴛɪᴩ :
⮕ ᴛᴏ sᴇʟʟ ɪᴛᴇᴍs:
${prefix}${command} [item] [quantity]
★ ᴇxᴀᴍᴩʟᴇ:
${prefix}${command} potion 10
`.trim()

        buttons =
            command.toLowerCase() == 'buy'
                ? [
                      { index: 1, quickReplyButton: { displayText: 'ʙᴜʏ ʟɪᴍɪᴛ', id: prefix + `buy limit` } },
                      { index: 2, quickReplyButton: { displayText: 'ʙᴜʏ ᴩᴏᴛɪᴏɴ', id: prefix + `buy potion` } },
                  ]
                : [
                      { index: 1, quickReplyButton: { displayText: 'sᴇʟʟ ᴩᴏᴛɪᴏɴ', id: prefix + `sell potion` } },
                      { index: 2, quickReplyButton: { displayText: 'sᴇʟʟ ᴛʀᴀsʜ', id: prefix + `sell trash` } },
                  ]
        const item = (args[0] || '').toLowerCase()
        const total = Math.floor(isNumber(args[1]) ? Math.min(Math.max(parseInt(args[1]), 1), Number.MAX_SAFE_INTEGER) : 1) * 1
        if (!listItems[item]) return client.sendMessage(from, { text, footer, templateButtons: buttons })
        if (command.toLowerCase() == 'buy') {
            let paymentMethod = Object.keys(listItems[item]).find((v) => v in rpg)
            if (rpg[paymentMethod] < listItems[item][paymentMethod] * total)
                return client.sendMessage(from, {
                    text: `*–『 INSUFFICIENT CREDIT 』–*\n\nʏᴏᴜ ɴᴇᴇᴅ ᴇxᴛʀᴀ *${listItems[item][paymentMethod] * total - rpg[paymentMethod]}* ${global.rpg.emoticon(paymentMethod)}${paymentMethod} ᴛᴏ ʙᴜʏ *${total}* ${global.rpg.emoticon(item)}${item}.
                ʏᴏᴜ'ᴠᴇ *${rpg[paymentMethod]}* ${global.rpg.emoticon(paymentMethod)}${paymentMethod} ɪɴ ʙᴀɢ.
                –––––––––––––––––––––––––
                💁🏻‍♂ ᴛɪᴩ :
                ᴏᴩᴇɴ ᴄʀᴀᴛᴇs & ᴄᴏʟʟᴇᴄᴛ ʀᴇᴡᴀʀᴅs.
                ⮕ ᴛᴏ ᴏᴩᴇɴ ᴄʀᴀᴛᴇs:
                .open crate
                ⮕ ᴛᴏ ᴄᴏʟʟᴇᴄᴛ ʀᴇᴡᴀʀᴅs:
                .adventure | .daily | .monthly
                `,
                })
            rpg[paymentMethod] -= listItems[item][paymentMethod] * total
            rpg[item] += total
            await editRpg(sender, { rpg: rpg })

            return client.sendMessage(from, {
                text: `*––––––『 BOUGHT 』––––––*\n\nʏᴏᴜ *ʙᴏᴜɢʜᴛ ${total} ${global.rpg.emoticon(item)}${item}*.`,
                templateButtons: [{ index: 1, quickReplyButton: { displayText: 'ɪɴᴠᴇɴᴛᴏʀʏ', id: prefix + `inventory` } }],
            })
        } else {
            if (rpg[item] < total) return msg.reply(`You don't have enough *${global.rpg.emoticon(item)}${item}* to sell, you only have ${rpg[item]} items`)
            rpg[item] -= total
            rpg.money += listItems[item].money * total
            await editRpg(sender, { rpg: rpg })
            return client.sendMessage(from, { text: `*–––––––『 SOLD 』–––––––*\n\nʏᴏᴜ *sᴏʟᴅ ${total} ${global.rpg.emoticon(item)}${item}*.` })
        }
    },
} as ICommand

function isNumber(number) {
    if (!number) return number
    number = parseInt(number)
    return typeof number == 'number' && !isNaN(number)
}

const items = {
    buy: {
        limit: {
            exp: 999,
        },
        potion: {
            money: 1250,
        },
        trash: {
            money: 4,
        },
    },
    sell: {
        potion: {
            money: 1250,
        },
        trash: {
            money: 4,
        },
    },
}
