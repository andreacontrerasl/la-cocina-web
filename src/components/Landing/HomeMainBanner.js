import React, { useState, useEffect } from 'react'
import { Link, useLocation } from "react-router-dom"
import useMediaQuery from "@mui/material/useMediaQuery"
import Box from "@mui/material/Box"
import Stack from "@mui/material/Stack"
import Button from "@mui/material/Button"
import Typography from "@mui/material/Typography"
import { useTheme } from "@mui/material/styles"

function HomeMainBanner({title, title2, button, img, url, type}) {
    const theme = useTheme()
    const isDesktop = useMediaQuery(theme.breakpoints.up("md"))
  return (
    <Box  sx={{position: 'relative',
        height: isDesktop ? '90vh':'500px',
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden',  
        width: '100%', 
        justifyContent: !isDesktop  ? 'flex-start' : 'center'}}
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
          backgroundColor: 'rgba(0, 0, 0, 0.3)' , 
          zIndex: 1, }} />
          <Stack direction="column" style={{ 
            position: 'relative',
            zIndex: 1,
            display: 'flex',
            color: '#fff',
            padding: 5,
            justifyContent: (!isDesktop) ? 
            'flex-start' : 'center', alignItems: 'center', width: '100%' }}>
            <Typography
              variant={(isDesktop ? 'h2' : 'h2')}
              component="span"
              style={{ fontWeight: "bold", color: "#ffff",
              textAlign: 'start', letterSpacing: '3px', 
              fontSize:  (isDesktop ? '80px' : '40px'), marginLeft: '40px' }}>
              {title}
            </Typography>
            <Box 
            sx={{justifyContent: 'flex-end', 
            display: 'flex', marginLeft: 'auto', 
            width: '100%', 
            textAlign: 'end'}}>
            <Typography
              variant={ (isDesktop ? 'h2' : 'h4') }
              component="span"
              sx={{color: "#ffff", 
              fontWeight: 'bold' , 
              marginLeft: isDesktop ?  '170px' : '40px', 
              fontStyle:  "italic",
              letterSpacing:  '3px',
              textAlign: 'end',
              fontSize: (isDesktop ? '80px' : '40px'), 
              marginRight: !isDesktop && '40px'}}>
              {title2}
            </Typography>
            </Box>
          </Stack>
        </Box>
  )
}

export default HomeMainBanner
