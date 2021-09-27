import dotenv from 'dotenv'
dotenv.config()
import DatabaseConfiguration from './config/db'
import serve from './config/server'

const port: string = process.env.PORT || '4000'
const url = <string>(
  process.env.DB_URL?.replace('<password>', <string>process.env.DB_PASSWORD)
)

if (typeof url != 'string') {
  console.log(`UNDEFIEND URL`)
  process.exit(1)
}

DatabaseConfiguration.getInstance().config(url)

serve(port)
