const sqlite3 = require('sqlite3')

const createTable = () => {
    const db = new sqlite3.Database('./src/database/db.sqlite3')
    db.run(`CREATE TABLE IF NOT EXISTS address (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        cep TEXT UNIQUE, 
        logradouro TEXT, 
        complemento TEXT, 
        bairro TEXT, 
        localidade TEXT, 
        uf TEXT,
        ibge TEXT, 
        gia TEXT, 
        ddd TEXT, 
        siafi TEXT);`)
    db.close()
}

module.exports = createTable