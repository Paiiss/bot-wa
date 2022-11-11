import { MessageUpsertType, WAMessage, WASocket } from '@adiwajshing/baileys'
import { commands, cooldown, groupRent, startMessage } from '@constants'
import { MessageError, serialize } from '@utils/serialize.utils'
import * as dotenv from 'dotenv'
import { GlobSync } from 'glob'
import chalk from 'chalk'
import { watch } from 'fs'
import path from 'path'
import fs from 'fs'
import { IMessage, MessageSerialize, IGroupModel } from '@constants'
import { addRentGroup, findGroup } from '@utils/group.utils'
import toMS from 'ms'
import { expUpdate, findUser, setAfk } from '@utils/user.utils'
import { groupMongo } from '@schema'
import { getJson, postJson, sleep, uploaderAPI, waparse } from '@utils/helper.utils'
import { leaveGroupCron } from '@utils/cron.utils'
import { lolhuman, botname, link_group, footer } from '@config'
import afk from '../data/afk.json'
dotenv.config()

const gRent: groupRent = require('../data/g.json')
const rendemCode = require('../data/rendem.json')
const textMessage = JSON.parse(fs.readFileSync('./message.json', 'utf-8'))

export class CommandHandler {
    async messageHandler(m: { messages: WAMessage[]; type: MessageUpsertType }, client: WASocket) {
        const message = m.messages[0]
        if (m.type !== 'notify') return
        if (message.key && message.key.remoteJid === 'status@broadcast') return
        if (!message.message) return

        const msg = await serialize(message, client)

        const prefix = process.env.PREFIX
        const { from, sender, isGroup, body, type } = msg

        // Auto ind or eng
        let shortMessage: IMessage = sender.startsWith('62') ? textMessage.ind : textMessage.eng

        const Group: IGroupModel = msg.isGroup ? await findGroup(msg.from) : null
        let isBotAdmin = msg.typeCheck.isSticker ? null : msg.isGroup ? msg.groupMetadata.participants.filter((ids) => ids.id === msg.myId)[0]?.admin : null
        let isSenderAdmin = msg.typeCheck.isSticker ? null : msg.isGroup ? msg.groupMetadata.participants.filter((ids) => ids.id === msg.sender)[0]?.admin : null
        if (isGroup && Group?.ban) return
        if (Group && isGroup) await checkRendem(client, msg)

        await antilinkgroup(client, msg, Group, isBotAdmin, isSenderAdmin)
        await antinsfw(msg, Group)
        await afkHandler(msg)

        if (isGroup && Group && !Group?.new && !Group?.trial) {
            let s = []
            await groupMongo.findOneAndUpdate({ id: from }, { $set: { new: true } })
            for (let i of msg.groupMetadata.participants) s.push(i.id)
            await client.sendMessage(from, { text: t.join('\n\n'), mentions: s, footer, templateButtons: [{ index: 1, urlButton: { displayText: 'Join the Allen bot group', url: link_group } }] })
            await addRentGroup(from, '7d').then(() => console.log(chalk.whiteBright('├'), chalk.keyword('aqua')('[  STATS  ]'), `New group : ${msg.groupMetadata.subject}`))
        } else if (isGroup && Group && Group.new && Group.trial && Group.expired === null) {
            sleep(60 * 1000).then(async () => {
                let some = gRent.some((e) => e.id == from)
                if (some) return
                await leaveGroupCron(Group.id, Group.expired, client).catch((e) => console.log(e))
            })
        }

        if (msg.type === 'protocolMessage' || msg.type === 'senderKeyDistributionMessage' || !msg.type) return
        const args = body ? body.trim().split(/ +/).slice(1) : []
        const command = body ? (body.startsWith(prefix) ? body.slice(prefix.length).trim().split(/ +/).shift().toLowerCase() : null) : null
        const getCommand = commands.get(command) || commands.find((v) => v.aliases && v.aliases.includes(command))

        if (/allen/.test(msg.body) && !msg.isSelf) await msg.react('💖')
        if (body === 'prefix') return msg.reply('Prefix: ' + prefix)

        // Set up start message & cooldown
        const now: number = Date.now()
        const cdStartMessage = 43200 * 1000
        const getTime = startMessage.get(msg.from)
        const timestamps = cooldown.get(msg.from)
        const cdAmount: number = (getCommand?.cooldown || 5) * 1000

        if (getCommand) {
            const User = await findUser(msg.sender)
            if (msg.isGroup && Group?.mute && !isSenderAdmin) return
            if (User?.banned) return msg.reply(shortMessage.isBan)
            if (getCommand?.premiumOnly && !User.premium) return msg.reply(shortMessage.isPrem)
            // if (getCommand?.groupOnly && !msg.isGroup) return msg.reply(shortMessage.group.onlyGroup);
            if ((getCommand?.adminGroup || getCommand?.groupOnly || getCommand?.isBotAdmin) && !msg.isGroup) return msg.reply(shortMessage.group.onlyGroup)
            if (getCommand?.privateOnly && msg.isGroup) return msg.reply(shortMessage.privateOnly)
            if (getCommand?.isAdminBot && !User.admin) return msg.reply(shortMessage.adminOnly)
            if (getCommand?.ownerOnly && !User.owner) return msg.reply(shortMessage.devOnly)
            if (getCommand?.maintenance && !User.owner && !User.admin) return msg.reply(shortMessage.maintenance)
            if (getCommand?.adminGroup && !isSenderAdmin && !User.owner && !User.admin) return msg.reply(shortMessage.group.noPerms)
            if (getCommand?.isBotAdmin && !isBotAdmin) return msg.reply(shortMessage.group.botNoAdmin)
            if (getCommand?.nsfw) {
                if (isGroup && Group.safe) return msg.reply(shortMessage.group.antinsfw)
                if (!User.age) {
                    return msg.reply(shortMessage.register.setAge)
                } else if (User.age < 16) {
                    return msg.reply(shortMessage.nsfw)
                }
            }
            if (getCommand?.consume && User.limit > User.limitRequest && !User.owner) return msg.reply(shortMessage.needlimit)

            const command_log = [chalk.whiteBright('├'), chalk.keyword('aqua')(`[ ${msg.isGroup ? ' GROUP ' : 'PRIVATE'} ]`), msg.body.substr(0, 50).replace(/\n/g, ''), chalk.greenBright('from'), chalk.yellow(msg.senderNumber)]
            if (msg.isGroup) {
                command_log.push(chalk.greenBright('in'))
                command_log.push(chalk.yellow(msg.groupMetadata.subject))
            }
            if (timestamps) {
                const expiration = timestamps + cdAmount
                if (now < expiration) {
                    const command_log_spam = [chalk.whiteBright('├'), chalk.keyword('red')(`[ SPAM ]`), chalk.greenBright('from'), chalk.yellow(msg.senderNumber)]
                    if (msg.isGroup) {
                        command_log.push(chalk.greenBright('in'))
                        command_log.push(chalk.yellow(msg.groupMetadata.subject))
                    }
                    let timeLeft = (expiration - now) / 1000
                    console.log(...command_log_spam)
                    return await client.sendMessage(msg.from, { text: `Cooldown applies, please wait another _${timeLeft.toFixed(1)} second(s)_` })
                }
            }
            if (!User.admin && !User.owner && !User.premium) {
                cooldown.set(msg.from, now)
                setTimeout(() => cooldown.delete(msg.from), cdAmount)
            }
            if (!msg.isGroup) startMessage.set(msg.from, now), setTimeout(() => startMessage.delete(msg.from), cdStartMessage)

            console.log(...command_log)

            await getCommand
                .callback({ client, message, msg, command, prefix, args, shortMessage, User, Group })
                .then(async () => await expUpdate({ msg, toAdd: { exp: +5, limit: +(getCommand.consume || 0), totalRequest: +1, dayRequest: +1 } }).catch((e) => console.log(e)))
                .catch((error) => {
                    if (error instanceof MessageError) console.log(chalk.whiteBright('├'), chalk.keyword('red')(`[ ERROR ]`), chalk.greenBright('from'), chalk.yellow(msg.senderNumber))
                    else if (error instanceof Error) msg.reply(`There is an error!`, true), console.log(error)
                })
        } else {
            if (msg.isGroup) return
            if (getTime && Date.now() < getTime + cdStartMessage) return
            startMessage.set(msg.from, now)
            setTimeout(() => startMessage.delete(msg.from), cdStartMessage)
            await client.sendMessage(from, { text: shortMessage.startMessage })
        }
    }

