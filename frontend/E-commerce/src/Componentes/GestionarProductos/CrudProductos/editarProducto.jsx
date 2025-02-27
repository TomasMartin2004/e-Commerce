import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useFetch } from '../../../Request/fetch';
import { Box, Typography, Button, CircularProgress, Alert } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { usePutData } from '../../../Request/put';
import Formulario from './formulario';
import { useNavigate } from 'react-router-dom';
import { formato } from './formato';

export default function EditarProducto() {
  const { id } = useParams(); // Obtiene el ID del producto desde la URL
  const { data: producto, loading, error } = useFetch(`/productos/${id}/`);
  const navigate = useNavigate();

  const [editedProduct, setEditedProduct] = useState(null);
  console.log(editedProduct);
  useEffect(() => {
    if (producto) {
      setEditedProduct(producto); // Inicializar con los datos del producto
    }
  }, [producto]);


  const { putData, errorPut, loadingPut } = usePutData();
  const handleButtonClick = () => {
    putData(`/productos/${id}/`, formato(editedProduct))
      .then((data) => {
        navigate(`/admin/?editado=true`);
      })
  };

  const handleInputChange = (field, value) => {
    setEditedProduct((prev) => ({
      ...prev,
      [field]: value,
    }));
  };
  

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return <Typography color="error">Error al cargar el producto</Typography>;
  }

  return (
    <Box sx={{ mt: 2, p: 4, bgcolor:'#f9fafa', borderRadius:2 }}>
      <Typography
        variant="h1"
        sx={{ fontSize: '3rem', fontWeight: '600', color: '#333', textAlign: 'center', mb:3}}>
        Editar producto
      </Typography>
      {errorPut && <Alert sx={{mb:1,}} color="error">No se pudo guardar los cambios</Alert>}
      {editedProduct && (
        <Grid container spacing={4} justifyContent={'center'}>
          {/* Imagen del Producto */}
          <Grid xs={12}>
            <Box
              component="img"
              src={editedProduct.imagen_url || 'https://via.placeholder.com/150'}
              alt={editedProduct.nombre}
              sx={{
                width: '100%',
                maxWidth: 500,
                borderRadius: 2,
                boxShadow: 3,
                objectFit: 'cover',
              }}
            />
          </Grid>

          {/* Formulario */}
          <Grid xs={12} md={8}>
            <Box
              component="form"
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 3,
              }}
            >
              <Formulario editedProduct={editedProduct} setEditedProduct={setEditedProduct} handleInputChange={handleInputChange} />
              <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mt: 2 }}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleButtonClick}
                >
                  Guardar Cambios
                </Button>
                <Button
                  variant="contained"
                  color="error"
                  onClick={() => navigate(`/admin/`)}
                >
                  Cancelar
                </Button>
              </Box>
            </Box>
          </Grid>
        </Grid>
      )}
    </Box>
  );
}

