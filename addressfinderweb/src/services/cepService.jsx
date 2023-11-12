import axios from 'axios'

export const getCep = async (cep) => {
    try {
        // Resolvi efetuar a busca do CEP diretamente no banco de dados local
        // para não ter problemas com a API externa

        const localResponse = await axios.get(`http://127.0.0.1:3001/api/address/${cep}`)
        
        // Caso não encontre o CEP no banco de dados local, busca na API externa
        // e salva no banco de dados local
        if (localResponse.status === 204) { 
            const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`)

            if (response.data.erro) {
                return response.data
            }

            await axios.post('http://127.0.0.1:3001/api/address', response.data)
            return response.data   
        }

        return localResponse.data

    } catch (err) {
        console.log(err)
        throw new Error('CEP não encontrado')
    }
}

export const getAllAddress = async () => {
    try {
        const response = await axios.get('http://localhost:3001/api/address')
        return response.data
    }
    catch (err) {
        console.log(err)
        throw new Error('Erro ao carregar lista de endereços')
    }
}


