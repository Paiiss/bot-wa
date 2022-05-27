import { AnyWASocket, WAMessage } from '@adiwajshing/baileys'
import { IGroup } from '@schema/group.schema'
import { IUser } from '@schema/user.schema'
import { Collection } from './collection.constant'
import { IMess, MessageSerialize } from './message.constant'

export const commands = new Collection<String, ICommand>() // new Map<String, ICommand>()
export const cooldown = new Collection<string, number>() // new Map<String, number>
export const startMessage = new Collection<string, number>() // new Map<String, number>

export interface ICommand {
    aliases?: string[]
    category: string
    cooldown?: number
    description?: string
    groupOnly?: boolean
    isBotAdmin?: boolean
    premiumOnly?: boolean
    privateOnly?: boolean
    isAdminBot?: boolean
    ownerOnly?: boolean
    nsfw?: boolean
    adminGroup?: boolean
    maintenance?: boolean
    consume?: number
    use: string
    callback?: (obj: CommandObject) => any
}

export interface CommandObject {
    client: AnyWASocket
    message: WAMessage
    command: string
    prefix: string
    args: string[]
    msg: MessageSerialize
    User: IUser
    Group: IGroup
    shortMessage: IMess
}
