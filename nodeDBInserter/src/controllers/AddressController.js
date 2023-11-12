const AddressService = require('../services/AddressService')
const service = new AddressService()

class AddressController {

    async postAddress(req, res) { 

        try {
            const address = req.body
            await service.postAddress(address)

            res.status(201).json({ message: 'CEP inserido com sucesso!' })
            
        } catch (err) {
            if (err.message === 'CEP já existe no banco de dados!') {
                return res.status(409).json({ message: err.message })
            }
            return res.status(500).send({ message: err.message })
        }
    }

    async getAddress(req, res) {

        try {
            const cep = req.params.cep
            const address = await service.getAddress(cep) 

            if (address.cep.length === 8) {
                console.log('CEP encontrado!')
            }

            res.status(200).json(address)

        } catch (err) {
            if (err.message === 'CEP inválido!') {
                return res.status(400).json({ message: err.message }) 
                
            } else if (err.message === 'CEP não encontrado!') {
                return res.status(204).json({ message: err.message })
            }
            return res.status(500).send({ message: err.message })
        }
    }

    async getAllAddress(_, res) {

        try {
            const address = await service.getAllAddress()

            res.status(200).json(address)

        } catch (err) {
            if (err.message === 'Não há CEPs cadastrados!') {
                return res.status(204).json({ message: err.message })
            }

            return res.status(500).send({ message: err.message })
        }
    }
}

module.exports = AddressController