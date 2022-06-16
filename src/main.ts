import { startConnection } from '@utils/connect.utils'
import { autonodecron } from '@utils/cron.utils'
import { mongodb } from '@utils/database/mongodb'
import { clearSession } from '@utils/helper.utils'
import connect from './server'

clearSession()
mongodb(process.env.MONGODB_URL)

startConnection().then(async (client) => {
    if (global.opts['server']) connect()
    await autonodecron(client)
})
