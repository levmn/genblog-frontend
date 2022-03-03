import React, {useState, useEffect, ChangeEvent} from 'react'
import { Container, Typography, TextField, Button } from "@material-ui/core"
import {useHistory, useParams} from 'react-router-dom';
import Tema from '../../../models/Theme';
import { buscaId, put, post } from '../../../services/Service';
import { useSelector } from 'react-redux';
import { TokenState } from '../../../store/tokens/tokensReducer';
import './RegisterTheme.css';

function RegisterTheme() {

    let history = useHistory();
    const { id } = useParams<{id: string}>();
    
    const token = useSelector<TokenState, TokenState["tokens"]>(
        (state) => state.tokens
    );

    const [tema, setTema] = useState<Tema>({
        id: 0,
        descricao: ''
    })

    useEffect(() => {
        if(token === ''){
            alert("Você precisa estar logado.")
            history.push('/login')
        }
    }, [token])

    useEffect(() => {
        if(id !== undefined){
            findById(id)
        }
    }, [id])

    async function findById(id: string) {
        buscaId(`/temas/${id}`, setTema, {
            headers: {
                'Authorization': token
            }
        })
    } 

    function updatedTema(e: ChangeEvent<HTMLInputElement>){
        setTema({
            ...tema,
            [e.target.name]: e.target.value,
        })
    }

    async function onSubmit(e: ChangeEvent<HTMLFormElement>){
        e.preventDefault()
        console.log("tema " + JSON.stringify(tema))

        if(id !== undefined){
            // console.log(tema)
            put(`/temas`, tema, setTema, {
                headers: {
                    'Authorization': token
                }
            })
            alert("Tema atualizado com sucesso!");
        }else{
            // console.log(tema)
            post(`/temas`, tema, setTema, {
                headers: {
                    'Authorization': token
                }
            })
            alert("Tema cadastrado com sucesso!");
        }
        back()
    }

    function back(){
        history.push('/temas')
    }

    return (
        <Container maxWidth="sm" className="top">
            <form onSubmit={onSubmit}>
                <Typography variant="h3" color="textSecondary" component="h1" align="center" >Cadastre um tema:</Typography>
                <TextField value={tema.descricao} onChange={(e: ChangeEvent<HTMLInputElement>) => updatedTema(e)}
                id="descricao" label="descrição" variant="outlined" name="descricao" margin="normal" fullWidth />
                <Button type="submit" variant="contained" className='button'>
                    Finalizar
                </Button>
            </form>
        </Container>
    )
}

export default RegisterTheme;