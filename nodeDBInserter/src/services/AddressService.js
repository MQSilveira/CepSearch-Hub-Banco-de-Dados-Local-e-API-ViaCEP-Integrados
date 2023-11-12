const AddressRepository = require('../repositories/AddressRepository')
const repository = new AddressRepository()

class AddressService {

    async postAddress(address) { 
        
        // Apenas números
        address.cep = address.cep.replace(/\D/g, '') 

        // Verifica se o CEP possui 8 dígitos
        if (address.cep.length !== 8) {
            throw new Error('CEP inválido!')            
        
        }else {
            return await repository.postAddress(address)
        }
    }

    async getAddress(cep) {

        cep = cep.replace(/\D/g, '') 

        if (cep.length !== 8) {
            throw new Error('CEP inválido!') 
        
        } else {
            const address = await repository.getAddress(cep)
            address.cep = `${address.cep.slice(0, 5)}-${address.cep.slice(5)}`
            return address
        }
    }

    async getAllAddress() {
        const address = await repository.getAllAddress()
        address.forEach(address => {
            address.cep = `${address.cep.slice(0, 5)}-${address.cep.slice(5)}`
        })

        return address
    }
}

module.exports = AddressService