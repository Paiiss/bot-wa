import { ICommand } from '@constants/command.constant'

export default {
    aliases: ['tes'], // Alias
    category: 'private', // Category
    cooldown: 1, // Cooldown 1s
    description: 'Example command', // Desc command
    groupOnly: false, // If only in groups
    isBotAdmin: false, // Admin bot in the group
    premiumOnly: false, // only premium
    privateOnly: false, // If only in private chat
    isAdminBot: false, // Only admin bot
    ownerOnly: false, // Only owner bot
    nsfw: false, // There will be an age check
    adminGroup: false, // Those who use the command must be the admin group
    maintenance: false, // If the maintance menu (can only be accessed by the owner)
    consume: 5, // Consumption limit
    use: '.test', // Example to use
    callback: async ({ msg }) => {
        msg.reply('Test')
    }, // Code command
} as ICommand
