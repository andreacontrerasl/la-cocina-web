import React, { useState, useEffect } from 'react'
import { Link, useLocation } from "react-router-dom"
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import useMediaQuery from "@mui/material/useMediaQuery"
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import { useTheme } from "@mui/material/styles"

function NewsCard({ann}) {
    const theme = useTheme()
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"))
  return (
    <Box sx={{display: 'flex', alignItems:'center', justifyContent: 'center'}}>
    <Box  sx={{position: 'relative',
        height:  '250px',
        display: 'flex',
        alignItems: 'flex-end',
        overflow: 'hidden',  
        borderRadius: '20px', 
        width: '300px', 
        justifyContent: 'flex-start'}}
      >
        <img id="img" 
        style={{position: 'absolute',
        top: 0,
        left: 0,
        width: '300px',
        height: '250px',
        objectFit: 'cover',borderRadius: '20px'}} 
        src={`${ann.image_url}`}>
        </img>
        <Box style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0, 0, 0, 0.4)', 
          zIndex: 1, borderRadius: '20px'}} />
          <Box style={{ 
            position: 'relative',
            zIndex: 1,
            textAlign: 'flex-start',
            display: 'flex',
            color: '#fff',
            flexDirection: 'column',
            margin: 5, marginLeft: '10px', justifyContent: 'flex-start' }}>
              <Link to={`/news/${ann.id}/`} 
              style={{textDecoration: 'none', color: '#fff', 
              display: 'flex', flexDirection: 'column',}}>
            <Typography
              variant='h6'
              component="span"
              style={{ fontWeight: "semibold", color: "#ffff",textAlign: 'flex-start', }}>
              {ann.title}
            </Typography>
            <Typography
              variant={ "caption"}
              component="span"
              sx={{color: "#ffff", 
              fontWeight: 'normal', 
              textAlign: 'flex-start', }}>
              {ann.preview}
            </Typography>
            </Link>
          </Box>
        </Box>
        </Box>
  )
}

export default NewsCard
