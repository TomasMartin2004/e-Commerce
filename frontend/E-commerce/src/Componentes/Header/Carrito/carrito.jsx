import { Button, Drawer, Box, Typography, Divider, styled, Badge, useTheme, useMediaQuery } from '@mui/material';
import { useContext } from 'react';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import CloseIcon from '@mui/icons-material/Close';
import CarritoVacio from './carritoVacio';
import CarritoProductos from './carritoProductos';
import { useState } from 'react';
import { CarritoContext } from './carritoContext';

const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: '0 4px',
    backgroundColor: '#808080',
  },
}));

export default function Carrito() {
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down('sm'));
  const { productosSeleccionados, setProductosSeleccionados } = useContext(CarritoContext); // Consumir el contexto
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  return (
    <>
      <Button onClick={handleDrawerToggle} sx={{ backgroundColor: '#00a1ed', color: 'white', m: 1 }}>
        <StyledBadge badgeContent={productosSeleccionados.length > 0 ? productosSeleccionados.length : "0"} color="secondary">
          <ShoppingCartIcon />
        </StyledBadge>
        {isSmall? '' : <Box sx={{ pl: '18px' }}>Carrito</Box>}
      </Button>
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={handleDrawerToggle}
        width="100%"
      >
        <Box sx={{ 
          display: 'flex',
          justifyContent: 'space-between',
        }} role="presentation">
          <Typography
            variant="h1"
            sx={{ fontSize: '1.5rem', fontWeight: '600', color: '#333', m: 2}}>
            Tu carrito
          </Typography>
          <Button onClick={handleDrawerToggle} sx={{ m: 1, ml: 'auto' }}>
            <CloseIcon />
          </Button>
        </Box>
        <Divider sx={{
          minWidth:{xs:'100vw',sm:'50vw',md:'35vw'},
          }}/>
        {productosSeleccionados.length > 0 ? 
          <CarritoProductos productosSeleccionados={productosSeleccionados} setProductosSeleccionados={setProductosSeleccionados} />
          : 
          <CarritoVacio drawerOpen={drawerOpen} setDrawerOpen={setDrawerOpen}/>
        }
      </Drawer>
    </>
  );
}
