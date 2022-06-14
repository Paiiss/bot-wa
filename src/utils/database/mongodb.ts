import chalk from 'chalk'
import mongoose from 'mongoose'

export async function mongodb(url: string) {
    mongoose
        .connect(url)
        .then(() => {
            console.log(chalk.whiteBright('├'), chalk.keyword('aqua')('[  STATS  ]'), `Connected to mongodb`)
        })
        .catch((e) => {
            console.log(chalk.whiteBright('├'), chalk.keyword('red')('[  STATS  ]'), `Error connecting mongodb, please make sure the url is correct!`)
            console.error(e)
        })
}
