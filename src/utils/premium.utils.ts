import { findUser } from './user.utils'
import toMs from 'ms'
import fs from 'fs'

// JSON
const p: Array<{ id: string; e: number; l: number; c: string }> = require('../data/p.json')

const limitMap = {
    classis: 30,
    silver: 75,
    gold: 250,
    platinum: 999,
}

// classis|silver|gold|platinum
export const addPremium = async (id, expire, type) =>
    new Promise(async (resolve, reject) => {
        if (!id) return reject(`Additional/sender ID`)
        if (!type || typeof type !== 'string') {
            return reject(`Additional/sender ID (string)`)
        }

        let d = await findUser(id)
        if (d === null) reject(`Invalid id/sender`)
        d['premium'] = true
        d['expire'] = d['expire'] ? d['expire'] + toMs(expire) : Date.now() + toMs(expire)
        d['lReq'] = d['lReq'] + limitMap[type] || 200
        d['casta'] = type || 'silver'

        let fI = p.findIndex((e) => e.id === id)

        if (fI == -1) {
            let nP = {
                id: id,
                e: d['expire'],
                l: d['lReq'],
                c: d['casta'],
            }
            p.push(nP)
        } else {
            p[fI].e = d['expire']
            p[fI].l = d['lReq']
            p[fI].c = d['casta']
        }

        try {
            fs.writeFileSync('./src/data/p.json', JSON.stringify(p))
            await d.save()
            return resolve(`Successfully added to database`)
        } catch (error) {
            reject(error)
        }
    })

export const deletePremium = async (id) =>
    new Promise(async (resolve, reject) => {
        if (!id) return reject(`Additional/sender ID`)
        let data = await findUser(id)
        if (!data.premium) {
            p.splice(
                p.findIndex((e) => e.id == id),
                1
            )
            fs.writeFileSync('./src/data/p.json', JSON.stringify(p))
            return reject(`(${data.sender.split('@')[0]}) Not premium part`)
        }
        data['premium'] = false
        data['expire'] = null
        data['casta'] = 'classic'
        data['tReq'] = 30

        try {
            await data.save()
            p.splice(
                p.findIndex((e) => e.id === id),
                1
            )

            fs.writeFileSync('./src/data/p.json', JSON.stringify(p))
            return resolve(`Successful removal from premium section`)
        } catch (error) {
            return reject(error)
        }
    })
