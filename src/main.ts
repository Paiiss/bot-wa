import { startConnection } from '@utils/connect.utils'
import { autonodecron } from '@utils/cron.utils'
import { mongodb } from '@utils/database/mongodb'
import { clearSession } from '@utils/helper.utils'

clearSession()
mongodb(process.env.MONGODB_URL)
startConnection().then(async (client) => {
    await autonodecron(client)
})
