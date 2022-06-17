interface IGroup {
    id: string
    safe: boolean
    safelink: boolean
    safelinkgroup: boolean
    ban: boolean
    mute: boolean
    actived: boolean
    expired: number
    trial: boolean
    new: boolean
    leave: boolean
}

interface IUserRpg {
    id: string
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
        fishingrod: boolean
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
}

interface IUser {
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
}

export interface IUserModel extends IUser {}
export interface IGroupModel extends IGroup {}
export interface IUserRpgModel extends IUserRpg {}
