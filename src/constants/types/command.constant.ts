import { WAMessage, WASocket } from '@adiwajshing/baileys'
import { IGroupModel, IUserModel, Collection, IMessage, MessageSerialize } from '@constants'

export const commands = new Collection<String, ICommand>() // new Map<String, ICommand>()
export const cooldown = new Collection<string, number>() // new Map<String, number>
export const startMessage = new Collection<string, number>() // new Map<String, number>

// Read the JSDOC docs : https://www.typescriptlang.org/docs/handbook/jsdoc-supported-types.html
export interface ICommand {
    /**
     * @type {string[]}
     * @description To create a command alias
     * @example aliases: ['help']
     */
    aliases?: string[]

    /**
     * @type {string}
     * @description Category of the command
     * @example category: "This is a command to create JSDOC"
     */
    category: string

    /**
     * @type {number}
     * @description Cooldown long setting for private chat / group chat
     * @example cooldown: 10 // 10s
     */
    cooldown?: number

    /**
     * @type {string}
     * @description Description of the command
     * @example description: "Cmd for handsome people"
     */
    description?: string

    /**
     * @type {boolean}
     * @description
     * @example
     */
    groupOnly?: boolean

    /**
     * @type {boolean}
     * @description
     * @example
     */
    isBotAdmin?: boolean

    /**
     * @type {boolean}
     * @description
     * @example
     */
    premiumOnly?: boolean

    /**
     * @type {boolean}
     * @description
     * @example
     */
    privateOnly?: boolean

    /**
     * @type {boolean}
     * @description Make it can only be used by the admin bot / owner bot
     * @example isAdminBot: true // (true/false)
     */
    isAdminBot?: boolean

    /**
     * @type {boolean}
     * @description Make it can only be used by the owner
     * @example ownerOnly: true // (true/false)
     */
    ownerOnly?: boolean

    /**
     * @type {boolean}
     * @description Making commands in nsfw mode (>16 only)
     * @example nsfw: true // (true/false)
     */
    nsfw?: boolean

    /**
     * @type {boolean}
     * @description Create a group admin who can use the command
     * @example adminGroup: true // (true/false)
     */
    adminGroup?: boolean

    /**
     * @type {boolean}
     * @description Making commands in maintenance mode, only owner can use
     * @example maintenance: true
     */
    maintenance?: boolean

    /**
     * @type {number}
     * @description To reduce the limit when the command is successful, right
     * @example consume: 10 // 10 limit
     */
    consume?: number

    /**
     * @type {string}
     * @description To write how to use
     * @example use: ">listhelp asupan"
     */
    use?: string

    /**
     * @type {CommandObject}
     * @description Fill it with the features you want
     * @example callback: async ({ msg }) => {
     *      msg.reply('Yo')
     *      }
     */
    callback?: (obj: CommandObject) => any
}

export interface CommandObject {
    client: WASocket
    message: WAMessage
    command: string
    prefix: string
    args: string[]
    msg: MessageSerialize
    User: IUserModel
    Group: IGroupModel
    shortMessage: IMessage
}
