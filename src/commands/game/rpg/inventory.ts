import { ICommand } from '@constants'
import { findUserRpg } from '@utils/rpg.utils'
import adventure from './adventure'
import fishing from './fishing'

export default {
    description: 'RPG games for adventure',
    aliases: ['inv'],
    category: 'game/rpg',

    callback: async ({ msg }) => {
        const { sender, pushName } = msg
        let { rpg } = await findUserRpg(sender)
        const tools = Object.keys(inventory.tools)
            .map((v) => rpg[v] && `⮕ ${global.rpg.emoticon(v)}${v}: ${typeof inventory.tools[v] === 'object' ? inventory.tools[v][rpg[v]?.toString()] : `-`}`)
            .filter((v) => v)
            .join('\n')
            .trim()
        const items = Object.keys(inventory.items)
            .map((v) => rpg[v] && `⮕ ${global.rpg.emoticon(v)} ${v}: ${rpg[v]}`)
            .filter((v) => v)
            .join('\n')
            .trim()
        const crates = Object.keys(inventory.crates)
            .map((v) => rpg[v] && `⮕ ${global.rpg.emoticon(v)} ${v}: ${rpg[v]}`)
            .filter((v) => v)
            .join('\n')
            .trim()
        const pets = Object.keys(inventory.pets)
            .map((v) => rpg[v] && `⮕ ${global.rpg.emoticon(v)} ${v}: ${rpg[v] >= inventory.pets[v] ? 'Max Levels' : `Level(s) ${rpg[v]}`}`)
            .filter((v) => v)
            .join('\n')
            .trim()
        const cooldowns = Object.entries(inventory.cooldowns)
            .map(([cd, { name, time }]) => cd in rpg && `⮕ ⌛ ${name}: ${Date.now() - rpg[cd] >= time ? `❎` : `✅`}`)
            .filter((v) => v)
            .join('\n')
            .trim()
        const caption = `
🧑🏻‍🏫 ᴜsᴇʀ: *${pushName}*
${Object.keys(inventory.others)
    .map((v) => rpg[v] && `⮕ ${global.rpg.emoticon(v)} ${v}: ${rpg[v]}`)
    .filter((v) => v)
    .join('\n')}${
            tools
                ? `
🔖 ᴛᴏᴏʟs :
${tools}`
                : ''
        }${
            items
                ? `

🔖 ɪᴛᴇᴍs :
${items}`
                : ''
        }${
            crates
                ? `

🔖 ᴄʀᴀᴛᴇs :
${crates}`
                : ''
        }${
            pets
                ? `

🔖 ᴩᴇᴛs :
${pets}`
                : ''
        }${
            cooldowns
                ? `

♻️ ᴄᴏʟʟᴇᴄᴛ ʀᴇᴡᴀʀᴅs:
${cooldowns}`
                : ''
        }
`.trim()
        msg.reply(caption)
    },
} as ICommand

const inventory = {
    others: {
        health: true,
        money: true,
        exp: true,
    },
    items: {
        potion: true,
        trash: true,
        wood: true,
        rock: true,
        string: true,
        emerald: true,
        diamond: true,
        gold: true,
        iron: true,
        food: true,
    },
    tools: {
        armor: {
            '0': '❌',
            '1': 'Leather Armor',
            '2': 'Iron Armor',
            '3': 'Gold Armor',
            '4': 'Diamond Armor',
            '5': 'Emerald Armor',
            '6': 'Crystal Armor',
            '7': 'Obsidian Armor',
            '8': 'Netherite Armor',
            '9': 'Wither Armor',
            '10': 'Dragon Armor',
            '11': 'Hacker Armor',
        },
        sword: {
            '0': '❌',
            '1': 'Wooden Sword',
            '2': 'Stone Sword',
            '3': 'Iron Sword',
            '4': 'Gold Sword',
            '5': 'Copper Sword',
            '6': 'Diamond Sword',
            '7': 'Emerald Sword',
            '8': 'Obsidian Sword',
            '9': 'Netherite Sword',
            '10': 'Samurai Slayer Green Sword',
            '11': 'Hacker Sword',
        },
        pickaxe: {
            '0': '❌',
            '1': 'Wooden Pickaxe',
            '2': 'Stone Pickaxe',
            '3': 'Iron Pickaxe',
            '4': 'Gold Pickaxe',
            '5': 'Copper Pickaxe',
            '6': 'Diamond Pickaxe',
            '7': 'Emerlad Pickaxe',
            '8': 'Crystal Pickaxe',
            '9': 'Obsidian Pickaxe',
            '10': 'Netherite Pickaxe',
            '11': 'Hacker Pickaxe',
        },
        fishingrod: true,
    },
    crates: {
        common: true,
        uncommon: true,
        mythic: true,
        legendary: true,
        pet: true,
    },
    pets: {
        horse: 10,
        cat: 10,
        fox: 10,
        dog: 10,
    },
    cooldowns: {
        lastadventure: {
            name: 'adventure',
            time: adventure.cooldown,
        },
        lastclaim: {
            name: 'daily',
            time: 79200000,
        },
        lastmonthly: {
            name: 'monthly',
            time: 2592000000,
        },
        lastfishing: {
            name: 'fishing',
            time: fishing.cooldown,
        },
    },
}
