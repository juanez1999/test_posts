import React, {useState} from 'react';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Box from '@mui/material/Box';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import IconButton from '@mui/material/IconButton';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useNavigate  } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useDispatch } from 'react-redux';
import {setUser} from '../redux/actions/setUser'

const BoxGlobal = styled(Box)(({ }) => ({
    width: '100%',
    height: '100vh',
    background: 'linear-gradient(338.54deg, rgba(0, 135, 153, 0.88) 15.3%, rgba(221, 251, 242, 0.88) 100%)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
}));

const BoxForm = styled(Box)(({ }) => ({
    width: '50%',
    height: '50%',
    background: '#FFFFFF',
    boxShadow: '0px 2px 2px rgba(0, 0, 0, 0.25)',
    borderRadius: '5px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
}));

const PrimaryButton = styled(Button)({
    color: '#21A9D3',
    borderColor: '#21A9D3',
    height: '40px',
});

const SecondaryButton = styled(Button)({
    backgroundColor: '#21A9D3',
    borderColor: '#21A9D3',
    height: '40px',
    '&:hover': {
        backgroundColor: '#1194BD',
        borderColor: '#1194BD',
        boxShadow: 'none',
    },
    '&:active': {
        boxShadow: 'none',
        backgroundColor: '#1194BD',
        borderColor: '1194BD',
    },
});

export const Login = () => {

    let navigate = useNavigate();
    const auth = getAuth();
    const dispatch = useDispatch();

    const setNewUser = userId => dispatch(setUser(userId));

    const [values, setValues] = useState({
        password: '',
        email: '',
        showPassword: false,
    });
    
    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };
    
    const handleClickShowPassword = () => {
        setValues({
            ...values,
            showPassword: !values.showPassword,
        });
    };
    
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
    const navigateRegister = () => {
        navigate('/register');
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        signInWithEmailAndPassword(auth, values.email, values.password)
        .then((user) => {
            // Signed in
            setNewUser(user.user.uid);
            navigate('/post');
        })
        .catch((error) => {
            //var errorCode = error.code;
            // var errorMessage = error.message;
        });   
    }

    return <BoxGlobal>
        <BoxForm>
            <form onSubmit={handleSubmit} style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width:'100%', height:'100%'}}>
                <Typography variant="h4" sx={{margin: '25px 0px', color: '#21A9D3'}}>
                    Iniciar sesión
                </Typography>
                <FormControl sx={{ m: 1, width: '60%' }} variant="standard">
                    <InputLabel htmlFor="standard-adornment-email">Correo electrónico</InputLabel>
                    <Input
                        id="standard-adornment-email"
                        value={values.email}
                        onChange={handleChange('email')}
                    />
                </FormControl>
                <FormControl sx={{ m: 1, width: '60%' }} variant="standard">
                    <InputLabel htmlFor="standard-adornment-password">Contraseña</InputLabel>
                    <Input
                        id="standard-adornment-password"
                        type={values.showPassword ? 'text' : 'password'}
                        value={values.password}
                        onChange={handleChange('password')}
                        endAdornment={
                        <InputAdornment position="end">
                            <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            >
                            {values.showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                        </InputAdornment>
                        }
                    />
                </FormControl>
                <PrimaryButton type='submit' variant="outlined" sx={{ m: 1, width: '60%', marginTop: '20px'}}>Iniciar sesión</PrimaryButton>
                <SecondaryButton variant="contained" sx={{ m: 1, width: '60%'}} onClick={() => navigateRegister()}>Registrarse</SecondaryButton>
            </form>
        </BoxForm>
    </BoxGlobal>;
};
