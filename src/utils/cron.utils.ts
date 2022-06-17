import cron, { CronJob } from 'node-cron'
import { deletePremium } from '@utils/premium.utils'
import { resetAllLimit } from './user.utils'
import color from 'chalk'
import fs from 'fs'
import { WASocket } from '@adiwajshing/baileys'
import { leaveGroup } from './group.utils'
import { groupMongo } from '@schema'

// json
const p: Array<{ id: string; e: number; l: number; c: string }> = require('../data/p.json')
const g: Array<IGroupModel> = require('../data/g.json')
const rendem = require('../data/rendem.json')

import { timezone } from '@config'
import { IGroupModel } from '@constants'

const rText = "The rental/trial period has expired, if you want to extend please contact the owner (rent) \n\n_Waiting for the owner's approval to leave the group_"

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

            // g.forEach(async (data) => {
            //     await leaveGroupCron(data, client).catch((e) => console.log(`Can't leave the group ${data.id}`, e))
            // })

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
            try {
                resetAllLimit()
            } catch (error) {
                console.log(error)
                await client.sendMessage(process.env.gcid, { text: `Error reset limit!\n${error}` })
            }

            let allData: any = groupMongo.find()

            allData.forEach(async (data) => {
                await leaveGroupCron(data, client)
            })
        },
        { scheduled: true, timezone: timezone }
    )
    everyday.start()
}

export async function leaveGroupCron(data: IGroupModel, client: WASocket) {
    await client
        .groupMetadata(data.id)
        .then(async (meta) => {
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
        })
        .catch((e) => console.log(e))
}
