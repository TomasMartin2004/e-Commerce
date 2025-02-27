import { useState } from "react";
const apiUrl = import.meta.env.VITE_BASE_URL;

export function usePostData() {
  const [errorPost, setErrorPost] = useState(null);
  const [loading, setLoading] = useState(false);

  const postData = async (url, data) => {
    const token = localStorage.getItem("token");
    setLoading(true);
  
    if (url) {
      console.log("post url:", apiUrl + url);
      console.log("post data", data);
      try {
        const response = await fetch(apiUrl + url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`,
          },
          body: JSON.stringify(data),
        });
  
        if (!response.ok) {
          // Aquí se lanza el error con la respuesta completa
          const errorData = await response.json();
          const error = new Error(errorData.message || "Error en la solicitud");
          error.response = errorData;  // Guardamos la respuesta completa en el error
          throw error;
        }
        return await response.json();
      } catch (error) {
        setErrorPost(error.message);
        console.error("error en la solicitud:", error);
        throw error;  // Lanzamos el error para que lo pueda manejar el componente
      } finally {
        setLoading(false);
      }
    }
  };
  return { postData, errorPost, loading };
}

export function usePostData2() {
  const [errorPost, setErrorPost] = useState(null);
  const [loading, setLoading] = useState(false);

  const postData = async (url, data) => {
    const token = localStorage.getItem("token");
    setLoading(true);

    if (url) {
      console.log("post url:", apiUrl + url);
      console.log("post data", data);
      try {
        const response = await fetch(apiUrl + url, {
          method: "POST",
          headers: {
            Authorization: `Token ${token}`,
          },
          body: data instanceof FormData ? data : JSON.stringify(data),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "Error en la solicitud");
        }
        return await response.json();
      } catch (error) {
        setErrorPost(error.message);
        console.error("error en la solicitud:", error);
        throw error;
      } finally {
        setLoading(false);
      }
    }
  };
  return { postData, errorPost, loading };
}