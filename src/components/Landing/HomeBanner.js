import React, { useState, useEffect } from 'react'
import { Link, useLocation } from "react-router-dom"
import useMediaQuery from "@mui/material/useMediaQuery"
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import Typography from "@mui/material/Typography"
import { useTheme } from "@mui/material/styles"

function HomeBanner({title, description, button, img, url, type}) {
    const theme = useTheme()
    const isDesktop = useMediaQuery(theme.breakpoints.up("md"))
  return (
    <Box  sx={{position: 'relative',
        height: isDesktop ? '90vh':'500px',
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden',  
        width: '100%', 
        justifyContent: (!isDesktop && type === 'first') ? 'flex-start' : 'center'}}
    >
        <img id="img" 
        style={{position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        objectFit: 'cover'}} 
        src={img} >
        </img>
        <Box style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: type !== 'first' ? 'rgba(0, 0, 0, 0.5)' :'rgba(0, 0, 0, 0.3)' , 
          zIndex: 1, }} />
          <Box style={{ 
            position: 'relative',
            zIndex: 1,
            display: 'flex',
            color: '#fff',
            flexDirection: 'column',
            padding: 5,
            justifyContent: (!isDesktop && type === 'first') ? 
            'flex-start' : 'center', alignItems: 'center' }}>
            <Typography
              variant={type === 'first' ? (isDesktop ? 'h2' : 'h4') : 
              (isDesktop ? 'h2' : 'h4')}
              component="span"
              style={{ fontWeight: "bold", color: "#ffff",
              textAlign: 'flex-start', letterSpacing: '3px', 
              fontSize: type === 'first' && (isDesktop && '80px') }}>
              {title}
            </Typography>
            <Typography
              variant={ type === 'first' ? (isDesktop ? 'h2' : 'h4') : 
              (isDesktop ? "h6" :'body1')}
              component="span"
              sx={{color: "#ffff", 
              fontWeight: type === 'first' ? 'bold' : 'normal', 
              textAlign: 'flex-end', 
              marginLeft: type === 'first' && '170px', 
              fontStyle: type === 'first' && "italic",
              letterSpacing: type === 'first' &&  '3px',
              marginTop: type === 'first' && 3, fontSize: type === 'first' && 
              (isDesktop && '80px')}}>
              {description}
            </Typography>
            {button && <Link to={`${url}`} 
              style={{textDecoration: 'none', color: '#fff', 
              display: 'flex', justifyContent: 'center', marginTop: '20px'}}>
                <Button variant='contained' 
                sx={{width: 'fit-content', borderRadius: 10,
                backgroundColor: '#fff', 
                color: '#000', 
                "&:hover": { color: "#fff"},}}>
                    {button}
                </Button>
            </Link>}
          </Box>
        </Box>
  )
}

export default HomeBanner
