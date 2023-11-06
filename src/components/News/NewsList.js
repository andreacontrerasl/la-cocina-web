import React, { useState, useEffect, useContext } from 'react'
import { Link, useLocation } from "react-router-dom"
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { Container, Divider } from '@mui/material';
import useMediaQuery from "@mui/material/useMediaQuery"
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import Grid from "@mui/material/Grid"
import Typography from "@mui/material/Typography"
import { useTheme } from "@mui/material/styles"
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import AuthContext from '../../context/AuthContext';



function NewsList() {
  const { user } = useContext(AuthContext);
    const theme = useTheme()
    const isDesktop = useMediaQuery(theme.breakpoints.up("md"))
    const [news, setNews] = useState([])

    useEffect(() => {
      const scrollToTop = () => {
        window.scrollTo(0, 0);
      };
  
      scrollToTop();
    }, []);

    useEffect(()=> {
        getNews()
    }, [])
    
    let getNews = async() =>{
        let response = await fetch('http://127.0.0.1:8000/api/news/', {
            method:'GET',
            headers:{
                'Content-Type':'application/json',
            }
        })
        let data = await response.json()
    
        if(response.status === 200){
          setNews(data)
        }
    }
  return (
    <Box sx={{minHeight:'100vh', width:'100%', backgroundColor:'#DEDFE1'}}>
    <Container disableGutters>
      <Typography variant='h5' 
      sx={{textAlign: 'center', paddingTop: 2, color: '#000'}}>
        Newsletter La Cocina
      </Typography>
      <Divider sx={{margin: 2}}/>
      {user?.groups?.includes('admin') &&
      <Box sx={{width: '100%', display: 'flex', justifyContent: 'flex-end'}}>
        <Link to="/news/create" style={{textDecoration: 'none', color: '#000'}}>
        <Button variant='contained' 
        sx={{marginRight: 5, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
          Agregar Noticia
        </Button>
        </Link>
      </Box>}
      <Grid container direction={isDesktop ? "row" : "column"}
        rowGap={3} 
        columnGap={2}
        sx={{display: 'flex', justifyContent: 'center', marginTop: 2}}>
      {news?.map((ann) => {
        return(
          <>
          <Grid item lg={3} md={5} sm={6} xs={12} 
      sx={{marginLeft: 2, marginRight: 2}}>
      <Box  sx={{position: 'relative',
        height:  '250px',
        display: 'flex',
        alignItems: 'flex-end',
        overflow: 'hidden',  borderRadius: '20px'}}
      >
        <img id="img" 
        style={{position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        objectFit: 'cover',borderRadius: '20px'}} src={`${ann.image_url}`}>
        </img>
        <Box style={{position: 'absolute',
        top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0, 0, 0, 0.4)', 
          zIndex: 1, borderRadius: '20px'}} />
          <Box sx={{ 
            position: 'relative',
            zIndex: 1,
            textAlign: 'flex-start',
            display: 'flex',
            color: '#fff',
            flexDirection: 'column',
            margin: 5, marginLeft: '10px'}}>
              <Link to={`/news/${ann.id}/`} 
              style={{textDecoration: 'none', color: '#fff', 
              display: 'flex', flexDirection: 'column'}}>
            <Typography
              variant='h6'
              component="span"
              style={{ fontWeight: "semibold", color: "#ffff" }}>
              {ann.title}
            </Typography>
            <Typography
              variant={ "caption"}
              component="span"
              sx={{color: "#ffff", 
              fontWeight: 'normal' }}>
              {ann.preview}
            </Typography>
            </Link>
          </Box>
        </Box>
      </Grid>
      </>
        )
      })}
    </Grid>
    </Container>
    </Box>
  )
}

export default NewsList
