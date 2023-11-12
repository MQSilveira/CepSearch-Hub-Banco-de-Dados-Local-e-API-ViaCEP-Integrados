import React from 'react'

const CepForm = ({ cep, onCepChange, onSubmit }) => {
    return (
        <form onSubmit={onSubmit}>
            <input
                type="text"
                placeholder="Informe o CEP"
                value={cep}
                onChange={onCepChange}
            />
            <button className='consult' type='submit'>Consultar</button>
        </form>
    )
}

export default CepForm