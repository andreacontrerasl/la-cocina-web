import React, {useState} from 'react'
import axios from "axios"
import { useForm } from "react-hook-form"
import { Link, useLocation, useParams, useNavigate } from "react-router-dom"
import Container from "@mui/material/Container"
import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined';
import Typography from "@mui/material/Typography"
import Divider from "@mui/material/Divider"
import Box from "@mui/material/Box"
import Grid from "@mui/material/Grid"
import FormInputText from '../../common/FormComponents/FormInputText';
import FormInputDateNorm from '../../common/FormComponents/FormInputDateNorm';
import FormInputDropdown from '../../common/FormComponents/FormInputDropDown';
import ImageUpload from '../../common/ImageUpload';
import { compressFile } from '../../utils/common';

const defaultValues = {
    title: "",
    body: "",
    preview: "",
    date: null,
    status: true,
    image: null,
    writen_by: ""
}

const opt = [
    {
      label: "Activo",
      value: "true",
    },
    {
      label: "En Pausa",
      value: "false",
    },
  ]

function CreateNews() {
    const navigate = useNavigate()
    const methods = useForm({ defaultValues })
    const { handleSubmit, control, watch } = methods
    const [imagePreview, setImagePreview] = useState(null)
    const [uploadImage, setUploadImage] = useState(null)
    const [signedUrl, setSignedUrl] = useState(null)

    const onUploadClick = async (event) => {
        const image = event.target.files[0]
        if (!image) {
          return
        }
    
        const compressedImage = await compressFile(image)
    
        try {
          const { data } = await axios.post("/api/public/upload-url", {
            type: compressedImage.type,
            folder: "events",
          })
    
          const url = data?.url || null
    
          setSignedUrl(url)
          setImagePreview(URL.createObjectURL(compressedImage))
          setUploadImage(compressedImage)
        } catch (e) {
            console.log(e)
        }
      }

  return (
    <Container disableGutters maxWidth="md" sx={{marginBottom: 2}}>
        <ArrowBackOutlinedIcon sx={{marginTop: 2, cursor: 'pointer'}} 
        onClick={() => navigate(-1)} />
        <Typography variant='h5' sx={{textAlign: 'center', marginBottom: 2}}>
          Crear Noticia
        </Typography>
        <Divider />
        <Grid container direction="row"
        rowSpacing={2} columnSpacing={2} sx={{marginTop: 2}}>
            <Grid item md={6} xs={12}>
                <FormInputText
                name="title"
                control={control}
                label="Título"
                rules={{
                  maxLength: {
                    value: 48,
                    message: "Max length of title is 48 characters.",
                  },
                }}
                required
                />
            </Grid>
            <Grid item md={6} xs={12}>
                <FormInputDropdown
                options={opt}
                name="status"
                control={control}
                label="Status"
                />

            </Grid>
            <Grid item  xs={12}>
                <FormInputText
                name="preview"
                control={control}
                label="Preview"
                multiline
                rows={3}
                required
                />
            </Grid>
            
            <Grid item xs={12}>
                <FormInputText
                name="body"
                control={control}
                label="Descripción"
                multiline
                rows={8}
                required
                />
            </Grid>
            <Grid item md={6} xs={12}>
                <FormInputDateNorm
                control={control}
                name="date"
                label="Fecha de evento"
                />
            </Grid>
            <Grid item md={6} xs={12}>
                <FormInputText
                name="writen_by"
                control={control}
                label="Escrito por"
                rules={{
                  maxLength: {
                    value: 48,
                    message: "Max length of title is 48 characters.",
                  },
                }}
                />
            </Grid>
            <Grid item xs={12}>
            <ImageUpload
                buttonText="Seleccionar imagen"
                imagePreview={imagePreview}
                onUploadClick={onUploadClick}
                height={200}
                width={400}
                type="event"
            />
            </Grid>
            
        </Grid>
    </Container>
  )
}

export default CreateNews