    getAllFiles(directory: string) {
        let pathFiles = new GlobSync(path.join(directory, '*.ts')).found
        pathFiles.push(...new GlobSync(path.join(directory, '*', '*.ts')).found)
        pathFiles.push(...new GlobSync(path.join(directory, '*', '*', '*.ts')).found)
        pathFiles = pathFiles.filter((v) => v.endsWith('.ts'))
        const files = [] as { basename: string; file: string }[]
        for (let file of pathFiles) {
            const basename = path.basename(file, '.ts').toLowerCase()
            files.push({
                basename,
                file,
            })
        }
        return files
    }

    registerCommand() {
        for (let { basename, file } of this.getAllFiles(path.join(__dirname, '../', 'commands'))) {
            if (commands.get(basename)) {
                // console.log(chalk.whiteBright('├'), chalk.keyword('red')('[  ERROR  ]'), `File with filename ${basename} already register, try to change filename.`)
            } else if (typeof require(file).default !== 'object') {
                console.log(chalk.whiteBright('├'), chalk.keyword('red')('[  ERROR  ]'), `Type of file ${basename} is ${typeof require(file).default}, required object.`)
            } else {
                commands.set(basename, require(file).default)
                watch(file, (_event, filename) => {
                    const dir = path.resolve(file)
                    const base = path.basename(filename, '.ts').toLowerCase()
                    if (dir in require.cache && _event == 'change') {
                        delete require.cache[dir]
                        commands.set(base, require(file).default)
                        console.log(chalk.whiteBright('├'), chalk.keyword('aqua')('[  STATS  ]'), `reloaded ${filename}`)
                    }
                })
            }
        }
    }
}

