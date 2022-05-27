import { AnyWASocket, WAMessage } from '@adiwajshing/baileys'
import { MessageSerialize } from '@constants/message.constant'
import { downloadMedia } from './helper.utils'

export const serialize = async (msg: WAMessage, client: AnyWASocket): Promise<MessageSerialize> => {
    const m = {} as MessageSerialize
    if (msg.key) {
        m.id = msg.key.id
        m.isSelf = msg.key.fromMe
        m.from = msg.key.remoteJid
        m.isGroup = m.from.endsWith('@g.us')
        m.sender = m.isSelf
            ? client.type === 'legacy'
                ? client.state.legacy.user.id
                : client.user.id.split(':')[0] + '@s.whatsapp.net' || client.user.id
            : (msg.key.participant?.includes(':') ? msg.key.participant?.split(':')[0] + '@s.whatsapp.net' : msg.key.participant) || (msg.key.remoteJid?.includes(':') ? msg.key.remoteJid?.split(':')[0] + '@s.whatsapp.net' : msg.key.remoteJid)
        m.senderNumber = m.sender.split('@')[0]
    }
    m.type = Object.keys(msg.message).filter((msgType) => msgType !== 'messageContextInfo')[0]
    if (['ephemeralMessage', 'viewOnceMessage'].includes(m.type)) {
        msg.message = msg.message[m.type].message
        m.type = Object.keys(msg.message).filter((msgType) => msgType !== 'messageContextInfo')[0]
    }
    m.body = msg.message.conversation || msg.message[m.type].text || msg.message[m.type].caption
    m.mentions = msg.message[m.type].contextInfo ? msg.message[m.type].contextInfo.mentionedJid : []
    if (msg.message[m.type]?.contextInfo?.quotedMessage) {
        m.quoted = {}
        m.quoted.message = msg.message[m.type].contextInfo.quotedMessage
        m.quoted.key = {
            id: msg.message[m.type].contextInfo.stanzaId,
            fromMe: msg.message[m.type].contextInfo.participant === (client.type === 'legacy' ? client.state.legacy.user.id : client.user.id && client.user.id.split(':')[0] + '@s.whatsapp.net'),
            remoteJid: m.from,
        }
        m.quoted.delete = () => client.sendMessage(m.from, { delete: m.quoted.key })
        m.quoted.download = () => downloadMedia(m.quoted.message)
    } else {
        m.quoted = null
    }
    if (m.type) {
        m.typeCheck = {}
        m.typeCheck.isImage = m.type == 'imageMessage'
        m.typeCheck.isVideo = m.type == 'videoMessage'
        m.typeCheck.isAudio = m.type == 'audioMessage'
        m.typeCheck.isSticker = m.type == 'stickerMessage'
        m.typeCheck.isContact = m.type == 'contactMessage'
        m.typeCheck.isLocation = m.type == 'locationMessage'
        if (m.quoted) {
            const typeQuoted = Object.keys(m.quoted.message)[0]
            m.typeCheck.isQuotedImage = typeQuoted == 'imageMessage'
            m.typeCheck.isQuotedVideo = typeQuoted == 'videoMessage'
            m.typeCheck.isQuotedAudio = typeQuoted == 'audioMessage'
            m.typeCheck.isQuotedSticker = typeQuoted == 'stickerMessage'
            m.typeCheck.isQuotedContact = typeQuoted == 'contactMessage'
            m.typeCheck.isQuotedLocation = typeQuoted == 'locationMessage'
        }
    }
    m.groupMetadata = m.isGroup ? (client.type === 'md' ? await client.groupMetadata(m.from) : await client.groupMetadata(m.from, false)) : null
    m.reply = (text) => !m.isSelf && client.sendMessage(m.from, { text })
    m.download = () => downloadMedia(msg.message)
    return m
}
