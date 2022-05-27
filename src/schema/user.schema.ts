import mongoose, { Schema, model } from 'mongoose'

export interface IUser {
    sender: string
    nickname: string
    age: number
    activated: boolean
    limit: number
    totalRequest: number
    limitRequest: number
    dayRequest: number
    cash: number
    level: number
    exp: number
    warn: number
    isBan: boolean
    isAdm: boolean
    isOwn: boolean
    isBc: boolean
    premium: boolean
    expire: number
    casta: string
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
    isBan: boll,
    isAdm: boll,
    isOwn: boll,
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
})

const name = 'allen-users'
export default model<IUser>(name, userSchema)
