import React, {useEffect, useState} from 'react'
import { Link, useLocation } from "react-router-dom"
import Box from "@mui/material/Box"
import { Checkbox, CircularProgress } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import Container from "@mui/material/Container"
import Typography from "@mui/material/Typography"
import Button from "@mui/material/Button"
import Divider from "@mui/material/Divider"
import { Stack } from '@mui/system'
import { formattedDate } from '../../utils/formatDate'
import { formattedTime } from '../../utils/formatTime';

function ConfirmationView() {
  const [reservation, setReservation] = useState([])
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    const scrollToTop = () => {
      window.scrollTo(0, 0);
    };

    scrollToTop();
  }, []);

  // Usamos useEffect para simular una transición al montar el componente
  useEffect(() => {
    setTimeout(() => {
      setIsChecked(true);
    }, 1000); // Espera 1 segundo antes de marcar la casilla
  }, []);

  const handleClick = () => {
    setIsChecked(!isChecked);
  };

  const location = useLocation();

  useEffect(()=> {
    getReservation()
  }, [])

  let getReservation = async() =>{
    let response = await fetch(`http://127.0.0.1:8000/api/reservas/${location.pathname.split("/")[2]}`, {
        method:'GET',
        headers:{
            'Content-Type':'application/json',
        }
    })
    let data = await response.json()

    if(response.status === 200){
      setReservation(data)
    }
    
  }

  const playCompletionSound = () => {
    const audio = new Audio('/path-to-your-completion-sound.mp3'); // Reemplaza con la ruta de tu archivo de sonido
    audio.play();
  };


  return (
    <Box sx={{
      position: 'relative',
      backgroundSize: 'cover',
      width: '100%',
      minHeight: '100vh', 
    }}>
      <img id="img" 
        style={{position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        objectFit: 'cover'}} src={`/grid.png`}>
        </img>
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0, 0, 0, 0.8)', zIndex: 1 // Ajusta la opacidad según lo desees
        }}
      ></div>
      <Box sx={{ 
        position: 'relative',
        zIndex: 1,
        textAlign: 'flex-start',
        display: 'flex',
        flexDirection: 'column', }}>
        <Container disableGutters maxWidth='xs' sx={{paddingBottom: 3, }}>
          <Stack direction="column" sx={{display: 'flex', alignItems: 'center', 
          justifyContent: 'center', minHeight: '50vh'}}>
          <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            cursor: 'pointer',
          }}
          >
            <Checkbox
              checked={isChecked}
              icon={
              <CircularProgress
                size={150}
                sx={{
                  transition: 'transform 0.3s ease-in-out',
                  color: '#00B8D2'
                }}
              />}
              checkedIcon={<CheckCircleIcon sx={{fontSize: '150px'}} />}
              inputProps={{ 'aria-label': 'controlled' }}
              sx={{
                '.MuiCircularProgress-svg': {
                  transition: 'transform 0.3s ease-in-out',
                },
                '.Mui-checked .MuiCircularProgress-svg': {
                  transform: 'scale(0)',
                },
              }}
            />
          </div>
          {isChecked && 
          <>
          <Typography variant='h5' sx={{textAlign: 'center',color: '#fff'}}>
              Reserva Confirmada
          </Typography>
          </>}
          </Stack>
        {/*<Box 
        sx={{width: '100%', display: 'flex', justifyContent: 'center', marginTop: 3}}>
          <img src='/pickCourt.jpg' width={340} style={{borderRadius: '20px'}}/>
        </Box>
        <Stack direction='column' sx={{marginTop: 3, marginLeft: 4}}>
          <Typography variant='h5' sx={{color: '#fff'}}>
            {reservation.cancha_nombre}
          </Typography>
          <Typography variant='body1' sx={{color:'#fff', fontWeight: 'normal'}}>
            $20
          </Typography>
        </Stack>
        <Divider sx={{margin: 2}}/>
        <Stack direction="row" sx={{marginTop: 3, marginLeft: 4, marginRight: 4}}>
          <Stack direction="column">
          <Typography variant='body2' sx={{color:'#fff'}}>
            Fecha y hora
          </Typography>
          <Typography variant='body1' sx={{color:'#ffff', fontWeight: 'normal'}}>
            {formattedDate(reservation?.dia)}
          </Typography>
          <Typography variant='body1' sx={{color:'#fff', fontWeight: 'normal'}}>
            {formattedTime(reservation?.hora)}
          </Typography>
          </Stack>
          <Stack direction="column" sx={{marginLeft: 'auto'}}>
          <Typography variant='body2' sx={{color:'#fff'}}>
            Duración
          </Typography>
          <Typography variant='body1' sx={{color:'#000', fontWeight: 'normal'}}>
            1h 30min
          </Typography>
          </Stack>
        </Stack>
        <Stack direction="column" sx={{marginLeft: 4, marginRight: 4, marginTop: 3}}>
          <Typography variant='body2' sx={{color:'#fff'}}>
            Dirección
          </Typography>
          <Typography variant='body1' sx={{color:'#fff', fontWeight: 'normal'}}>
            Centro comercial Plaza las Americas
          </Typography>
          </Stack>

        <Typography variant='body1' sx={{color:'#fff', margin: 4}}>
          Información relevante para el usuario
        </Typography>*/}
        </Container>
        {isChecked &&
        <Box 
        sx={{backgroundColor: '#fff', borderTopLeftRadius: '20px', 
        borderTopRightRadius: '20px', minHeight: '50vh', width: '100%'}}>
          <Container maxWidth='xs'>
          <Stack direction="row" spacing={2} sx={{marginTop: 3,}}>
          
            <Typography variant='h6' sx={{color:'#000', fontWeight: 'normal'}}>
              {formattedDate(reservation?.dia)}
            </Typography>
            <Typography variant='h6' sx={{color:'#000', fontWeight: 'normal'}}>
              {formattedTime(reservation?.hora)}
            </Typography>
            <Typography variant='h6'>-</Typography>
            <Typography variant='h6' sx={{color: '#000'}}>
            {reservation.cancha_nombre}
          </Typography>
          </Stack>
        <Divider sx={{marginTop: 2, marginBottom: 2}}/>
        <Stack direction="row" sx={{marginTop: 2, }}>
        <Stack direction='column' >
          <Typography variant='body1' sx={{color:'#000'}}>
            Precio
          </Typography>
          <Typography variant='h6' sx={{color:'#000', fontWeight: 'normal'}}>
            $20
          </Typography>
        </Stack>
          <Stack direction="column" sx={{marginLeft: 'auto'}}>
            <Typography variant='body1' sx={{color:'#000'}}>
              Duración
            </Typography>
            <Typography variant='h6' sx={{color:'#000', fontWeight: 'normal'}}>
              1h 30min
            </Typography>
          </Stack>
        </Stack>
        <Stack direction="column" sx={{marginTop: 2}}>
          <Typography variant='body1' sx={{color:'#000'}}>
            Dirección
          </Typography>
          <Typography variant='h6' sx={{color:'#000', fontWeight: 'normal'}}>
            Centro comercial Plaza las Americas
          </Typography>
          </Stack>
          <Link to={'/my-reservations'} style={{textDecoration: 'none', color:'#fff'}}>
          <Button variant='contained' 
            fullWidth 
            sx={{marginTop: 3, borderRadius: 10, color: '#fff'}}>
              ir a mis reservas
          </Button>
          </Link>
        </Container>
        </Box>
        }
        
    
    </Box>
    </Box>
  )
}

export default ConfirmationView
