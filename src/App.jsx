import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import StocksOverview from './pages/StocksOverview'
import { AppContextProvider } from './AppContext'


function App() {


  return (

    <AppContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<StocksOverview />}>

          </Route>
        </Routes>
      </BrowserRouter>
    </AppContextProvider>
  )
}

export default App
