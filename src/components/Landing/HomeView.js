import React, { useState, useEffect } from 'react'
import { Link, useLocation } from "react-router-dom"
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css"
import useMediaQuery from "@mui/material/useMediaQuery"
import Box from "@mui/material/Box"
import Stack from "@mui/material/Stack"
import Grid from "@mui/material/Grid"
import Typography from "@mui/material/Typography"
import { useTheme } from "@mui/material/styles"
import HomeBanner from './HomeBanner';
import NewsCard from '../News/NewsCard';
import { youtube } from '../../utils/linksYoutube';
import YoutubeEmbed from '../../utils/YoutubePreview';
import Loading from '../../common/Loading';
import HomeMainBanner from './HomeMainBanner';
import { useLoading } from '../../context/LoadingContext';

function HomeView() {
  const theme = useTheme()
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"))
  const [news, setNews] = useState([])
  const { showLoading, hideLoading, isLoading } = useLoading();

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
    showLoading()
    let response = await fetch('http://127.0.0.1:8000/api/news/', {
        method:'GET',
        headers:{
            'Content-Type':'application/json',
        }
    })
    let data = await response.json()

    if(response.status === 200){
      hideLoading()
      setNews(data)
    }
    hideLoading()
  }

  const settings = {
    dots: true,
    infinite: true,
    speed: 600,
    slidesToShow: 3,
    slidesToScroll: 3,
    initialSlide: 0,
    autoplay: true,
    autoplaySpeed: 2500,
    arrows: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
          dots: false
        }
      },
      {
        breakpoint: 620,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  return (
    <>
    <Box sx={{position: 'relative',
    width: '100%',
    overflow: 'hidden', backgroundColor: '#DEDFE1',}}>
    <Carousel autoPlay infiniteLoop showStatus={false}>
      <HomeMainBanner 
      img={'/banner.png'}
      type={"first"} 
      title={"DESAFÍA TUS LÍMITES"} 
      title2={'JUEGA PICKLEBALL'} />
      <HomeBanner 
      title={"Ya abrimos nuestras canchas"} 
      button={"Reservar"} 
      img={'/pickle.jpeg'} 
      description={"Ya abrimos en el CC Plaza las Americas, ven a conocernos"}
       url="/court-reservation"  />
      <HomeBanner 
      title={"Enterate de las últimas noticias"} 
      button={"Newsletter"} 
      img={'/pickle.jpeg'} url="/news/list"  />

    </Carousel>
      {/*<Box component="img" src='/pickle.jpeg'  
      sx={{width: '80%',
       display: 'flex',
      objectFit: 'cover',
      zIndex: -1,
      top: 0,
      right: 0, 
      height: !isDesktop && '500px',
      marginLeft: 'auto', filter: 'blur(1.2px)'}}>
      </Box>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '13%',
          transform: 'translate(-20%, -50%)',
          color: '#fff',
        }}
      >
        <Typography variant={isDesktop ? "h2" : 'h4'} 
        sx={{fontWeight: 'normal', 
        textShadow: "1px 1px 0px #787878", 
        textAlign: 'flex-start'}}>
          DESAFÍA TUS LÍMITES
        </Typography>
        <Typography variant={isDesktop ? "h2" : 'h4'}
        sx={{fontStyle: 'italic', 
        textShadow: "1px 1px 0px #787878", 
        textAlign: 'end', fontWeight: 'light'}}>
          JUEGA PICKLEBALL
        </Typography>
      </Box>*/}
      </Box>
    <Box sx={{backgroundColor: '#DEDFE1', 
    paddingLeft: 3, paddingRight: 3, 
    paddingBottom: 5, marginTop: 0}}>
    <Typography variant='h5' sx={{color: '#000', paddingBottom: 3, }}>
      Noticias
    </Typography>
    {(news?.length > 3 || (!isDesktop)) ? 
    <Slider  {...settings}>
      {news?.map((ann) => {
        return(
          <NewsCard ann={ann} />
        )
      })}
    </Slider> : 
    <Grid container direction="row" 
    sx={{display: 'flex', justifyContent: 'center'}} columnGap={3}>
      {news?.map((ann) => {
        return(
          <Grid item>
          <NewsCard ann={ann} />
          </Grid>
        )
      })}
    </Grid>}
  </Box>
  <Box sx={{backgroundColor: '#fff', 
    padding: 3, paddingBottom: 7 }}>
    <Typography variant='h5' sx={{ color: '#000', paddingBottom: 3}}>
      Nuestro Canal de Youtube
    </Typography>
    {(youtube?.length > 3 || (!isDesktop)) ? 
    <Slider  {...settings}>
      {youtube?.map((ann) => {
        return(
          <YoutubeEmbed embedId={ann} />
        )
      })}
    </Slider> : 
    <Grid container direction="row" 
    sx={{display: 'flex', justifyContent: 'center'}} columnGap={3}>
      {youtube?.map((ann) => {
        return(
          <Grid item>
            <YoutubeEmbed embedId={ann} />
          </Grid>
        )
      })}
    </Grid>}
  </Box>
  <Box sx={{paddingTop: 2, paddingBottom: 2, 
    backgroundColor: '#DEDFE1'}}>
    <Typography variant='h5' sx={{paddingLeft: 3, color: '#000'}}>
      Nuestros socios
    </Typography>
    {isDesktop ? 
    <Stack direction="row" spacing={4} 
    sx={{ width: '100%', padding: 2, display: 'flex', 
    justifyContent: 'center', alignItems: 'center'}}>
      <Box sx={{backgroundColor: '#fff', 
      maxWidth: '130px', height: '130px', borderRadius: '50%', 
      display: 'flex', 
      justifyContent: 'center', alignItems: 'center' }}>
        <img src='/volair.webp' width={'130px'} height={50} />
      </Box>
      <Box sx={{ 
      maxWidth: '130px', height: '130px', borderRadius: '50%', 
      display: 'flex', 
      justifyContent: 'center', alignItems: 'center',}}>
        <img src='/dupr.jpeg' width={'130px'} height={'130px'} 
        style={{borderRadius: '50%'}} />
      </Box>
      <Box sx={{backgroundColor: '#fff', 
      maxWidth: '130px', height: '130px', borderRadius: '50%', 
      display: 'flex', 
      justifyContent: 'center', alignItems: 'center', }}>
        <img src='/holbrook.webp' width={'130px'} height={70} />
      </Box>
      <Box sx={{ 
      maxWidth: '160px', height: '145px', borderRadius: '50%', 
      display: 'flex', 
      justifyContent: 'center', alignItems: 'center' }}>
        <img src='/pan.png' width={'160px'} height={'145px'}  />
      </Box>
    </Stack> : 
    <Stack direction="column" spacing={3} 
    sx={{ width: '100%', padding: 2, display: 'flex', 
    justifyContent: 'center', alignItems: 'center'}}>
      <Stack direction="row" spacing={3} 
    sx={{ width: '100%', padding: 2, display: 'flex', 
    justifyContent: 'center', alignItems: 'center'}}>
      <Box sx={{backgroundColor: '#fff', 
      maxWidth: '130px', height: '130px', borderRadius: '50%', 
      display: 'flex', 
      justifyContent: 'center', alignItems: 'center' }}>
        <img src='/volair.webp' width={'130px'} height={50} />
      </Box>
      <Box sx={{ 
      maxWidth: '130px', height: '130px', borderRadius: '50%', 
      display: 'flex', 
      justifyContent: 'center', alignItems: 'center',}}>
        <img src='/dupr.jpeg' width={'130px'} height={'130px'} 
        style={{borderRadius: '50%'}} />
      </Box>
      </Stack>
      <Stack direction="row" spacing={3} 
    sx={{ width: '100%', padding: 2, display: 'flex', 
    justifyContent: 'center', alignItems: 'center'}}>
      <Box sx={{backgroundColor: '#fff', 
      maxWidth: '130px', height: '130px', borderRadius: '50%', 
      display: 'flex', 
      justifyContent: 'center', alignItems: 'center', }}>
        <img src='/holbrook.webp' width={'130px'} height={70} />
      </Box>
      <Box sx={{ 
      maxWidth: '160px', height: '145px', borderRadius: '50%', 
      display: 'flex', 
      justifyContent: 'center', alignItems: 'center' }}>
        <img src='/pan.png' width={'160px'} height={'145px'}  />
      </Box>
      </Stack>
    </Stack>
    }
  </Box>
  {isLoading && <Loading />}
  </>
  )
}

export default HomeView
