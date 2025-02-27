import { IconButton, Alert,Paper, Table, TableBody, TableContainer, TableHead, Fab, TableRow, Box, FormControl, OutlinedInput, InputAdornment, Button } from '@mui/material'
import { StyledTableCell, StyledTableRow } from './styledTable'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useEffect, useState } from 'react';
import Paginacion from '../Productos/paginacion';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate, useLocation } from 'react-router-dom';
import EliminarProducto from './CrudProductos/eliminarProducto';
import { useMediaQuery } from '@mui/material';

export default function GestionarProductos({data, loading, error, searchData, paginacion, setPaginacion, parseData, valorBuscador, setValorBuscador}) {
  const [modalShow, setModalShow] = useState(false);
  const [estadoModal, setEstadoModal] = useState(false);
  const [estadoProducto, setEstadoProducto] = useState(false);
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    setValorBuscador('');
    navigate('/admin', { replace: true });
  }, []);

  useEffect(() => {
    console.log('valorBuscador', valorBuscador);
      searchData(valorBuscador);
      setEstadoModal(false);


  }, [valorBuscador, estadoModal, paginacion]);

  const location = useLocation();
  const [showAlertEdit, setShowAlertEdit] = useState(false);
  const [showAlertCreate, setShowAlertCreate] = useState(false);
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    if (queryParams.get('editado') === 'true') {
      setShowAlertEdit(true);
      setTimeout(() => {
        setShowAlertEdit(false);
      }, 5000);
    }
    if (queryParams.get('creado') === 'true') {
      setShowAlertCreate(true);
      setTimeout(() => {
        setShowAlertCreate(false);
      }
      , 5000);
    }
  }, [location.search]);

  const isMobile = useMediaQuery('(max-width:600px)');

  return (
    <Box sx={{mr:1, ml:1}}>
      {showAlertEdit && (
        <Alert sx={{ mb: 2 }} severity="warning">
          Producto editado correctamente
        </Alert>
      )}
      {showAlertCreate && (
        <Alert sx={{ mb: 2 }} severity="success">
          Producto creado correctamente
        </Alert>
      )}
      {estadoProducto === "Eliminado" && (
        <Alert sx={{ mb: 2 }} severity="error">
          Producto eliminado correctamente
        </Alert>
      )}
      
      <FormControl sx={{ mb:2, width:'100%' }} variant="outlined">
        <OutlinedInput
          endAdornment={<InputAdornment position="end"><SearchIcon/></InputAdornment>}
          placeholder="Buscar producto"
          value={valorBuscador}
          onChange={(e) => setValorBuscador(e.target.value)}
        />
      </FormControl>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <StyledTableRow>
              {['Nombre producto', 'Precio', 'Stock', 'Acción'].map((header, index) => (
                <StyledTableCell
                  key={index}
                  align="center"
                  sx={index === 0 ? { width: '600px' } : {}}
                >
                  {header}
                </StyledTableCell>
              ))}
            </StyledTableRow>
          </TableHead>
          <TableBody>
            {/* Mensaje de error */}
            {error && (
              <StyledTableRow>
                <StyledTableCell colSpan={5} align="center">
                  <Alert severity="error" sx={{ width: '100%' }}>Error al cargar los productos</Alert>
                </StyledTableCell>
              </StyledTableRow>
            )}

            {/* Mensaje de carga */}
            {loading && !error && (
              <StyledTableRow>
                <StyledTableCell colSpan={5} align="center">
                  <Alert severity="info" sx={{ width: '95%'}}>Cargando...</Alert>
                </StyledTableCell>
              </StyledTableRow>
            )}

            {/* Mensaje de datos vacíos */}
            {!loading && data?.results?.length === 0 && !error && (
              <StyledTableRow>
                <StyledTableCell colSpan={5} align="center">
                  No se encontraron productos
                </StyledTableCell>
              </StyledTableRow>
            )}

            {/* Renderizar productos */}
            {data?.results?.length > 0 && !error &&
              data.results.map((producto) => (
                <StyledTableRow key={producto.id}>
                  <StyledTableCell align="center" sx={{ minWidth: '200px' }}>
                    <Box display="flex" alignItems="center">
                      <img
                        src={producto.imagen_url}
                        alt={producto.nombre}
                        style={{ width: '50px', height: '50px', objectFit: 'cover', marginRight: '8px' }}
                      />
                      <span>{producto.nombre}</span>
                    </Box>
                  </StyledTableCell>
                  <StyledTableCell align="center">{producto.precio}</StyledTableCell>
                  <StyledTableCell align="center">{producto.stock}</StyledTableCell>
                  <StyledTableCell align="center">
                    <IconButton
                      onClick={() => {
                        navigate(`/editar-producto/${producto.id}`);
                      }}
                    >
                      <EditIcon color="warning" />
                    </IconButton>
                    <IconButton onClick={() => {
                      setModalShow(true);
                      setProductoSeleccionado(producto.id);}}>
                      <DeleteIcon color="error" />
                    </IconButton>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>

      {!loading && !error &&
      <Paginacion
      setPaginacion={setPaginacion}
      paginacion={paginacion}
      paginaSiguiente={data?.next ? data?.next : ""}
      />
      }
  
      <Fab
        sx={{
          position: "fixed",
          bottom: 16,
          right: 16,
        }}
        color="primary"
        variant="extended"
        onClick={() => {
          navigate(`/crear-producto`);
        }}
      >
        <AddIcon sx={{ mr: isMobile ? 0 : 1 }} />
        {!isMobile && 'Agregar producto'}
      </Fab>
      <EliminarProducto
        open={modalShow}
        onClose={() => setModalShow(false)}
        seleccionado={productoSeleccionado}
        setEstadoModal={setEstadoModal}
        setEstado={setEstadoProducto}
        url="/productos/"
      />

    </Box>
  )
}
