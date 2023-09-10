import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import StocksOverview from './pages/StocksOverview'

function App() {


  return (


    <BrowserRouter>
      <Routes>
        <Route path='/' element={<StocksOverview />}>

        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
