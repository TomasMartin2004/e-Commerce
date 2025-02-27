import { Dialog, Typography, DialogActions, DialogContent, Button, Box } from '@mui/material/';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { usePutData } from '../../../Request/put';

export default function CambiarEstadoVenta({ open, onClose, seleccionado, setEstadoModal, setEstado, url, nuevoEstado }) {
  const { putData } = usePutData();

  const handleCambioEstado = async (id) => {
    try {
      await putData(`${url}${id}/`, { estado: nuevoEstado });
      setEstadoModal(nuevoEstado);
      setEstado(nuevoEstado);
  
      // Si la venta se cancela, restaurar stock
      if (nuevoEstado === "Cancelada") {
        await putData(`${url}${id}/restaurar-stock/`, {}); // Asegúrate de que este endpoint exista en el backend
      }
  
      onClose();
    } catch (error) {
      console.error("Error al cambiar el estado:", error);
    }
  };

  return (
    <Dialog open={open} keepMounted aria-describedby="alert-dialog-slide-description">
      <DialogContent>
        <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center">
          <ErrorOutlineIcon color="warning" sx={{ fontSize: 100 }} />
          <Typography variant="h5" component="div" align="center" mt={2}>
            ¿Estás seguro de cambiar el estado de esta venta a {nuevoEstado}?
          </Typography>
          <Typography align="center" mt={1}>
            Esta acción no se puede deshacer.
          </Typography>
        </Box>
      </DialogContent>
      <DialogActions sx={{ justifyContent: 'center' }}>
        <Button variant="contained" onClick={() => handleCambioEstado(seleccionado)} color="primary">
          Confirmar
        </Button>
        <Button variant="contained" onClick={onClose}>Cancelar</Button>
      </DialogActions>
    </Dialog>
  );
}
