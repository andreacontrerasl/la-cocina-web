import React, {useEffect, useState, useContext} from 'react'
import {parseISO, compareAsc}  from "date-fns"
import { useForm } from "react-hook-form"
import { Link, useNavigate } from "react-router-dom"
import Box from "@mui/material/Box"
import Grid from "@mui/material/Grid"
import Stack from '@mui/material/Stack';
import Container from "@mui/material/Container"
import Typography from "@mui/material/Typography"
import Button from "@mui/material/Button"
import Divider from "@mui/material/Divider"
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';
import AuthContext from '../../context/AuthContext'
import IndividualReservationCard from './IndividualReservationCard'
import Loading from '../../common/Loading'
import { useLoading } from '../../context/LoadingContext'

function ReservationsList() {
    const [reservas, setReservas] = useState([])
    const {user, authTokens, logoutUser} = useContext(AuthContext)
    const { showLoading, hideLoading, isLoading } = useLoading();

    const token = JSON.parse(localStorage.getItem('authTokens'))

    useEffect(()=> {
        getReservations()
      }, [])

    let getReservations = async() =>{
      showLoading()
        let response = await fetch(`http://127.0.0.1:8000/api/reservas/`, {
            method:'GET',
            headers:{
                'Content-Type':'application/json',
                'Authorization':'Bearer ' + String(token?.access)
            }
        })
        let data = await response.json()
    
        if(response.status === 200){
            setReservas(data)
            hideLoading()
        }else if(response.statusText === 'Unauthorized'){
            logoutUser()
            hideLoading()
        } 
    }
    const sortedData = reservas.sort((a, b) => {
        return (
          new Date(b.dia) - new Date(a.dia)
        );
    });

    const cancelReservation = async(reservationId, datos) => {

      try {
        const response = await fetch(`http://127.0.0.1:8000/api/reservas/edit/${reservationId}/`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + String(token?.access),
          },
          body: JSON.stringify(datos),
        });
    
        if (response.ok) {
          getReservations()
          const data = await response.json();
          // Manejar la respuesta exitosa, por ejemplo, actualizar la UI
        } else {
          console.log('error')
          // Manejar errores aquí
        }
      } catch (error) {
        // Manejar errores de red
      }

    }

    return (
    <Container maxWidth='sm'>
        <Typography variant='h5' sx={{textAlign: 'center', marginTop: 2}}>
            Mis Reservas
        </Typography>
        <Divider sx={{margin: 2}}/>
        {reservas.length > 0 ? 
        
        <Stack direction={"column"} spacing={2} sx={{marginBottom: 5}}>
            {reservas.map((reserva) => {
                let status
                if(reserva.status === "ACTIVE"){
                  status = "Próximo";
                }else if (reserva.status === "PAST"){
                  status = "Penalizado";
                }else if (reserva.status === "CANCELED"){
                  status = "Cancelada";
                }else if (reserva.status === "CHECK"){
                  status = "Vencido";
                }
                
                return(
                  <IndividualReservationCard reserva={reserva} 
                  status={status} cancelReservation={cancelReservation} />
                )
            })}
        </Stack> : 
        <Stack direction="column" 
        sx={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
          <SentimentDissatisfiedIcon/>
          <Typography>
            No tienes ninguna reserva
          </Typography>
          <Link to="/court-reservation" 
              style={{ color: "#fff", textDecoration: "none" }}>
          <Button variant='contained' 
          sx={{borderRadius: '20px', marginTop: '20px', color: '#fff'}}>
            Reservar Cancha
          </Button>
          </Link>
        </Stack>
        }
        {isLoading && <Loading />}
    </Container>
  )
}

export default ReservationsList
