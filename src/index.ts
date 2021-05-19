require('dotenv').config()
import express = require('express')
import path = require('path')

import { indexRoute } from './routes'

const app = express()

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))
app.use(express.json())

app.get('/', indexRoute)

const server = app.listen(process.env.PORT, () => {
  console.log(`import service listening on port ${process.env.PORT}`)

  process.on('SIGTERM', () => server.close())
})
