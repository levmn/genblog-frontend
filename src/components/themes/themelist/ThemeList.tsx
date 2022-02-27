import React, {useEffect, useState} from 'react'
import {Link, useHistory} from 'react-router-dom'
import {Box, Card, CardActions, CardContent, Button, Typography} from '@material-ui/core';
import Tema from '../../../models/Theme'
import useLocalStorage from 'react-use-localstorage';
import { busca } from '../../../services/Service';
import './ThemeList.css';

function ThemeList() {
  const [tema, setTema] = useState<Tema[]>([])
  const [token, setToken] = useLocalStorage('token');
  let history = useHistory();

  useEffect(() => {
    if (token == ''){
      alert("Você precisa estar logado.")
      history.push("/login")
    }
  }, [token])

  async function getTema(){
    await busca('/temas', setTema, {
      headers: {
        'Authorization': token
      }
    })
  }

  useEffect(() => {
    getTema()
  }, [tema.length])

  return (
    <>

      {
        tema.map(tema => (      

        <Box m={2} >
          <Card variant="outlined">
            <CardContent>
                  <Typography color="textSecondary" gutterBottom>
                  Tema
                  </Typography>
                  <Typography variant="h5" component="h2">
                    {tema.descricao}
                  </Typography>
            </CardContent>
            <CardActions>
              <Box display="flex" justifyContent="center" mb={1.5} >

                <Link to={`/formulariotema/${tema.id}`} className="text-decorator-none">
                      <Box mx={1}>
                      <Button variant="contained" className="marginLeft update-button" size='small' >
                          atualizar
                      </Button>
                      </Box>
                </Link>
                <Link to={`/deletartema/${tema.id}`} className="text-decorator-none">
                      <Box mx={1}>
                      <Button variant="contained" size='small' color="secondary" className='delete-button'>
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
  );
}


export default ThemeList;