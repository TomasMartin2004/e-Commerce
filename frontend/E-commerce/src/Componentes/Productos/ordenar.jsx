import {useState} from 'react'
import { Menu, MenuItem, Button } from '@mui/material';

export default function Ordenar({setOrdenar, ordenar}) {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <>
      <Button 
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        sx={{ color: 'black', textTransform: 'none', mr: 2 }}
        >
        Ordenar por:
        {ordenar === 'asc' && ' Menor precio'}
        {ordenar === 'desc' && ' Mayor precio'}
        {ordenar === '' && ' Relevantes'}
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
        <MenuItem onClick={() => {handleClose(); setOrdenar('')}} sx={{ display: 'flex', alignItems: 'center' }}>
           Relevantes
        </MenuItem>
        <MenuItem onClick={() => {handleClose(); setOrdenar('asc')}} sx={{ display: 'flex', alignItems: 'center' }}>
           Menor precio
        </MenuItem>
        <MenuItem onClick={() => {handleClose(); setOrdenar('desc')}} sx={{ display: 'flex', alignItems: 'center' }}>
           Mayor precio
        </MenuItem>
      </Menu>
    </>
  )
}