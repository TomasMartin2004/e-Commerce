import { useFetchDataOnDemand } from '../fetch';

const apiUrl = '/miscompras/';  // Endpoint para obtener las compras del usuario

export const useFetchCompras = (isAuthenticated, page) => {
  const { data = { results: [], next, previous }, loading, error, fetchData } = useFetchDataOnDemand(apiUrl + `?page=${page}`);

  const compras = isAuthenticated && Array.isArray(data.results) ? data.results : [];
  const paginaSiguiente = data.next;

  return { compras, loading, error, paginaSiguiente, fetchData };
};

