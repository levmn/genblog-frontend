import React, { useEffect, useState } from 'react'
import {Box, Card, CardActions, CardContent, Button, Typography} from '@material-ui/core';
import { useHistory, useParams } from 'react-router-dom';
import { buscaId, deleteId } from '../../../services/Service';
import Tema from '../../../models/Theme';
import { useSelector } from 'react-redux';
import { UserState } from '../../../store/tokens/userReducer';
import { toast } from 'react-toastify';
import './DeleteTheme.css';

function DeleteTheme() {
    
  let history = useHistory();
  const { id } = useParams<{id: string}>();
  
  const token = useSelector<UserState, UserState["tokens"]>(
    (state) => state.tokens
  );

  const [tema, setTemas] = useState<Tema>()

  useEffect(() => {
      if(token === ''){
        toast.error("Você precisa estar logado.", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: false,
          theme: "colored",
          progress: undefined,
        });
          history.push('/login')
      }
  }, [token])

  useEffect(() => {
      if(id !== undefined){
          findById(id)
      }
  }, [id])

  async function findById(id: string) {
      buscaId(`/temas/${id}`, setTemas, {
          headers: {
              'Authorization': token
          }
      })
  } 

  function sim() {
    history.push('/temas')
    deleteId(`/temas/${id}`, {
      headers: {
        'Authorization': token
      }
    });
    toast.success("O tema foi deletado com sucesso.", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: false,
      theme: "colored",
      progress: undefined,
    });
  }

    function nao() {
      history.push('/temas')
    }
          
  return (
    <>
      <Box m={2}>
        <Card variant="outlined">
          <CardContent>
            <Box justifyContent="center">
              <Typography color="textSecondary" gutterBottom className='fontDel'>
                Deseja deletar o tema?
              </Typography>
              <Typography color="textSecondary" className='postTxt'>
                {tema?.descricao}
              </Typography>
            </Box>
          </CardContent>
          <CardActions>
            <Box display="flex" justifyContent="start" ml={1.0} mb={2} >
              <Box mx={2}>
                <Button onClick={sim} variant="contained" className='sim-button fontBtn'>
                  Sim
                </Button>
              </Box>
              <Box mx={2}>
                <Button onClick={nao} variant="contained" className='nao-button fontBtn'>
                  Não
                </Button>
              </Box>
            </Box>
          </CardActions>
        </Card>
      </Box>
    </>
  );
}

export default DeleteTheme;