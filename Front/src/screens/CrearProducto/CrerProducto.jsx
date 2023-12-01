import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const CrearProducto = () => {
    const navigate = useNavigate();
    const [nombre, setNombre] = useState("");
    const [precio, setPrecio] = useState("");
    const [stock, setStock] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [imagen, setImagen] = useState("");
    const [img, setImg] = useState(null);

    const handleCrear = async (event) => {
        event.preventDefault();

        const formData = new FormData();
        formData.append('nombre', nombre);
        formData.append('precio', precio);
        formData.append('stock', stock);
        formData.append('descripcion', descripcion);
        formData.append('imagen', imagen);
        formData.append('img', img);

        const carga = await fetch(`http://localhost:3040/api/products`, {
            method: 'POST',
            body: formData
        });

        const data = await carga.json();
        console.log(data);

        navigate('/');
        Swal.fire(
         '',
         'Creado con exito!',
         'success'
       )
    };

    return (
        <>
            <form onSubmit={handleCrear} encType="multipart/form-data">
                <div>
                    Crear Producto
                    <div>
                        <label htmlFor="nombre">Nombre</label>
                        <input onChange={(e) => { setNombre(e.target.value) }} type="text" />

                        <label htmlFor="precio">Precio</label>
                        <input onChange={(e) => {if (e.target.value < 0) {e.target.value = 0} setPrecio(e.target.value)}} type="number" />
                        <label htmlFor="stock">Stock</label>
                        <input onChange={(e) => {if (e.target.value < 1) {e.target.value = 1} setStock(e.target.value)}} type="number" />

                        <label htmlFor="imagen">Cargar imagen</label>
                        <input onChange={(e) => { setImagen(e.target.value) }} type="text" placeholder='El nombre deve ser igual al de la imagen'/>

                        <label htmlFor="img">Cargar imagen</label>
                        <input onChange={(e) => { setImg(e.target.files[0]) }} type="file" accept="image/*" />

                        <label htmlFor="descripcion">Descripcion</label>
                        <textarea onChange={(e) => { setDescripcion(e.target.value) }} name="descripcion" id="" cols="30" rows="10"></textarea>
                    </div>
                    <input type="submit" value="Crear Producto" />
                </div>
            </form>
            <Link to="/">VOLVER</Link>
        </>
    );
};

export default CrearProducto;
