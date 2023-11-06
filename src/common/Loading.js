import React from "react"
import Box from "@mui/material/Box"
import CircularProgress from "@mui/material/CircularProgress"

const Loading = () => {
  return (
    <div style={{position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 9999,}}>
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Box sx={{ m: 1, position: "relative" }}>
        <img
          src="/LACOCINA_SELLO.png"
          alt="La Cocina"
          width={80}
          height={70}
          style={{
            justifyContent: "center",
            display: "flex",
            marginTop: '25px',
            marginLeft: '20px'
          }}
        />
        <CircularProgress
          size={130}
          thickness={0.5}
          color="white"
          sx={{
            position: "absolute",
            top: -5,
            left: -5,
            zIndex: 1,
          }}
        />
      </Box>
    </Box>
    </div>
  )
}

export default Loading
