import dotenv from 'dotenv'
dotenv.config()

import DatabaseConfiguration from './config/db'
import serve from './config/server'

//*Load variables from enviorment file
const port: string = process.env.PORT || '4000' //!REMOVE PORT FROM .env DURING DEPLOYMENT
const url = <string>(
  process.env.DB_URL?.replace('<password>', <string>process.env.DB_PASSWORD)
)

//*Check basic workings
if (typeof url != 'string') {
  console.log(`UNDEFIEND URL`)
  process.exit(1)
}

//*Open database and then start server
DatabaseConfiguration.getInstance()
  .config(url)
  .then(() => serve(port))
