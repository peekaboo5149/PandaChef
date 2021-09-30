import express, { Request, Response } from 'express'
import morgan from 'morgan'
import authRouter from '../auth/auth.routes'

const serve = (port: string): void => {
  if (typeof port === undefined) {
    console.error('undefined port')
    process.exit(1)
  }

  const app = express()

  //!logger
  if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
  }

  //!body parsers
  app.use(express.json())
  app.use(express.urlencoded({ extended: false }))

  //!routers
  app.use('/api/auth', authRouter)

  //!start sever
  app.listen(Number(port), () =>
    console.log(`Server running on http://localhost:${port}`)
  )
}

export default serve
