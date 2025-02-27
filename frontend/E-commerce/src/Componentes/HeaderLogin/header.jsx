import { Link } from 'react-router-dom';
import { AppBar, Box, Toolbar, Typography } from '@mui/material';
import './header.css';

export default function HeaderLogin() {
  return (
    <AppBar position="fixed" sx={{ backgroundColor: '#1C1C1C' }}>
      <Toolbar>
        <Link to="/" style={{ textDecoration: 'none' }}>
          <Typography variant="h6" sx={{ ml: 1 }}>
            <span id='nombre'>Power</span><span id='nombre2'>Fit</span>
          </Typography>
        </Link>
        <Box sx={{ flexGrow: 1 }} /> 
      </Toolbar>
    </AppBar>
  );
}
