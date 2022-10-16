import { Alert, Box, Button, CircularProgress, FormControl, IconButton, Input, InputAdornment, InputLabel, Typography } from "@mui/material";
import { useState } from "react";
import InputCustumizado from "../components/input";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import styles from "../styles/Login.module.css"
import Head from "next/head";
import BtnGoogle from "../components/btnGoogle";
import { getSession, signIn } from "next-auth/react";

export default function Login(props) {
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);
    const [values, setValues] = useState({
        amount: '',
        password: '',
        weight: '',
        weightRange: '',
        showPassword: false
    });

    const handleChange = (prop) => (event) => {
        setValues({...values, [prop]: event.target.value});
    };
    const handleClickShowPassword = () => {
        setValues({
            ...values,
            showPassword: !values.showPassword
        });
    };
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    }
    async function enviar(e) {
        e.preventDefault();
        setLoading(true);
        let form = new FormData(e.currentTarget);
        signIn('credentials', {
            redirect: false,
            callbackUrl: `/`,
            acao: "login",
            email: form.get('email'),
            senha: form.get('senha')
        }).then(res => {
            setLoading(false);
            if (res.ok === false) {
                setError(true);
                return;
            }
            window.location.href = res.url;
        });
    }

    return (
        <div className={styles.fundo}>
            <Head>
                <title>Entrar - Turismo campo mourao</title>
            </Head>
            <div className={styles.divForm}>
                <Typography className={styles.textCentral} variant="h4">Entrar</Typography>
                <form className={styles.form} onSubmit={enviar}>
                    <InputCustumizado
                        id="email"
                        name="email"
                        variant="standard"
                        label="Email"
                        autoComplete="email"
                        color="success"
                        autoFocus={true}
                        required={true}
                    />
                    <FormControl
                        color="success"
                        variant="standard"
                        fullWidth={true}
                        required={true} 
                        >
                        <InputLabel>Senha</InputLabel>
                        <Input
                            id="senha"
                            name="senha"
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
                    {error &&
                        <Alert sx={{marginTop: 3}} severity="error">E-mail ou Senha inválido</Alert>
                    }
                    <Button color="success" type="submit" variant="contained" className={styles.botaoSubmit} disabled={loading} sx={{backgroundColor: "green", marginTop: 3}}>Acessar</Button>
                    {loading &&
                        <CircularProgress sx={{marginTop: 3}} color="success" />
                    }
                </form>

                {/* Login social */}
                <Box sx={{marginTop: 2}}>
                    <BtnGoogle />
                </Box>

                <span className={styles.textPequeno}>Ainda não tem conta? <Button sx={{color: "success", marginLeft: 1, marginBottom: "1px"}} variant="outlined" size="small" href="/cadastro">Cadastre-se</Button></span>
            </div>
        </div>
    )
}

export async function getServerSideProps(context) {
    const session = await getSession(context);
    if (session) {
        return {
            redirect: {
                destination: "/",
                permanent: false
            }
        }
    }
    
    return {
        props: {}
    }
}