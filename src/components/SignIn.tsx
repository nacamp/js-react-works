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
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {
    useQuery,
    useMutation,
    useQueryClient,
    QueryClient,
    QueryClientProvider,
    QueryCache,
} from 'react-query'
import { useNavigate } from 'react-router';
import { useSignIn, xxxSignIn2 } from '../hooks/api';
import { setToken } from './Token';
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

const theme = createTheme();

export default function SignIn() {
    const navigate = useNavigate();
    const [email, setEmail] = useState<string>();
    const [password, setPassword] = useState<string>();

    const mutaionSignIn: any = useSignIn({email,password});
    xxxSignIn2({email,password});
    // const responseSignIn: any = useSignIn({email,password});
    // const mutaionSignIn: any = useSignIn({email:email, password:password});
    // const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    //     responseSignIn.refetch();
    //     console.log(111);
    //     // event.preventDefault();
    //     // const data = new FormData(event.currentTarget);
    //     // console.log({
    //     //     email: data.get('email'),
    //     //     password: data.get('password'),
    //     // });
    //     // setEmail( data.get('email')?.toString() );
    //     // setPassword( data.get('password')?.toString() );
    //     // console.log(email, password);
    //     //responseSignIn.refetch();
    //     // mutaionSignIn.mutate({ email:data.get('email'), password: data.get('password') });
    // };

    const handleEmailChange = (event:any) => {
        setEmail(event.currentTarget.value);
    }

    const handlePasswordChange = (event:any) => {
        setPassword(event.currentTarget.value);
    }

    // const mutaionSignIn: any = useSignIn({email,password});
    // // const mutaionSignIn: any = useSignIn({email:email, password:password});
    //    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    const handleSubmit = (event:any) => {
        event.preventDefault();
        // const data = new FormData(event.currentTarget);
        // console.log({
        //     email: data.get('email'),
        //     password: data.get('password'),
        // });
        // setEmail( data.get('email')?.toString() );
        // setPassword( data.get('password')?.toString() );
        // console.log(email, password);
        mutaionSignIn.mutate();
        // navigate('/login')
        // mutaionSignIn.mutate({ email:data.get('email'), password: data.get('password') });
    };

    useEffect(() => {
        if (mutaionSignIn.isLoading) {
            console.log('mutaionSignIn.isLoading:', mutaionSignIn.isLoading);
        }else if(mutaionSignIn.isError){
            console.log('error......');
        } else {
            console.log('data:', mutaionSignIn.data);
            if(mutaionSignIn.data?.accessToken){
                // localStorage
                console.log(window.sessionStorage.getItem("token"));
                //이동
                setToken(mutaionSignIn.data?.accessToken);
                navigate('/b');
            }
            // setFallback(false);
            // console.log(mutaionPutTodo.data)
            // queryClient.invalidateQueries('getTodo');
        }
    }, [mutaionSignIn.data, mutaionSignIn.isError])

    return (
        <ThemeProvider theme={theme}>
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
        </ThemeProvider>
    );
}