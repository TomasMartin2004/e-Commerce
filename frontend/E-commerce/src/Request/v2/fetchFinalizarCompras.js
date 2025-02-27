import { usePostData } from "../post";
import { verificarBeneficio } from "./fetchBeneficio"; 

export function useFinalizarCompras() {
  const { postData, errorPost, loading } = usePostData();

  const finalizarCompras = async (detalles, email) => {
    const tieneBeneficio = await verificarBeneficio(email);
    const endpoint = "/ventas/";
    const payload = {
      detalles,
      usuario: null,
      tiene_beneficio: tieneBeneficio
    };

    try {
      const response = await postData(endpoint, payload);
      return response; 
    } catch (error) {
      console.error("Error al finalizar compras:", error);
      throw error; 
    }
  };

  return { finalizarCompras, errorPost, loading };
}
