import React from 'react'
import GitHubIcon from '@material-ui/icons/GitHub';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import HeadsetIcon from '@material-ui/icons/Headset';
import {Box, Grid, Typography} from '@material-ui/core';
import './Footer.css'

function Footer() {
  return (
    <>
      <Grid container direction="row" justifyContent="center" alignItems="center" className="footerBg">
        <Grid alignItems="center" item xs={12}>
          <Box className="box">
            <Box paddingTop={1} display="flex" alignItems="center" justifyContent="center">
              <Typography variant="h6" align="center" gutterBottom className='redes'>Siga-nos nas redes sociais</Typography>
            </Box>
            
            <Box display="flex" alignItems="center" justifyContent="center">
              <a href="https://youtu.be/SW7TdP1HzDU" target="_blank" rel="noreferrer" className="m">
                <HeadsetIcon style={{ fontSize: 35, color: "white" }}/>
              </a>
              <a href="https://github.com/levmn" target="_blank" rel="noreferrer">
                <GitHubIcon style={{ fontSize: 30, color: "white" }}/>
              </a>
              <a href="https://www.linkedin.com/in/levmn/" target="_blank" rel="noreferrer" className="m">
                <LinkedInIcon style={{ fontSize: 40, color: "white" }}/>
              </a>              
            </Box>

          </Box>
          <Box className='box1'>
            <Box paddingTop={1}>
              <Typography variant="subtitle2" align="center" gutterBottom className='redes' >© 2022 Copyright</Typography>
            </Box>
            <Box>
              <a target="_blank" href="https://brasil.generation.org" rel="noreferrer" className="text-decorator-none">
                <Typography variant="subtitle2" gutterBottom className='redes' align="center">Generation Brasil</Typography>
              </a>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </>
  )
}

export default Footer;
