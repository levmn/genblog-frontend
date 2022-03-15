import React from 'react'
import GitHubIcon from '@material-ui/icons/GitHub';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import HeadsetIcon from '@material-ui/icons/Headset';
import {Box, Grid, Typography} from '@material-ui/core';
import { useSelector } from 'react-redux';
import { UserState } from '../../../store/tokens/userReducer';
import './Footer.css'

function Footer() {

  const token = useSelector<UserState, UserState["tokens"]>(
    (state) => state.tokens
  );

  var footerComponent;

  if(token !== ""){
      footerComponent = <Grid container direction="row" justifyContent="center" alignItems="center" className="footerBg">
      <Grid alignItems="center" item xs={12}>
        <Box display="flex" flexDirection="row" justifyContent="space-evenly" className="box">
          
          <Box display="flex" alignItems="center" justifyContent="center">
            <a href="https://www.linkedin.com/in/levmn/" target="_blank" rel="noreferrer" className="m">
              <LinkedInIcon style={{ fontSize: 40, color: "white" }}/>
            </a> 
            <a href="https://github.com/levmn" target="_blank" rel="noreferrer">
              <GitHubIcon style={{ fontSize: 30, color: "white" }}/>
            </a>
            <a href="https://youtu.be/zK5ZdzRnQE8" target="_blank" rel="noreferrer" className="m">
              <HeadsetIcon style={{ fontSize: 35, color: "white" }}/>
            </a>
          </Box>

          <Box display="flex" alignItems="center">
            <img src="https://i.imgur.com/Q91RbCI.gif" style={{ width: 80 }} alt="minecraft bee" />
          </Box>

          <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center">
            <Box>
              <Typography variant="subtitle2" align="center" gutterBottom className='redes fontFooter' >© 2022 Copyright</Typography>
            </Box>
            <Box>
              <a target="_blank" href="https://brasil.generation.org" rel="noreferrer" className='text-decorator-none'>
                <Typography variant="subtitle2" gutterBottom className='redes bold fontFooter' align="center">Generation Brasil</Typography>
              </a>
            </Box>
          </Box>
        </Box>
            <Box display="flex" justifyContent="center">
              <Typography className='redes tiny'>
                made by <a href="https://github.com/levmn" target="_blank" rel="noreferrer" className='bald text-decorator-none redes'>levi</a>.
              </Typography>
            </Box>
      </Grid>
    </Grid>
  }

  return (
    <>
     { footerComponent }
    </>
  )
}

export default Footer;
