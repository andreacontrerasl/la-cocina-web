import React, { useState, useEffect } from 'react'
import { Link, useLocation, useParams, useNavigate } from "react-router-dom"
import { Parallax } from 'react-parallax';
import useMediaQuery from "@mui/material/useMediaQuery"
import Box from "@mui/material/Box"
import Stack from "@mui/material/Stack"
import Container from "@mui/material/Container"
import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined';
import Typography from "@mui/material/Typography"
import { useTheme } from "@mui/material/styles"

function NewsIndividualView() {
    const bannerStyles = {
        maxHeight: 400,
        maxWidth: "100%",
        width: "auto",
        height: "auto",
        objectFit: "contain",
        borderRadius: 4,
    }
    
    const theme = useTheme()
    const isDesktop = useMediaQuery(theme.breakpoints.up("md"))
    const [individualNews, setIndividualNews] = useState([])
    const location = useLocation();
    const navigate = useNavigate()

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
        let response = await fetch(`http://127.0.0.1:8000/api/news/${location.pathname.split("/")[2]}`, {
            method:'GET',
            headers:{
                'Content-Type':'application/json',
            }
        })
        let data = await response.json()
    
        if(response.status === 200){
            setIndividualNews(data)
        }
    }

    const indicators = individualNews?.body?.split("\n")


  return (
    <div>
    <Parallax
        blur={{ min: -15, max: 15 }}
        bgImage={`${individualNews.image_url}`}
        bgImageAlt="event picture"
        strength={500} // Adjust the strength to control parallax effect
        style={{ minHeight: '450px' }} // Adjust the height of the parallax section
    >
        <ArrowBackOutlinedIcon 
        sx={{marginTop: 2, cursor: 'pointer', marginLeft: 2, 
        color: '#fff'}} 
        onClick={() => navigate(-1)} />
    
    </Parallax>
    <Box sx={{backgroundColor: '#DEDFE1',  
    paddingBottom: '30px'}}>
        <Container maxWidth="md" 
        sx={{display: 'flex', justifyContent: 'center',}}>
        <Stack direction="column" spacing={2}>
            <Typography variant='h5' 
            style={{fontWeight: 'bold', textAlign: 'center', 
            marginTop: '20px', color: '#000'}}>
                {individualNews.title}
            </Typography>
            {indicators?.map((text) => (
                <Typography variant='body1' sx={{color: '#000'}}>
                {text}
                </Typography>
            ))}
        </Stack>
        </Container>
    </Box>
    
    </div>
  )
}

export default NewsIndividualView
