import { Box, Typography, Button } from '@mui/material';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import { useNavigate } from 'react-router-dom';

export default function CarritoVacio({drawerOpen, setDrawerOpen}) {
  const navigate = useNavigate();

  const handleClick = (titulo) => {
    navigate(`/productos?categoria=${titulo}`);
    setDrawerOpen(!drawerOpen);
  };
  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'center', mt:3}}>
        <ShoppingBasketIcon sx={{ fontSize: '4rem' }} /> {/* Tamaño del ícono */}
      </Box>
      <Typography
          sx={{ fontSize: '1rem', fontWeight: '1000', color: '#333', textAlign: 'center', mt: 2 }}>
          TU CARRITO ESTA VACIO
        </Typography>
        <Typography
          sx={{
            fontSize: '0.8rem',
            color: '#333',
            textAlign: 'center',
            mt: 2
          }}
        >
          Elige la opcion que estes buscando
        </Typography>
        <Button onClick={() => handleClick('Suplementos')} sx={{m:3, borderRadius:5, backgroundColor:'#00a1ed'}} variant="contained">Suplementos</Button>
        <Button onClick={() => handleClick('Gimnasio')} sx={{ml:3, mb:3, mr:3, borderRadius:5, backgroundColor:'#00a1ed'}} variant="contained">Gimnasio</Button>
        <Button onClick={() => handleClick('Kinesiologia')} sx={{ml:3, mr:3, borderRadius:5, backgroundColor:'#00a1ed'}} variant="contained">Kinesiologia</Button>
    </>
  )
}

