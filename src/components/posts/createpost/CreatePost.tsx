import React, { ChangeEvent, useEffect, useState } from 'react';
import { Container, Typography, TextField, Button, Select, InputLabel, FormControl, FormHelperText, MenuItem } from '@material-ui/core';
import { useHistory, useParams } from 'react-router-dom';
import { busca, buscaId, put, post } from '../../../services/Service';
import Tema from '../../../models/Theme';
import Posts from '../../../models/Post';
import { useSelector } from 'react-redux';
import { UserState } from '../../../store/tokens/userReducer';
import { toast } from 'react-toastify';
import './CreatePost.css';

function CreatePost() {

    let history = useHistory();
    const { id } = useParams<{ id: string }>();
    const [temas, setTemas] = useState<Tema[]>([])

    const token = useSelector<UserState, UserState["tokens"]>(
        (state) => state.tokens
    );

    useEffect(() => {
        if (token === "") {
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

    const [tema, setTema] = useState<Tema>(
        {
            id: 0,
            descricao: ''
        })
        
    const [posts, setPost] = useState<Posts>({
        id: 0,
        titulo: '',
        texto: '',
        tema: null,
        usuario: null
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
            toast.success("Seu post foi atualizado com sucesso!", {
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
            post(`/postagens`, posts, setPost, {
                headers: {
                    'Authorization': token
                }
            })
            toast.success("Seu post foi publicado com sucesso!", {
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
        back()

    }

    function back() {
        history.push('/postagens')
    }

    return (
        <Container maxWidth="sm" className="top">
            <form onSubmit={onSubmit}>
                <Typography variant="h3" color="textSecondary" component="h1" align="center" className='fontCreate'>Faça um post!</Typography>
                <TextField value={posts.titulo} onChange={(e: ChangeEvent<HTMLInputElement>) => updatedPost(e)} id="titulo" 
                label="Título" placeholder="Título maneirinho do seu post." required variant="outlined" name="titulo" margin="normal" fullWidth />
                <TextField value={posts.texto} onChange={(e: ChangeEvent<HTMLInputElement>) => updatedPost(e)} id="texto" 
                label="Texto" placeholder="Texto irado." required name="texto" variant="outlined" margin="normal" fullWidth />

                <FormControl>
                    <InputLabel id="demo-simple-select-helper-label">Tema</InputLabel>
                    <Select
                         className='btn'
                         labelId="demo-simple-select-helper-label"
                         id="demo-simple-select-helper"
                         onChange={(e) => buscaId(`/temas/${e.target.value}`, setTema, {
                             headers: {
                                 'Authorization': token
                             }
                         })}>
                         {
                             temas.map(tema => (
                                 <MenuItem className='btn' value={tema.id}>{tema.descricao}</MenuItem>
                             ))
                         }
                    </Select>

                    <FormHelperText className='choose' >Escolha um tema.</FormHelperText>
                    <Button type="submit" variant="contained" className='button btn top'>
                        Publicar
                    </Button>
                </FormControl>
            </form>
        </Container>
    )
}

export default CreatePost;