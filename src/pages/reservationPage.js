import React from 'react'
import { Outlet } from 'react-router-dom'
import ReservationView from '../components/Reservations/ReservationView'

function ReservationPage() {
  return (
    <>
      <Outlet />
    </>
  )
}

export default ReservationPage
