<div align="center">
<img src="https://i.ibb.co/DwZzvGK/allenss.jpg" width="150" height="150" border="0" alt="PFP">

# Allen Bot-Wa

<p align="center">
  <a href="https://github.com/Paiiss"><img title="Author" src="https://img.shields.io/badge/Author-Paiiss-red.svg?style=for-the-badge&logo=github" /></a>
</p>

Keep copyright, Created by [lolhuman](https://api.lolhuman.xyz/) | Please read carefully

## [![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/) [![NodeJS](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/) ![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)

</div>

## Content

---

-   [Description](#description)
-   [Example](#example)
-   [Highlights](#highlights)
-   [TODO](#todo)
-   [Installation](#installation)
-   [FAQ](#faq)
-   [Contributing](#contributing)
-   [Contributors](#contributors)

## Description

---

> I will develop this bot and make it public on my github, I hope that the Paiiss and lolhuman watermarks don't disappear if you use this repository. (Open source with conditions)

### Example

---

[![WhatsApp](https://img.shields.io/badge/WhatsApp-25D366?style=for-the-badge&logo=whatsapp&logoColor=white)](https://wa.me/6285667606389)

## Highlights

---

-   [x] Only focuses on multi devices
-   [x] Make it easier to control bots
-   [x] Features will be expanded
-   [x] Supports Indonesian and English
-   [x] Auto chat and cooldown
-   [x] Database using mongodb
-   [x] Has a plugin that makes it easy

## TODO

---

-   Registration system
-   Coming soon

## Installation

---

Node js and other npmjs installation required

### Require

-   [Node js](https://nodejs.org/en/) v16+
-   [This repository](https://github.com/Paiiss/bot-wa)
-   [Download And Install Git](https://git-scm.com/downloads)

### Mongodb

-   [mongodb tutorials](https://www.mongodb.com/developer/languages/javascript/node-crud-tutorial/)
-   [Indonesian mongodb tutorial](https://www.petanikode.com/tutorial-dasar-mongodb/)

### Config

```ts
{
    "groupId": "6285805609094-1635319627@​g.us", // Group id for error log
    "lolhuman": "apikey [http://api.lolhuman.xyz/]", // This bot uses some API from lolhuman
    "botname": "Allen Bot", // Bot Name
    "timezone": "Asia/Jakarta", // Time for node-cron
    "footer": "AllenBot • Paiiss" // Footer for message button
}
```

### Clone repo

```bash
# clone
git clone https://github.com/Paiiss/bot-wa

# go to dir bot-wa
cd bot-wa

# Perform npm install
npm install
```

### Run

```bash
# Start with
# If it's the first time, please scan the QR code

npm start
```

### FOR PM2

```bash
# Install pm2
sudo npm install pm2 -g

# Run pm2
pm2 start ecosystem.config.js
```

## FAQ

---

-   How do I set up commands?

### Plugin commnds

> Example file `src/commands/tes.ts`

```ts
import { ICommand } from '@constants/command.constant'

export default {
    aliases: ['test'], // Alias
    category: 'general', // Category
    cooldown: 1, // Cooldown 1s
    description: 'Example command', // Desc command
    groupOnly: true, // If only in groups
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
    callback: async ({ msg }) => {}, // Code command
} as ICommand
```

-   How to reply to messages?

```ts
callback: async ({ msg }) => {
  msg.reply('Yo')
},
```

-   Where to find interfaces?

    All interfaces are in `src/constants`

## Contributing

---

Your contribution will really help me

**want to contribute?**

1. Fork this repository
2. edit/change what you want, for example you want to add features/fix bugs
3. Test first
4. You can submit a pull request
5. If it accepts then delete the old fork and the new fork if you want to pull the request again

## Contributors

---

### **Special thanks**

[![LolHuman](https://github.com/LoL-Human.png?size=100)](https://github.com/LoL-Human)
