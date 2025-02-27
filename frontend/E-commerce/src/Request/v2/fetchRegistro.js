export const fetchRegistro = async (email, password, nombre, apellido, dni, navigate) => {
  try {
    const response = await fetch('http://127.0.0.1:8000/user/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password, nombre, apellido, dni }), 
    });

    if (response.ok) {
      navigate('/login');
      return null; // No hay errores
    } else {
      const errorData = await response.json();
      if (errorData.email?.includes("user with this email already exists.")) {
        return "El correo electrónico ya está registrado.";
      }
      if (errorData.dni?.includes("user with this dni already exists.")) {
        return "El DNI ya está registrado.";
      }
      return `Error al realizar la solicitud: ${JSON.stringify(errorData)}`;
    }
  } catch (error) {
    console.error('Error de red:', error);
    return 'Error al realizar la solicitud';
  }
};