const t = [
    `hello i'm ${botname} 🐱👋🏻`,
    `This group ID is automatically saved to the database👨🏼‍💻`,
    `We provide a trial period for using bots within 7 days, within 7 days the bot will automatically leave the group, if you want to extend the bot usage period, please rent a bot by contacting the admin`,
    `*Rental price*\n• 2 day / IDR: 1k\n• 2 Weeks / IDR: 5k\n• 1 Month / IDR: 10k\n• 3 Month / IDR: 25k`,
    `*Advantages of rent*\n• Make stickers with friends without limits\n• Play games from bots with friends (in progress)\n• More features will be made soon`,
]

async function checkRendem(client: WASocket, msg: MessageSerialize) {
    let reg = new RegExp(Object.keys(rendemCode).join('|'))
    let mat = msg.body.match(reg)
    if (reg.test(msg.body) && rendemCode.hasOwnProperty(mat[0])) {
        if (!msg.isGroup && rendemCode[mat[0]].type === 'rent') await msg.reply(`Code can only be used in groups`)
        addRentGroup(msg.from, rendemCode[mat[0]].duration)
            .then(async (res: number) => {
                delete rendemCode[mat[0]]
                let __ms = toMS(res - Date.now(), { long: true })
                console.log(chalk.whiteBright('├'), chalk.keyword('aqua')('[ RENT ]'), `group ${msg.groupMetadata.subject} activates rental for ${__ms}`)
                await client.sendMessage(msg.from, { text: `Redeem code used successfully, validity period: ${__ms}`, mentions: [msg.sender] }).then(async () => {
                    fs.writeFileSync('./src/data/rendem.json', JSON.stringify(rendemCode))
                })
            })
            .catch(async (err) => {
                await msg.reply(err)
            })
    }
}

async function antinsfw(msg: MessageSerialize, group: IGroupModel) {
    if (msg.isGroup && group.safe && msg.typeCheck.isImage && !msg.isSelf) {
        console.log(chalk.whiteBright('├'), chalk.red('[ NSFW ]'), msg.senderNumber, `send pictures in an active anti-nsfw group (${msg.groupMetadata.subject})`)
        let filebuffer = await msg.download()
        const imageUrl = (await uploaderAPI(filebuffer, 'uguu')).data.url
        await getJson(`https://api.lolhuman.xyz/api/nsfwcheck?apikey=${lolhuman}&img=${imageUrl}`)
            .then(async (res) => {
                if (Number(res.result.replace('%', '')) >= 30) {
                    console.log(chalk.whiteBright('├'), chalk.red('[ NSFW ]'), `Image contains nsfw ${res.result}`)
                    msg.reply(`Nswf detected, Score: ${res.result}`, true)
                } else {
                    console.log(chalk.whiteBright('├'), chalk.red('[ NSFW ]'), `Image is safe, contains ${res.result} nsfw`)
                }
            })
            .catch((e) => console.log(chalk.whiteBright('├'), chalk.red('[ NSFW ]'), `nsfw error!`))
    }
}

const antilinkgroup = async (client: WASocket, msg: MessageSerialize, group: IGroupModel, isBotAdmin: string, isSenderAdmin: string) => {
    if (msg.isGroup && group.safelinkgroup && !msg.isSelf && !isSenderAdmin && isBotAdmin) {
        let { url } = waparse(msg.body)
        if (url) {
            let code = await client.groupInviteCode(msg.from)
            if (!new RegExp(code).test(url)) {
                console.log(chalk.whiteBright('├'), chalk.keyword('aqua')('[ LINK DETECT ]'), `Someone sent the link in the ${msg.groupMetadata.subject} group and it will be kicked`)
                await msg.reply(`You will be removed from the group for sending another group link`)
                return client.groupParticipantsUpdate(msg.from, [msg.sender], 'remove')
            }
        }
    }
}

const afkHandler = async (msg: MessageSerialize) => {
    if (afk.hasOwnProperty(msg.sender)) {
        setAfk(msg.sender, false).then(() => {
            msg.reply(`you have sent a message, afk mode is turned off`, true)
        })
    }
    if (msg.mentions.length > 0) {
        for (let __afk of msg.mentions) {
            if (afk.hasOwnProperty(__afk)) {
                await msg.reply(`User with number ${__afk.split('@')[0]} is afk, reason: ${afk[__afk].reason}`)
            }
        }
    }
}
