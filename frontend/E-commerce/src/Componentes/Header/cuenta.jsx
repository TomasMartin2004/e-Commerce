import { useState } from 'react';
import AccountCircle from '@mui/icons-material/AccountCircle';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import PersonIcon from '@mui/icons-material/Person';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import { Menu, MenuItem, Button, useTheme, useMediaQuery } from '@mui/material';
import { Link } from 'react-router-dom';
import { useAuth } from '../Login/authContext';
import { ModalCambiarContraseña } from './Modal/modalCambiarContraseña';
import { useFetchUser } from '../../Request/v2/fetchUser';

export default function Cuenta() {
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down('sm'));
  
  const [openModal, setOpenModal] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const { isAuthenticated, logout } = useAuth();

  // Llamamos directamente a useFetchUser
  const { nombre, apellido, admin, loading, error } = useFetchUser(isAuthenticated);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logout(); 
    handleClose();
  };

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  return (
    <>
      <Button 
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        sx={{ color: '#00a1ed' }}
      >
        <AccountCircle />
        {isSmall ? '' : 'Mi cuenta'}
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        {isAuthenticated && (
          <MenuItem onClick={handleClose} sx={{ display: 'flex', alignItems: 'center' }}>
            <Link to="/compras" style={{ textDecoration: 'none', color: 'inherit' }}>
              <ShoppingBasketIcon sx={{ marginRight: 1 }} /> Mis compras
            </Link>
          </MenuItem>
        )}
        {isAuthenticated && (
          <MenuItem onClick={handleOpenModal} sx={{ display: 'flex', alignItems: 'center' }}>
            <LockOpenIcon sx={{ marginRight: 1 }} /> Cambiar Contraseña
          </MenuItem>
        )}
        {!loading && admin && isAuthenticated && (
          <MenuItem onClick={handleClose} sx={{ display: 'flex', alignItems: 'center' }}>
            <Link to="/admin" style={{ textDecoration: 'none', color: 'inherit' }}>
              <AdminPanelSettingsIcon sx={{ marginRight: 1 }} /> Panel Administrativo
            </Link>
          </MenuItem>
        )}
        {isAuthenticated ? (
          <MenuItem onClick={handleLogout} sx={{ display: 'flex', alignItems: 'center' }}>
            <ExitToAppIcon sx={{ marginRight: 1 }} /> Cerrar Sesión
          </MenuItem>
        ) : (
          <MenuItem onClick={handleClose} sx={{ display: 'flex', alignItems: 'center' }}>
            <Link to="/login" style={{ textDecoration: 'none', color: 'inherit' }}>
              <PersonIcon sx={{ marginRight: 1 }} /> Iniciar Sesión
            </Link>
          </MenuItem>
        )}
      </Menu>

      {/* Modal para cambiar la contraseña */}
      <ModalCambiarContraseña open={openModal} onClose={handleCloseModal} />
    </>
  );
}
