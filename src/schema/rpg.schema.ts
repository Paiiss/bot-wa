import mongoose, { Schema, model } from 'mongoose'

export interface IUser {
    id: string
    health: number
    money: number
    potion: number
    trash: number
    wood: number
    rock: number
    string: number
    emerald: number
    diamond: number
    gold: number
    iron: number
    common: number
    uncommon: number
    mythic: number
    lastclaim: number
    legendary: number
    pet: number
    horse: number
    horseexp: number
    cat: number
    catngexp: number
    fox: number
    foxexp: number
    dog: number
    dogexp: number
    horselastfeed: number
    catlastfeed: number
    foxlastfeed: number
    doglastfeed: number
    armor: number
    armordurability: number
    sword: number
    sworddurability: number
    pickaxe: number
    pickaxedurability: number
    fishingrod: number
    fishingroddurability: number
    lastadventure: number
    lastlimit: number
    lastfishing: number
    lastdungeon: number
    lastduel: number
    lastmining: number
    lasthunt: number
    lastweekly: number
    lastmonthly: number
    food: number
    catexp: number
}

const reqString = { type: String, require: true }
const noll = { type: Number, default: 0 }

var userSchema = new Schema<IUser>({
    id: reqString,

    health: {
        type: Number,
        default: 100,
    },
    potion: {
        type: Number,
        default: 10,
    },
    money: noll,
    trash: noll,
    wood: noll,
    rock: noll,
    string: noll,
    emerald: noll,
    diamond: noll,
    gold: noll,
    iron: noll,
    common: noll,
    uncommon: noll,
    mythic: noll,
    legendary: noll,
    pet: noll,
    horse: noll,
    horseexp: noll,
    cat: noll,
    catngexp: noll,
    fox: noll,
    foxexp: noll,
    dog: noll,
    dogexp: noll,
    horselastfeed: noll,
    catlastfeed: noll,
    foxlastfeed: noll,
    doglastfeed: noll,
    armor: noll,
    armordurability: noll,
    sword: noll,
    sworddurability: noll,
    pickaxe: noll,
    pickaxedurability: noll,
    fishingrod: noll,
    fishingroddurability: noll,
    lastadventure: noll,
    lastlimit: noll,
    lastfishing: noll,
    lastdungeon: noll,
    lastduel: noll,
    lastmining: noll,
    lastclaim: noll,
    lasthunt: noll,
    lastweekly: noll,
    lastmonthly: noll,
    food: noll,
    catexp: noll,
})

const name = 'allen-rpg-game'
export default model<IUser>(name, userSchema)
