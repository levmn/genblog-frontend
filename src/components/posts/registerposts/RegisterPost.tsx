import React, { ChangeEvent, useEffect, useState } from 'react';
import { Container, Typography, TextField, Button, Select, InputLabel, FormControl, FormHelperText, MenuItem } from '@material-ui/core';
import { useHistory, useParams } from 'react-router-dom';
import { busca, buscaId, put, post } from '../../../services/Service';
import Tema from '../../../models/Theme';
import Posts from '../../../models/Post';
import { useSelector } from 'react-redux';
import { TokenState } from '../../../store/tokens/tokensReducer';
import './RegisterPost.css';

function RegisterPost() {

    let history = useHistory();
    const { id } = useParams<{ id: string }>();
    const [temas, setTemas] = useState<Tema[]>([])

    const token = useSelector<TokenState, TokenState["tokens"]>(
        (state) => state.tokens
    );

    useEffect(() => {
        if (token === "") {
            alert("Você precisa estar logado.")
            history.push("/login")

        }
    }, [token])

    const [tema, setTema] = useState<Tema>(
        {
            id: 0,
            descricao: ''
        })
        
    const [posts, setPost] = useState<Posts>({
        id: 0,
        titulo: '',
        texto: '',
        tema: null
    })

    useEffect(() => { 
        setPost({
            ...posts,
            tema: tema
        })
    }, [tema])

    useEffect(() => {
        getTema()
        if (id !== undefined) {
            findByIdPosts(id)
        }
    }, [id])

    async function getTema() {
        await busca("/temas", setTemas, {
            headers: {
                'Authorization': token
            }
        })
    }

    async function findByIdPosts(id: string) {
        await buscaId(`postagens/${id}`, setPost, {
            headers: {
                'Authorization': token
            }
        })
    }

    function updatedPost(e: ChangeEvent<HTMLInputElement>) {

        setPost({
            ...posts,
            [e.target.name]: e.target.value,
            tema: tema
        })

    }

    async function onSubmit(e: ChangeEvent<HTMLFormElement>) {
        e.preventDefault()

        if (id !== undefined) {
            put(`/postagens`, posts, setPost, {
                headers: {
                    'Authorization': token
                }
            })
            alert('Post atualizado com sucesso!');
        } else {
            post(`/postagens`, posts, setPost, {
                headers: {
                    'Authorization': token
                }
            })
            alert('Seu post foi publicado com sucesso!');
        }
        back()

    }

    function back() {
        history.push('/postagens')
    }

    return (
        <Container maxWidth="sm" className="top">
            <form onSubmit={onSubmit}>
                <Typography variant="h3" color="textSecondary" component="h1" align="center" >Faça um post!</Typography>
                <TextField value={posts.titulo} onChange={(e: ChangeEvent<HTMLInputElement>) => updatedPost(e)} id="titulo" 
                label="título" variant="outlined" name="titulo" margin="normal" fullWidth />
                <TextField value={posts.texto} onChange={(e: ChangeEvent<HTMLInputElement>) => updatedPost(e)} id="texto" 
                label="texto" name="texto" variant="outlined" margin="normal" fullWidth />

                <FormControl>
                    <InputLabel id="demo-simple-select-helper-label">tema</InputLabel>
                    <Select
                         labelId="demo-simple-select-helper-label"
                         id="demo-simple-select-helper"
                         onChange={(e) => buscaId(`/temas/${e.target.value}`, setTema, {
                             headers: {
                                 'Authorization': token
                             }
                         })}>
                         {
                             temas.map(tema => (
                                 <MenuItem value={tema.id}>{tema.descricao}</MenuItem>
                             ))
                         }
                    </Select>

                    <FormHelperText>Escolha um tema para o seu post.</FormHelperText>
                    <Button type="submit" variant="contained" className='button'>
                        Publicar
                    </Button>
                </FormControl>
            </form>
        </Container>
    )
}

export default RegisterPost;