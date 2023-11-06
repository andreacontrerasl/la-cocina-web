import { createTheme } from "@mui/material/styles"

let mainTheme = createTheme({
    typography: {
      fontFamily: "Gotham Narrow, sans-serif",
    },
    palette: {
        primary: { main: "#00B8D2" }, 
        paper: { main: "#e4e4e4" },
        gray: { main: "#D9D9D9" },
        white: { main: "#fff" },
        background: {
          default: "#fff",
          paper: "#fff",
        },
    },
    
  })

  
  export default mainTheme