/* eslint-disable no-unused-vars */
import { useState } from 'react'
import { Routing } from './router/Routing'
import './App.css'

function App() {

  return (
    <div className='layout'>

      {/* Cargando toda la configuración de rutas */}
      <Routing />
      
    </div>
  )
}

export default App
