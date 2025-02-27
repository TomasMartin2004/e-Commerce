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
import fondologin from '../../assets/fondologin.jpg';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { fetchLogin } from '../../Request/v2/fetchLogin'; 
import { useAuth } from './authContext.jsx'; 



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
  maxWidth: '450px',
  padding: theme.spacing(6),
  marginTop: '70px',
  background: '#fff9',
  minHeight: '450px',
  '&::before': {
    backgroundImage: `url(${fondologin})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat',
    backgroundAttachment: 'fixed',
    content: '""',
    display: 'block',
    position: 'absolute',
    zIndex: -1,
    inset: 0,
  },
}));

export default function Login() {
  const { login } = useAuth(); 
  const navigate = useNavigate();
  const [emailError, setEmailError] = React.useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = React.useState('');
  const [passwordError, setPasswordError] = React.useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = React.useState('');
  const [authError, setAuthError] = React.useState(''); 

  const validateInputs = () => {
    const email = document.getElementById('email') as HTMLInputElement;
    const password = document.getElementById('password') as HTMLInputElement;

    let isValid = true;

    
    if (!email.value || !/\S+@\S+\.\S+/.test(email.value)) {
      setEmailError(true);
      setEmailErrorMessage('Por favor ingrese un e-mail válido.');
      isValid = false;
    } else {
      setEmailError(false);
      setEmailErrorMessage('');
    }

    
    if (!password.value || password.value.length < 6) {
      setPasswordError(true);
      setPasswordErrorMessage('La contraseña debe tener al menos 6 caracteres.');
      isValid = false;
    } else {
      setPasswordError(false);
      setPasswordErrorMessage('');
    }

    return isValid;
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (validateInputs()) {
      const email = (document.getElementById('email') as HTMLInputElement).value;
      const password = (document.getElementById('password') as HTMLInputElement).value;

      try {
        const result = await fetchLogin(email, password, login, navigate);
        if (result) {
          setAuthError(result); 
        } else {
          setAuthError(''); 
        }
      } catch (error) {
        setAuthError('Error al realizar la solicitud. Por favor, intente nuevamente.');
      }
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline enableColorScheme />
      <SignInContainer direction="column" justifyContent="space-between">
        <Typography
          component="h1"
          variant="h4"
          sx={{ 
            width: '100%', 
            fontSize: 'clamp(2rem, 10vw, 2.15rem)', 
            marginBottom: 3 
          }}
        >
          Iniciar sesión
        </Typography>

        <Box
          component="form"
          noValidate
          onSubmit={handleSubmit}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            gap: 2,
          }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <Typography htmlFor="email" sx={{ textAlign: 'left' }}> Email</Typography>
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

            <Grid item xs={12}>
              <FormControl fullWidth>
                <Typography htmlFor="password" sx={{ textAlign: 'left' }}> Contraseña</Typography>
                <TextField
                  error={passwordError}
                  helperText={passwordErrorMessage}
                  name="password"
                  placeholder="••••••"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  required
                  variant="outlined"
                  color={passwordError ? 'error' : 'primary'}
                  InputProps={{
                    style: { backgroundColor: 'black', color: 'white' },
                  }}
                />
              </FormControl>
            </Grid>
          </Grid>

          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Recordarme"
          />

          {authError && (
            <Typography
              variant="body2"
              color="error"
              sx={{ textAlign: 'center', marginBottom: 2 }}
            >
              {authError}
            </Typography>
          )}

          <Stack direction="column" alignItems="center" justifyContent="center" spacing={2}>
            <Button
              variant="contained"
              type="submit"
              sx={{
                backgroundColor: '#1a72b8',
                width: '100%',
                maxWidth: '200px',
                textAlign: 'center',
              }}
            >
              Iniciar sesión
            </Button>
            
            <Typography
              variant="body2"
              color="primary"
              sx={{ cursor: 'pointer', textAlign: 'center' }}
              onClick={() => navigate('/registrar')}
            >
              ¿No tienes cuenta? Regístrate
            </Typography>
          </Stack>
        </Box>
      </SignInContainer>
    </ThemeProvider>
  );
}
