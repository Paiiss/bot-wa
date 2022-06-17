import { commands, ICommand } from '@constants'
import { getAll } from '@utils/user.utils'
import { botname, footer } from '@config'

export default {
    aliases: ['hlist', 'menulist', 'lmenu', 'info'],
    category: 'general',
    description: 'To display the menu by list, and see how to use the menu',

    callback: async ({ client, msg, prefix, args }) => {
        const { pushName, sender, from } = msg

        if (args.length >= 1) {
            const data = []
            const name = args[0].toLowerCase()
            const cmd = commands.get(name) || commands.find((cmd) => cmd.aliases && cmd.aliases.includes(name))
            let txt: string = ``
            if (!cmd || cmd.category === 'private') return await msg.reply('No command found')
            else txt += `⍟──── *${name}* ────⍟\n\n`

            txt += `*Alias:* ${cmd.aliases ? cmd.aliases.join(', ') : '-'}\n`
            txt += `*Category:* ${cmd.category || `-`}\n`
            txt += `*Description:* ${cmd.description || '-'}\n`
            txt += `*Usage:* ${prefix}${name} ${cmd.use || ``}\n`
            txt += `*Only in groups:* ${cmd.groupOnly ? 'Yes' : 'No'}\n`
            txt += `*Only private chat :* ${cmd.privateOnly ? 'Yes' : 'No'}\n`
            txt += `*Cooldown :* ${cmd.cooldown ? (cmd.cooldown % 1000) + 's' : '5s'}\n`
            txt += `*Nsfw :* ${cmd.nsfw ? 'Yes' : 'No'}\n`
            txt += `*Only for premium :* ${cmd.premiumOnly ? 'Yes' : 'No'}\n`
            txt += `*Using limit :* ${cmd.consume ? cmd.consume : 'No'}\n`
            txt += `*Maintenance :* ${cmd.maintenance ? 'Yes' : 'No'}\n`

            return await msg.reply(txt)
        }
        const cmds = commands.keys()
        let category = []
        for (let cmd of cmds) {
            let info = commands.get(cmd)
            info['name'] = cmd
            if (!cmd) continue
            if (!info.category || info.category === 'private') continue
            if (Object.keys(category).includes(info.category)) category[info.category].push(info)
            else {
                category[info.category] = []
                category[info.category].push(info)
            }
        }

        let str = [`┌──「 ${botname} 」──⬣`, `│⬡ ${await (await getAll()).length} Users`, `╰──────⬣`]
        let t = `*Here My Command List*\n\n`
        const keys = Object.keys(category)

        let sections = []

        for (const key of keys) {
            let d = category[key].map((cmd) => cmd.name)
            let e = []
            for (let i = 0; i < d.length; i++) {
                let __cmd = commands.get(d[i])
                e.push({ title: d[i], rowId: prefix + `lmenu ` + d[i], description: __cmd.description || null })
            }
            t += `*${key.toUpperCase()}*\n~> \`\`\`${category[key].map((cmd) => cmd.name).join(', ')}\`\`\`\n\n`
            sections.push({
                title: `${key.toUpperCase()}`,
                rows: e,
            })
        }

        // await client.sendMessage(from, { text: t })
        return client.sendMessage(from, {
            text: str.join('\n') + `\n\n\`\`\`how to use: ${prefix}<command> | ex: .sticker\`\`\``,
            footer,
            title: `AllenBOT menu list`,
            buttonText: 'LIST MENU',
            sections,
        })
    },
} as ICommand
