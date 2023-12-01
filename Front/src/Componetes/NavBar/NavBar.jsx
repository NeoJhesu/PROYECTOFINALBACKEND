import React, { useState } from 'react'
import "./navbar.css"
import { NavLink } from 'react-router-dom'


const NavBar = ({onSearch}) => {
  const [buscar, setBuscar] = useState("")
  return (
    <>
      <div className='navbar'>
        <div className='info'>
        <NavLink to={"/"} >Home</NavLink>
          <h4>Your brand</h4>
        </div>
        <input type="text" className='Buscador ocultar' placeholder='   Search Goods...' value={buscar} onChange={(evento) => { setBuscar(evento.target.value); onSearch(evento.target.value) }} />

        <div className='info' >
          <NavLink to={"/login"} >Login</NavLink>
          <NavLink to={'/Registro'}>Registro</NavLink>
          <NavLink to={"/CartPage"} >Carrito</NavLink>
        </div>
      </div>
    </>
  )
}

export default NavBar