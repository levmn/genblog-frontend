import React, { ChangeEvent, useEffect, useState } from 'react';
import { Container, Typography, TextField, Button, Select, InputLabel, FormControl, FormHelperText, MenuItem } from '@material-ui/core';
import { useHistory, useParams } from 'react-router-dom';
import { busca, buscaId, put, post } from '../../../services/Service';
import useLocalStorage from 'react-use-localstorage';
import Tema from '../../../models/Theme';
import Posts from '../../../models/Post';
import './RegisterPost.css';


function RegisterPost() {

    let history = useHistory();
    const { id } = useParams<{ id: string }>();
    const [temas, setTemas] = useState<Tema[]>([])
    const [token, setToken] = useLocalStorage('token');

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
        await busca("/temas", setTema, {
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
            alert('Post atualizado com sucesso!');
        }
        back()

    }

    function back() {
        history.push('/post')
    }

    return (
        <Container maxWidth="sm" className="top">
            <form onSubmit={onSubmit}>
                <Typography variant="h3" color="textSecondary" component="h1" align="center" >Faça uma postagem!</Typography>
                <TextField value={posts.titulo} onChange={(e: ChangeEvent<HTMLInputElement>) => updatedPost(e)} id="titulo" 
                label="título" variant="outlined" name="título" margin="normal" fullWidth />
                <TextField value={posts.texto} onChange={(e: ChangeEvent<HTMLInputElement>) => updatedPost(e)} id="texto" 
                label="texto" name="texto" variant="outlined" margin="normal" fullWidth />

                <FormControl>
                    <InputLabel id="demo-simple-select-helper-label">Tema</InputLabel>

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

                    <FormHelperText>Escolha um tema para a postagem.</FormHelperText>
                    <Button type="submit" variant="contained" className='button'>
                        Finalizar
                    </Button>
                </FormControl>
            </form>
        </Container>
    )
}

export default RegisterPost;