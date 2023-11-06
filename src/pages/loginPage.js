import React, {useContext} from 'react'
import { useForm } from "react-hook-form"
import { Link } from "react-router-dom"
import Box from "@mui/material/Box"
import Grid from "@mui/material/Grid"
import Container from "@mui/material/Container"
import Typography from "@mui/material/Typography"
import Button from "@mui/material/Button"
import useMediaQuery from "@mui/material/useMediaQuery"
import { useTheme } from "@mui/material/styles"
import FormInputText from '../common/FormComponents/FormInputText'
import AuthContext from '../context/AuthContext'

const defaultValues = {
  username: "",
  password: "",
}

function LoginPage() {
  const methods = useForm({ defaultValues })
  const { handleSubmit, control, watch } = methods
  let {loginUser} = useContext(AuthContext)

  const theme = useTheme()
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"))


  const onSubmit = async (data) =>{
    const {
      username,
      password,
    } = data
    loginUser(data)
  }
  return (
    <Box sx={{backgroundColor: '#fff', minHeight: '100vh', position: 'relative',}}>
    <Container disableGutters 
    sx={{justifyContent: 'center', display: 'flex', paddingTop: 2, }}>
      <Box 
      sx={{
      height: '100%', 
      marginTop: 10, 
      padding: 3,
      borderRadius: '10px',
      width: '400px',
      boxShadow: isDesktop && 10, backgroundColor: '#fff'
      }}>
        <Typography variant='h5' sx={{textAlign: 'center', marginBottom: 2}}>
          Iniciar sesión
        </Typography>
        <Grid container direction="column" rowGap={3}>
          <Grid item xs={12}>
          <FormInputText
            name="username"
            control={control}
            label="Username"
            rules={{
              maxLength: {
                value: 48,
                message: "Max length of Username is 48 characters.",
              },
            }}
            />
            </Grid>
            <Grid item xs={12}>
          <FormInputText
            name="password"
            control={control}
            label="Password"
            type="password"
            rules={{
              maxLength: {
                value: 48,
                message: "Max length of Username is 48 characters.",
              },
            }}
            />
            </Grid>
            <Grid item xs={12}>
              <Typography variant='body2'>
                No tienes una cuenta? 
                <Link to={"/register"} style={{color: "#00B8D2", textDecoration: 'none'}}>
                <Button variant='text' sx={{textTransform: 'capitalize', fontSize: '14px'}}>
                    Regístrate
                </Button>
                </Link>
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Button variant='contained' 
              onClick={handleSubmit(onSubmit)}
              fullWidth 
              sx={{borderRadius: 10, color: '#fff'}}> 
                Iniciar Sesión
              </Button>
            </Grid>
          
        </Grid>

      </Box>
    </Container>
    </Box>
  )
}

export default LoginPage
