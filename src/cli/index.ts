import chalk from 'chalk'

import { config } from '../config.js'
import { getSummaryByURL } from '../summerize-url.js'

if (config.URL === undefined) {
  throw new Error('URL is required when using CLI')
}

const summary = await getSummaryByURL(config.URL)

console.log(chalk.blue(summary))
