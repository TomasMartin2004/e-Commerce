import React, { useState } from 'react';
import { fetchContraseña } from '../../../Request/v2/fetchContraseña'; 
import {
  TextField, InputAdornment, IconButton, Button, Container,
  Dialog, DialogActions, DialogContent, Typography, Box
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

export function ModalCambiarContraseña({ open, onClose }) {
  const [formData, setFormData] = useState({
    oldPassword: '',
    newPassword: '',
    repeatPassword: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({
    newPassword: '',
    repeatPassword: '',
  });
  const [successMessage, setSuccessMessage] = useState(''); 
  const [errorMessage, setErrorMessage] = useState(''); 

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => event.preventDefault();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setSuccessMessage(''); 
    setErrorMessage(''); 
  };

  const validatePasswords = () => {
    const { newPassword, repeatPassword } = formData;
    let valid = true;
    let newPasswordError = '';
    let repeatPasswordError = '';

    if (newPassword.length < 6) {
      newPasswordError = 'La nueva contraseña debe tener al menos 6 caracteres.';
      valid = false;
    }

    if (newPassword !== repeatPassword) {
      repeatPasswordError = 'Las contraseñas no coinciden.';
      valid = false;
    }

    setErrors({
      newPassword: newPasswordError,
      repeatPassword: repeatPasswordError,
    });

    return valid;
  };

  const handleSubmit = async () => {
    const { oldPassword, newPassword, repeatPassword } = formData;

    if (!validatePasswords()) {
      return;
    }

    const result = await fetchContraseña(oldPassword, newPassword, repeatPassword);

    if (result.error) {
      setErrorMessage(result.error); 
      setSuccessMessage(''); 
    } else {
      setSuccessMessage('Contraseña cambiada exitosamente'); 
      setErrorMessage(''); 
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogContent sx={{  padding: 3 }}>
        <Container maxWidth="sm">
          {/* Success and Error Messages */}
          {successMessage && (
            <Typography variant="h6" color="success.main" align="center" gutterBottom>
              {successMessage}
            </Typography>
          )}
          {errorMessage && ( 
            <Typography variant="h6" color="error.main" align="center" gutterBottom>
              {errorMessage}
            </Typography>
          )}
          <form>
            {/* Old Password Field */}
            <TextField
              fullWidth
              name="oldPassword"
              value={formData.oldPassword}
              onChange={handleChange}
              type={showPassword ? 'text' : 'password'}
              margin="normal"
              placeholder="Contraseña actual"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={{
                backgroundColor: '#fff',
                borderRadius: 2,
                boxShadow: 2,
                marginBottom: 2,
              }}
            />

            {/* New Password Field */}
            <TextField
              fullWidth
              name="newPassword"
              value={formData.newPassword}
              onChange={handleChange}
              type={showPassword ? 'text' : 'password'}
              margin="normal"
              error={!!errors.newPassword}
              helperText={errors.newPassword}
              placeholder="Contraseña nueva"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={{
                backgroundColor: '#fff',
                borderRadius: 2,
                boxShadow: 2,
                marginBottom: 2,
              }}
            />

            {/* Repeat New Password Field */}
            <TextField
              fullWidth
              name="repeatPassword"
              value={formData.repeatPassword}
              onChange={handleChange}
              type={showPassword ? 'text' : 'password'}
              margin="normal"
              error={!!errors.repeatPassword}
              helperText={errors.repeatPassword}
              placeholder="Repetir contraseña nueva"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={{
                backgroundColor: '#fff',
                borderRadius: 2,
                boxShadow: 2,
                marginBottom: 2,
              }}
            />
          </form>
        </Container>
      </DialogContent>
      <DialogActions sx={{ backgroundColor: '#005f87', padding: 2 }}> {/* Cambié el fondo celeste a un tono más oscuro */}
  <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
    <Button
      onClick={handleSubmit}
      variant="contained"
      sx={{
        backgroundColor: '#00a1ed',  // Mantén el color de botón de "Cambiar contraseña"
        color: '#fff',
        width: '48%',
        '&:hover': {
          backgroundColor: '#007bb5',
        },
        boxShadow: 2,  // Añadí una sombra para resaltar el botón
        borderRadius: 2,
      }}
    >
      Cambiar contraseña
    </Button>
    <Button
      onClick={onClose}
      variant="contained"
      sx={{
        backgroundColor: '#333',  // El color del botón "Cerrar" sigue siendo oscuro
        color: '#fff',
        width: '48%',
        '&:hover': {
          backgroundColor: '#555',
        },
        boxShadow: 2,  // Añadí una sombra para que resalte más
        borderRadius: 2,
      }}
    >
      Cerrar
    </Button>
  </Box>
</DialogActions>

    </Dialog>
  );
}
