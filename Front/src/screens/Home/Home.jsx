import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import "./home.css"
import { Footer, NavBar, ProductCard } from '../../Componetes'


const Home = () => {
  const [buscar, setBuscar] = useState("")
  const [buscarElementos, setBuscarElementos] = useState([])
  const [products, setProducts] = useState([])
  useEffect(() => {
    fetch('http://localhost:3040/api/products',
      { method: 'GET' }
    )
      .then((res) => res.json())
      .then(result => {
        setProducts(result.products)
      })
  }, [])

  useEffect(() => {
    setBuscarElementos(products.filter(producto => producto.nombre.toLowerCase().includes(buscar.toLowerCase())));
  }, [buscar, products]);

  return (
    <div>
      <NavBar onSearch={setBuscar} />
      <div>
      <Link to={'/product/crearproducto'}>crearProducto</Link>
      </div>
      <div className='catalogo' >
          {
              buscarElementos.map(product => (
                <ProductCard product={product} key={product._id} />
              ))
          }
        </div>
      <Footer/>
    </div>
  )
}

export default Home