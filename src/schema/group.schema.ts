import mongoose, { Schema, model } from 'mongoose'

export interface IGroup {
    id: string
    antiNsfw: boolean
    antiLink: boolean
    antiLinkGroup: boolean
    isBan: boolean
    isMute: boolean
    actived: boolean
    expired: number
    trial: boolean
    new: boolean
    leave: boolean
    date: number
}

const defaultBoolean = {
    type: Boolean,
    default: false,
}

var groupSchema = new Schema<IGroup>({
    id: {
        type: String,
        required: true,
    },
    antiLink: defaultBoolean,
    antiNsfw: defaultBoolean,
    antiLinkGroup: defaultBoolean,
    isBan: defaultBoolean,
    isMute: defaultBoolean,
    actived: defaultBoolean,
    expired: {
        type: Number,
        default: null,
    },
    trial: defaultBoolean,
    new: defaultBoolean,
    date: {
        type: Number,
        default: Date.now(),
    },
    leave: defaultBoolean,
})

const name = 'allen-group'
export default model<IGroup>(name, groupSchema)
