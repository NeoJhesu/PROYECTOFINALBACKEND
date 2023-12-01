import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

const Detail = () => {
  const navigate = useNavigate();
  const { pid } = useParams();
  const [productDetail, setProductDetail] = useState(null);
  const [isEditModeActive, setIsEditModeActive] = useState(false);
  const [stockValue, setStockValue] = useState();
  const [cantidad, setCantidad] = useState(1);
  const updateProduct = () => {
    Swal.fire(
     '',
     'El producto se Actualizo con exito!',
     'success'
   )}
   const deleteProduct = () => {
    Swal.fire(
     '',
     'Produto elimindado!',
     'success'
   )}




  useEffect(() => {
    fetch(`http://localhost:3040/api/product/${pid}`)
      .then((res) => res.json())
      .then((result) => {
        setProductDetail(result.product);
      });
  }, []);

  const handleDeleteProduct = () => {
    fetch(`http://localhost:3040/api/product/${pid}`, { method: 'DELETE' })
      .then((res) => res.json())
      .then((data) => {
        if (data.ok) {
          navigate('/'); 
          deleteProduct();
        } else {
          alert('No se pudo eliminar el producto, intente más tarde');
        }
      });
    };
    
    const handleActiveEditMode = () => {
      setIsEditModeActive(true);
      setStockValue(productDetail.stock);
    };

  const handleConfirmNewStock = () => {
    fetch(`http://localhost:3040/api/product/${pid}?stock=${stockValue}`, { method: 'PUT' })
      .then((res) => res.json())
      .then((result) => {
        if (result.ok) {
          setProductDetail(result.product);
          updateProduct();
          navigate(`/`);
        } else {
          alert(result.error);
        }
      });
  };

  const handleAddToCart = () => {
    const { nombre, imagen, precio, stock } = productDetail;

    if (cantidad > stock) {
        alert('La cantidad ingresada excede el stock disponible');
        return;
    }

    fetch('http://localhost:3040/addProductCart', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nombre, imagen, precio, cantidad }),
    })
    .then(response => response.json())
    .then(data => {
        if (data.mensaje === 'El producto fue agregado al carrito') {
            alert('Producto agregado al carrito');
        } else {
            alert(data.mensaje);
        }
    });
};

  return (
    <div>
      {productDetail ? (
        <div>
          <h2>{productDetail.nombre}</h2>
          {productDetail.imagen && <img src={`http://localhost:3040/img/${productDetail.imagen}`}  />}
          <h3>Precio: ${productDetail.precio}</h3>
          <span>
            Stock:
            {isEditModeActive ? (
              <input
                value={stockValue}
                onChange={(e) => {
                  setStockValue(e.target.value);
                }}
                type="number"
              />
            ) : (
              productDetail.stock
            )}
          </span>
          <p>{productDetail.descripcion}</p>
          <button onClick={handleDeleteProduct}>Eliminar</button>
          <br />
          <br />

          {isEditModeActive ? (
            <button onClick={handleConfirmNewStock} >Confirmar</button>
          ) : (
            <button onClick={handleActiveEditMode}>Modificar Stock</button>
          )}
<div>
  <button onClick={() => setCantidad(cantidad > 1 ? cantidad - 1 : 1)}>
    -
  </button>
  <span>{cantidad}</span>
  <button
    onClick={() => setCantidad(cantidad === productDetail.stock ? cantidad : cantidad + 1)}
  >
    +
  </button>
</div>

<button onClick={handleAddToCart}>Agregar al carrito</button>
          <br />
          <br />
        </div>
      ) : (
        <h2>Cargando...</h2>
      )}
      <Link to="/">VOLVER</Link>
    </div>
  );
};

export default Detail;