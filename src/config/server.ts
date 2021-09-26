import express from 'express'
import morgan from 'morgan'

function serve(port: string) {
  const app = express()

  if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
  }

  app.use(express.json())
  app.use(express.urlencoded({ extended: false }))

  app.use('/api', (_, res) =>
    res.send('<h1>Bazzar api working fine working 🏇!!!!<h2>')
  )

  app.listen(Number(port), () =>
    console.log(`Server running on http://localhost:${port}`)
  )
}

export default serve
