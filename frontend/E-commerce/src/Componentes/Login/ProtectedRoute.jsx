import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../Login/authContext';
import { useFetchUser } from '../../Request/v2/fetchUser';
import { CircularProgress, Box } from '@mui/material';

export default function ProtectedRoute({ children }) {
  const { isAuthenticated, isLoading: authLoading } = useAuth();
  const { nombre, apellido, admin, email, dni, loading: userLoading, error } = useFetchUser(isAuthenticated);

  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (!authLoading && !userLoading) {
      setIsReady(true);
    }
  }, [authLoading, userLoading]);

  if (authLoading || userLoading || !isReady) {
    // Muestra una rueda de carga mientras los datos están cargando
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error || !isAuthenticated) {
    // Si el usuario no está autenticado, rediriges
    console.log(error);
    return <Navigate to="/" replace />;
  }

  if (!admin) {
    // Si el usuario no es admin, rediriges
    return <Navigate to="/" replace />;
  }

  // Si todo está bien, renderizas el componente
  return children;
}
