import { AnyWASocket, WAMessage } from '@adiwajshing/baileys'
import { Collection } from './collection.constant'
import { MessageSerialize } from './message.constant'

export const commands = new Collection<String, ICommand>() // new Map<String, ICommand>()

export interface ICommand {
    aliases?: string[]
    category: string
    description: string
    ownerOnly?: boolean
    callback?: (obj: CommandObject) => any
}

export interface CommandObject {
    client: AnyWASocket
    message: WAMessage
    command: string
    prefix: string
    args: string[]
    msg: MessageSerialize
}
