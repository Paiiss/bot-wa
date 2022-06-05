import mongoose, { Schema, model } from 'mongoose'

export interface IUser {
    sender: string
    nickname: string
    age: number
    activated: boolean
    limit: number
    regTime: number
    totalRequest: number
    limitRequest: number
    dayRequest: number
    cash: number
    level: number
    exp: number
    warn: number
    banned: boolean
    admin: boolean
    owner: boolean
    isBc: boolean
    premium: boolean
    expire: number
    casta: string
    role: string
    afk: number
    afkReason: string
    autolevelup: boolean
    rpg: {
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
        petFood: number
        catexp: number
    }
}

const reqString = { type: String, require: true }
const nullString = { type: String, require: false, default: null }
const nullNumber = { type: Number, require: false, default: null }
const noll = { type: Number, default: 0 }
const boll = { type: Boolean, default: false }

var userSchema = new Schema<IUser>({
    sender: reqString,
    nickname: nullString,
    age: nullNumber,
    activated: {
        type: Boolean,
        default: false,
    },
    regTime: {
        type: Number,
        default: -1,
    },
    afk: {
        type: Number,
        default: -1,
    },
    afkReason: {
        type: String,
        default: null,
    },
    autolevelup: {
        type: Boolean,
        default: true,
    },
    limit: noll,
    totalRequest: noll,
    dayRequest: noll,
    limitRequest: {
        type: Number,
        default: 30,
    },
    cash: noll,
    level: noll,
    exp: noll,
    warn: noll,
    banned: boll,
    admin: boll,
    owner: boll,
    isBc: {
        type: Boolean,
        default: true,
    },
    premium: boll,
    expire: {
        default: null,
        type: Number,
    },
    casta: {
        default: 'classic',
        type: String,
    },
    role: {
        default: 'Beginner',
        type: String,
    },
    rpg: {
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
        petFood: noll,
        catexp: noll,
    },
})

const name = 'allen'
export default model<IUser>(name, userSchema)
