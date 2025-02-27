import React from 'react';
import { Modal, Box, Typography, Button, List, ListItem, ListItemText } from '@mui/material';

const ModalErrorStock = ({ open, handleClose, productosSinStock }) => {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-error-stock-title"
      aria-describedby="modal-error-stock-description"
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          border: '2px solid #000',
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
        }}
      >
        <Typography id="modal-error-stock-title" variant="h6" component="h2" gutterBottom>
          Error
        </Typography>
        <Typography
          id="modal-error-stock-description"
          sx={{
            mb: 2,
            textAlign: 'center', 
          }}
        >
          Los siguientes productos no tienen stock para satisfacer su compra:
        </Typography>
        <List>
          {productosSinStock.map((producto, index) => (
            <ListItem key={index}>
              <ListItemText primary={producto} />
            </ListItem>
          ))}
        </List>
        <Button
          onClick={handleClose}
          variant="contained"
          sx={{
            mt: 2,
            backgroundColor: '#d32f2f',
            '&:hover': { backgroundColor: '#b71c1c' },
          }}
        >
          Cerrar
        </Button>
      </Box>
    </Modal>
  );
};

export default ModalErrorStock;
