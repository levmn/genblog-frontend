import React, { useEffect, useState } from 'react'
import { Typography, Button, Box, Card, CardActions, CardContent } from "@material-ui/core"
import { useHistory, useParams } from 'react-router-dom';
import Post from '../../../models/Post';
import { buscaId, deleteId } from '../../../services/Service';
import { useSelector } from 'react-redux';
import { UserState } from '../../../store/tokens/userReducer';
import { toast } from 'react-toastify';
import './DeletePost.css';

function DeletePost() {
    
  let history = useHistory();
  const { id } = useParams<{id: string}>();

  const token = useSelector<UserState, UserState["tokens"]>(
    (state) => state.tokens
  );
  
  const [post, setPosts] = useState<Post>()

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
      buscaId(`/postagens/${id}`, setPosts, {
          headers: {
              'Authorization': token
          }
      })
  } 

  function sim() {
    history.push('/postagens')
    deleteId(`/postagens/${id}`, {
      headers: {
        'Authorization': token
      }
    });
    toast.success("Seu post foi deletado.", {
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
      history.push('/postagens')
    }
   
  return (
    <>
      <Box m={2}>
        <Card variant="outlined" >
          <CardContent>
            <Box justifyContent="center">
              <Typography color="textSecondary" gutterBottom className='fontDel'>
                Deseja deletar o post?
              </Typography>
              <Typography className='postTxt'>
              {post?.titulo}
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
              <Box>
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

export default DeletePost;