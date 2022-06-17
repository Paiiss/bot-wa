import { GroupMetadata, proto } from '@adiwajshing/baileys'

export interface MessageSerialize {
    id?: string
    type?: string
    typeCheck?: MessageType
    from?: string
    pushName?: string
    isSelf?: boolean
    myId: string
    isGroup?: boolean
    groupMetadata?: GroupMetadata
    sender?: string
    senderNumber?: string
    mentions?: string[]
    quoted?: MessageQuote
    body?: string
    messageTimestamp?: number | Long.Long
    reply?: (text: string, q?: boolean) => Promise<proto.WebMessageInfo>
    button?: (text: string, button?: proto.IHydratedTemplateButton[]) => Promise<proto.WebMessageInfo>
    error?: (text: string, q?: boolean) => Promise<proto.WebMessageInfo>
    react?: (text?: string) => Promise<proto.WebMessageInfo | any>
    download?: () => Promise<Buffer>
    createMessageCollector?: (options: MessageCollectorOptions) => MessageCollector
}

export interface MessageQuote {
    key?: { id: string; fromMe: boolean; remoteJid: string }
    message?: proto.IMessage
    download?: () => Promise<Buffer>
    delete?: () => Promise<proto.WebMessageInfo>
}

export interface MessageType {
    isImage?: boolean
    isVideo?: boolean
    isAudio?: boolean
    isSticker?: boolean
    isContact?: boolean
    isLocation?: boolean
    isQuoted?: boolean
    isQuotedImage?: boolean
    isQuotedVideo?: boolean
    isQuotedAudio?: boolean
    isQuotedSticker?: boolean
    isQuotedContact?: boolean
    isQuotedLocation?: boolean
}

export interface MessageCollectorOptions {
    filter: RegExp
    time?: number
    max?: number
}

export interface MessageCollector {
    on(event: 'collect', listener: (msg: MessageSerialize) => Awaited<void>): this
    on(event: 'end', listener: (reason: 'timeout' | 'limit') => Awaited<void>): this
}
