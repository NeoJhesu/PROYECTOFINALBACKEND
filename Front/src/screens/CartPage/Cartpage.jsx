import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';

const Cartpage = () => {
    const [productos, setProductos] = useState([]);

useEffect(() => {
    fetch('http://localhost:3040/productCart')
        .then(response => response.json())
        .then(data => setProductos(data.productCart));
}, []);


const actualizarProducto = (pid, query, cantidad) => {
    fetch(`http://localhost:3040/productCart/${pid}?query=${query}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ cantidad }),
    })
    .then(response => response.json())
    .then(data => {
        if (data.mensaje.includes('fue actualizado')) {
            setProductos(productos.map(product => 
                product._id === pid ? data.product : product
            ));
        } else {
            alert(data.mensaje);
        }
    })
    .catch(error => {
        console.error('Error al actualizar el producto:', error);
    });
};


const eliminarProducto = (_id) => {
    fetch(`http://localhost:3040/productCart/${_id}`, {
        method: 'DELETE',
    })
    .then(response => response.json())
    .then(data => {
        if (data.mensaje.includes('fue eliminado')) {
            setProductos(productos.filter(product => product._id !== _id));
        } else {
            alert(data.mensaje);
        }
    });
};

const getTotal = () => {
    let total = 0;
    productos.forEach(product => { 
        total += product.precio * product.cantidad;
    });
    return total;
}
return (
    <div>
              {
         productos.map(product => (
           <div key={product._id}>

              {product.imagen && <img src={`http://localhost:3040/img/${product.imagen}`}  />}
              <h3>{product.nombre}</h3>
              <span> precio: ${product.precio}</span>
              <br/>
              <span>cantidad: {product.cantidad}</span>
              <br/>
              
              <button onClick={()=>{eliminarProducto(product._id)}}>Eliminar</button>
        <button onClick={() => actualizarProducto(product._id, 'del', Math.max(1, product.cantidad - 1))}>Quitar</button>
        <button onClick={() => actualizarProducto(product._id, 'add', product.cantidad + 1)}>Agregar</button>
            </div>
            
          ))
      }
      <p>Total: ${getTotal()}</p>
    </div>
);
};

export default Cartpage