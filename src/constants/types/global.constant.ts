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
            level: 'ποΈ',
            limit: 'π³',
            health: 'β€οΈ',
            exp: 'βοΈ',
            money: 'π°',
            potion: 'π₯€',
            diamond: 'π',
            common: 'π¦',
            uncommon: 'π',
            mythic: 'π³οΈ',
            legendary: 'ποΈ',
            pet: 'π',
            trash: 'π',
            armor: 'π₯Ό',
            sword: 'βοΈ',
            pickaxe: 'βοΈ',
            fishingrod: 'π£',
            wood: 'πͺ΅',
            rock: 'πͺ¨',
            string: 'πΈοΈ',
            horse: 'π',
            cat: 'π',
            dog: 'π',
            fox: 'π¦',
            food: 'π',
            iron: 'βοΈ',
            gold: 'π',
            emerald: 'π',
        }
        let results = Object.keys(emot)
            .map((v) => [v, new RegExp(v, 'gi')])
            .filter((v) => string.match(v[1]))
        let __r: any = results[0][0]
        if (!results.length) return ''
        else return emot[__r]
    },
}
