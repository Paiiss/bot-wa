import userSchema from '@schema/user.schema'
import { data } from 'cheerio/lib/api/attributes'
import cron, { CronJob } from 'node-cron'
import { deletePremium } from '@utils/premium.utils'
import { getAll, resetAllLimit } from './user.utils'
import color from 'chalk'
import moment from 'moment-timezone'
import fs from 'fs'
import { AnyWASocket } from '@adiwajshing/baileys'
import { deleteRent, leaveGroup } from './group.utils'
import { sleep } from './helper.utils'
import groupSchema, { IGroup } from '@schema/group.schema'

interface Ig {
    id: string
    expired: number
}
// json
const p: Array<{ id: string; e: number; l: number; c: string }> = require('../data/p.json')
const g: Array<Ig> = require('../data/g.json')
const rendem = require('../data/rendem.json')

const rText = "The rental/trial period has expired, if you want to extend please contact the owner (rent) \n\n_Waiting for the owner's approval to leave the group_"

export const autonodecron = async (client: AnyWASocket) => {
    console.log(color.whiteBright('├'), color.keyword('aqua')('[  STAT  ]'), `Getting started with cron`)
    const task1: CronJob = cron.schedule(
        '*/1 * * * *',
        async () => {
            p.forEach(async (e) => {
                if (Date.now() >= e.e) {
                    try {
                        await deletePremium(e.id)
                    } catch (error) {
                        return console.log(error)
                    }
                    await client.sendMessage(e.id, { text: `Your premium period has expired, please extend it again!` })
                }
            })

            g.forEach(async (data) => {
                await leaveGroupCron(data, client)
            })

            let obj = Object.keys(rendem)
            let ev
            obj.forEach(async (v) => {
                ev = rendem[v]
                if (Date.now() >= ev.expired) {
                    console.log('Delete ', rendem[v])
                    delete rendem[v]
                    fs.writeFileSync('./src/data/rendem.json', JSON.stringify(rendem))
                }
            })
        },
        { scheduled: true, timezone: 'Asia/Jakarta' }
    )
    task1.start()

    const everyday = cron.schedule(
        '0 0 * * *',
        async () => {
            try {
                resetAllLimit()
            } catch (error) {
                console.log(error)
                client.sendMessage(process.env.gcid, { text: `Error reset limit!\n${error}` })
            }

            let allData: any = groupSchema.find()

            allData.forEach(async (data) => {
                await leaveGroupCron(data, client)
            })
        },
        { scheduled: true, timezone: 'Asia/Jakarta' }
    )
    everyday.start()
}

export async function leaveGroupCron(data: Ig, client: AnyWASocket) {
    if (client.type == 'legacy') return
    const meta = (await client.groupMetadata(data.id)) ? await client.groupMetadata(data.id) : null

    let s = []
    for (let i of meta.participants) {
        s.push(i.id)
    }

    if (Date.now() >= data.expired || data.expired === null) {
        try {
            await client.sendMessage(data.id, { text: rText, mentions: s })
            await leaveGroup(data.id, client)
        } catch (error) {
            console.log(error)
        }
    }
}
