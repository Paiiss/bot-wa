import { startConnection } from '@utils/connect.utils'
import { autonodecron } from '@utils/cron.utils'
import { mongodb } from '@utils/database/mongodb'

mongodb(process.env.MONGODB_URL)
startConnection('md').then(async (client) => {
    await autonodecron(client)
})
