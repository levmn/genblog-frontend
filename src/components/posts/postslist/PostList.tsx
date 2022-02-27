import React, {useEffect, useState} from 'react'
import {Link, useHistory} from 'react-router-dom';
import {Box, Card, CardActions, CardContent, Button, Typography} from '@material-ui/core';
import Post from '../../../models/Post';
import useLocalStorage from 'react-use-localstorage';
import { busca } from '../../../services/Service';
import './PostList.css';

function PostList() {

  const [post, setPost] = useState<Post[]>([])
  const [token, setToken] = useLocalStorage('token');
  let history = useHistory();

  useEffect(() => {
    if (token == ''){
      alert("Você precisa estar logado.")
      history.push("/login")
    }
  }, [token])

  async function getPost(){
    await busca('/postagens', setPost, {
      headers: {
        'Authorization': token
      }
    })
  }

  useEffect(() => {
    getPost()
  }, [post.length])

  return (
    <>

      {
        post.map(post => (

      <Box m={2} >
        <Card variant="outlined">
          <CardContent>
            <Typography color="textSecondary" gutterBottom>
              Postagens
            </Typography>
            <Typography variant="h5" component="h2">
              {post.titulo}
            </Typography>
            <Typography variant="body2" component="p">
              {post.texto}
            </Typography>
            <Typography variant="body2" component="p">
              {post.tema?.descricao}
            </Typography>
          </CardContent>
          <CardActions>
            <Box display="flex" justifyContent="center" mb={1.5}>

              <Link to={`/formulariopost/${post.id}`} className="text-decorator-none" >
                <Box mx={1}>
                  <Button variant="contained" className="marginLeft update-button" size='small' >
                    atualizar
                  </Button>
                </Box>
              </Link>
              <Link to={`/deletarpost/${post.id}`} className="text-decorator-none">
                <Box mx={1}>
                  <Button variant="contained" size='small' className='delete-button'>
                    deletar
                  </Button>
                </Box>
              </Link>
            </Box>
          </CardActions>
        </Card>
      </Box>
      ))
      }
    </>
  )
}

export default PostList;