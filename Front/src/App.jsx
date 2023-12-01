import React from 'react'
import './App.css'
import {BrowserRouter} from 'react-router-dom'  
import RouterPague from './RouterPague'

function App() {

  return (
    <div>
      <BrowserRouter>
      <RouterPague/>
      </BrowserRouter>
    </div>
  )
}

export default App
