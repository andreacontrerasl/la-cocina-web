import React from 'react'
import { Link } from 'react-router-dom'
import Box from "@mui/material/Box"
import Stack from "@mui/material/Stack"
import Grid from "@mui/material/Grid"
import Typography from "@mui/material/Typography"
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';
import { Container } from '@mui/material'

function About() {
  return (
    <Box sx={{ display: 'flex', 
    flexDirection: 'column', justifyContent: 'center', width: '100%'}}>
        <Grid container direction="row" columnGap={2}
        sx={{display: 'flex', justifyContent: 'center', 
        width: '100%', marginTop: '20px'}}>
            <Grid item xs={5} md={3}>
                <img src='/grid.png' width={'100%'} style={{borderRadius: '10px'}} />
            </Grid>
            <Grid item xs={5} md={3}>
                <img src='/grid.png' width={'100%'} style={{borderRadius: '10px'}} />
            </Grid>
            <Grid item xs={5} md={3}>
                <img src='/grid.png' width={'100%'} style={{borderRadius: '10px'}} />
            </Grid>
        </Grid>
        <Box sx={{backgroundColor: '#00B8D2', 
        display: 'flex', justifyContent: 'center', paddingBottom: 2, alignItems:'center'}}>
        <Grid container direction="row" columnGap={3}
        sx={{ width: '100%', 
         maxWidth: 'lg', display: 'flex', justifyContent: 'center', padding: 2}}>
            <Grid item xs={12} md={5} >
            <Stack direction="column" 
                sx={{display: 'flex', justifyContent: 'center', 
                marginTop: '10px',
                width: '100%',}}>
                <Typography variant='h6' sx={{color:'#fff'}}>
                 Misión
            </Typography>
            <Typography sx={{color:'#fff'}}>
            En La Cocina Pickleball, nuestra misión es promover y 
            difundir el emocionante deporte del pickleball en las comunidades 
            de habla hispana en todo el mundo. Nos dedicamos a ofrecer a 
            personas de todas las edades y habilidades la oportunidad de 
            participar en este apasionante deporte, alentando la actividad 
            física, el compañerismo y el crecimiento personal.
            </Typography>
            </Stack>

            </Grid>
            <Grid item xs={12} md={5}>
            <Stack direction="column" 
                sx={{display: 'flex', justifyContent: 'center', 
                marginTop: '10px',
                width: '100%',}}>
                <Typography variant='h6' sx={{color:'#fff'}}>
                 Visión
            </Typography>
            <Typography sx={{color:'#fff'}}>
            Nuestra visión en La Cocina Pickleball es convertirnos en la principal referencia y recurso para el pickleball en las comunidades de habla hispana. Aspiramos a ser reconocidos por la calidad de nuestros productos, servicios y eventos relacionados con el pickleball. Buscamos contribuir al crecimiento y desarrollo del deporte, tanto a nivel local como internacional, promoviendo valores de inclusión, diversidad y pasión por el juego.
            </Typography>
            </Stack>
                
            </Grid>
        </Grid>
        </Box>
        <Box sx={{display: 'flex', 
        justifyContent: 'center', marginTop: '15px', flexDirection:'column', alignItems: 'center'}}>
            <Typography variant='h6'>
                Valores Fundamentales
            </Typography>
            <Grid container direction="row" rowGap={2} columnGap={2}
        sx={{ width: '100%', 
         maxWidth: 'lg', display: 'flex', justifyContent: 'center', marginBottom: '20px'}}>
            <Grid item xs={11} md={3.5} >
            <Stack direction="column" 
                sx={{display: 'flex', justifyContent: 'center', 
                marginTop: '10px',
                width: '100%', boxShadow: 5, borderRadius: '20px', padding: 2, height: '100%'}}>
                <Typography variant='body 1' >
                Pasión por el Pickleball
            </Typography>
            <Typography variant='body2'>
            Nos apasiona profundamente el deporte del pickleball, y nos esforzamos por compartir esa pasión con las comunidades de habla hispana en todo el mundo.
            </Typography>
            </Stack>

            </Grid>
            <Grid item xs={11} md={3.5}>
            <Stack direction="column" 
                sx={{display: 'flex', justifyContent: 'center', 
                marginTop: '10px',
                width: '100%', boxShadow: 5, borderRadius: '20px', padding: 2, height: '100%'}}>
                <Typography variant='body1' >
                Inclusión y Diversidad
            </Typography>
            <Typography variant='body2'>
            Creemos en la importancia de crear un ambiente inclusivo y acogedor, donde personas de todas las edades, géneros y habilidades puedan participar y disfrutar del pickleball.
            </Typography>
            </Stack>
                
            </Grid>
            <Grid item xs={11} md={3.5}>
            <Stack direction="column" 
                sx={{display: 'flex', justifyContent: 'center', 
                marginTop: '10px',
                width: '100%', boxShadow: 5, borderRadius: '20px', padding: 2, height: '100%'}}>
                <Typography variant='body1' >
                Calidad y Excelencia
            </Typography>
            <Typography variant='body2'>
            Nos comprometemos a ofrecer productos y servicios de la más alta calidad, brindando a nuestros clientes una experiencia excepcional en todo momento.
            </Typography>
            </Stack>
                
            </Grid>
        </Grid>
        <Grid container direction="row" rowGap={2} columnGap={2}
        sx={{ width: '100%', 
         maxWidth: 'lg', display: 'flex', justifyContent: 'center', marginBottom: '20px'}}>
            <Grid item xs={11} md={3.5} >
            <Stack direction="column" 
                sx={{display: 'flex', justifyContent: 'center', 
                marginTop: '10px',
                width: '100%', boxShadow: 5, borderRadius: '20px', padding: 2, height: '100%'}}>
                <Typography variant='body 1' >
                Colaboración y Compañerismo
            </Typography>
            <Typography variant='body2'>
            Fomentamos el espíritu de equipo, el respeto mutuo y la colaboración entre los jugadores de pickleball, creando una comunidad unida y solidaria.
            </Typography>
            </Stack>

            </Grid>
            <Grid item xs={11} md={3.5}>
            <Stack direction="column" 
                sx={{display: 'flex', justifyContent: 'center', 
                marginTop: '10px',
                width: '100%', boxShadow: 5, borderRadius: '20px', padding: 2, height: '100%'}}>
                <Typography variant='body1' >
                Innovación y Crecimiento
            </Typography>
            <Typography variant='body2'>
            Buscamos constantemente nuevas formas de promover y mejorar el pickleball, incentivando la innovación y el aprendizaje continuo en nuestra empresa y en la comunidad.
            </Typography>
            </Stack>
            </Grid>
        </Grid>
        </Box>
        <Box sx={{width: '100%', backgroundColor: '#00B8D2', marginTop: 2, paddingBottom: 2}}>
            <Container maxWidth="lg" 
            sx={{display: 'flex', justifyContent: 'center', 
            flexDirection: 'column', alignItems: 'center'}}>
                <Typography variant='h6' sx={{color:"#fff", marginTop: 2}}>
                    Nuestro equipo
                </Typography>
                <Typography sx={{color:"#fff"}}>
                En La Cocina Pickleball, contamos con un equipo apasionado y dedicado que trabaja incansablemente para llevar el pickleball a más personas. Conoce a algunos de los miembros clave de nuestro equipo:
                </Typography>
                <Grid container direction="row" columnGap={2} rowGap={2}
                sx={{display: 'flex', justifyContent: 'center', marginTop:2}}>
                    <Grid item xs={5} md={2}>
                        <Stack direction="column">
                            <img src='/james-person-1.jpg' width={"100%"} style={{borderRadius: '20px'}} />
                            <Typography sx={{color: '#fff', fontWeight: 'bold', marginTop: 1}}>
                            José Bravo
                            </Typography>
                            <Typography sx={{color: '#fff'}}>
                            CEO y CoFundador
                            </Typography>
                        </Stack>
                    </Grid>
                    <Grid item xs={5} md={2}>
                    <Stack direction="column">
                            <img src='/james-person-1.jpg' width={"100%"} style={{borderRadius: '20px'}} />
                            <Typography sx={{color: '#fff', marginTop: 1, fontWeight: 'bold'}}>
                            Juan Machado
                            </Typography>
                            <Typography sx={{color: '#fff'}}>
                            CFO y CoFundador
                            </Typography>
                        </Stack>
                    </Grid>
                    <Grid item xs={5} md={2}>
                    <Stack direction="column">
                            <img src='/james-person-1.jpg' width={"100%"} style={{borderRadius: '20px'}} />
                            <Typography sx={{color: '#fff', marginTop: 1, fontWeight: 'bold'}}>
                            Juan José De Benito

                            </Typography>
                            <Typography sx={{color: '#fff'}}>
                            COO y CoFundador
                            </Typography>
                        </Stack>
                    </Grid>
                    <Grid item xs={5} md={2}>
                    <Stack direction="column">
                            <img src='/james-person-1.jpg' width={"100%"} style={{borderRadius: '20px'}} />
                            <Typography sx={{color: '#fff', marginTop: 1, fontWeight: 'bold'}}>
                            Carlos Zambrano

                            </Typography>
                            <Typography sx={{color: '#fff'}}>
                            CMO y CoFundador
                            </Typography>
                        </Stack>
                    </Grid>
                </Grid>
            </Container>
        </Box>
        <Box sx={{width: '100%',  marginTop: 2, paddingBottom: 2}}>
            <Container maxWidth="lg" 
            sx={{display: 'flex', justifyContent: 'center', 
            flexDirection: 'column', alignItems: 'center'}}>
                <Typography variant='h6' sx={{ marginTop: 2}}>
                Embajadores
                </Typography>
                <Typography >
                Nuestros embajadores son individuos apasionados que comparten nuestra visión y valores. Colaboramos estrechamente con ellos para difundir el amor por el pickleball en todo el mundo. Estamos orgullosos de trabajar con estos destacados embajadores:
                </Typography>
                <Grid container direction="row" columnGap={2} rowGap={2}
                sx={{display: 'flex', justifyContent: 'center', marginTop:2}}>
                    <Grid item xs={5} md={3}>
                        <Stack direction="column">
                            <img src='/image5.webp' width={"100%"} style={{borderRadius: '20px'}} />
                            <Typography sx={{fontWeight: 'bold', marginTop: 1}}>
                            Jhonnatan Medina Álvarez (Venezuela)
                            </Typography>
                            <Typography >
                            Atleta Profesional y Head of Athlete Partnership and Sport Development
                            </Typography>
                        </Stack>
                    </Grid>
                    <Grid item xs={5} md={3}>
                    <Stack direction="column">
                            <img src='/image5.webp' width={"100%"} style={{borderRadius: '20px'}} />
                            <Typography sx={{ marginTop: 1, fontWeight: 'bold'}}>
                            Judit Castillo (España) 
                            </Typography>
                            <Typography>
                            Atleta Profesional

                            </Typography>
                        </Stack>
                    </Grid>
                    <Grid item xs={5} md={3}>
                    <Stack direction="column">
                            <img src='/image5.webp' width={"100%"} style={{borderRadius: '20px'}} />
                            <Typography sx={{ marginTop: 1, fontWeight: 'bold'}}>
                            Glauka Carvajal Lane (España) 
                            </Typography>
                            <Typography >
                            Atleta Profesional
                            </Typography>
                        </Stack>
                    </Grid>
                    <Grid item xs={5} md={3}>
                    <Stack direction="column">
                            <img src='/image5.webp' width={"100%"} style={{borderRadius: '20px'}} />
                            <Typography sx={{marginTop: 1, fontWeight: 'bold'}}>
                            Eduardo Irizarry (Puerto Rico)
                            </Typography>
                            <Typography >
                            Atleta Profesional
                            </Typography>
                        </Stack>
                    </Grid>
                    <Grid item xs={5} md={3}>
                    <Stack direction="column">
                            <img src='/image5.webp' width={"100%"} style={{borderRadius: '20px'}} />
                            <Typography sx={{marginTop: 1, fontWeight: 'bold'}}>
                            María López (Venezuela)
                            </Typography>
                            <Typography >
                            Head Coach y Atleta Profesional
                            </Typography>
                        </Stack>
                    </Grid>
                </Grid>
            </Container>
        </Box>
        <Box sx={{width: '100%', backgroundColor: '#00B8D2', marginTop: 2, paddingBottom: 2}}>
            <Container maxWidth="lg" 
            sx={{display: 'flex', justifyContent: 'center', 
            flexDirection: 'column', alignItems: 'center'}}>
                <Typography variant='h6' sx={{color:"#fff", marginTop: 2}}>
                    Síguenos
                </Typography>
                <Typography sx={{color:"#fff"}}>
                Mantente al día con La Cocina Pickleball en nuestras redes sociales.
                </Typography>
                <Stack direction="row" spacing={3} sx={{marginTop: 2}}>
                    <img src='insta.png' width={'60px'} 
                    style={{borderRadius: '15px'}}/> 
                    <img src='youtube.png' width={'70px'} 
                    height={"60px"} style={{borderRadius: '20px'}}/> 
                </Stack>
            </Container>
        </Box>
        <Box sx={{width: '100%', marginTop: 2, paddingBottom: 2}}>
            <Container maxWidth="lg" 
            sx={{display: 'flex', justifyContent: 'center', 
            flexDirection: 'column', alignItems: 'center'}}>
                
                <Typography variant='h6' sx={{textAlign: 'center', fontWeight: 'normal'}} >
                ¡Gracias por ser parte de nuestro viaje en la promoción del pickleball en las comunidades de habla hispana! Juntos, estamos haciendo que este deporte sea accesible para todos y construyendo una comunidad de apasionados jugadores de pickleball.
                </Typography>
                
            </Container>
        </Box>
    </Box>
  )
}

export default About
