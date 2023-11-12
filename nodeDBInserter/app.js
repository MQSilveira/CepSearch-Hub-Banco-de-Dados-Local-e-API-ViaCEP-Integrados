const express = require('express')
const router = require('./src/routers/AddressRouter')
const dataBase = './src/database/db.sqlite3'
const createTable = require('./src/database/db')
const fs = require('fs')
const cors = require('cors')

const app = express()
const port = 3001

// Verifica se o banco de dados existe, se não existir, cria o banco de dados
if (!fs.existsSync(dataBase)) {
    createTable()
  }

app.use(express.json())
app.use(cors())
app.use('/', router)

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
    }
)