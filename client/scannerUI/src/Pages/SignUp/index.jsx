//import * as React from 'react';
import React, { useEffect, useState, useContext } from 'react';
import MyContext from '../../Component/Context/MyContext';
import axios from 'axios';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { useNavigate } from 'react-router-dom';
//import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

function Copyright(props) {

    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="https://mui.com/">
                QR Scanner
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}


const defaultTheme = createTheme();


export default function SignUp() {
    const navigate = useNavigate();
    const [data, setData] = useState("");
    const [serverResponse, setServerResponse] = useState("");
    const [result, setResult] = useState(-1);

    const handleSubmit = (event) => {
        event.preventDefault();
        const Username = document.getElementById("Name");
        const email = document.getElementById("email");
        const password = document.getElementById("password");

        // const data = new FormData(event.currentTarget);
        setData({ name: Username.value, email: email.value, password: password.value });
    };


    useEffect(() => {
        axios.post('http://localhost:8080/signUp', data)  // Assuming your backend is running on the same host
            .then(response => {
                // console.log("response here");
                // console.log(response);
                console.log(response.data.result);
                setResult(response.data.results);
                setServerResponse(response.data);

            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });


    }, [data]);

    useEffect(() => {
        console.log(serverResponse);
        if (serverResponse.result == 1) {
            localStorage.setItem('userData', JSON.stringify(serverResponse));
            const storedData = JSON.parse(localStorage.getItem('userData'));
            console.log(storedData);
            return navigate('/home');
        }
    }, [serverResponse]);

    useEffect(() => {
        const storedData = JSON.parse(localStorage.getItem('userData'));
        console.log(storedData);
        if (storedData != null) {
            return navigate('/home');
        }
    }, []);

    return (
        <ThemeProvider theme={defaultTheme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        {/* <LockOutlinedIcon /> */}
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign up
                    </Typography>
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} >
                                <TextField
                                    autoComplete="given-name"
                                    name="Name"
                                    required
                                    fullWidth
                                    id="Name"
                                    label="Name"
                                    autoFocus
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="new-password"
                                />
                            </Grid>

                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                            onClick={(e) => handleSubmit(e)}
                        >
                            Sign Up
                        </Button>
                        <Grid container>
                            <Grid item xs>
                                <Link href="#" variant="body2">
                                    {result == 0 &&
                                        <div style={{ color: "red" }}>
                                            Email Already Exist please signIn
                                        </div>
                                    }
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link href="/logIn" variant="body2">
                                    <div>Already have an account? Sign in</div>
                                </Link>
                            </Grid>
                        </Grid>

                    </Box>
                </Box>
                <Copyright sx={{ mt: 5 }} />
            </Container>
        </ThemeProvider>
    );
}