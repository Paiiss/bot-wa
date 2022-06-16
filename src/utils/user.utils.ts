import { userModel } from '@schema'
import chalk from 'chalk'
import moment from 'moment-timezone'
import { timezone } from '@config'

export const findUser = async (sender: string) => {
    if (!/@s.whatsapp.net/.test(sender)) throw 'Invalid id/sender'
    let data = await userModel.findOne({ sender })
    if (!data) (data = await userModel.create({ sender: sender })), console.log(chalk.whiteBright('├'), chalk.keyword('aqua')('[ NEW userModel ]'), sender.split('@')[0], 'on', chalk.yellowBright(moment.tz(timezone).format('hh:mm:ss')))
    return data
}

const getNeededXP = (level) => level * level * 100
export const expUpdate = async ({ msg, toAdd = { exp: +10, totalRequest: +1, limit: +1, dayRequest: +1 } }) => {
    let { sender, pushName } = msg
    if (!/@s.whatsapp.net/.test(sender)) throw 'Invalid id/sender'
    await userModel
        .findOneAndUpdate({ sender }, { $inc: { exp: toAdd.exp, totalRequest: toAdd.totalRequest, limit: toAdd.limit, dayRequest: toAdd.dayRequest } }, { upsert: true, new: true })
        .then(async (res) => {
            let { exp, level } = res
            const needed = getNeededXP(level)
            if (exp >= needed) {
                ++level, (exp -= needed)
                await userModel.findOneAndUpdate({ sender }, { level, exp })
                if (res.autolevelup) return msg.reply(`${sender.split('@')[0] || pushName} Congratulations you leveled up, now level ${level}`, true)
            }
        })
        .catch((e) => console.log(e))
}

export const blockuserModel = async (sender: string, is: boolean) => {
    let __data = await findUser(sender)
    __data['isBan'] = is
    await __data
        .save()
        .then((res) => {
            return res
        })
        .catch((e) => console.log(e))
}

export const getAll = async () => {
    return userModel.find()
}

export const resetAllLimit = async () => {
    await userModel
        .updateMany({ limit: 0, dayRequest: 0 })
        .then((res) => {
            return res
        })
        .catch((e) => console.log(e))
}

export const reducemoney = async (id: string, total: number) =>
    new Promise(async (resolve, reject) => {
        let __userModel = await findUser(id)
        if (__userModel === null) return reject(`Invalid id/sender`)
        if (total === (0 || null)) return reject(`Server error: Number cannot be 0`)
        if (__userModel.cash < total) return reject(`MONEY_LESS`)
        let data = await userModel.findOneAndUpdate({ sender: __userModel.sender }, { $inc: { cash: -total } })
        return resolve(data)
    })

export const editUser = async (id: string, edit: Object = null) => {
    if (!/@s.whatsapp.net/.test(id)) throw 'Invalid id/sender'
    if (edit == null) throw 'Enter what needs to be edited!'
    await userModel.findOneAndUpdate({ sender: id }, { $set: edit }).catch((e) => {
        throw e
    })
}
