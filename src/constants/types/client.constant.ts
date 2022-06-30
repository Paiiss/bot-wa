import { PresenceData } from '@adiwajshing/baileys'

export interface IMessage {
    sticker: string
    stickerMeme: string
    util: {
        needImage: string
    }
    group: {
        noPerms: string
        botNoAdmin: string
        onlyGroup: string
        leave: string
        mentions: string
        antinsfw: string
    }
    promote: {
        succes: string
        error: string
        owner: string
        self: string
        bot: string
    }
    demote: {
        succes: string
        error: string
        owner: string
        self: string
        bot: string
    }
    kick: {
        succes: string
        error: string
        owner: string
        self: string
        bot: string
    }
    error: {
        failLeave: string
        failGetLink: string
        server: string
        nosong: string
    }
    mute: {
        isMute: string
        succes: string
        error: string
    }
    isBan: string
    isPrem: string
    privateOnly: string
    adminOnly: string
    devOnly: string
    maintenance: string
    register: {
        must: string
        setAge: string
        ageNumber: string
        needAge: string
        old: string
        young: string
        already: string
        success: string
        error: string
    }
    nsfw: string
    needlimit: string
    startMessage: string
    require: {
        link: string
        text: string
        text2: string
        find: string
    }
    wronglink: string
    join: {
        succes: string
        error: string
        alert: string
    }
    pay: {
        less: string
    }
    reply: string
    quiz: {
        already: string
        winner: string
        timeout: string
    }
}

export interface Ipresence {
    id: string
    presences: {
        [participant: string]: PresenceData
    }
}

export interface groupRent extends Array<{ id: string; expired: number }> {}
