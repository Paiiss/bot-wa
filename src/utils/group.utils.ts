import { WASocket } from '@adiwajshing/baileys'
import { groupMongo } from '@schema'
import fs from 'fs'
import toMs from 'ms'
import { makeid } from './helper.utils'

const g: Array<{ id: string; expired: number }> = require('../data/g.json')
const rendem: Object = require('../data/rendem.json')

export const findGroup = async (id: string) => {
    let data = await groupMongo.findOne({ id: id })
    if (!data) data = await groupMongo.create({ id: id })
    return data
}

export const updateGroup = async (id: string, a = {}) =>
    new Promise(async (resolve, reject) => {
        let data = await groupMongo.findOne({ id })
        if (!data) return reject(`Group ID not found`)
        if (!a) reject(`Please enter the updated one`)
        data = await groupMongo.findOneAndUpdate({ id: data.id }, { $set: a })
        return resolve(data)
    })

export const deleteGroup = async (id: string) => {
    let data = await findGroup(id)
    let some = g.some((e) => e.id == id)
    if (some) {
        g.splice(
            g.findIndex((e) => e.id === id),
            1
        )
    }
    fs.writeFileSync('./src/data/g.json', JSON.stringify(g))

    return await groupMongo.findOneAndDelete({ id: data.id })
}

export const addRentGroup = async (id: string, time: string = '3d') =>
    new Promise(async (resolve, reject) => {
        if (!id) return reject(`Additional/sender ID`)
        let data = await findGroup(id)

        let ex = data.expired ? data.expired + toMs(time) : Date.now() + toMs(time)
        data = await groupMongo.findOneAndUpdate({ id: data.id }, { $set: { new: true, trial: true, expired: ex, leave: false } })
        let some = g.some((e) => e.id == id)
        if (some) {
            g.splice(
                g.findIndex((e) => e.id == id),
                1
            )
        }
        g.push({ id, expired: ex })

        try {
            fs.writeFileSync('./src/data/g.json', JSON.stringify(g))
            return resolve(ex)
        } catch (error) {
            reject(error)
        }
    })

export const deleteRent = async (id: string) =>
    new Promise(async (resolve, reject) => {
        if (!id) return reject(`Additional/sender ID`)
        let data = await findGroup(id)
        if (!data) return reject(`Group ID not found`)

        data = await groupMongo.findOneAndUpdate({ id: data.id }, { $set: { expired: null } })
        let some = g.some((e) => e.id == id)
        if (some) {
            g.splice(
                g.findIndex((e) => e.id == id),
                1
            )
            fs.writeFileSync('./src/data/g.json', JSON.stringify(g))
        }
        return data
    })

export const leaveGroup = async (id: string, client: WASocket = null) =>
    new Promise(async (resolve, reject) => {
        if (!id) return reject(`Additional/sender ID`)
        let data = await findGroup(id)
        if (!data) return reject(`Group ID not found`)
        if (
            client &&
            (await client.groupMetadata(id).catch(() => {
                return null
            }))
        )
            await client.groupLeave(id)
        await deleteRent(id)
        await groupMongo.findOneAndUpdate({ id: id }, { $set: { leave: true } })
    })

export const createRendemRent = async (buyer: string, duration: string) => {
    let str: string = makeid(18)
    rendem[str] = {
        duration: duration || '3d',
        expired: Date.now() + toMs('1d'),
        type: 'rent',
        buyer: buyer || '6285805609094@s.whatsapp.net',
    }
    fs.writeFileSync('./src/data/rendem.json', JSON.stringify(rendem))
    return str
}
