import * as React from 'react';
import { useState, useRef, useEffect } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useNavigate } from 'react-router';
import { useSignIn } from '../hooks/api';
import { setToken } from './Token';
import { useGetLabel } from '../hooks/api';
import { setTokenSourceMapRange } from 'typescript';

function Copyright(props: any) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="https://mui.com/">
                Your Website
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}
export interface ISignIn {
    onNavigate: (url: string) => void;
}

export default function SignIn({ onNavigate }: ISignIn) {

    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const mutaionSignIn: any = useSignIn({ email, password });
    const responseLabel: any = useGetLabel(0);

    const handleEmailChange = (event: any) => {
        console.log(event.currentTarget.value);
        setEmail(event.currentTarget.value);
    }

    const handlePasswordChange = (event: any) => {
        setPassword(event.currentTarget.value);
    }

    const handleSubmit = (event: any) => {
        event.preventDefault();
        mutaionSignIn.mutate();
    };

    useEffect(() => {
        if (mutaionSignIn.isLoading) {
            console.log('mutaionSignIn.isLoading:', mutaionSignIn.isLoading);
        } else if (mutaionSignIn.isError) {
            console.log('error......');
        } else {
            console.log('data:', mutaionSignIn.data);
            if (mutaionSignIn.data?.accessToken) {
                // localStorage
                console.log(window.sessionStorage.getItem("token"));
                //이동
                setToken(mutaionSignIn.data?.accessToken);
                responseLabel.refetch();
                onNavigate('/todos');
            }
            // queryClient.invalidateQueries('getTodo');
        }
    }, [mutaionSignIn.data, mutaionSignIn.isError])

    return (
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
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign in
                </Typography>

                <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        data-testid='email'
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        onChange={handleEmailChange}
                        autoFocus
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        data-testid='password'
                        autoComplete="current-password"
                        onChange={handlePasswordChange}
                    />
                    <FormControlLabel
                        control={<Checkbox value="remember" color="primary" />}
                        label="Remember me"
                    />
                    <Button
                        // onClick={handleSubmit}
                        type="submit"
                        fullWidth
                        data-testid='submit'
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Sign In
                    </Button>
                    <Grid container>
                        <Grid item xs>
                            <Link href="#" variant="body2">
                                Forgot password?
                            </Link>
                        </Grid>
                        <Grid item>
                            <Link href="#" variant="body2">
                                {"Don't have an account? Sign Up"}
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
            <Copyright sx={{ mt: 8, mb: 4 }} />
        </Container>
    );
}


export function SignInPage() {
    const navigate = useNavigate();
    const handleNavigate = (url: string) => {
        navigate(url);
    }
    return (
        <SignIn onNavigate={handleNavigate} />
    );
}