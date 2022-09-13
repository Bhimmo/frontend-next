import { Alert, Button, CircularProgress, FormControl, IconButton, Input, InputAdornment, InputLabel, Typography } from "@mui/material";
import { useState } from "react";
import { criarUsuario } from "../hooks/usuario/login";
import InputCustumizado from "../components/input";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import styles from "../styles/Login.module.css"
import Head from "next/head";

export default function Login() {
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
        setError(false);
        setLoading(true);
        let form = new FormData(e.currentTarget);
        const result = await criarUsuario({
            nome: form.get('nome'),
            email: form.get('email'),
            senha: form.get('senha')
        });
        setLoading(false);
        if(result === true) {
            window.location.href = "/";
        } else {
            setError(true);
        }
    }

    return (
        <div className={styles.fundo}>
            <Head>
                <title>Registrar - Turismo campo mourao</title>
            </Head>
            <div className={styles.divForm}>
                <Typography className={styles.textCentral} variant="h4">Cadastre-se</Typography>
                <form className={styles.form} onSubmit={enviar}>
                    <InputCustumizado
                        id="nome"
                        name="nome"
                        variant="standard"
                        label="Nome"
                        autoComplete="nome"
                        color="success"
                        autoFocus={true}
                        required={true}
                    />
                    <InputCustumizado
                        id="email"
                        name="email"
                        variant="standard"
                        label="Email"
                        autoComplete="email"
                        color="success"
                        required={true}
                    />
                    <FormControl
                        color="success"
                        variant="standard"
                        required={true}
                        fullWidth={true}
                    >
                        <InputLabel>Senha</InputLabel>
                        <Input
                            id="standard-adornment-password"
                            name="senha"
                            required={true}
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
                    <Button color="success" type="submit" variant="contained" className={styles.botaoSubmit} disabled={loading} sx={{backgroundColor: "green", marginTop: 3}}>Acessar</Button>
                    {loading &&
                        <CircularProgress sx={{marginTop: 3}} color="success" />
                    }
                </form>
                {error &&
                    <Alert sx={{marginTop: 2}} severity="error">Usuario invalido</Alert>
                }
                <span className={styles.textPequeno}>Quer fazer login? <Button sx={{color: "success", marginLeft: 1, marginBottom: "1px"}} variant="outlined" size="small" href="/login">Login</Button></span>
            </div>
        </div>
    )
}