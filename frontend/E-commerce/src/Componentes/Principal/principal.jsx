import banner from '../../assets/banner.jpg';
import entrenamiento from '../../assets/entrenamiento.webp';
import Grid from '@mui/material/Grid2';
import { CartaCategoria } from '../Card/card';
import suplementos from '../../assets/suplementos-gym.jpg';
import gimnasio from '../../assets/gimnasio.jpeg';
import kinesiologia from '../../assets/kinesiologia.jpg';
import CheckIcon from '@mui/icons-material/Check';
import { Typography, Divider, Box, List, ListItem, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import CarruselDestacados from './destacados.jsx';
import './principal.css';
import Stack from '@mui/material/Stack';

export default function Principal() {

  return (
	  <Stack>

      <Box><img 
        src={banner} 
        alt="Banner" 
        style={{width:"100%",height:"110%", objectFit: 'cover' }} 
      /></Box>

      <Divider sx={{ width: '70%', m: 3, mb:6 }} />

    <CarruselDestacados />

	  <Divider sx={{ width: '80%', my: 5 }} />

          <Grid>
            <DescubreNuestrosProductos />
          </Grid>
    <Divider sx={{ width: '70%', m: 5 }} />

      <Typography
        variant="h1"
        sx={{ fontSize: '3rem', fontWeight: '600', color: '#333', textAlign: 'center' }}>
        Categorias
      </Typography>

      <Grid sx={{display:'flex', justifyContent:'center',gap:3,flexWrap:'wrap'}}>
          <CartaCategoria suplementos={suplementos} titulo="Suplementos" />
          <CartaCategoria suplementos={kinesiologia} titulo="Kinesiologia" />
          <CartaCategoria suplementos={gimnasio} titulo="Gimnasio" />
      </Grid>
	  <Divider sx={{ width: '70%', m: 3 }} />
    </Stack>
  );
}

function DescubreNuestrosProductos() {
  const navigate = useNavigate();

  const handleSearchClick = () => {
    navigate('/productos?categoria=');
  };

  const lista = [
    'Suplementos de alta calidad para potenciar tu rendimiento.',
    'Productos específicos para cada objetivo: musculación, pérdida de peso y más.',
    'Accesorios de gimnasio para un entrenamiento efectivo en casa o en el gym.',
    'Sabores deliciosos en cada suplemento, ¡disfruta mientras te cuidas!',
    'Productos diseñados para ayudarte a construir hábitos saludables.',
  ];

  return (
    <Box
    padding={1}
    sx={{ 
      bgcolor: '#f5f5f5', borderRadius: '8px', height: '100%',
      display: 'flex', flexDirection: 'column', alignItems: 'center',
      backgroundImage: `url(${entrenamiento})`,
      backgroundRepeat: 'space',
      backgroundSize: 'cover',
    }}
  >
    <Typography
      variant="h3"
      gutterBottom
      sx={{ fontWeight: 'bold', color: '#eee', textAlign: 'left' }}>
      Descubre nuestros productos
    </Typography>
    <List>
      {lista.map((item, index) => (
        <ListItem key={index} sx={{ gap: 2, 
          fontSize: '1.5rem', bgcolor:'#eeea',borderRadius:3,my:3}}>
          <CheckIcon sx={{color:'#00a1ed'}}/> {item}
        </ListItem>
      ))}
      <Button 
        variant="contained"
        size='large'
        onClick={handleSearchClick}
        >
        Comprar ahora
      </Button>
    </List>
  </Box>
  );
}
