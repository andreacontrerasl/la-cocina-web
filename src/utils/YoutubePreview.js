import React from "react";
import Box from "@mui/material/Box"
import PropTypes from "prop-types";

const YoutubeEmbed = ({ embedId }) => (
    <Box sx={{display: 'flex', alignItems:'center', 
    justifyContent: 'center', overflow: "hidden",
        position: "relative",}}>
    <iframe
      width="300px"
      height="200px"
      src={`https://www.youtube.com/embed/${embedId}`}
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
      title="Embedded youtube"
      style={{
        borderRadius: '10px'}}
    />
  </Box>
);

YoutubeEmbed.propTypes = {
  embedId: PropTypes.string.isRequired
};

export default YoutubeEmbed;