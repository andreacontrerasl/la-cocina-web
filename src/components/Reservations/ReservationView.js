import React, {useEffect, useState, useContext, useRef} from 'react'
import { useForm } from "react-hook-form"
import { Link, useNavigate } from "react-router-dom"
import Box from "@mui/material/Box"
import Stack from "@mui/material/Stack"
import Grid from "@mui/material/Grid"
import Container from "@mui/material/Container"
import Typography from "@mui/material/Typography"
import Button from "@mui/material/Button"
import Collapse from '@mui/material/Collapse';
import Divider from "@mui/material/Divider"
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import UploadIcon from '@mui/icons-material/Upload';
import Select from '@mui/material/Select';
import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined';
import DownloadDoneIcon from '@mui/icons-material/DownloadDone';
import CloseIcon from '@mui/icons-material/Close';
import dayjs from 'dayjs';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import AuthContext from '../../context/AuthContext'
import { formatShortDate } from '../../utils/formatShortDate'
import Loading from '../../common/Loading'
import { useLoading } from '../../context/LoadingContext'


const defaultValues = {
    date: "",
    time: "",
    court: ""
}

const hours = [
  {
    name: "7-8:30am",
    value: "07:00:00"
  },
  {
    name: "8:30-10am",
    value: "08:30:00"
  },
  {
    name: "10-11:30am",
    value: "10:00:00"
  },
  {
    name: "11:30-1pm",
    value: "11:30:00"
  },
  {
    name: "1-2:30pm",
    value: "13:00:00"
  },
  {
    name: "2:30-4pm",
    value: "14:30:00"
  },
  {
    name: "4-5:30pm",
    value: "16:00:00"
  },
  {
    name: "5:30-7pm",
    value: "17:30:00"
  },
  {
    name: "7-8:30pm",
    value: "19:00:00"
  },
  {
    name: "8:30-10pm",
    value: "20:30:00"
  },
  {
    name: "10-11:30pm",
    value: "22:00:00"
  },
]

