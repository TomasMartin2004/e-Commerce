import { Box } from '@mui/material'
import { CartaProducto }  from '../Card/card'

export default function ListaProductos({productos}) {
  return (
    <>
    <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 4, mt:2, width:'80%' }}>
      {productos?.results?.map((producto) => (
        <CartaProducto key={producto.id} producto={producto} />
      ))}
    </Box>
    </>
  )
}
