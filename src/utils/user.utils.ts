import userSchema, { IUser } from '@schema/user.schema'
import chalk from 'chalk'
import moment from 'moment-timezone'
import { timezone } from 'config.json'

export const findUser = async (sender: string) => {
    if (!/@s.whatsapp.net/.test(sender)) throw 'Invalid id/sender'
    let data = await userSchema.findOne({ sender })
    if (!data) (data = await userSchema.create({ sender: sender })), console.log(chalk.whiteBright('├'), chalk.keyword('aqua')('[ NEW USER ]'), sender.split('@')[0], 'on', chalk.yellowBright(moment.tz(timezone).format('hh:mm:ss')))
    return data
}

// const getNeededXP = (level) => level * level * 100
// export const updateUser = async ({ client, sender, limit, xpToAdd, msg }) => {
//     try {
//         const result = await userSchema.findOneAndUpdate({ sender: sender }, { sender: sender, $inc: { exp: xpToAdd, tReq: +1, limit: +limit } }, { upsert: true, new: true })
//         let { exp, level } = result
//         const needed = getNeededXP(level)
//         if (exp >= needed) {
//             ++level
//             exp -= needed
//             await userSchema.updateOne({ sender: sender }, { level, exp })
//             msg.reply(`@${sender.split('@')[0]} Congratulations you leveled up 🥳, now level ${level}`)
//             // await client.sendMessage(sender, { text: `@${sender.split("@")[0]} Congratulations you leveled up 🥳, now level ${level}`, mentions: [sender] }, { quoted: msg });
//         }
//     } catch (e) {
//         console.log(e)
//     }
// }

export const blockUser = async (sender: string, is: boolean) => {
    try {
        let data = await userSchema.findOne({ sender })
        if (!data) data = await userSchema.create({ sender: sender })
        data['isBan'] = is
        data.save()
        return data
    } catch (e) {
        console.log(e)
    }
}

// 120363040151521538@​g.us

export const getAll = async () => {
    try {
        return userSchema.find()
    } catch (e) {
        console.log(e)
    }
}

export const resetAllLimit = async () => {
    try {
        return userSchema.updateMany({ limit: 0 })
    } catch (error) {
        console.log(error)
        return error
    }
}

export const reducemoney = async (id: string, total: number) =>
    new Promise(async (resolve, reject) => {
        let User = await findUser(id)
        if (User === null) return reject(`Invalid id/sender`)
        if (total === (0 || null)) return reject(`Server error: Number cannot be 0`)
        if (User.cash < total) return reject(`MONEY_LESS`)
        let data = await userSchema.findOneAndUpdate({ sender: User.sender }, { $inc: { cash: -total } })
        return resolve(data)
    })

export const editUser = async (id: string, edit: Object = null) => {
    if (!/@s.whatsapp.net/.test(id)) throw 'Invalid id/sender'
    if (edit == null) throw 'Enter what needs to be edited!'
    await userSchema.findOneAndUpdate({ sender: id }, { $set: edit }).catch((e) => {
        throw e
    })
}
