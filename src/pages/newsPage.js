import React, { useState, useEffect } from 'react'
import { Link, useLocation, Outlet, useNavigate } from "react-router-dom"
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import useMediaQuery from "@mui/material/useMediaQuery"
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import Grid from "@mui/material/Grid"
import Typography from "@mui/material/Typography"
import { useTheme } from "@mui/material/styles"

function NewsPage() {
  const [formsOption, setFormsOption] = useState("list");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!location.pathname.split("/")[2]) {
      navigate("list", { replace: true });
    } else {
      setFormsOption(location.pathname.split("/")[2]);
    }
  }, [location.pathname]);

  return (
    <Outlet />
  )
}

export default NewsPage
