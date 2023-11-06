import React, { useState, useEffect, useContext } from "react"
import { Link, useLocation } from "react-router-dom"
import useMediaQuery from "@mui/material/useMediaQuery"
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import AppBar from "@mui/material/AppBar"
import Toolbar from "@mui/material/Toolbar"
import IconButton from "@mui/material/IconButton"
import Container from "@mui/material/Container"
import MenuIcon from "@mui/icons-material/Menu"
import Button from "@mui/material/Button"
import Typography from "@mui/material/Typography"
import { useTheme } from "@mui/material/styles"
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { HERO_DRAWER_OPTIONS } from "../constants"
import DrawerComp from "./DrawerComp"
import AuthContext from "../../../context/AuthContext"

function Navbar() {
  const [tabValue, setTabValue] = useState("")
  const [openDrawer, setOpenDrawer] = useState(false)
  const {user, logoutUser} = useContext(AuthContext)
  const theme = useTheme()
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"))
  const location = useLocation();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    if (location.pathname === "/") {
      setTabValue("INICIO")
    } else if (location.pathname.includes("/news")) {
      setTabValue("NOTICIAS")
    } else if (location.pathname.includes("/about-us")) {
      setTabValue("NOSOTROS")
    }else if (location.pathname.includes("/shop")) {
      setTabValue("TIENDA")
    }
    else{
      setTabValue("")
    }
  }, [location.pathname])

  return (
    <AppBar
      sx={{background: isDesktop ? 'linear-gradient(to right, #DA1B59 95%, #00B8D2 5%)' : '#DA1B59', 
      boxShadow: 0}}
      position="sticky">
        <Toolbar>
          <Link
            to={"/"}
            style={{ justifyContent: "center", display: "flex" }}>
            <img
              src="/LACOCINA_LOGO.png"
              alt="LaCocina"
              width={ 160 }
              height={ 50 }
            />
          </Link>
          {isDesktop ? (
              <>
            <Stack direction='row' sx={{verticalAlign: 'middle', display: 'flex', alignItems: 'center', justifyContent: 'flex-end', width: '100%'}}>
            {HERO_DRAWER_OPTIONS.map((page) => (
                <Link to={page.route} style={{ color: "#fff", textDecoration: "none" }}>
                  <Typography
                    key={page.text}
                    sx={{
                      fontWeight: tabValue === page.text && "bold",
                      paddingLeft: 2,
                      paddingRight: 2,
                    }}>{`${page.text}`}
                  </Typography>
                </Link>
              ))}
              <Box sx={{backgroundColor: '#00B8D2', minHeight: '64px', display: 'flex', alignItems: 'center', paddingLeft: 2}}>
              <Link to="/court-reservation" 
              style={{ color: "#fff", textDecoration: "none" }}>
                <Button 
                variant="contained" 
                sx={{backgroundColor: '#fff', 
                color: '#000', 
                "&:hover": { color: "#fff"},
                borderRadius: 10}}>
                  Reservar cancha
                </Button>
              </Link>
              {user ?
              <div>
                <Avatar onClick={handleClick}
                sx={{marginLeft: 2, cursor: 'pointer'}}
                alt="Remy Sharp" 
                src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png" />
                <Menu
                  id="basic-menu"
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  MenuListProps={{
                    'aria-labelledby': 'basic-button',
                  }}
                  sx={{marginTop: 1}}
                >
                  <MenuItem onClick={handleClose}>Perfil</MenuItem>
                  <Link to="my-reservations" style={{color:'#000', textDecoration: 'none'}}>
                  <MenuItem >Mis Reservas</MenuItem>
                  </Link>
                  <MenuItem onClick={logoutUser}>Cerrar sesión</MenuItem>
                </Menu>
              </div> : 
              <Link to="/login" style={{ color: "#fff", textDecoration: "none" }}>
                <Button 
                variant="text" 
                sx={{marginLeft: 1, color: '#fff'}}>
                  Iniciar sesión
                </Button>
              </Link>}
              </Box>
            </Stack>
            </>
            ):(
              <>
              <DrawerComp
                openDrawer={openDrawer}
                setOpenDrawer={setOpenDrawer}
                user={user}
                logoutUser={logoutUser}
              />
              <IconButton
                sx={{ marginLeft: "auto", marginRight: 2, color: "#fff"}}
                onClick={() => setOpenDrawer(!openDrawer)}>
                <MenuIcon />
              </IconButton>
            </>
            )}
          
        </Toolbar>
    </AppBar>
  )
}
export default Navbar
