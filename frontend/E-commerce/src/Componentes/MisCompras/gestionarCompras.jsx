import * as React from 'react';
import { Box, Collapse, IconButton, Button, Table, TableBody, TableContainer, TableHead, TableRow, Paper, Alert, Typography } from '@mui/material/';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { StyledTableCell, StyledTableRow } from '../GestionarProductos/styledTable';
import { useState, useEffect } from 'react';
import CambiarEstadoVenta from '../GestionarProductos/CrudProductos/cambiarEstadoVenta';
import Paginacion from '../Productos/paginacion';

export default function GestionarVentas({
  ventas,
  isLoading,
  error,
  ventasDetalle,
  isLoadingDetalle,
  errorDetalle,
  fetchData,
  setPaginacion,
  paginacion
}) {
  const [openRow, setOpenRow] = useState(null);
  const [detallesVentaCargados, setDetallesVentaCargados] = useState({}); // Guardar detalles de cada venta

  const [modalShow, setModalShow] = useState(false);
  const [ventaSeleccionado, setVentaSeleccionado] = useState(null);
  const [estadoModal, setEstadoModal] = useState(false);
  const [estadoVenta, setEstadoVenta] = useState(false);
  const [nuevoEstado, setNuevoEstado] = useState("");

  const toggleRow = (rowName, ventaId) => {
    // Si la fila ya está abierta, simplemente la cierra sin hacer otra solicitud
    if (openRow === rowName) {
      setOpenRow(null);
      return;
    }
    
    // Si la fila no está abierta, realizamos la solicitud solo si no se han cargado los detalles
    if (!detallesVentaCargados[ventaId]) {
      fetchDetallesVenta(ventaId); // Llamar a la función para cargar los detalles
    }

    setOpenRow(rowName);
  };

  // Función para obtener los detalles de una venta
  const fetchDetallesVenta = async (ventaId) => {
    try {
      // Realizar la solicitud para obtener los detalles de una venta en particular
      const response = await fetch(`http://localhost:8000/ventas/${ventaId}/detalles/`);
      const data = await response.json();
      // Guardar los detalles en el estado
      setDetallesVentaCargados((prevState) => ({
        ...prevState,
        [ventaId]: data
      }));
    } catch (error) {
      console.error("Error al cargar los detalles de la venta:", error);
    }
  };

  useEffect(() => {
    setEstadoModal(false);
    fetchData();
  }, [estadoModal, paginacion]);

  if (error) {
    return (
      <Alert severity="error" sx={{ width: '100%' }}>Error al cargar las ventas</Alert>
    );
  }

  return (
    <Box sx={{ mr: 1, ml: 1 }}>
       <Typography variant="h4" color="primary" sx={{ textAlign: 'center', mb: 2 }}>
        Mis Compras
      </Typography>
      {estadoVenta === "Eliminado" && (
        <Alert sx={{ mb: 2 }} severity="error">
          Venta eliminada correctamente
        </Alert>
      )}
      <TableContainer component={Paper} sx={{ maxWidth: 900, margin: 'auto' }}>  {/* Ancho fijo máximo */}
  <Table aria-label="collapsible table" sx={{ minWidth: 900 }}>  {/* Ancho fijo mínimo */}
    <TableHead>
      <StyledTableRow>
        <StyledTableCell />
        <StyledTableCell align='center' sx={{ width: '26%' }}>Fecha</StyledTableCell> {/* Ajustando el ancho de las celdas */}
        <StyledTableCell align='center' sx={{ width: '26%' }}>Total</StyledTableCell>
        <StyledTableCell align='center' sx={{ width: '26%' }}>Estado</StyledTableCell> {/* Ajustando el ancho de las celdas */}
      </StyledTableRow>
    </TableHead>
    <TableBody>
      {ventas?.results?.map((venta) => {
        const fechaCompleta = new Date(venta.fecha);
        const anio = fechaCompleta.getFullYear();
        const mes = String(fechaCompleta.getMonth() + 1).padStart(2, "0");
        const dia = String(fechaCompleta.getDate()).padStart(2, "0");
        const fechaFormateada = `${anio}-${mes}-${dia}`;
        return (
          <React.Fragment key={venta.id}>
            <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
              <StyledTableCell>
                <IconButton
                  aria-label="expand row"
                  size="small"
                  onClick={() => toggleRow(venta.fecha, venta.id)}
                >
                  {openRow === venta.fecha ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                </IconButton>
              </StyledTableCell>
              <StyledTableCell align="center" component="th" scope="row" sx={{ width: '20%' }}>
                {fechaFormateada}
              </StyledTableCell>
              <StyledTableCell align='center' sx={{ width: '20%' }}>
                {venta.total}
              </StyledTableCell>
              <StyledTableCell align='center' sx={{ width: '20%' }}>
                {venta.estado}
              </StyledTableCell>
            </TableRow>
            <TableRow>
              <StyledTableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                <Collapse in={openRow === venta.fecha} timeout="auto" unmountOnExit>
                  <Box sx={{ margin: 1 }}>
                    <Table size="small" aria-label="purchases">
                      <TableHead>
                        <TableRow>
                          <StyledTableCell align='center' sx={{ width: '40%' }}>Producto</StyledTableCell> {/* Ajustando el ancho de las celdas */}
                          <StyledTableCell align='center' sx={{ width: '20%' }}>Cantidad</StyledTableCell> {/* Ajustando el ancho de las celdas */}
                          <StyledTableCell align='center' sx={{ width: '20%' }}>Subtotal</StyledTableCell> {/* Ajustando el ancho de las celdas */}
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {detallesVentaCargados[venta.id] ? (
                          detallesVentaCargados[venta.id].map((detalle) => (
                            <TableRow key={detalle.id}>
                              <StyledTableCell>
                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                  <img
                                    src={detalle.producto.imagen_url}
                                    alt={detalle.producto.nombre}
                                    style={{ width: '30px', height: '30px', objectFit: 'cover', marginRight: '8px' }}
                                  />
                                  <span>{detalle.producto.nombre}</span>
                                </Box>
                              </StyledTableCell>
                              <StyledTableCell align="center">{detalle.cantidad}</StyledTableCell>
                              <StyledTableCell align="center">{detalle.subtotal}</StyledTableCell>
                            </TableRow>
                          ))
                        ) : (
                          <StyledTableRow>
                            <StyledTableCell colSpan={3} align="center">
                              <Alert severity="info" sx={{ width: '95%' }}>Cargando detalles...</Alert>
                            </StyledTableCell>
                          </StyledTableRow>
                        )}
                      </TableBody>
                    </Table>
                  </Box>
                </Collapse>
              </StyledTableCell>
            </TableRow>
          </React.Fragment>
        );
      })}
    </TableBody>
  </Table>
</TableContainer>
      {!isLoading && !error && (
        <Paginacion
          setPaginacion={setPaginacion}
          paginacion={paginacion}
          paginaSiguiente={ventas?.next ? ventas?.next : ""}
        />
      )}
      <CambiarEstadoVenta
        open={modalShow}
        onClose={() => setModalShow(false)}
        seleccionado={ventaSeleccionado}
        setEstadoModal={setEstadoModal}
        setEstado={setEstadoVenta}
        url="/ventas/"
        nuevoEstado={nuevoEstado}
      />
    </Box>
  );
}
