import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../Login/authContext';

export default function ProtectedRouteAuthenticated({ children }) {
  const { isAuthenticated, isLoading: authLoading } = useAuth();

  // Estado para asegurar que la autenticación está cargada
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Verifica si la autenticación ya no está cargando
    if (!authLoading) {
      setIsReady(true);
    }
  }, [authLoading]);

  if (authLoading || !isReady) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return children;
}
