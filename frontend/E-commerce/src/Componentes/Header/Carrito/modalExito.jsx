import React from 'react';
import { Modal, Box, Typography, Button } from '@mui/material';
import { useContext } from 'react';
import { CarritoContext } from './carritoContext';


export default function ModalExito({ open, handleClose, navigate }) {
  const { vaciarCarrito } = useContext(CarritoContext); // Usar correctamente el contexto

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          border: '2px solid #00a1ed',
          borderRadius: 2,
          boxShadow: 24,
          p: 4,
          textAlign: 'center',
        }}
      >
        <Typography id="modal-title" variant="h5" sx={{ fontWeight: 'bold', color: '#333', mb: 2 }}>
          ¡Compra Exitosa!
        </Typography>
        <Typography id="modal-description" sx={{ color: '#555', mb: 3 }}>
          Tu compra ha sido procesada correctamente. Pronto recibirás una confirmación por correo.
          <br />
          Recuerda que deberás retirar tu pedido en
          <br />
          Avenida Mitre 6064, Wilde.
        </Typography>

        <Button
        variant="contained"
         sx={{ backgroundColor: '#00a1ed', borderRadius: 5, width: '100%' }}
        onClick={() => {
         handleClose(); // Cierra el modal
         navigate('/'); // Redirige a la página principal
          vaciarCarrito(); // Vacía el carrito
        }}
        >
  Volver al inicio
</Button>
      </Box>
    </Modal>
  );
}
