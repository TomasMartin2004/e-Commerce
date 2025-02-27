import { useState, useEffect, useContext } from 'react';
import { Box, Typography, Button, CircularProgress, Alert, Chip, Stack, TextField } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { useFetch } from '../../Request/fetch';
import Grid from '@mui/material/Grid2';
import { CarritoContext } from '../Header/Carrito/carritoContext';
import Carrito from '../Header/Carrito/carrito';
import { useMediaQuery } from '@mui/material';


export default function ProductoDetalle() {
	const {data : categorias ,loading: laodingCat } = useFetch('/categorias/');
	const { id } = useParams();
	const { data: producto, loading, error } = useFetch(`/productos/${id}/v2/`);
	const navigate = useNavigate(); 
	const [ productoActual, cambiarProducto ] = useState(null);
	const [ categoriass, cambiarCat ] = useState(null);
	const { productosSeleccionados, agregarProducto, actualizarProductoEnCarrito } = useContext(CarritoContext);
    const isMobile = useMediaQuery('(max-width:600px)');
	const [ cantidad, cambiarCant ] = useState(1);

	const handleAgregarProducto = () => {
    	const productoYaSeleccionado = productosSeleccionados.find((p) => p.id === producto.id);

    	if (productoYaSeleccionado) {
			// Si el producto ya está en el carrito, actualizamos la cantidad
			console.log("producto ya en carito, actualizando...")
        	actualizarProductoEnCarrito(producto.id, productoYaSeleccionado.cantidad + cantidad);
    	} else {
        	// Si es un nuevo producto, lo agregamos con la cantidad seleccionada
        	agregarProducto({ ...producto, cantidad });
    	}
	};

	useEffect(() => {
		if (producto) {
			cambiarProducto(producto);
			console.log(producto);
		}
	}, [producto]);

	useEffect(() => {
		if (categorias) {
			cambiarCat(categorias);
		}
	}, [categorias,productoActual]);
	
	const controladorCant = (event) => {
		let value = parseInt(event.target.value, 10);
		
		if (isNaN(value) || (value < 1)) {
			value = 1;
		} else if (value > productoActual.stock) {
			value = productoActual.stock;
		}

		cambiarCant(value);
	};

	const enviar = (event) => {
		const nuevaCantidad = Math.max(1, parseInt(event.target.value, 10) || 1);
		cambiarCant(nuevaCantidad);
		actualizarCantidadProducto(producto.id, nuevaCantidad);
	};
			
	if(loading){
		return (
			<Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
				<CircularProgress />
			</Box>
		);
	}
	if(error) {
		return <Typography color="error"> Error al encontrar el producto</Typography>;
	}
	return (
		<Box sx={{ p:4, bgcolor:'#f9fafa', borderRadius:2, display: 'flex', flexDirection: 'column', alignItems: 'center', overflowX: 'hidden'}}>
			{productoActual && (
				<>				
				<Typography variant="h3" sx={{ 
					mb: 3, 
					fontSize:{ xs: '1rem', sm: '1.5rem', md: '2rem', lg: '2.5rem'}, 
					fontWeight: '600', 
					color: '#333', 
					textAlign: 'center'
				}}>
					{productoActual.nombre}
				</Typography>
				<Grid container spacing={4} justifyContent={'center'} sx={{width: '100%'}}>
					<Grid item size={{sm:12,md:6}}>
					<Box 
						component="img"
						src={productoActual.imagen_url || 'https://via.placeholder.com/150'}
						alt={productoActual.nombre}
						sx={{  borderRadius:2, boxShadow: 3, objectFit: 'cover', width:'100%' }}/>
					</Grid>
					<Grid item size={{sm:12,md:6}}>
						<Typography variant="body1" sx= {{ display: '-webkit-box', whiteSpace: 'normal', wordWrap: 'break-word', overflow: 'hidden',textOverflow: 'ellipsis',  WebkitLineClamp: 3,WebkitBoxOrient: 'vertical' }}>
							{productoActual.descripcion}
						</Typography>
						{productoActual && categoriass && (
							<Box sx={{mt:5}}>
								<Stack 
                direction={isMobile ? 'column' : 'row'}
                spacing={1}>
									{productoActual?.tags?.map((tag) => {
										return (
											<Chip key={tag.id} color='primary' label={tag.idCategoria.nombre+ ' >> ' + tag.nombre}/>
										);
									})}
								</Stack>
						</Box>
						)}
					
						<Typography variant="body1" sx= {{ p: 2, color: 'green', textAlign: 'left', fontSize: '40px',  whiteSpace: 'normal', wordWrap: 'break-word', overflow: 'hidden' }}>
							$ {productoActual.precio}
						</Typography>
						<Typography sx={{textAlign: 'left', mb: 3, maxHeight:'80%'}}>
							{productoActual.stock > 0 ? 'stock : disponible' : 'stock : agotado'}
						</Typography>
						<Box component= "form" onSubmit={enviar} sx={{display: "flex",flexDirection:"column", alignItems: "center", p:2 }}>
							<TextField 
								fullWidth
								label="Cantidad"
								type="number"
								name="Cantidad"
								value={cantidad}
								onChange={controladorCant}
								inputProps={{ min: 1, max: productoActual.stock }}
								sx={{ alignSelf: "flex-start", width: '40%' }}
								/>
							<Button type="submit" variant="contained" color="primary" sx={{width: '75%', mt: 10}} onClick={handleAgregarProducto}>
								Agregar al carrito
							</Button>
						</Box>
					</Grid>
				</Grid>
			</>
			)}
			</Box>	
	);
};


