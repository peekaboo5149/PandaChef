import dotenv from 'dotenv'
dotenv.config()
import serve from './config/server'

const port: string = process.env.PORT || '4000'

serve(port)
