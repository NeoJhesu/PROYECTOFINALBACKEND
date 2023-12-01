import React from 'react'
import { NavLink } from 'react-router-dom'

const ProductCard = ({product}) => {
  return (
    <div key={product._id}>
    <NavLink to={`/product/detail/${product._id}`}>
        {product.imagen && <img src={`http://localhost:3040/img/${product.imagen}`}  />}
        <h3>{product.nombre}</h3>
        <span>$ {product.precio}</span>
    </NavLink >
      </div>
  )
}

export default ProductCard