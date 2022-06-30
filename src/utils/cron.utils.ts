import cron, { CronJob } from 'node-cron'
import { deletePremium } from '@utils/premium.utils'
import { resetAllLimit } from '@utils/user.utils'
import color from 'chalk'
import fs from 'fs'
import { WASocket } from '@adiwajshing/baileys'
import { leaveGroup } from '@utils/group.utils'
import { groupMongo } from '@schema'

// json
const p: Array<{ id: string; e: number; l: number; c: string }> = require('../data/p.json')
const g: Array<{ id: string; expired: number }> = require('../data/g.json')
const rendem = require('../data/rendem.json')
import { timezone } from '@config'

const rText = 'The rental/trial period has expired, if you want to extend please contact the owner (rent)'

export const autonodecron = async (client: WASocket) => {
    console.log(color.whiteBright('├'), color.keyword('aqua')('[  STATS  ]'), `Getting started with cron`)
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
                await leaveGroupCron(data.id, data.expired, client).catch((e) => console.log(`Can't leave the group ${data.id}`, e))
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
        { scheduled: true, timezone: timezone }
    )
    task1.start()

    const everyday = cron.schedule(
        '0 0 * * *',
        async () => {
            let allData: any = groupMongo.find() // Sorry I don't know what to do, any suggestions?
            resetAllLimit().catch(async (error) => {
                console.log(error)
                await client.sendMessage(process.env.gcid, { text: `Error reset limit!\n${error}` })
            })
            allData.forEach(async (data) => {
                await leaveGroupCron(data.id, data.expired, client)
            })
        },
        { scheduled: true, timezone: timezone }
    )
    everyday.start()
}

export async function leaveGroupCron(id: string, expired: number, client: WASocket) {
    if (Date.now() >= expired || expired === null) {
        await client
            .groupMetadata(id)
            .then(async (meta) => {
                let mentions = []
                for (let i of meta.participants) mentions.push(i.id)
                await client
                    .sendMessage(id, { text: rText, mentions })
                    .then(async () => {
                        await leaveGroup(id, client)
                    })
                    .catch(() => {
                        console.log(`Failed to send chat when you want to leave the group`)
                    })
            })
            .catch(async (e) => {
                console.log(`Failed to get group meta data when trying to leave the group`)
                return leaveGroup(id)
            })
    }
}
