import { useFetch } from '../fetch';

const apiUrl = '/user/me/';

export const useFetchUser = (isAuthenticated) => {
  // Solo realiza la solicitud si estás autenticado
  const { data = {}, loading, error } = useFetch(isAuthenticated ? apiUrl : null); 

  const id = data?.id || '';
  const nombre = data?.nombre || '';
  const apellido = data?.apellido || '';
  const admin = data?.is_staff || false;
  const email = data?.email || '';
  const dni = data?.dni || '';

  return { id, nombre, apellido, admin, email, dni, loading, error };
};

