import * as dotenv from 'dotenv'
import config from 'config.json'
dotenv.config()

export const groupId = process.env.GROUP_ID || config.groupId
export const lolhuman = process.env.LOLHUMAN_KEY || config.lolhuman
export const botname = process.env.BOT_NAME || config.botname
export const timezone = process.env.TIME_ZONE || config.timezone
export const footer = process.env.FOOTER || config.footer
export const link_group = process.env.LINK_GROUP || config.link_group
export const PREFIX = process.env.PREFIX || '!'
