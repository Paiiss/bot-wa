import { startConnection } from '@utils/connect.utils'
import { mongodb } from '@utils/database/mongodb'

mongodb(process.env.MONGODB_URL)
startConnection('md')
