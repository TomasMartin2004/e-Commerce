import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './header.css';
import { Link } from 'react-router-dom';
import Cuenta from './cuenta';
import Carrito from './Carrito/carrito';
import { AppBar, Box, Toolbar, Typography, Autocomplete, TextField, InputAdornment, Divider, IconButton, CircularProgress } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useFetchSearch } from '../../Request/fetch';
import { useTheme } from '@mui/material/styles';
import { useMediaQuery } from '@mui/material';

export default function Header() {
  const theme = useTheme();
  const isMedium = useMediaQuery(theme.breakpoints.down('md'));


  return (
    <>
      <AppBar position="fixed" sx={{ backgroundColor: '#1C1C1C' }}>
        <Toolbar>
          <Link to="/" style={{ textDecoration: 'none' }}>
            <Typography variant="h6" sx={{ ml: 1 }}>
              <span id='nombre'>Power</span><span id='nombre2'>Fit</span>
            </Typography>
          </Link>

          <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center' }}>
            {!isMedium && <BuscadorProductos/>}
          </Box>

          <Box>
            <Cuenta />
            <Carrito />
          </Box>

        </Toolbar>

        {isMedium && <Toolbar>
          <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center' }}>
            <BuscadorProductos/>
          </Box>
        </Toolbar>}
      </AppBar>
    </>
  );
}

function BuscadorProductos() {
  const navigate = useNavigate();
  const [valorBuscador, setValorBuscador] = useState('');

  const handleSearch = () => {
    if (valorBuscador.trim() !== '') {
      navigate(`/productos?nombre=${valorBuscador}`);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <TextField
    value={valorBuscador}
    onChange={(e) => setValorBuscador(e.target.value)}
    onKeyDown={handleKeyDown}
    placeholder="Buscar..."
    variant="outlined"
    InputProps={{
      endAdornment: (
        <InputAdornment position="end">
          <Divider orientation="vertical" flexItem sx={{ height: 30 }} />
          <IconButton onClick={handleSearch}>
            <SearchIcon />
          </IconButton>
        </InputAdornment>
      ),
    }}
    sx={{
      '& .MuiInputBase-root': {
        paddingTop: '3px',
        paddingBottom: '3px',
        paddingLeft: '1',
        paddingRight: '0px !important',
      },
      width: '60%',
      backgroundColor: 'white',
      borderRadius: '5px',
      '& .MuiOutlinedInput-root': {
        height: 45,
      },
    }}

  />
  
  );
}

