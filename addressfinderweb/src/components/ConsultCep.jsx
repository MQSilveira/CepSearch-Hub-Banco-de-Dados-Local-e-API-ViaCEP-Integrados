import React, {  useState } from 'react'
import { getCep, getAllAddress } from '../services/cepService'
import { AddressInfo, AddressList } from './AddressInfo'
import CepForm from './CepForm'
import AddressIcon from '../images/address_icon.png'
import './ConsultCep.css'

const ConsultCep = () => {
    const [cep, setCep] = useState('')
    const [address, setAddress] = useState({})
    const [status, setStatus] = useState(false)
    const [errorText, setErrorText] = useState('')
    const [showList, setShowList] = useState(false)
    const [addressList, setAddressList] = useState([])
    

    const handleCep = async (e) => {
        e.preventDefault()

        const cleanCep = cep.replace('-', '').trim()
        const cepRegex = /^[0-9]{8}$/g

        if (!cepRegex.test(cleanCep)) {
            setStatus(false)
            setAddress({})
            setErrorText('CEP inválido.\nVerifique o CEP e tente novamente.')
            return
        }

        try {
            const response = await getCep(cleanCep)

            if (response.erro) {
                setStatus(false)
                setAddress({})
                setErrorText('CEP não encontrado.\nVerifique o CEP e tente novamente.')

            } else {
                setAddress(response)
                setStatus(true)
                setErrorText('')
            }

        } catch (err) {
            setStatus(false)
            setAddress({})
            setErrorText(err.message)
        }
    }

    const handleShowList = async () => {
        if (showList) {
            setShowList(false)
            console.log(showList)
        
        } else {
            try {         
                const response = await getAllAddress()

                if (response.length === 0) {
                    setStatus(false)
                    setAddress({})
                    setErrorText('Nenhum endereço consultado.')
                    return
                } 

                setAddressList(response)
                setShowList(true)
                setErrorText('')
    
            } catch (err) {
                setStatus(false)
                setAddress({})
                setErrorText(err.message)
            }
        }
    }

    return (
        <div className='container'>
            <div className='map-container'>
                <img src={ AddressIcon } alt='Address Icon' />
            </div>
            <div className='form-container'>
                <h1>Consultar CEP</h1>
                <CepForm
                    cep={cep}
                    onCepChange={(e) => setCep(e.target.value)}
                    onSubmit={handleCep}
                />
                {status && <AddressInfo address={address} />}
                <button onClick={handleShowList}>
                    {showList ? 'Ocultar lista de endereços' : 'Exibir endereços consultados'}
                </button>                
                {errorText && (
                    <div className='error-message'>
                        <p>{errorText}</p>
                    </div>
                )}
                
            </div>
            <div className='list-container'>
                { showList &&
                    <AddressList 
                        showList={showList} 
                        handleHideList={() => 
                            setShowList(false)} 
                        addressList={addressList} 
                    />
                }
            </div>
        </div>
    )
}

export default ConsultCep