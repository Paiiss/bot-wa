import { IGroupModel } from '@constants'
import { Schema, model } from 'mongoose'

const defaultBoolean = {
    type: Boolean,
    default: false,
}

var groupSchema = new Schema<IGroupModel>(
    {
        id: {
            type: String,
            required: true,
        },
        safe: defaultBoolean,
        safelinkgroup: defaultBoolean,
        safelink: defaultBoolean,
        ban: defaultBoolean,
        mute: defaultBoolean,
        actived: defaultBoolean,
        expired: {
            type: Number,
            default: null,
        },
        trial: defaultBoolean,
        new: defaultBoolean,
        leave: defaultBoolean,
    },
    { timestamps: true }
)

const name = 'allen-group'
export const groupMongo = model<IGroupModel>(name, groupSchema)
