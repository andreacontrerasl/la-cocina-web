import React, {useState} from 'react'
import { useForm } from "react-hook-form"
import { Link, useNavigate } from "react-router-dom"
import useMediaQuery from "@mui/material/useMediaQuery"
import Box from "@mui/material/Box"
import Grid from "@mui/material/Grid"
import Container from "@mui/material/Container"
import Typography from "@mui/material/Typography"
import Button from "@mui/material/Button"
import { useTheme } from "@mui/material/styles"
import FormInputText from '../common/FormComponents/FormInputText'

const defaultValues = {
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    username: "",
    password1: "",
    password2: "",
}

function Registerpage() {
    const methods = useForm({ defaultValues })
    const { handleSubmit, control, watch } = methods

    const navigate = useNavigate()
    const theme = useTheme()
    const isDesktop = useMediaQuery(theme.breakpoints.up("md"))

    const registerUser = async (userData) => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/register/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(userData),
        });
        if(!response.error){
          navigate('/login')
        }
    
      } catch (error) {
        console.error('Error de red:', error);
      }
    };

    const onSubmit = async (data) =>{
      const {
        username, 
        first_name, 
        last_name, 
        email, 
        phone, 
        password1, 
        password2
      } = data
      
      registerUser(data)
    }

  return (
    <Box sx={{backgroundColor: '#fff', minHeight: '100vh', position: 'relative',}}>
    <Container disableGutters 
    sx={{justifyContent: 'center', display: 'flex', paddingTop: 2, }}>
      <Box 
      sx={{
      height: '100%', 
      marginTop: isDesktop && 2, 
      marginBottom: 2,
      padding: 3,
      borderRadius: '10px',
      width: '400px',
      boxShadow: isDesktop && 10, backgroundColor: '#fff'
      }}>
        <Typography variant='h5' sx={{textAlign: 'center', marginBottom: 2}}>
          Crear Cuenta
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
            name="email"
            control={control}
            label="Email"
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
            name="first_name"
            control={control}
            label="First name"
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
            name="last_name"
            control={control}
            label="Last name"
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
            name="phone"
            control={control}
            label="Phone number"
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
            name="password1"
            control={control}
            label="Password"
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
            name="password2"
            control={control}
            label="Password confirmation"
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
                Ya tienes una cuenta? 
                <Link to={"/login"} 
                style={{color: "#00B8D2", textDecoration: 'none'}}>
                    <Button variant='text' sx={{textTransform: 'capitalize', fontSize: '14px'}}>
                        {`Iniciar Sesión`}
                    </Button>
                </Link>
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Button variant='contained' fullWidth sx={{borderRadius: 10, color: '#fff'}}
              onClick={handleSubmit(onSubmit)}> 
                Registrarse
              </Button>
            </Grid>
        </Grid>
      </Box>
    </Container>
    </Box>
  )
}

export default Registerpage
