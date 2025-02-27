import { Button, ButtonGroup } from '@mui/material'
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';

export default function Paginacion({ setPaginacion, paginacion, paginaSiguiente}) {
  return (
    <>
      <ButtonGroup
        sx={{
          m: 3, 
          '& .MuiButton-outlined': {
            borderColor: 'black',
            color: 'black',
            boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.2)',
          }
        }} 
      variant="outlined" aria-label="Basic button group">
        <Button 
        onClick={() => { 
          setPaginacion(paginacion - 1); 
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        disabled={paginacion <= 1}
        sx={{ textTransform: 'none', color: 'black' }}
        ><KeyboardArrowLeftIcon/> Anterior 
        </Button>

        <Button
        onClick={() => {window.scrollTo({ top: 0, behavior: 'smooth' });}} 
        sx={{color: 'black'}}>
          {paginacion}
        </Button>
        
        <Button 
        onClick={() => { 
          setPaginacion(paginacion + 1); 
          window.scrollTo({ top: 0, behavior: 'smooth' }); 
        }}
        sx={{ textTransform: 'none', color: 'black' }}
        disabled={paginaSiguiente === ""}
        >Siguiente <KeyboardArrowRightIcon/>
        </Button>
      </ButtonGroup>
    </>
  )
}
