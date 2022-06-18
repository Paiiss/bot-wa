# FAQs Allen Whatsapp Bot MD

## config settings

-   How to change bot name/api key/timezone?

    It's in the [app.json](https://github.com/Paiiss/bot-wa/blob/master/app.json)/ change the [config.json.example](https://github.com/Paiiss/bot-wa/blob/master/config.json.example) file to `config.json`

-   How to get lolhuman apikey?

    You can buy it at https://api.lolhuman.xyz/pricing

-   How do I create a new command?

    You can add files to the src/command folder, you can create a file name for the command, for the contents of the file you can see in the test.ts folder

-   Setup command

    ```ts
    import { ICommand } from '@constants'

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
    ```

## Error solution

-   Error: Cannot find module 'tsconfig-paths/register'

    Solution: https://stackoverflow.com/questions/68245546/cannot-find-module-tsconfig-paths-register

*   Heroku memory limit

    I don't know about this, if anyone knows how to solve this problem, don't hesitate to do PRs ^-^
