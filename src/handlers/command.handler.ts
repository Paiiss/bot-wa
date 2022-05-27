import { MessageUpdateType, WAMessage, AnyWASocket } from '@adiwajshing/baileys'
import { commands } from '@constants/command.constant'
import { serialize } from '@utils/serialize.utils'
import * as dotenv from 'dotenv'
import { GlobSync } from 'glob'
import chalk from 'chalk'
import { watch, watchFile } from 'fs'
import path from 'path'
dotenv.config()

export class CommandHandler {
    async messageHandler(m: { messages: WAMessage[]; type: MessageUpdateType }, client: AnyWASocket) {
        const message = m.messages[0]
        if (m.type !== 'notify') return
        if (message.key && message.key.remoteJid === 'status@broadcast') return
        if (!message.message) return

        const msg = await serialize(message, client)
        if (client.type == 'md') {
            client.chatModify({ markRead: true, lastMessages: m.messages }, msg.from)
        } else if (client.type == 'legacy') {
            client.chatRead(message.key, 1)
        }

        if (msg.type === 'protocolMessage' || msg.type === 'senderKeyDistributionMessage' || !msg.type) return
        const prefix = process.env.PREFIX
        const args = msg.body.trim().split(/ +/).slice(1)
        const command = msg.body.startsWith(prefix) ? msg.body.slice(prefix.length).trim().split(/ +/).shift().toLowerCase() : null
        const getCommand = commands.get(command) || commands.find((v) => v.aliases && v.aliases.includes(command))

        if (getCommand) {
            const command_log = [chalk.whiteBright('├'), chalk.keyword('aqua')(`[ ${msg.isGroup ? ' GROUP ' : 'PRIVATE'} ]`), msg.body.substr(0, 50).replace(/\n/g, ''), chalk.greenBright('from'), chalk.yellow(msg.senderNumber)]
            if (msg.isGroup) {
                command_log.push(chalk.greenBright('in'))
                command_log.push(chalk.yellow(msg.groupMetadata.subject))
            }
            console.log(...command_log)
            getCommand.callback({ client, message, msg, command, prefix, args })
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
