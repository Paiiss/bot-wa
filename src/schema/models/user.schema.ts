import { Schema, model } from 'mongoose'
import { IUserModel } from '@constants'

const reqString = { type: String, require: true }
const nullString = { type: String, require: false, default: null }
const nullNumber = { type: Number, require: false, default: null }
const noll = { type: Number, default: 0 }
const boll = { type: Boolean, default: false }

var userSchema = new Schema<IUserModel>(
    {
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
    },
    { timestamps: true }
)

const name = 'allen-user'
export const userMongo = model<IUserModel>(name, userSchema)
