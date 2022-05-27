import { GroupMetadata, proto } from '@adiwajshing/baileys'

export interface MessageSerialize {
    id?: string
    type?: string
    typeCheck?: MessageType
    from?: string
    isSelf?: boolean
    isGroup?: boolean
    groupMetadata?: GroupMetadata
    sender?: string
    senderNumber?: string
    mentions?: string[]
    quoted?: MessageQuote
    body?: string
    reply?: (text: string) => Promise<proto.WebMessageInfo>
    download?: () => Promise<Buffer>
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
