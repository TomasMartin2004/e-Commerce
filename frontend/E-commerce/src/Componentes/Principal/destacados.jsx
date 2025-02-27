import { useState, useEffect } from 'react';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';
import { Box, Typography, Button, Link, useTheme, useMediaQuery, Card } from '@mui/material';
import { ArrowBackIos, ArrowForwardIos } from '@mui/icons-material';
import { useFetch } from '../../Request/fetch.js'
import { useNavigate } from 'react-router-dom';
import { useFetchUser } from '../../Request/v2/fetchUser.js';
import useGymAPI  from '../../Request/v2/fetchGym.js';
const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const CarruselDestacados = () => {
	const token = localStorage.getItem("token");
	const isAuthenticated = token ? true : false;
	const {email, loading: loadingV, error: errorV } = useFetchUser(isAuthenticated);
	const correoPRUEBA = "tomasito@gmail.com"
	const {productos: productosAPI, loading: loadingAPI, error: errorAPI , usuario: usuarioAPI } = useGymAPI(email);

	const { data, loading, error } = useFetch('/productos/destacados/');

	const [indiceActivo, setIndiceActivo] = useState(0);
	const [productos, cambiarProductos] = useState([]);
	const navigate = useNavigate();

	const handleStepChange = (step) => {
		setIndiceActivo(step);
	};
	const handleNext = () => {
		setIndiceActivo((prev) => (prev + 1) % grupos.length);
	};
	const handleBack = () => {
		setIndiceActivo((prev) => (prev - 1 + grupos.length) % grupos.length);
	};

	useEffect(() => {
		if(data){
			if(usuarioAPI){
				cambiarProductos(productosAPI);
			} else {
				cambiarProductos(data);
			}
		}
	}, [data,email,productosAPI]);

	const theme = useTheme();
	const tamaños = {
		sm: useMediaQuery(theme.breakpoints.up('sm')),
		md: useMediaQuery(theme.breakpoints.up('md')),
		lg: useMediaQuery(theme.breakpoints.up('lg')),
	}
	const cantidad = () => {
		if(tamaños.lg) return 5;
		if(tamaños.md) return 4;
		if(tamaños.sm) return 3;
		return 1;
	}
	const mostrar = cantidad();
	const maxWidth = `${100 / mostrar}%`;

	const grupos = productos.reduce((result, producto, index) => {
		const grupoIndex = Math.floor(index / mostrar);
		if (!result[grupoIndex]) result[grupoIndex] = [];
		result[grupoIndex].push(producto);
		return result;
	}, []);

	const linkProductoDetalle = (id) => {
		navigate(`/productos/${id}/`);
	};

	return (
		<Box px={2}>
			<Typography variant="h1" sx={{ 
				fontSize: '3rem',
				fontWeight: '600',
				color: '#333',
				textAlign: 'center' 
			}}> Productos destacados </Typography>
			<Box sx={{
				display: 'flex',
				flexDirection: 'row',
				m: 2,
			}}>
			<Boton onClick={handleBack} left><ArrowBackIos/></Boton>
			<AutoPlaySwipeableViews
				axis={'x'}
				index={indiceActivo}
				// onChangeIndex={handleStepChange}
				enableMouseEvents
			>
        			{grupos.map((grupo, index) => (
						<Box key={index} m={1}
							sx={{display:'flex', flexDirection: 'row', justifyContent: 'space-around', gap: 2}}
						>
							{grupo.map((producto) => (
								<Card key={producto.id} elevation={3} sx={{display: 'flex', flexDirection: 'column', gap: 1, flexBasis: maxWidth}}
								>
								<Link onClick={()=> linkProductoDetalle(producto.id)}
									sx={{
										cursor: 'pointer', 
										textAlign: 'center', 
										flex: '1 1 calc(20% - 16px)', 
										textDecoration: 'none',
										color: 'inherit',
									}}
									
								>
									<img src={producto.imagen_url} alt={producto.nombre} style={{ 
										width: '100%', height: '200px', objectFit: 'cover', borderRadius: '8px' }} />
									<Typography	variant="body1" sx={{
										color: '#555',
										display: '-webkit-box', 
										WebkitBoxOrient: 'vertical', 
										overflow: 'hidden', 
										textOverflow: 'ellipsis', 
										WebkitLineClamp: 2 }}>
											{producto.nombre}
									</Typography>
									<Typography	variant="body1" sx={{
										p: 1, 
										fontSize: '20px',
										color: 'green',
										display: '-webkit-box', 
										WebkitBoxOrient: 'vertical', 
										overflow: 'hidden', 
										textOverflow: 'ellipsis', 
										WebkitLineClamp: 2 }}>
											$ {producto.precio} 
									</Typography>

	              				</Link>
								</Card>
							))}
						</Box>
					))}
				</AutoPlaySwipeableViews>
				<Boton onClick={handleNext} right><ArrowForwardIos/></Boton>
			</Box>
		</Box>
  );
};

export default CarruselDestacados;

function Boton({ children, onClick, left=false, right=false, sx={} }) {
	

  return (
	<Button
		onClick={onClick}
		sx={{
			position: 'absolute',
			transform: 'translateY(100px)',
			backgroundColor: 'rgba(0,0,0,0.5)',
			color: 'white',
			'&:hover': { backgroundColor: 'rgba(0,0,0,0.7)' },
			padding: '10px 20px',
			borderRadius: '5px',
			cursor: 'pointer',
			zIndex: 1,
			...(left && { left: 15 }),
			...(right && { right: 15 }),
			...sx,
		}}>
		{children}
	</Button>

	);
}
