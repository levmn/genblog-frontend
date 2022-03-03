import React, { useEffect } from 'react';
import {Box, Grid, Typography, Button} from '@material-ui/core';
import PostsTab from '../../components/posts/poststab/PostTab';
import ModalPost from '../../components/posts/modalposts/ModalPost';
import { Link, useHistory } from 'react-router-dom';
import { TokenState } from '../../store/tokens/tokensReducer';
import { useSelector } from 'react-redux';
import './Home.css';


function Home() {

  let history = useHistory();
  const token = useSelector<TokenState, TokenState["tokens"]>(
    (state) => state.tokens
  );

    useEffect(() => {
        if (token === "") {
            alert("Você precisa estar logado.")
            history.push("/login")

        }
    }, [token])

  return (
    <>
      <Grid container direction="row" justifyContent="center" alignItems="center" className='homeBg'>
          
          <Grid alignItems="center" item xs={6}>
            <Box padding={5}>
              <Box paddingX={20}>
                <Typography variant="h3" gutterBottom color="textPrimary" component="h3" align="center" className='title'>Olá!</Typography>
                <Typography variant="h5" gutterBottom color="textPrimary" component="h5" align="center" className='title'>expresse aqui os seus pensamentos e opiniões!</Typography>
              </Box>
              <Box display="flex" justifyContent="center">
                <Box>
                  <ModalPost/>
                </Box>
                <Box>
                  <Link to='/postagens' className='text-decorator-none'>
                    <Button variant="outlined" className='button'>Ver Postagens</Button>
                  </Link>
                </Box>
              </Box>
            </Box>
          </Grid>
          
          <Grid item xs={6}>  
            <img src="https://imgur.com/tSU1ILO.png" alt="" /> 
          </Grid>

          <Grid xs={12} className='postagens'>
            <PostsTab/>
          </Grid>

      </Grid>
    </>
  );
}

export default Home;