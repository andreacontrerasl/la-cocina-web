import React from 'react'
import Container from "@mui/material/Container"
import { useTheme } from "@mui/material/styles"
import useMediaQuery from "@mui/material/useMediaQuery"
import {Link} from 'react-router-dom';
import Box from "@mui/material/Box"
import Grid from "@mui/material/Grid"
import Stack from "@mui/material/Stack"
import Typography from "@mui/material/Typography"
import CopyrightIcon from "@mui/icons-material/Copyright"
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import FacebookIcon from '@mui/icons-material/Facebook';

const HERO_FOOTER_OPTIONS = [
    { text: "Inicio", route: "/" },
    { text: "Noticias", route: "/news" },
    { text: "Nosotros", route: "/about-us" },
    { text: "Reservar", route: "/court-reservation" },
]

function Footer() {
  const theme = useTheme()
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"))
  return (
    <Box sx={{backgroundColor: "#343434", width: '100%', marginTop: 'auto',}}>
      <Container disableGutters maxWidth="lg">
    <Grid
      container
      direction={isDesktop ? "row" : "column"}
      sx={{ padding: 1 }}>
        <Grid item md={2}>
          <Link to="/" style={{textDecoration: 'none'}}>
            <img
              src="\LACOCINA_LOGO.png"
              alt="lacocina"
              style={{width: 140, height: 55, paddingLeft: '5px'}}
            />
          </Link>
        </Grid>
      <Grid item md={10} 
      sx={{justifyContent: 'flex-end', display: 'flex', alignContent: 'center'}}>
        <Stack direction="row" spacing={1} 
        sx={{marginTop:2}}>
          {HERO_FOOTER_OPTIONS.map((page) => (
            <React.Fragment key={page.text}>
              <Link
                key={page.text}
                to={page.route}
                passHref
                style={{
                  color: "#fff",
                  textDecoration: "none",
                  alignItems: "center",
                  display: "flex",
                  textAlign: 'center'
                }}>
                <Typography
                  key={page.text}
                  variant={"body2"}
                  sx={{
                    color: "#ffff",
                    fontWeight: "bold",
                    paddingRight: isDesktop ? 3 : 1
                  }}>{`${page.text}`}</Typography>
                  </Link>
            </React.Fragment>
          ))}
        </Stack>
      </Grid>
    </Grid>
      <Grid container direction='row' sx={{marginTop: '20px', marginBottom: '10px'}}>
        <Grid item xs={6} sx={{display: 'flex', 
        alignItems: 'center', paddingLeft: '15px', display: 'flex', justifyContent: 'flex-start'}}>
          <CopyrightIcon fontSize="sm" 
          sx={{color: '#B1B1B1', 
          paddingTop: !isDesktop && 1, 
          paddingRight: 0.5,}}/>
          <Typography variant='caption' 
          sx={{color: '#B1B1B1', paddingTop: isDesktop ? 0.2 : 1.2}}>
              {`2023 La Cocina Pickleball.`}
          </Typography>
        </Grid>
        
        <Grid item xs={6} 
        sx={{marginLeft: 'auto', paddingRight: '20px', 
        display: 'flex', justifyContent: 'flex-end', alignItems:'center' }}>
          <LinkedInIcon color='white' sx={{cursor: 'pointer', marginRight: '5px'}} />
          <InstagramIcon color='white' sx={{cursor: 'pointer', marginRight: '5px'}} />
          <FacebookIcon color='white' sx={{cursor: 'pointer', marginRight: '5px'}} />
          <TwitterIcon color='white' sx={{cursor: 'pointer', marginRight: '5px'}} />
        </Grid>
        
    </Grid>
    </Container>
    </Box>
  )
}

export default Footer
