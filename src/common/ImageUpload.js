import React from "react"
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import InputLabel from "@mui/material/InputLabel"
import Skeleton from "@mui/material/Skeleton"
import Typography from "@mui/material/Typography"
import Input from "@mui/material/Input"
import Grid from "@mui/material/Grid"
import PhotoCamera from "@mui/icons-material/PhotoCamera"


const ImageUpload = ({
  header,
  description,
  buttonText,
  onUploadClick,
  imagePreview,
  width = 250,
  height = 250,
  type = "",
}) => {
  

  return (
    <Grid item container>
      <InputLabel sx={{ marginLeft: 1 }}>{header}</InputLabel>
      <Grid item container direction="column" spacing={2}>
        <Grid item container direction="row" spacing={2}>
          <Grid item>
            {imagePreview ? (
              <Box
              sx={{
                position: "relative",
                height: 200,
                width: 400,
                background: "black",
                borderRadius: "10px",
                border: "solid white",
                overflow: "hidden",
              }}>
              <Box
                sx={{
                  backgroundImage: `url(${imagePreview})`,
                  filter: "blur(5px)",
                  height: "100%",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "cover",
                }}></Box>
              <img
                alt="image of the event"
                src={imagePreview}
                placeholder="blur"
                blurDataURL="data:..."
                style={{ borderRadius: 10, zIndex: 2, layout: 'fill', objectFit: 'contain' }}
              />
            </Box>
            ) : (
              <Skeleton variant="rectangular" width={width} height={height} />
            )}
          </Grid>
          <Grid item xs={12} md={6} zeroMinWidth>
            <Typography
              variant="subtitle1"
              component="div"
              sx={{ maxWidth: width }}>
              {description}
            </Typography>
          </Grid>
        </Grid>
        <Grid item>
          <label htmlFor="contained-button-file">
            <Input
              accept="image/*"
              id="contained-button-file"
              multiple={false}
              type="file"
              onChange={(e) => {
                onUploadClick(e)
                e.currentTarget.value = null
              }}
              sx={{ display: "none" }}
            />
            <Button
              variant="contained"
              component="span"
              sx={{ minWidth: width }}
              startIcon={<PhotoCamera />}>
              {buttonText}
            </Button>
          </label>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default ImageUpload
