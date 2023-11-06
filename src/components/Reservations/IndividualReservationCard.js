import React, { useState, useEffect } from 'react'
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import useMediaQuery from "@mui/material/useMediaQuery"
import Box from "@mui/material/Box"
import Stack from '@mui/material/Stack';
import Typography from "@mui/material/Typography"
import { useTheme } from "@mui/material/styles"
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { formattedDate, formatDate} from '../../utils/formatDate'
import { formattedTime } from '../../utils/formatTime';

function IndividualReservationCard({reserva, status, cancelReservation}) {
    const [openMenu, setOpenMenu] = useState(false)
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleMenuOpen = () => {
        setOpenMenu(!openMenu)
    }

    const theme = useTheme()

    const handleClose = () => {
      setOpenMenu(false);
      setAnchorEl(null)
    };

    const handleCancelReservation = (reservationId) => {
      const datos = {
        status: 'CANCELED'
      }
      cancelReservation(reservationId, datos)
      setOpenMenu(false);
      setAnchorEl(null)

    }

  const isDesktop = useMediaQuery(theme.breakpoints.up("md"))
  return (
    <Box sx={{display: 'flex', alignItems:'center', justifyContent: 'center'}}>
    <Box  
    sx={{position: 'relative',
        display: 'flex',
        overflow: 'hidden',  
        borderRadius: '20px', 
        justifyContent: 'flex-start', minWidth: '390px'}}
      >
        <img id="img" 
        style={{position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        objectFit: 'cover',borderRadius: '20px'}} 
        src={`\GRAFICA2.png`}>
        </img>
        <Box style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0, 0, 0, 0.7)', 
          zIndex: 1, borderRadius: '20px'}} />
          <Stack spacing={0.5} direction={'row'} 
            sx={{
            padding: '1rem', 
            display: 'flex', 
            alignItems: 'center', position: 'relative',
            zIndex: 1,}}>
            <Typography sx={{color:'#fff'}}>
            {formatDate(reserva?.dia, "ccc, MMM dd")}   
            </Typography>
            <Typography sx={{ color:'#fff'}}>
            -
            </Typography>
            <Typography sx={{ color:'#fff'}}>
            {formattedTime(reserva?.hora)}
            </Typography>
            <Typography sx={{color:'#fff'}}>
            -
            </Typography>
            <Typography sx={{ color:'#fff'}}>
            Cancha {reserva.cancha}
            </Typography>
            <Typography variant='body2' 
            style={{color: status === 'Próximo' ? '#07C452' : 
            ((status === 'Cancelada' || status === "Penalizado") ? '#E81910' : '#EECC01') , 
            borderRadius: '10px', 
            paddingLeft: 5, 
            paddingRight: 5, display: 'flex', 
            alignItems: 'center',
            marginLeft: '30px', 
            paddingTop: 2, 
            paddingBottom: 1, fontWeight: 'bold'}}>
                {status}
            </Typography>
            {(status !== 'Vencido' && status !== 'Cancelada' && status !== "Penalizado") && 
            <div>
              <MoreVertIcon fontSize='sm'  
              sx={{color:'#fff', cursor: 'pointer'}} onClick={(event) => setAnchorEl(event.currentTarget)} />
              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={Boolean(anchorEl)} // Abre el menú solo cuando anchorEl no sea null
                onClose={handleClose}
                anchorOrigin={{
                  vertical: 'bottom', // Controla la posición vertical (abajo)
                  horizontal: 'right', // Controla la posición horizontal (derecha)
                }}
                transformOrigin={{
                  vertical: 'top', // Controla la posición vertical (arriba)
                  horizontal: 'right', // Controla la posición horizontal (derecha)
                }}
                getContentAnchorEl={null} // Evita que el menú se desplace al abrirse
                MenuListProps={{
                  'aria-labelledby': 'basic-button',
                }}
                sx={{marginTop: 1, fontSize: '0.5rem'}}
              >
                <MenuItem onClick={() => handleCancelReservation(reserva.id)} 
                sx={{fontSize: '13px'}}>Cancelar Reserva</MenuItem>
              </Menu>
            </div>}
        </Stack>
        </Box>
    </Box>
  )
}

export default IndividualReservationCard