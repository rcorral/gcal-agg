import bodyParser = require('body-parser')
import express = require('express')

const app = express()

app.use(bodyParser.urlencoded({ extended: false }))

/********************
 *      SERVER      *
 ********************/

app.listen(process.env.PORT, () => {
  console.log(`Express listening on port ${process.env.PORT}`)
})
