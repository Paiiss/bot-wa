import { startConnection } from '@utils/connect.utils'
import { autonodecron } from '@utils/cron.utils'
import { mongodb } from '@utils/database/mongodb'
import { clearSession } from '@utils/helper.utils'
import connect from './server'
import yargs from 'yargs/yargs'

global.opts = new Object(yargs(process.argv.slice(2)).exitProcess(false).parse())

clearSession()
mongodb(process.env.MONGODB_URL)

startConnection().then(async (client) => {
    if (global.opts['server']) connect(client)
    await autonodecron(client)
})
