import React, {useEffect, useState} from 'react'
import {Link, useHistory} from 'react-router-dom'
import {Box, Card, CardActions, CardContent, Button, Typography} from '@material-ui/core';
import Tema from '../../../models/Theme'
import { busca } from '../../../services/Service';
import { useSelector } from 'react-redux';
import { UserState } from '../../../store/tokens/userReducer';
import { toast } from 'react-toastify';
import './ThemeList.css';

function ThemeList() {
  const [tema, setTema] = useState<Tema[]>([])

  const token = useSelector<UserState, UserState["tokens"]>(
    (state) => state.tokens
  );

  let history = useHistory();

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

        <Box display="flex" justifyContent="center" m={2} >
          <Card variant="outlined">
            <CardContent>
                  <Typography color="textSecondary" gutterBottom className='themeTitle'>
                  Tema
                  </Typography>
                  <Typography variant="h5" component="h2" className='themeText'>
                    {tema.descricao}
                  </Typography>
            </CardContent>
            <CardActions>
              <Box display="flex" justifyContent="center" mb={1.5} >

                <Link to={`/formulariotema/${tema.id}`} className="text-decorator-none">
                      <Box mx={1}>
                      <Button variant="contained" className='marginLeft update-button btnTheme' size='small' >
                          atualizar
                      </Button>
                      </Box>
                </Link>
                <Link to={`/deletartema/${tema.id}`} className="text-decorator-none">
                      <Box mx={1}>
                      <Button variant="contained" size='small' color="secondary" className='delete-button btnTheme'>
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