import { useState, useEffect } from "react";

const useGymAPI = (correo) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [ usuario, cambiarUsuario ] = useState(false);
  const [productos , cambiarProductos ] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/gym/");
        console.log("contenido", response.headers.get("Content-Type"));

        if (!response.ok) {
          throw new Error("Error al obtener los datos");
        }
        const result = await response.json();
        
        result.push({ correo: "tomasito@gmail.com", rutina: [1,2,3] });

        setData(result);
        const usuarioExiste = result.some(user => user.correo === correo);
        cambiarUsuario(usuarioExiste);

        const usuarioEncontrado = result.find(user => user.correo === correo);

        if (usuarioEncontrado) {
          const tags = usuarioEncontrado.rutina;
          console.log("vegeta que carajo:", tags);
          if (tags.length > 0) {
            const productosResponse =  await fetch(`http://127.0.0.1:8000/ProductosPorTag?tag_ids=${tags.join(",")}`);
            const productoData = await productosResponse.json();
            console.log("supuestos datos?", productoData);
            cambiarProductos(productoData.productos);
          }
        } else {
          console.log("usuario no vinculado al gimnasio");
       }
      } catch (error) {
        setError(error.message);
        console.log(error.message)
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [correo]);

  //  if (loading) return { data: [], loading: true, error: null, usuario: false };
  // if (error) return { data: [], loading: false, error, usuario: false };

  return { productos, loading, error, usuario };
};

export default useGymAPI;
