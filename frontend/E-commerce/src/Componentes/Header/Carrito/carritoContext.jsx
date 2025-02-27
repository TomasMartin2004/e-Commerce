import { createContext, useState, useEffect } from 'react';

// Crear el contexto
export const CarritoContext = createContext();

// Proveedor del contexto
export const CarritoProvider = ({ children }) => {
  const [productosSeleccionados, setProductosSeleccionados] = useState(
    JSON.parse(localStorage.getItem('productosSeleccionados')) || []
  );

  // Función para agregar un producto al carrito
	const agregarProducto = (producto) => {
		setProductosSeleccionados((prev) => {
			const existe = prev.find((p) => p.id === producto.id);
			if(existe) {
				return prev.map((p) =>
					p.id === producto.id ? {...p, cantidad: p.cantidad + producto.cantidad } : p 
				);
			} else {
				return [...prev, producto];
			}
		});
  };

  // Función para eliminar un producto del carrito
  const eliminarProducto = (idProducto) => {
    setProductosSeleccionados((prev) => prev.filter((producto) => producto.id !== idProducto));
  };

  // Función para vaciar el carrito
  const vaciarCarrito = () => {
    setProductosSeleccionados([]); // Vacía el carrito
  };

  useEffect(() => {
    // Actualizar el localStorage con los productos actuales
    localStorage.setItem('productosSeleccionados', JSON.stringify(productosSeleccionados));
  }, [productosSeleccionados]);

	//actualizar cantidad desde productoDetalle
 const actualizarProductoEnCarrito = (productoId, nuevaCantidad ) => {
	 setProductosSeleccionados((prevProductos) => {
		 const nuevosProductos = prevProductos.map((p) => 
			p.id === productoId ? {...p, cantidad: nuevaCantidad } : p 
		 );
		 console.log("productos actualizados:", nuevosProductos);
		 return nuevosProductos;
	 })
 }

  return (
    <CarritoContext.Provider value={{ productosSeleccionados, agregarProducto, eliminarProducto, vaciarCarrito, actualizarProductoEnCarrito }}>
      {children}
    </CarritoContext.Provider>
  );
};
