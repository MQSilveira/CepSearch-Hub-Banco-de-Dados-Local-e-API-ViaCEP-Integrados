import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import ConsultCep from '../components/ConsultCep'

const AppRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<ConsultCep />} />
            </Routes>
        </BrowserRouter>
    )
}
export default AppRouter