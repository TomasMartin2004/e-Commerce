import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid2';
import { GoogleMap, LoadScriptNext, Marker } from '@react-google-maps/api';
import { useLocation } from 'react-router-dom';

const Footer = () => {
  const url = useLocation();

  // Estado para las coordenadas del mapa
  const [coordinates, setCoordinates] = useState({ lat: -34.603684, lng: -58.381559 }); // Coordenadas iniciales por defecto

  const containerStyle = {
    width: '90%',
    height: '200px',
    marginLeft: 'auto',
    marginTop: '20px',
    marginRight: 'auto',
  };

  useEffect(() => {
    const fetchCoordinates = async () => {
      const address = 'Avenida mitre 6064, Wilde, Argentina'; // Dirección predeterminada
      const apiKey = 'AIzaSyDSY2z4DrAMaUtFBEkM9_Mn_DtMAeW9X2A';
      const geocodingUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
        address
      )}&key=${apiKey}`;

      try {
        const response = await fetch(geocodingUrl);
        const data = await response.json();

        if (data.results && data.results.length > 0) {
          const { lat, lng } = data.results[0].geometry.location;
          setCoordinates({ lat, lng });
        } else {
          console.error('No se encontraron resultados para la dirección especificada.');
        }
      } catch (error) {
        console.error('Error al obtener las coordenadas:', error);
      }
    };

    fetchCoordinates();
  }, []);

  return (
    url.pathname !== '/admin' &&
    url.pathname !== '/crear-producto' &&
    !url.pathname.startsWith('/editar-producto/') && (
      <Box sx={{ width: '100%', bgcolor:'primary.main', color: 'white', mb: 0,
        display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap',
        minWidth: '95vw'
       }}>
        <Grid container spacing={4} justifyContent={'center'} >
          <Grid width={'100%'} minWidth={'300px'} margin={'auto'}>
            <LoadScriptNext googleMapsApiKey="AIzaSyDSY2z4DrAMaUtFBEkM9_Mn_DtMAeW9X2A">
              <GoogleMap mapContainerStyle={containerStyle} center={coordinates} zoom={15}>
                <Marker position={coordinates} />
              </GoogleMap>
            </LoadScriptNext>
          </Grid>
          <Grid sx={{ textAlign: 'left', pt: 3,
            display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'
          }}>
            <Typography variant="h5" sx={{ textAlign: 'left', pl: 0, ml: 0 }}>
              Ubicación
            </Typography>
            <Typography variant="body2">Avenida mitre 6064, Wilde</Typography>
          </Grid>
          <Grid>
            <Typography variant="h4" sx={{ mb: 1, pt: 3 }}>
              Contactanos
            </Typography>
            <Typography variant="body2">Tel: (123) 456-7890</Typography>
            <Typography variant="body2">Email: powerFit@gmail.com.ar</Typography>
          </Grid>
        </Grid>
        <Typography sx={{mt:1}} variant="body2">&copy; 2024 PowerFit. Todos los derechos reservados.</Typography>
        <Box sx={{ textAlign: 'center', marginTop: 2 }}></Box>
      </Box>
    )
  );
};

export default Footer;
