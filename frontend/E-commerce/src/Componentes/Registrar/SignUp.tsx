import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import CssBaseline from '@mui/material/CssBaseline';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { fetchRegistro } from '../../Request/v2/fetchRegistro';
import fondologin from '../../assets/fondologin.jpg';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import { Link } from 'react-router-dom';

const theme = createTheme({
  palette: {
    primary: {
      main: '#0092d6',
    },
    background: {
      default: '#f4f4f4',
    },
  },
});

const SignInContainer = styled(Stack)(({ theme }) => ({
  border: '1px solid black',
  borderRadius: '16px',
  width: '100%',
  maxWidth: '550px',
  padding: theme.spacing(6),
  background: '#fff9',
  minHeight: '520px',
  maxHeight: '765px',
  '&::before': {
    backgroundImage: `url(${fondologin})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat',
    backgroundAttachment: 'fixed',
    content: '""',
    display: 'block',
    position: 'absolute',
    zIndex: -1,
    inset: 0,
  },
  // Media query para pantallas más grandes (PC)
  [theme.breakpoints.up('sm')]: {
    marginTop: '65px', // Solo para pantallas más grandes
  },
}));


export default function SignUp(props: { disableCustomTheme?: boolean }) {
  const navigate = useNavigate();
  const [emailError, setEmailError] = React.useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = React.useState('');
  const [passwordError, setPasswordError] = React.useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = React.useState('');
  const [repeatPasswordError, setRepeatPasswordError] = React.useState(false);
  const [repeatPasswordErrorMessage, setRepeatPasswordErrorMessage] = React.useState('');
  const [dniError, setDniError] = React.useState(false);
  const [dniErrorMessage, setDniErrorMessage] = React.useState('');
  const [errorMessage, setErrorMessage] = React.useState('');
  const [showPassword, setShowPassword] = React.useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((prev) => !prev);
  const handleClickShowRepeatPassword = () => setShowRepeatPassword((prev) => !prev);

  const validateInputs = () => {
    const email = document.getElementById('email') as HTMLInputElement;
    const password = document.getElementById('password') as HTMLInputElement;
    const repeatPassword = document.getElementById('rpassword') as HTMLInputElement;
    const nombre = document.getElementById('name') as HTMLInputElement;
    const apellido = document.getElementById('surname') as HTMLInputElement;
    const dni = document.getElementById('dni') as HTMLInputElement;

    let isValid = true;

    // Validación del email
    if (!email.value || !/\S+@\S+\.\S+/.test(email.value)) {
      setEmailError(true);
      setEmailErrorMessage('Por favor ingrese un e-mail válido.');
      isValid = false;
    } else {
      setEmailError(false);
      setEmailErrorMessage('');
    }

    // Validación de la contraseña
    if (!password.value || password.value.length < 6) {
      setPasswordError(true);
      setPasswordErrorMessage('La contraseña debe tener al menos 6 caracteres.');
      isValid = false;
    } else {
      setPasswordError(false);
      setPasswordErrorMessage('');
    }

    // Validación de la repetición de la contraseña
    if (repeatPassword.value !== password.value) {
      setRepeatPasswordError(true);
      setRepeatPasswordErrorMessage('Las contraseñas no coinciden.');
      isValid = false;
    } else {
      setRepeatPasswordError(false);
      setRepeatPasswordErrorMessage('');
    }

    // Validación del nombre
    if (!nombre.value || nombre.value.length > 50) {
      isValid = false;
    }

    // Validación del apellido
    if (!apellido.value || apellido.value.length > 50) {
      isValid = false;
    }

    // Validación del DNI (longitud y formato numérico)
    if (!dni.value || dni.value.length !== 8) {
      setDniError(true);
      setDniErrorMessage('El DNI debe tener 8 caracteres.');
      isValid = false;
    } else {
      setDniError(false);
      setDniErrorMessage('');
    }

    return isValid;
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  
    if (validateInputs()) {
      const email = (document.getElementById('email') as HTMLInputElement).value;
      const password = (document.getElementById('password') as HTMLInputElement).value;
      const nombre = (document.getElementById('name') as HTMLInputElement).value;
      const apellido = (document.getElementById('surname') as HTMLInputElement).value;
      const dni = (document.getElementById('dni') as HTMLInputElement).value;
  
      try {
        // Enviar los datos al servidor
        const result = await fetchRegistro(email, password, nombre, apellido, dni, navigate);
        
        if (typeof result === 'string') {
          setErrorMessage(result); // Mostrar mensaje de error
        }
      } catch (error) {
        // Manejar errores de red u otros errores no esperados
        if ((error as Error).message.includes("Failed to fetch")) {
          setErrorMessage("Error al realizar la solicitud. Verifique su conexión.");
        } else {
          setErrorMessage("Ocurrió un error inesperado.");
        }
      }
    }
  };
  
  
  
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline enableColorScheme />
      <SignInContainer direction="column" justifyContent="space-between">
        <Typography  variant="h4" sx={{ width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)' }}>
          Registrarse
        </Typography>
        {errorMessage && (
          <Typography color="error" variant="body1" >
            {errorMessage}
          </Typography>
        )}
        <Box
          component="form"
          noValidate
          onSubmit={handleSubmit}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
          }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <Typography htmlFor="email" sx={{ textAlign: 'left' }}>Email</Typography>
                <TextField
                  error={emailError}
                  helperText={emailErrorMessage}
                  id="email"
                  type="email"
                  name="email"
                  placeholder="your@email.com"
                  autoComplete="email"
                  autoFocus
                  required
                  variant="outlined"
                  color={emailError ? 'error' : 'primary'}
                  InputProps={{
                    style: { backgroundColor: 'black', color: 'white' },
                  }}
                />
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <Typography htmlFor="dni" sx={{ textAlign: 'left' }}>DNI</Typography>
                <TextField
                  error={dniError}
                  helperText={dniErrorMessage}
                  id="dni"
                  placeholder="12345678"
                  type="number"
                  required
                  variant="outlined"
                  color={dniError ? 'error' : 'primary'}
                  inputProps={{ maxLength: 8 }}
                  InputProps={{
                    style: { backgroundColor: 'black', color: 'white' },
                  }}
                />
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <Typography htmlFor="name" sx={{ textAlign: 'left' }}>Nombre</Typography>
                <TextField
                  error={false}
                  id="name"
                  placeholder="nombre"
                  required
                  variant="outlined"
                  color="primary"
                  inputProps={{ maxLength: 50 }}
                  InputProps={{
                    style: { backgroundColor: 'black', color: 'white' },
                  }}
                />
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <Typography htmlFor="surname" sx={{ textAlign: 'left' }}>Apellido</Typography>
                <TextField
                  error={false}
                  id="surname"
                  placeholder="apellido"
                  required
                  variant="outlined"
                  color="primary"
                  inputProps={{ maxLength: 50 }}
                  InputProps={{
                    style: { backgroundColor: 'black', color: 'white' },
                  }}
                />
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <Typography htmlFor="password" sx={{ textAlign: 'left' }}>Contraseña</Typography>
                <TextField
                  error={passwordError}
                  helperText={passwordErrorMessage}
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  required
                  variant="outlined"
                  color={passwordError ? 'error' : 'primary'}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={handleClickShowPassword} sx={{ color: 'grey' }}>
                          {showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    ),
                    style: { backgroundColor: 'black', color: 'white' },
                  }}
                />
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <Typography htmlFor="rpassword" sx={{ textAlign: 'left'}}>Repetir Contraseña</Typography>
                <TextField
                  error={repeatPasswordError}
                  helperText={repeatPasswordErrorMessage}
                  id="rpassword"
                  type={showRepeatPassword ? 'text' : 'password'}
                  name="rpassword"
                  required
                  variant="outlined"
                  color={repeatPasswordError ? 'error' : 'primary'}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={handleClickShowRepeatPassword} sx={{ color: 'grey' }}>
                          {showRepeatPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    ),
                    style: { backgroundColor: 'black', color: 'white' },
                  }}
                />
              </FormControl>
            </Grid>
          </Grid>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{
              marginTop: 3,
              marginBottom: 2,
            }}
          >
            Registrarse
          </Button>

          <Grid container justifyContent="center">
            <Grid item>
              <Typography variant="body2" color="textSecondary">
                ¿Ya tienes una cuenta?{' '}
                <Link to="/login" style={{ color: '#0092d6'}}>
                  Iniciar sesión
                </Link>
              </Typography>
            </Grid>
          </Grid>
        </Box>
      </SignInContainer>
    </ThemeProvider>
  );
}
