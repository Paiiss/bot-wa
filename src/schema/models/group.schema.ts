import { Schema, model } from 'mongoose'
import { IGroupModel } from '@constants'

var groupSchema = new Schema<IGroupModel>(
    {
        group_id: {
            type: String,
            required: true,
        },
        safelink: {
            type: Boolean,
            default: false,
        },
        safe: {
            type: Boolean,
            default: false,
        },
        safelinkgroup: {
            type: Boolean,
            default: false,
        },
        ban: {
            type: Boolean,
            default: false,
        },
        mute: {
            type: Boolean,
            default: false,
        },
        act: {
            type: Boolean,
            default: false,
        },
        expired: {
            type: Number,
            default: null,
        },
        trial: {
            type: Boolean,
            default: false,
        },
        new: {
            type: Boolean,
            default: false,
        },
        leave: {
            type: Boolean,
            default: false,
        },
    },
    { timestamps: true }
)

const name = 'allen-group'
export const groupModel = model<IGroupModel>(name, groupSchema)
