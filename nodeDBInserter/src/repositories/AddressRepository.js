const sqlite3 = require('sqlite3')
const dataBase = './src/database/db.sqlite3'

class AddressRepository {
    async postAddress(address) {
        const db = new sqlite3.Database(dataBase)

        try {
            await new Promise((resolve, reject) => {
                db.run(
                    `INSERT INTO address (cep, logradouro, complemento, bairro, localidade, uf, ibge, gia, ddd, siafi)
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
                    ON CONFLICT(cep) DO NOTHING`,   // Não insere se o CEP já existir
                    [
                        address.cep,
                        address.logradouro,
                        address.complemento,
                        address.bairro,
                        address.localidade,
                        address.uf,
                        address.ibge,
                        address.gia,
                        address.ddd,
                        address.siafi
                    ],
                    function (err) {
                        db.close()

                        // Se o CEP já existir, o método run() retorna 0
                        if (this.changes === 0) {
                            reject({
                                status: 409,
                                message: 'CEP já existe no banco de dados!'
                            })                        
                        } else {
                            resolve()
                        }
                    }
                )
            })
        } catch (err) {
            throw new Error(err.message)
        }
    }

    async getAddress(cep) {
        const db = new sqlite3.Database(dataBase)

        return new Promise((resolve, reject) => {
            db.get(
                `SELECT cep, logradouro, complemento, bairro, localidade, uf, ibge, gia, ddd, siafi
                FROM address
                WHERE cep = ?`,
                [cep],
                (err, row) => {
                    db.close()

                    if (row) {
                        resolve(row)
                    } else {
                        reject({
                            status: 404,
                            message: 'CEP não encontrado!'
                        })
                    }
                }
            )
        })
    }

    async getAllAddress() {
        const db = new sqlite3.Database(dataBase)

        return new Promise((resolve, reject) => {
            db.all(
                `SELECT *
                FROM address`,
                (err, rows) => {
                    db.close()


                    if (rows && rows.length > 0) {
                        resolve(rows)
                    } else {
                        reject({
                            status: 404,
                            message: 'Não há CEPs cadastrados!'
                        })
                    }
                }
            )
        })
    }

}

module.exports = AddressRepository