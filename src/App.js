import React, {useState} from 'react'
import { useContext } from "react";
import { ThemeProvider } from "@mui/material/styles"
import { Routes, Route, Navigate, useNavigate, useLocation } from "react-router-dom";
import './App.css';
import HomePage from './pages/homePage';
import LoginPage from './pages/loginPage';
import mainTheme from './styles/theme/mainTheme';
import Navbar from './components/Landing/Navbar/Navbar';
import Registerpage from './pages/registerpage';
import ReservationPage from './pages/reservationPage';
import ConfirmationPage from './pages/confirmationPage';
import AuthContext from './context/AuthContext';
import NewsPage from './pages/newsPage';
import NewsIndividualView from './components/News/NewsIndividualView';
import NewsList from './components/News/NewsList';
import ReservationView from './components/Reservations/ReservationView';
import ReservationsPage from './pages/reservationsPage';
import CreateNews from './components/News/CreateNews';
import Footer from './components/Landing/Footer/Footer';
import AboutPage from './pages/aboutPage';
import { LoadingProvider } from './context/LoadingContext';

function App() {
  const location = useLocation()

  const routesWithoutNavbar = ['/court-reservation', '/court-reservation/*', '/confirmation'];
  
  const isNavbarHidden = routesWithoutNavbar.some((path) =>
    location.pathname.includes(path)
  );

  return (
    <ThemeProvider theme={mainTheme}>
      <LoadingProvider>
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh'}}>
        {!isNavbarHidden && <Navbar />}
        <div style={{ flex: '1' }}>
        <Routes>
          <Route path="/" element={<HomePage />}  />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<Registerpage />} />
          <Route path="/about-us" element={<AboutPage />} >
          </Route>
          <Route path="/court-reservation" element={<ReservationPage />} >
            <Route element={<ReservationView />} path="" />
            <Route element={<ConfirmationPage />} path=":reservationId" />
          </Route>
          <Route path="/news" element={<NewsPage />} >
            <Route element={<NewsList />} path="list" />
            <Route element={<NewsIndividualView />} path=":newsId" />
            <Route 
            element={<HasPermission>
                      <CreateNews />
                    </HasPermission>} path="create" />
          </Route>
          <Route path="/my-reservations" element={<ReservationsPage />} >
          </Route>
        </Routes>
        </div>
        <Footer />
        </div>
        </LoadingProvider>
    </ThemeProvider>
  );
}

function HasPermission({ children }) {
  let { user } = useContext(AuthContext);
  const userPermission =
    user?.groups?.includes('admin')

  return !userPermission ? <Navigate to="/" /> : children;
}

export default App;
