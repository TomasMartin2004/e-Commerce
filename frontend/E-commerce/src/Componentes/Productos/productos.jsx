import { useEffect, useState } from 'react';
import Filtros from './filtros';
import { Box, Typography, IconButton, Stack, Chip, Divider, CircularProgress  } from '@mui/material';
import { Tune } from '@mui/icons-material';
import { useSearchParams } from 'react-router-dom';
import ListaProductos from './listaProductos';
import Paginacion from './paginacion';
import Ordenar from './ordenar';
import { CustomDrawer, Main } from './mainConDrawer';

import { useFetchProductos } from '../../Request/v2/fetchProductos';
import useMediaQuery from '@mui/material/useMediaQuery';


export default function Productos() {
  const [open, setOpen] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  const precios = {
    min: searchParams.get('min') || '',
    max: searchParams.get('max') || ''
  }
  // tags es un string separado por comas
  const tags = searchParams.get('tags') || '';
  const tagsArray = tags != ''? tags.split(',') : [];
  const nombre = searchParams.get('nombre') || '';
  const categoria = searchParams.get('categoria') || '';
  const orden = searchParams.get('orden') || '';
  const page = parseInt(searchParams.get('page')) || 1;
  
  const toggleTag = (value) => {
    const newTags = tagsArray.includes(value) ? tagsArray.filter(tag => tag !== value) : [...tagsArray, value];
    setSearchParams({ ...Object.fromEntries(searchParams), tags: newTags.join(',') }, { replace: true });
  }

  const { data: productos, loading: isLoading, error, fetchData} = useFetchProductos()
  const handleChangeParams = (key, value, restart=true, replace=true) => {
    const extra = restart ? { page: 1 } : {};
    setSearchParams({ ...Object.fromEntries(searchParams), [key]: value, ...extra }, { replace: replace });
    // fetchData(nombre, categoria, null, precioMinimo, precioMaximo, orden, page);
    console.log({...Object.fromEntries(searchParams), [key]: value, ...extra});
  }
  const setPrecios = (precios) => {
    setSearchParams({ ...Object.fromEntries(searchParams), page:1, ...precios }, { replace: true });
    // fetchData(nombre, categoria, null, precioMinimo, precioMaximo, orden, page);
    console.log({...Object.fromEntries(searchParams), page:1, ...precios});
  }

  // const setTags = (value) => handleChangeParams('tags', value);
  const setNombre = (value) => handleChangeParams('nombre', value);
  const setCategoria = (value) => handleChangeParams('categoria', value);
  const setOrden = (value) => handleChangeParams('orden', value);
  const setPage = (value) => handleChangeParams('page', value, false, false);


  useEffect(() => {
    fetchData(nombre, categoria, tags, precios.min, precios.max, orden, page);
  }, [searchParams]); // eslint-disable-line react-hooks/exhaustive-deps

  

  const [paginaSiguiente, setPaginaSiguiente] = useState("");


  useEffect(() => {
      setPaginaSiguiente(productos?.next ? productos?.next : "");
  }, [productos]);

  return (
    <>
      <ProductosHeader
        open={open} setOpen={setOpen}
        categoria={categoria} setCategoria={setCategoria}
        precios = {precios} setPrecios={setPrecios}
        nombre={nombre} setNombre={setNombre}
        ordenar={orden} setOrdenar={setOrden}
        tags={tagsArray} toggleTag={toggleTag}
      />
  
      <Divider sx={{ width: '100%' }} />
	  {isLoading ? (<Box sx={{
			display: 'flex',
			justifyContent:'center',
			height: '100vh',
			width: '100vw',
			mt: 10,
			}}>
		  <CircularProgress/>
		</Box>
	  ) : error ? (
		  <Typography variant="h6" sx={{ mt: 10 }}>Error</Typography>
		 ) : productos?.results?.length === 0 ? (<Box sx={{
			display: 'flex',
			justifyContent:'center',
			height: '100vh',
			width: '100vw',
			mt: 10,
			}}>
		 <Typography variant="h6" sx={{ mt: 10 }}>No se encontraron productos</Typography></Box>
			) : (
        <>

      {/* //! CONTENIDO  */}
      <Box sx={{ display: 'flex', width:'100%'}}>
        <CustomDrawer open={open} setOpen={setOpen}>
          <Filtros 
            categoriaSeleccionada={categoria} 
            precios={precios} setPrecios={setPrecios}
            categoria={categoria} setCategoria={setCategoria}
            nombre={nombre} setNombre={setNombre}
            tags={tagsArray} toggleTag={toggleTag}
          />
        </CustomDrawer>

        <Main open={open} sx={{p:0}}>
          <Paginacion 
            paginacion={page}
            setPaginacion={setPage}
            paginaSiguiente={paginaSiguiente}
          />
          <Box sx={{display: 'flex', justifyContent: 'center'}}>
            <ListaProductos productos={productos}/>
          </Box>
          <Paginacion 
            paginacion={page}
            setPaginacion={setPage}
            paginaSiguiente={paginaSiguiente}
          />
        </Main>
      </Box>
      </>
			)}
    </>
	 )

function ProductosHeader({
  open, setOpen,
  precios, setPrecios,
  categoria, setCategoria,
  tags, toggleTag,
  ordenar, setOrdenar,
  nombre, setNombre
}){
  
  const handleDrawer = () => {setOpen(!open)};

  return (
    <Box sx={{ 
      display: 'flex', 
      justifyContent: 'space-between', 
      alignItems: 'center', 
      mt: 3, 
      width: '100%', 
      minWidth:'90vw' 
    }}>
      <IconButton
        sx={{ ml: 3 }}
        aria-label="drawer"
        onClick={handleDrawer}
        edge="start"
      >
        <Tune />
        <Typography variant="h6" noWrap component="div">
          {open ? 'Ocultar filtros' : 'Ver filtros'}
        </Typography>
      </IconButton>
      {/* //TODO Cambiar logica de chips */}
      <ChipsFiltros
        nombre={nombre} setNombre={setNombre}
        precios={precios} setPrecios={setPrecios}
        categoria={categoria} setCategoria={setCategoria}
        tags={tags} toggleTag={toggleTag}
      />
      <Ordenar
      setOrdenar={setOrdenar}
      ordenar={ordenar}
      />
    </Box>
  )
}

function ChipsFiltros({
  nombre, setNombre,
  precios, setPrecios,
  tags, toggleTag,
  categoria, setCategoria,
}){
  const isEmpty = (value) => value == '' || value == 0 || value == null;
  const minimo = precios.min;
  const maximo = precios.max;
  const setMinimo = (value) => setPrecios({min: value, max: maximo});
  const setMaximo = (value) => setPrecios({min: minimo, max: value});
  const isMobile = useMediaQuery('(max-width:600px)');

  return (
    <Stack direction={isMobile ? 'column' : 'row'} spacing={1}>
      {!isEmpty(nombre) && <Chip color='primary' label={nombre} onDelete={() => setNombre('')} />}
      {!isEmpty(minimo) && <Chip label={'Desde $'+minimo} onDelete={() => setMinimo(0)} />}
      {!isEmpty(maximo) && <Chip label={'Hasta $'+maximo} onDelete={() => setMaximo(0)} />}
      {!isEmpty(categoria) && <Chip label={categoria} color='warning' onDelete={() => setCategoria('')} />}
      {tags.map(tag => (
        <Chip key={tag} label={tag} color='secondary' onDelete={() => toggleTag(tag)} />
      ))}
    </Stack>
  )
}}
