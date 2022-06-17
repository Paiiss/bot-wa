import { Schema, model } from 'mongoose'
import { IUserRpgModel } from '@constants'

const reqString = { type: String, require: true }
const noll = { type: Number, default: 0 }

var userSchema = new Schema<IUserRpgModel>({
    id: reqString,
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
        fishingrod: {
            type: Boolean,
            default: false,
        },
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
    },
})

const name = 'allen-rpg-game'
export const rpgMongo = model<IUserRpgModel>(name, userSchema)
