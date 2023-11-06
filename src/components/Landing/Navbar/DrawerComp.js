import React from "react"
import { Link, useNavigate } from "react-router-dom"
import Drawer from "@mui/material/Drawer"
import List from "@mui/material/List"
import ListItemButton from "@mui/material/ListItemButton"
import ListItemText from "@mui/material/ListItemText"
import Button from "@mui/material/Button"

const HERO_DRAWER_OPTIONS = [
    { text: "INICIO", route: "/" },
    { text: "NOTICIAS", route: "/news" },
    { text: "NOSOTROS", route: "/about-us" },
    { text: "TIENDA", route: "/shop" },
]

function DrawerComp({ openDrawer, setOpenDrawer, user, logoutUser }) {
  const navigate = useNavigate()

  const onClickEvent = (event) => {
    setOpenDrawer(false)
    navigate(event)
  }
  return (
    <Drawer
      open={openDrawer}
      anchor="right"
      onClose={() => setOpenDrawer(false)}>
      <List >
        {HERO_DRAWER_OPTIONS?.map((page) => (
            <ListItemButton onClick={() => onClickEvent(page.route)} key={page.text}>
              <ListItemText>{`${page.text}`}</ListItemText>
            </ListItemButton>
        ))}
        {user ?
        <ListItemButton onClick={logoutUser}>
          <ListItemText>{`CERRAR SESIÓN`}</ListItemText>
        </ListItemButton>:
          <ListItemButton onClick={() => onClickEvent("/login")}>
            <ListItemText>{`INICIAR SESIÓN`}</ListItemText>
          </ListItemButton>}
          <ListItemButton onClick={() => onClickEvent("/court-reservation")}>
            <ListItemText>
            <Link to="/court-reservation" 
              style={{ color: "#fff", textDecoration: "none" }}>
            <Button 
                variant="contained" 
                sx={{backgroundColor: '#00B8D2', 
                color: '#FFF', 
                "&:hover": { color: "#fff"},
                borderRadius: 10}}>
                  Reservar cancha
                </Button>
              </Link>
            </ListItemText>
          </ListItemButton>
        
      </List>
    </Drawer>
  )
}

export default DrawerComp