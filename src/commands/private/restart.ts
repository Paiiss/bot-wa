import { ICommand } from '@constants'
import { exec } from 'child_process'

export default {
    aliases: ['r'],
    description: `To restart block (Only use pm2)`,
    isAdminBot: true,
    callback: async ({ msg, args }) => {
        try {
            await msg.reply(`Please wait!`)
            exec('pm2 restart allen', (error, stdout, stderr) => {
                if (error) return msg.reply(error.message)
                msg.reply(stdout)
                msg.reply('Succes restart')
            })
        } catch (error) {
            msg.reply(error)
        }
    },
} as ICommand
