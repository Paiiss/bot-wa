import { MessageUpdateType, WAMessage, AnyWASocket } from '@adiwajshing/baileys'
import { commands, cooldown, startMessage } from '@constants/command.constant'
import { serialize } from '@utils/serialize.utils'
import * as dotenv from 'dotenv'
import { GlobSync } from 'glob'
import chalk from 'chalk'
import { watch, watchFile } from 'fs'
import path from 'path'
import fs from 'fs'
import { IMess } from '@constants/message.constant'
import { IGroup } from 'src/schema/group.schema'
import { findGroup } from '@utils/group.utils'
import { findUser } from '@utils/user.utils'
dotenv.config()

export class CommandHandler {
    async messageHandler(m: { messages: WAMessage[]; type: MessageUpdateType }, client: AnyWASocket) {
        const message = m.messages[0]
        if (m.type !== 'notify') return
        if (message.key && message.key.remoteJid === 'status@broadcast') return
        if (!message.message) return

        const msg = await serialize(message, client)

        const prefix = process.env.PREFIX
        let { from, sender, isGroup, body, type } = msg

        // Auto ind / eng
        const textMessage = JSON.parse(fs.readFileSync('./message.json', 'utf-8'))
        let shortMessage: IMess = sender.startsWith('62') ? textMessage.ind : textMessage.eng

        if (client.type == 'md') {
            client.readMessages([message.key])
        } else if (client.type == 'legacy') {
            client.chatRead(message.key, 1)
        }

        const Group: IGroup = msg.isGroup ? await findGroup(msg.from) : null

        if (msg.type === 'protocolMessage' || msg.type === 'senderKeyDistributionMessage' || !msg.type) return
        const args = body ? body.trim().split(/ +/).slice(1) : []
        const command = body ? (body.startsWith(prefix) ? body.slice(prefix.length).trim().split(/ +/).shift().toLowerCase() : null) : null
        const getCommand = commands.get(command) || commands.find((v) => v.aliases && v.aliases.includes(command))

        if (/allen/.test(msg.body)) await client.sendMessage(msg.from, { react: { text: '💖', key: message.key } })

        // Set up start message & cooldown
        const now: number = Date.now()
        const cdStartMessage = 43200 * 1000
        const getTime = startMessage.get(msg.from)
        const timestamps = cooldown.get(msg.from)
        const cdAmount: number = (getCommand?.cooldown || 5) * 1000

        if (getCommand) {
            const User = await findUser(msg.sender)
            let isBotAdmin = msg.isGroup ? msg.groupMetadata.participants.filter((ids) => ids.id === msg.myId)[0]?.admin : null
            let isSenderAdmin = msg.isGroup ? msg.groupMetadata.participants.filter((ids) => ids.id === msg.sender)[0]?.admin : null

            if (msg.isGroup && Group.isMute) {
                let cekA = msg.groupMetadata.participants.filter((v) => v.id === msg.sender)
                if (!cekA[0].admin) return
            }

            if (User.isBan) return msg.reply(shortMessage.isBan)
            if (getCommand?.premiumOnly && !User.premium) return msg.reply(shortMessage.isPrem)
            // if (getCommand?.groupOnly && !msg.isGroup) return msg.reply(shortMessage.group.onlyGroup);
            if ((getCommand?.adminGroup || getCommand?.groupOnly || getCommand?.isBotAdmin) && !msg.isGroup) return msg.reply(shortMessage.group.onlyGroup)
            if (getCommand?.privateOnly && msg.isGroup) return msg.reply(shortMessage.privateOnly)
            if (getCommand?.isAdminBot && !User.isAdm) return msg.reply(shortMessage.adminOnly)
            if (getCommand?.ownerOnly && !User.isOwn) return msg.reply(shortMessage.devOnly)
            if (getCommand?.maintenance && !User.isOwn) return msg.reply(shortMessage.maintenance)
            if (getCommand?.adminGroup && !isSenderAdmin && !User.isOwn && !User.isAdm) return msg.reply(shortMessage.group.noPerms)
            if (getCommand?.isBotAdmin && !isBotAdmin) return msg.reply(shortMessage.group.botNoAdmin)
            if (getCommand?.nsfw) {
                if (!User.age) {
                    return msg.reply(shortMessage.setAge)
                } else if (User.age < 16) {
                    return msg.reply(shortMessage.nsfw)
                }
            }
            if (getCommand?.consume && User.limit > User.limitRequest) return msg.reply(shortMessage.needlimit)

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
            if (!User.isAdm && !User.isOwn && !User.premium) {
                cooldown.set(msg.from, now)
                setTimeout(() => cooldown.delete(msg.from), cdAmount)
            }
            if (!msg.isGroup) startMessage.set(msg.from, now), setTimeout(() => startMessage.delete(msg.from), cdStartMessage)

            console.log(...command_log)

            await getCommand
                .callback({ client, message, msg, command, prefix, args, shortMessage, User, Group })
                .then(async () => {
                    await User.updateOne({ $inc: { limit: +(getCommand.consume || 0), tReq: +1, dReq: +1 } })
                })
                .catch((e) => {
                    console.log(e)
                })
        } else {
            if (msg.isGroup) return
            if (getTime) {
                const _expiration = getTime + cdStartMessage
                if (now < _expiration) return
            }
            startMessage.set(msg.from, now)
            setTimeout(() => startMessage.delete(msg.from), cdStartMessage)
            client.sendMessage(from, { text: shortMessage.startMessage })
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
                console.log(chalk.whiteBright('├'), chalk.keyword('red')('[  ERROR  ]'), `File with filename ${basename} already register, try to change filename.`)
            } else if (typeof require(file).default !== 'object') {
                console.log(chalk.whiteBright('├'), chalk.keyword('red')('[  ERROR  ]'), `Type of file ${basename} is ${typeof require(file).default}, required object.`)
            } else {
                commands.set(basename, require(file).default)
                watch(file, (_event, filename) => {
                    const base = path.basename(filename, '.ts').toLowerCase()
                    commands.set(base, require(file).default)
                })
            }
        }
    }
}
