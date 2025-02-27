const apiUrl = import.meta.env.VITE_BASE_URL;

export function fetchProductos(nombre=null, categoria=null, tags=null, precioMin=null, precioMax=null ,orden=null, pagina=null) {
  let uri = `/productos/?`
  const falsies = [null, undefined, '', '0', 0]
  const isNull = (value) => falsies.includes(value)

  
  if (!isNull(categoria)) uri += `&categoria=${categoria}`
  if (!isNull(nombre)) uri += `&nombre=${nombre}`
  if (!isNull(precioMin)) uri += `&precioMinimo=${precioMin}`
  if (!isNull(precioMax)) uri += `&precioMaximo=${precioMax}`
  if (!isNull(tags)) uri += `&tags=${tags}`
  if (!isNull(orden)) uri += `&orden=${orden}`
  if (!isNull(pagina)) uri += `&page=${pagina}`

  return fetch(`${apiUrl}${uri}`, {
    method: 'GET',
    headers: {
    'Content-Type': 'application/json',
    },
  });

}

import { useState } from 'react';
export function useFetchProductos() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async (nombre=null, categoria=null, tags=null, precioMin=null, precioMax=null ,orden=null, pagina=null) => {
    setLoading(true);
    try {
      const response = await fetchProductos(nombre, categoria, tags, precioMin, precioMax ,orden, pagina);
      const jsonData = await response.json();
      setData(jsonData);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, fetchData };
}