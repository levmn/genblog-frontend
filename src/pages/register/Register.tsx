import React, {useState, useEffect, ChangeEvent} from 'react';
import {Grid, Box, Typography, TextField, Button} from '@material-ui/core';
import {Link, useHistory} from 'react-router-dom';
import User from '../../models/User';
import {cadastroUsuario} from '../../services/Service'
import { toast } from 'react-toastify';
import './Register.css';

function RegisterUser(){

    let history = useHistory();
    const [confirmarSenha, setConfirmarSenha] = useState<String>("")
    
    const [user, setUser] = useState<User>(
        {
            id: 0,
            nome: '',
            usuario: '',
            senha: ''
        })

    const [userResult, setUserResult] = useState<User>(
        {
            id: 0,
            nome: '',
            usuario: '',
            senha: ''
        })

    useEffect(() => {
        if (userResult.id != 0) {
            history.push("/login")
        }
    }, [userResult])

    function confirmarSenhaHandle(e: ChangeEvent<HTMLInputElement>) {
        setConfirmarSenha(e.target.value)
    }

    function updatedModel(e: ChangeEvent<HTMLInputElement>) {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        })
    }

    async function onSubmit(e: ChangeEvent<HTMLFormElement>) {
        e.preventDefault()
        if (confirmarSenha === user.senha) {
            cadastroUsuario(`/usuarios/cadastrar`, user, setUserResult)
            toast.success("Usuário cadastrado com sucesso!", {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: false,
                theme: "colored",
                progress: undefined,
              });
        } else {
            toast.error("Dados inconsistentes. Favor verificar as informações de cadastro.", {
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

    return (
        <Grid container direction='row' justifyContent='center' alignItems='center'> 
            <Grid item xs={6} className='register-bg'></Grid>
            <Grid item xs={6} alignItems='center'>
                <Box paddingX={10}>
                    <form onSubmit={onSubmit}>
                        <Typography variant="h3" gutterBottom color="textPrimary" component="h3" 
                        align="center" className='register'>
                            Cadastre-se
                        </Typography>
                        <TextField value={user.nome} onChange={(e: ChangeEvent<HTMLInputElement>) => updatedModel(e)} 
                            id="nome" label="Nome" placeholder="Insira seu nome de preferência." variant="outlined" 
                            name="nome" margin="normal" required fullWidth/>
                        <TextField value={user.usuario} onChange={(e: ChangeEvent<HTMLInputElement>) => updatedModel(e)}
                            id="usuario" label="E-mail" placeholder="Insira um e-mail válido." variant="outlined" 
                            name="usuario" margin="normal" required fullWidth/>
                        <TextField value={user.senha} onChange={(e: ChangeEvent<HTMLInputElement>) => updatedModel(e)}
                            id="senha" label="Senha" placeholder="Insira uma senha com o mínimo de 8 caracteres." 
                            variant="outlined" name="senha" margin="normal" type="password" required fullWidth/>
                        <TextField value={confirmarSenha} onChange={(e: ChangeEvent<HTMLInputElement>) => confirmarSenhaHandle(e)}
                            id="confirmarSenha" label="Confirmar senha" placeholder="Repita a senha para confirmação."
                            variant="outlined" name="confirmarSenha" margin="normal" type="password" required fullWidth/>
                        <Box marginTop={2} textAlign="center">
                            <Link to="/login" className='text-decorator-none'>
                                <Button variant="outlined" className='cancel-button'>
                                    Cancelar
                                </Button>
                            </Link>
                                <Button type="submit" variant="outlined" className='register-button'>
                                    Cadastrar
                                </Button>
                        </Box>
                    </form>
                </Box>
            </Grid>
        </Grid>

    );
}

export default RegisterUser;