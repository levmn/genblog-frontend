import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Box, Card, CardActions, CardContent, Button, Typography, Avatar, Grid } from '@material-ui/core';
import Post from '../../../models/Post';
import { busca, buscaId } from '../../../services/Service';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import User from '../../../models/User';
import { UserState } from '../../../store/tokens/userReducer';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import './PostList.css';

function PostList() {

  const [post, setPost] = useState<Post[]>([])
  let history = useHistory();

  const id = useSelector<UserState, UserState["id"]>(
    (state) => state.id
  );

  const token = useSelector<UserState, UserState["tokens"]>(
    (state) => state.tokens 
  );

  const [user, setUser] = useState<User>({
    id: +id,   
    nome: '',
    usuario: '',
    senha: '',
    foto: ''
  })

  useEffect(() => {
    if (token === ''){
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
      history.push("/login")
    }
  }, [token])

  async function findById(id: string) {
    buscaId(`/usuarios/${id}`, setUser, {
        headers: {
            'Authorization': token
        }
    })
}

  async function getPost(){
    await busca('/postagens', setPost, {
      headers: {
        'Authorization': token
      }
    })
  }

  useEffect(() => {
    if (id !== undefined) {
        findById(id)
    }
}, [id])

  useEffect(() => {
    getPost()
  }, [post.length])

  return (
    <>

      {
        post.map(post => (

        <Box display="flex" justifyContent="center" m={4} >
          <Card variant="outlined">
            <CardContent>

              <Box display="flex" justifyContent="center" flexDirection="row">
                <Box className='pAvatar'>
                  <Avatar src={ post.usuario?.foto }  alt={ post.usuario?.nome } title={ post.usuario?.nome }></Avatar>
                </Box>
                
                <Box display="flex" flexDirection="column">  
                  <Typography variant="h5" component="h2" className='postTitle'>
                    {post.titulo}
                  </Typography>
                  <Typography variant="body2" color="textSecondary" gutterBottom component="p" className='postTheme'>
                    Tema: {post.tema?.descricao}
                  </Typography>
                </Box>
              </Box>

              <Box display="flex" justifyContent="center">
                <Typography variant="body2" component="p" className='breakLines postText'>
                  {post.texto}
                </Typography>
              </Box>

              <Box display="flex" flexDirection="row" className='pTop pLeft' mb={1.5}>
                <Link to={`/formulariopost/${post.id}`} className="text-decorator-none" >
                  <Box mx={1}>
                    <Button variant="contained" className="update-button btnFont" >
                      <EditIcon />
                    </Button>
                  </Box>
                </Link>
                <Link to={`/deletarpost/${post.id}`} className="text-decorator-none">
                  <Box mx={1}>
                    <Button variant="contained" className='delete-button btnFont'>
                      <DeleteIcon />
                    </Button>
                  </Box>
                </Link>
              </Box>

            </CardContent>
    
          </Card>
        </Box>
      ))
      }
    </>
  )
}

export default PostList;