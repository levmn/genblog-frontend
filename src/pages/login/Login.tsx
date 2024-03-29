import React, {useState, useEffect, ChangeEvent} from 'react';
import {Grid, Box, Typography, TextField, Button} from '@material-ui/core';
import {Link, useHistory} from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {login} from '../../services/Service';
import UserLogin from '../../models/UserLogin';
import { addToken, addId } from '../../store/tokens/actions';
import { toast } from 'react-toastify';
import './Login.css';

function Login(){
    
    let history = useHistory();
    const dispatch = useDispatch();
    const [token, setToken] = useState('');

    const [userLogin, setUserLogin] = useState<UserLogin>({
        id: 0,
        usuario: '',
        senha: '',
        token: '',
        foto: ''
    })

    const [respUserLogin, setRespUserLogin] = useState<UserLogin>({
        id: 0,
        usuario: '',
        senha: '',
        token: '',
        foto: ''
    })

    function updatedModel(e: ChangeEvent<HTMLInputElement>) {
        setUserLogin({
            ...userLogin,
            [e.target.name]: e.target.value
        })
    }

    useEffect(() => {
        if(respUserLogin.token !== ''){
            dispatch(addToken(respUserLogin.token)) 
            dispatch(addId(respUserLogin.id.toString()))
            history.push('/home')
        }
    }, [respUserLogin.token])

    async function onSubmit(e: ChangeEvent<HTMLFormElement>){
        e.preventDefault();

        try{
            await login(`/usuarios/logar`, userLogin, setRespUserLogin)
            
            toast.success("Usuário logado com sucesso!", {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: false,
                theme: "colored",
                progress: undefined,
              });
        }catch(error){
            toast.error("Dados inconsistentes. Erro ao logar!", {
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
    }

    return(
        <Grid container direction="row" justifyContent="center" alignItems="center" className='bgLogin'>
            <Grid xs={6} alignItems="center">
                <Box paddingX={20} >
                    <form onSubmit={onSubmit}>
                        <Typography variant="h3" gutterBottom component="h3" 
                        align="center" className='fontLogin bold'>
                            Entrar
                        </Typography>
                        <TextField value={userLogin.usuario} onChange={(e: ChangeEvent<HTMLInputElement>) => updatedModel(e)} 
                            id="usuario" label="E-mail" placeholder="Insira o e-mail cadastrado."
                            variant="outlined" className='campo' name="usuario" margin="normal" required fullWidth/>
                            
                        <TextField value={userLogin.senha} onChange={(e: ChangeEvent<HTMLInputElement>) => updatedModel(e)}
                            id="senha" label="Senha" placeholder="Insira a senha cadastrada."
                            variant="outlined" className='campo' name="senha" margin="normal" type="password" required fullWidth/>

                        <Box marginTop={2} textAlign="center">
                                <Button type="submit" variant="outlined" className='logBtn button'>
                                    Logar
                                </Button>
                        </Box>
                    </form>
                    <Box display="flex" justifyContent="center" marginTop={2}>
                        <Box marginRight={1}>
                            <Typography variant="subtitle1" gutterBottom align="center" className='loginText etc'>
                                Não tem uma conta?
                            </Typography>
                        </Box>
                        <Link to="/cadastrar" className='text-decorator-none'>
                            <Typography variant="subtitle1" gutterBottom align="center" className='login text-decorator-none'>
                                Cadastre-se.
                            </Typography>
                        </Link>
                    </Box>
                </Box>
            </Grid>
            <Grid xs={6} className='loginbg'>
            </Grid>
        </Grid>
    );
}

export default Login;