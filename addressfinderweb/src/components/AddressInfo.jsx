import { useState } from "react"

const AddressInfo = ( data ) => {
    return (
        <div className='address-info'>
            <h2>Informações do endereço</h2>
            <p>CEP: {data.address.cep}</p>
            <p>Logradouro: {data.address.logradouro}</p>
            <p>Bairro: {data.address.bairro}</p>
            <p>Cidade: {data.address.localidade}</p>
            <p>Estado: {data.address.uf}</p>
        </div>
    )
}

const AddressList = ({ addressList }) => {
    const [orderKey , setOrderKey] = useState({})
    var keys = Object.keys(addressList[0]) || []
    keys = keys.filter((key) => key !== 'id');

    const handleOrder = (key) => {
        setOrderKey((prevKey) => {
            const order = prevKey[key] === 'asc' ? 'desc' : 'asc'
            return { [key]: order }
        }
    )}
    
    const getOrderedAddressList = () => {
        return addressList.sort((a, b) => {
            const key = Object.keys(orderKey).find((key) => orderKey[key])
            if (orderKey[key] === 'asc') {
                return a[key] > b[key] ? 1 : -1
            } else {
                return a[key] < b[key] ? 1 : -1
            }
        }
    )}

    return (
        <div className='address-list'>
            <table>
                <thead>
                    <tr>
                        {keys.map((key) => (
                            <th key={key} onClick={() => handleOrder(key)}>
                                {key.toLocaleUpperCase()}
                                {orderKey[key] && (
                                    <span>{orderKey[key] === 'asc' ? '▲' : '▼'}</span>
                                )}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {getOrderedAddressList().map((address) => (
                        <tr key={address.cep}>
                            {keys.map((key) => (
                                <td key={key}>{address[key]}</td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export { AddressInfo, AddressList}