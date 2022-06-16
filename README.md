<div align="center">
<img src="https://i.ibb.co/DwZzvGK/allenss.jpg" width="150" height="150" border="0" alt="PFP">

# Allen Bot-Wa

<p align="center">
  <a href="https://github.com/Paiiss"><img title="Author" src="https://img.shields.io/badge/Author-Paiiss-blue.svg?style=for-the-badge&logo=github" /></a>
</p>

Keep copyright, Created by [lolhuman](https://api.lolhuman.xyz/) | Please read carefully | 100+ features

## [![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/) [![NodeJS](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/) ![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
[![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2FPaiiss%2Fbot-wa.svg?type=shield)](https://app.fossa.com/projects/git%2Bgithub.com%2FPaiiss%2Fbot-wa?ref=badge_shield)

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
-   [Donation](#donation)

## Description

---

> I will develop this bot and publish it on my github, I hope the Paiiss and lolhuman watermarks won't go away if you use this repository.

### Example

---

[![WhatsApp](https://img.shields.io/badge/WhatsApp-25D366?style=for-the-badge&logo=whatsapp&logoColor=white)](https://wa.me/6285667606389)

Join the group [Allen Group](https://chat.whatsapp.com/CktCFlTbTiMLq5K4fgIidd)

## Highlights

---

-   [x] Only focuses on multi devices
-   [x] Make it easier to control bots
-   [x] Features will be expanded
-   [x] Supports Indonesian and English
-   [x] Auto chat and cooldown
-   [x] Database using mongodb
-   [x] Has a plugin that makes it easy
-   [x] reply plugin with quoted
-   [x] The rental bot and bot feature will automatically exit when the rental period runs out!
-   [x] Registration
-   [x] Anti nsfw
-   [x] Jadi bot

## TODO

---

-   rpg games

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
-   in the .env.example file I provide a mongodb cluster for public, if you want to have your own you can create a cluster [here](https://www.mongodb.com/)

### Config

-   remove .example for [config.json.example](https://github.com/Paiiss/bot-wa/blob/master/config.json.example) and [.env.example](https://github.com/Paiiss/bot-wa/blob/master/.env.example) files

### Clone

```bash
# clone
git clone https://github.com/Paiiss/bot-wa.git

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

### For pm2

```bash
# Install pm2
sudo npm install pm2 -g

# Run pm2
pm2 start ecosystem.config.js
```

## FAQ

---

-   How do I set up commands?

    Plugin commnds [`src/commands/tes.ts`](https://github.com/Paiiss/bot-wa/blob/master/src/commands/test.ts)

-   How to reply / reply error / react ?

```ts
callback: async ({ msg, args }) => {

  // Error
  if (args.length < 1) return msg.error("you have to enter a word") // This is useful if the limit is used, if the command fails to be received by the user, the limit will not be used

  // React message
  if (args[0] === "pais") return msg.react("👍🏻")

  // Reply
  msg.reply('Yo', true) // Support quotes, true / false / leave it blank msg.reply('Yo')
},

```

-   Where to find interfaces?

    All interfaces are in [`src/constants`](https://github.com/Paiiss/bot-wa/blob/master/src/constants)

*   Should we install mongodb on our server?

    No, because this script uses mongodb which is connected from the cluster so it's simple to use

## Contributing

---

### Your contribution will really help me

If you want to contribute

1. Fork this repository
2. edit/change what you want, for example you want to add features/fix bugs
3. Test first
4. You can submit a pull request
5. If it accepts then delete the old fork and the new fork if you want to pull the request again

## Contributors / Special Thanks

[![LolHuman](https://github.com/LoL-Human.png?size=100)](https://github.com/LoL-Human)

## Donation

[![ko-fi](https://ko-fi.com/img/githubbutton_sm.svg)](https://ko-fi.com/Q5Q13893Q)


## License
[![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2FPaiiss%2Fbot-wa.svg?type=large)](https://app.fossa.com/projects/git%2Bgithub.com%2FPaiiss%2Fbot-wa?ref=badge_large)