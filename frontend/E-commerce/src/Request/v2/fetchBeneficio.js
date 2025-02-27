export const verificarBeneficio = async (email) => {
    try {
      const response = await fetch("http://127.0.0.1:8000/integracion1");
      if (!response.ok) throw new Error("Error al consultar integración");
      const data = await response.json();
  
      console.log(data); // Verificar los datos obtenidos
      return data.some(user => user.correo === email);
    } catch (error) {
      console.error("Error al verificar beneficio:", error);
      return false;
    }
  };
  