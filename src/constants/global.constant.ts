import yargs from 'yargs/yargs'
global.opts = new Object(yargs(process.argv.slice(2)).exitProcess(false).parse())

// export {}
declare global {
    interface Number {
        getRandom: () => any
    }
    interface String {
        getRandom: () => any
        format: (dict: Object) => string
    }
    interface Array<T> {
        getRandom: () => any
    }
}

export function protoType() {
    Number.prototype.getRandom =
        String.prototype.getRandom =
        Array.prototype.getRandom =
            function () {
                if (Array.isArray(this) || this instanceof String) return this[Math.floor(Math.random() * this.length)]
                return Math.floor(Math.random() * this)
            }

    String.prototype.format = function (dict) {
        return this.replace(/{(\w+)}/g, function (match, key) {
            return typeof dict[key] !== 'undefined' ? dict[key] : match
        })
    }
}

global.rpg = {
    emoticon(string) {
        string = string.toLowerCase()
        let emot = {
            level: '🎖️',
            limit: '🎳',
            health: '❤️',
            exp: '✉️',
            money: '💰',
            potion: '🥤',
            diamond: '💎',
            common: '📦',
            uncommon: '🎁',
            mythic: '🗳️',
            legendary: '🗃️',
            pet: '🎁',
            trash: '🗑',
            armor: '🥼',
            sword: '⚔️',
            pickaxe: '⛏️',
            fishingrod: '🎣',
            wood: '🪵',
            rock: '🪨',
            string: '🕸️',
            horse: '🐎',
            cat: '🐈',
            dog: '🐕',
            fox: '🦊',
            food: '🍖',
            iron: '⛓️',
            gold: '👑',
            emerald: '💚',
        }
        let results = Object.keys(emot)
            .map((v) => [v, new RegExp(v, 'gi')])
            .filter((v) => string.match(v[1]))
        let __r: any = results[0][0]
        if (!results.length) return ''
        else return emot[__r]
    },
}