function ReservationView() {
   const methods = useForm({ defaultValues })
   const [courts, setCourts] = useState([])
   const [selectedCourt, setSelectedCourt] = useState(null)
   const [selectedTime, setSelectedTime] = useState(null)
   const [selectedDay, setSelectedDay] = useState(null);
   const [hasDay, setHasDay] = useState(false)
   const [hasTime, setHasTime] = useState(false)
   const [hasCourt, setHasCourt] = useState(false)
   const [reservations, setReservations] = useState([])
   const [hasMethod, setHasMethod] = useState(false)
   const [paymentMethod, setPaymentMethod] = useState("")
   const [showFileUploader, setShowFileUploader] = useState(true);
    const [fileUploaded, setFileUploaded] = useState(false);
    const [fileName, setFileName] = useState("");
    const [file, setFile] = useState({});
    const fileInputRef = useRef(null);
  const { handleSubmit, control, watch } = methods
  const {user, authTokens, logoutUser} = useContext(AuthContext)
  const { showLoading, hideLoading, isLoading } = useLoading();

  useEffect(() => {
    const scrollToTop = () => {
      window.scrollTo(0, 0);
    };

    scrollToTop();
  }, []);

  let navigate = useNavigate()

  const token = JSON.parse(localStorage.getItem('authTokens'))

  useEffect(()=> {
    getCourts()
  }, [])

  useEffect(()=> {
    getReservations()
  }, [])

  let getCourts = async() =>{
    showLoading()
    let response = await fetch('http://127.0.0.1:8000/api/canchas/', {
        method:'GET',
        headers:{
            'Content-Type':'application/json',
            'Authorization':'Bearer ' + String(token?.access)
        }
    })
    let data = await response.json()

    if(response.status === 200){
      setCourts(data)
      hideLoading()
    }else if(response.statusText === 'Unauthorized'){
        logoutUser()
        hideLoading()
    } 
  }

  let getReservations = async() =>{
    showLoading()
    let response = await fetch('http://127.0.0.1:8000/api/reservas/', {
        method:'GET',
        headers:{
            'Content-Type':'application/json',
            'Authorization':'Bearer ' + String(token?.access)
        }
    })
    let data = await response.json()

    if(response.status === 200){
      setReservations(data)
      hideLoading()
    }else if(response.statusText === 'Unauthorized'){
        logoutUser()
        hideLoading()
    } 
  }

  let crearReserva = async (datosReserva) => {
    showLoading()
    try {
      let response = await fetch('http://127.0.0.1:8000/api/reservas/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + String(token?.access) 
        },
        body: JSON.stringify(datosReserva)
      });

      const responseData = await response.json();
  
      if (response.ok) {
        // La reserva fue creada exitosamente
        hideLoading()
        console.log('Reserva creada exitosamente');
        navigate(`/court-reservation/${responseData.id}`)
      } else if (response.status === 401) {
        hideLoading()
        // El token es inválido o ha expirado, manejar el cierre de sesión
        logoutUser();
      } else {
        hideLoading()
        // Ocurrió algún error en la creación de la reserva
        console.error('Error al crear la reserva');
      }
    } catch (error) {
      hideLoading()
      console.error('Error en la solicitud:', error);
    }
  };

  const handleDateChange = (date) => {
    setHasCourt(false)
    setHasTime(false)
    setSelectedDay(date);
    setHasDay(true)
    setSelectedTime(null); // Resetear la hora seleccionada al cambiar la fecha
    setSelectedCourt(null); // Resetear la cancha seleccionada al cambiar la fecha
  };

  const handleTimeChange = (time) => {
    setSelectedTime(time)
    setHasTime(true)
    setHasCourt(false)
    setSelectedCourt(null)
  }
  const handleCourtChange = (court) => {
    setSelectedCourt(court)
    setHasCourt(true)
  }

  const availableHoursForCourts = () => {
    if (!selectedDay) return hours;
  
    const selectedDate = dayjs(selectedDay).startOf('day'); // Convertir la fecha seleccionada a un objeto dayjs y establecer la hora en 00:00:00
    const currentTime = dayjs();
    
    // Obtener todas las canchas disponibles
    const availableCourts = courts.map((court) => court.id);
  
    // Filtrar las reservas para el día seleccionado
    const dayReservations = reservations.filter(
      (reservation) => dayjs(reservation.dia, 'YYYY-MM-DD').isSame(selectedDate, 'day')
    );
  
    // Filtrar las horas basadas en las reservas y canchas disponibles
    const filteredHours = hours.filter((hour) => {
      const hourValue = hour.value;
  
      // Verificar si la fecha seleccionada es la misma que la fecha actual
      if (selectedDate.isSame(currentTime, 'day')) {
        // Verificar si la hora ya pasó o está a menos de 30 minutos de distancia (para la fecha actual)
        if (dayjs(hourValue, 'HH:mm:ss').isBefore(currentTime) || 
            dayjs(hourValue, 'HH:mm:ss').subtract(30, 'minutes').isBefore(currentTime)) {
          return false;
        }
      }
  
      // Verificar si hay reservas para la hora seleccionada
      const reservationsForHour = dayReservations.filter((reservation) => reservation.hora === hourValue);
  
      // Si no hay reservas, la hora está disponible
      if (reservationsForHour.length === 0) {
        return true;
      }
  
      // Verificar si la reserva está disponible para todas las canchas
      const isReservationAvailableForAllCourts = availableCourts.every((courtId) =>
        reservationsForHour.some((reservation) => reservation.cancha === courtId)
      );
  
      // La hora está disponible si la reserva está disponible para todas las canchas
      return !isReservationAvailableForAllCourts;
    });
  
    return filteredHours;
  };
  

  const availableCourtsForTime = () => {
    if (!selectedTime) return courts;
    const day = new Date(selectedDay?.$d)

    const reservedCourts = reservations
      .filter((reservation) => reservation.dia === formatShortDate(day) && reservation.hora === selectedTime)
      .map((reservation) => reservation.cancha);

    return courts.filter((court) => !reservedCourts.includes(court.id));
  };

  const submit = () => {
    const day = new Date(selectedDay?.$d)
    const data = {
      usuario: user.user_id,
      cancha: selectedCourt,
      dia: formatShortDate(day),
      hora: selectedTime,
      payment_method: paymentMethod
    }
    crearReserva(data)
  }

  const handleChange = (event) => {
    setPaymentMethod(event.target.value);
    setHasMethod(true)
  };

  const handleUploadClick = () => {
    fileInputRef.current.click();
};

  const handleOnChange = (e) => {
    setShowFileUploader(false);
    setFileName(e.target.files[0].name);
    setFile(e.target.files[0]);
    setFileUploaded(true);
  };

  const handleDeletefile = () => {
    setShowFileUploader(true);
    setFileName("");
    setFile({});
    setFileUploaded(false);
  }

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
        objectFit: 'cover'}} src={`/GRAFICA.png`}>
      </img>
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0, 0, 0, 0.5)', zIndex: 1 // Ajusta la opacidad según lo desees
        }}
      ></div>
      <Box sx={{ 
        position: 'relative',
        zIndex: 1,
        display: 'flex',
        flexDirection: 'column', marginLeft: '10px'}}>
        <Container disableGutters maxWidth='xs' sx={{paddingBottom: 3, }}>
          <Stack direction="row" spacing={2}
          sx={{display: 'flex', alignItems: 'center', paddingBottom: 2, marginTop: 2 }}>
          <ArrowBackOutlinedIcon 
            sx={{cursor: 'pointer', marginLeft: 2, 
            color: '#fff'}} 
            onClick={() => navigate(-1)} />
            <Typography variant='h6' 
            sx={{textAlign: 'center', color: '#fff'}}>
                Reserva de Chanchas
            </Typography>
          </Stack>
        <Typography sx={{color: '#e4e4e4', marginLeft: 3, fontWeight: 'bold'}} variant='body1'>
          Fecha
        </Typography>
        <Box sx={{display: 'flex', justifyContent: 'center', width: '100%'}}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={['DateCalendar', 'DateCalendar']}>
            <DemoItem >
              <DateCalendar 
              disablePast
              sx={{width: '100%', backgroundColor: '#fff', 
              borderRadius: '20px', padding: '5px 2rem 5px 2rem'}}
              value={selectedDay} 
              onChange={(newValue) => handleDateChange(newValue)} />
            </DemoItem>
          </DemoContainer>
        </LocalizationProvider>
        </Box>
        <Collapse in={hasDay}>
        <Typography sx={{color: '#e4e4e4', padding: 2, marginLeft: 1, fontWeight: 'bold'}} variant='body1'>
          Hora
        </Typography>
        <Box sx={{width: '100%', display: 'flex', 
        alignItems: 'center', paddingLeft: 3, paddingRight: 3}}>
        <Grid container 
        direction={"row"} 
        rowGap={2} columnGap={2} 
        sx={{display: 'flex', alignItems: 'center', justifyContent: 'flex-start'}}>
          {availableHoursForCourts()?.map((hour) => {
            return(
            <Grid item xs={3.5} 
            onClick={() => handleTimeChange(hour.value)}
            sx={{background: (selectedTime === hour.value ) ? 'rgba(17, 177, 194, 0.7)' : '#fff',
            borderRadius: '8px', 
            display: 'flex', justifyContent: 'center', 
            paddingTop: 1, paddingBottom: 1,
            cursor: 'pointer', 
            border: (selectedTime === hour.value )&& '1.5px solid #00538A',
            boxShadow: (selectedTime === hour.value )&& 1}}
            key={hour?.value}>
              <Typography sx={{color: '#00538A'}}>
                {hour?.name}
              </Typography>
            </Grid>)
          })}
        </Grid>
        </Box>
        </Collapse>
        <Collapse in={hasTime}>
        <Typography sx={{color: '#e4e4e4', padding: 2, 
        marginLeft: 1, marginTop: 1, fontWeight: 'bold'}} variant='body1'>
          Cancha
        </Typography>
        <Box sx={{width: '100%', display: 'flex', 
        alignItems: 'center', paddingLeft: 3, paddingRight: 3}}>
        <Grid container 
        direction={"row"} 
        rowGap={2} columnGap={2} 
        sx={{display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'flex-start'}}>
          {availableCourtsForTime()?.map((court) => {
            return(
            <Grid item xs={3.5} 
            onClick={() => handleCourtChange(court.id)}
            sx={{background: (selectedCourt === court.id ) ? 'rgba(17, 177, 194, 0.7)' : '#fff',
            borderRadius: '8px', 
            display: 'flex', justifyContent: 'center', 
            paddingTop: 1, paddingBottom: 1,
            cursor: 'pointer', 
            border: (selectedCourt === court.id )&& '1.5px solid #00538A',
            boxShadow: (selectedCourt === court.id )&& 1}}
            key={court.id}>
              <Typography sx={{color: '#00538A'}}>
                {court.nombre}
              </Typography>
            </Grid>)
          })}
        </Grid>
        </Box>
        </Collapse>
        <Collapse in={hasCourt}>
        <Typography sx={{color: '#e4e4e4', padding: 2, marginLeft: 1, fontWeight: 'bold'}} variant='body1'>
           Forma de pago
          </Typography>
          <Box sx={{width: '100%', display: 'flex', 
          justifyContent:'center', padding: 2}}>
          <FormControl sx={{ width: '100%', }} size="small">
            <InputLabel id="demo-select-small-label" sx={{color:'#00B8D2'}}>
              Forma de pago</InputLabel>
            <Select
              labelId="demo-select-small-label"
              id="demo-select-small"
              value={paymentMethod}
              label="Forma de Pago"
              onChange={handleChange}
              sx={{backgroundColor: '#fff', borderRadius: '10px'}}
            >
              <MenuItem value={"zelle"}>Zelle</MenuItem>
              <MenuItem value={"pago_movil"}>Pago movil</MenuItem>
              <MenuItem value={"cash"}>Efectivo</MenuItem>
            </Select>
        </FormControl>
          </Box>
        </Collapse>
        {paymentMethod !== "cash" &&
        <Collapse in={hasMethod}>
          <Typography sx={{color: '#e4e4e4', padding: 2, marginLeft: 1, fontWeight: 'bold'}} variant='body1'>
            Comprobante de pago
          </Typography>
          <Box sx={{width: '100%', display: 'flex', 
          justifyContent:'center', paddingRight: 2, paddingLeft: 2}}>
          {showFileUploader ? 
          <Box sx={{width: '100%', display: 'flex', 
          justifyContent:'center', 
          padding: 2, border: '1px solid #00B8D2', 
          borderStyle: 'dotted', 
          borderRadius: '20px', alignItems: 'center', cursor: 'pointer'}}>
            <form
              action="#"
              onClick={handleUploadClick}
              encType="multipart/form-data"
            >
              <input
                type="file"
                style={{ display: "none" }}
                ref={fileInputRef}
                onChange={handleOnChange}
              ></input>
            <Stack direction="column" sx={{display: 'flex', 
            justifyContent: 'center', alignItems: 'center'}}>
              <UploadIcon fontSize='large' sx={{color: '#fff'}} />
              <Typography sx={{color: '#fff'}}>Subir Comprobante</Typography>
            </Stack>
            </form>
          </Box> :
          <Box sx={{width: '100%', display: 'flex', 
          justifyContent:'center', 
          padding: 2, border: '1px solid #00B8D2', 
          borderRadius: '20px', alignItems: 'center', }}>
            <Stack direction="row" sx={{display: 'flex', 
            justifyContent: 'center', alignItems: 'center', width: '100%'}}>
              <DownloadDoneIcon fontSize='medium' sx={{color: '#fff'}} />
              <Typography sx={{color: '#fff'}}>Archivo subido</Typography>
              <CloseIcon fontSize='medium' 
              sx={{marginLeft: 'auto', color:'#fff', cursor: 'pointer'}}
              onClick={() => handleDeletefile()} />
            </Stack>
          </Box>}
          </Box>
        </Collapse>}
        <Collapse in={hasCourt}>
          <Box 
          sx={{width: '100%', display: 'flex', 
          justifyContent:'center', padding: 2}}>
            <Button variant='contained' 
            fullWidth 
            onClick={submit}
            sx={{marginTop: 3, borderRadius: 10, color: '#fff'}}>
              Confirmar
            </Button>
          </Box>
        </Collapse>
    </Container>
    </Box>
    {isLoading && <Loading />}
    </Box>
  )
}

export default ReservationView
