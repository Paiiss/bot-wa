import { ICommand } from '@constants/command.constant'

export default {
    description: 'blacksmith where weapons are made',
    category: 'game/rpg',
    aliases: ['create'],
    callback: async ({ msg, client, command, args }) => {
        if (command === 'blacksmith') return msg.reply(`👴🏽⛏️ : Welcome to blacksmith, Sorry, our shop is not open yet, it's being repaired`) // what do you want to make?
    },
} as ICommand
