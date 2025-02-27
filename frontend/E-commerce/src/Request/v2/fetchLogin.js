export const fetchLogin = async (username, password, login, navigate) => {
  try {
    const response = await fetch('http://127.0.0.1:8000/getToken/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    if (response.ok) {
      const data = await response.json();
      const token = data.token;
      login(token); 
      navigate('/'); 
    } else {
      return 'Error de autenticación';
    }
  } catch (error) {
    return 'Error al realizar la solicitud';
  }
};

  
  
  
  
  