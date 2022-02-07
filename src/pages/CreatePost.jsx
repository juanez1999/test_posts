import { Box, Breadcrumbs, Button, Card, CardContent, CardHeader, Grid, Link, TextField } from "@mui/material";
import { useState } from "react";
import {Link as NavLink} from 'react-router-dom';
import usePostSubmit from "../hook/usePost/usePostSubmit";
import { useSelector } from 'react-redux';


export const CreatePost = () => {
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const {createPost} = usePostSubmit();

    const userId = useSelector(state => state.user)

    const handlePostSubmit = async (event) => {
        event.preventDefault();
        try {
        createPost(title, body, userId).then(res => res.status === 201 ? window.alert("Post creado con éxito") : window.alert("El post no pudo ser creado"));
        } catch (error) {
        console.error(error.message);
        }
    }

    const handleTitleChange = (event) => {
        setTitle(event.target.value);
    }
    const handleBodyChange = (event) => {
        setBody(event.target.value);
    }

    return (
        <Box sx={{
        width: 800,
        minWidth: 320,
        maxWidth: '100vw',
        margin: 'auto',
        padding: 2
        }}>
        <Breadcrumbs>
            <Link underline='hover' href='/post' to='/post' component={NavLink}>
            Publicaciones
            </Link>
            <Link underline='hover' href='/post/new' to='/post/new' component={NavLink}>
            Nueva publicación
            </Link>
        </Breadcrumbs>

        <Card sx={{marginTop: 4}}>
            <CardHeader title='Crear nueva publicación'/>
            <CardContent>
            <form onSubmit={handlePostSubmit}>
                <Grid container spacing={2} sx={{marginBottom: 4}}>
                <Grid item xs={12}>
                    <TextField 
                    variant="outlined" 
                    label="Título" 
                    required 
                    sx={{width: '100%'}}
                    onChange={handleTitleChange}/>
                </Grid>

                <Grid item xs={12}>
                    <TextField 
                    variant="outlined" 
                    label="Contenido" 
                    required 
                    multiline 
                    minRows={4}
                    sx={{width: '100%'}}
                    onChange={handleBodyChange}/>
                </Grid>
                </Grid>

                <Button 
                color='primary' 
                variant='contained' 
                fullWidth
                type='submit'
                >
                Crear publicación
                </Button>
            </form>
            </CardContent>
        </Card>
        </Box>
    )
}

