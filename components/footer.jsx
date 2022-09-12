import { Alert, Box, Container, IconButton, Snackbar, TextField, Typography } from "@mui/material";
import { Send } from "@mui/icons-material";
import { useState } from "react";
import styles from "../styles/Footer.module.css";

export default function Footer() {
    const [envio, setEnvio] = useState({open: false, vertical: "bottom", horizontal: "center"});
    const { vertical, horizontal } = envio;
    function fecharEnvio() {
        setEnvio({ ...envio, open: false });
    }

    function enviar(e) {
        e.preventDefault();
        let data = new FormData(e.currentTarget);
        setEnvio({open: true, vertical: "bottom", horizontal: "center"});
        console.log({
            email: data.get('emailNotificacao')
        });
    }
    return (
        <Box sx={{backgroundColor: "#52AA5E"}}>
            <Container sx={{display: "flex", justifyContent: "space-around", padding: "45px 0px"}}>
                <Box>
                    <Typography sx={{color: "#fff", fontWeight: "bold", marginBottom: "15px"}} variant="h5">Pages</Typography>
                    <a className={styles.itemFooter} href="/estabelecimentos"><Typography sx={{color: "#fff", padding: "5px 0px"}} variant="body2">Estabelecimentos</Typography></a>
                    <a className={styles.itemFooter} href="/eventos"><Typography sx={{color: "#fff", padding: "5px 0px"}} variant="body2">Eventos</Typography></a>
                </Box>
                <Box>
                    <Typography sx={{color: "#fff", fontWeight: "bold", marginBottom: "15px"}} variant="h5">Portal</Typography>
                    <a className={styles.itemFooter} href="/sobre"><Typography sx={{color: "#fff", padding: "5px 0px"}} variant="body2">Sobre nós</Typography></a>
                </Box>
                <Box>
                    <Typography sx={{color: "#fff", fontWeight: "bold", marginBottom: "15px"}} variant="h5">Avisos</Typography>
                    <form className={styles.formFooter} onSubmit={enviar}>
                        <TextField 
                            type="email" 
                            size="small" 
                            className={styles.inputNot} 
                            id="emailNotificacao" 
                            name="emailNotificacao" 
                            color="success" 
                            label="Digite seu email" 
                            variant="filled"
                            required
                        />
                        <IconButton 
                            type="submit"
                            size="small"
                            variant="contained"
                            sx={{marginLeft: "5px", backgroundColor: "#fff"}} 
                            color="success"
                        ><Send /></IconButton>
                    </form>
                    <Typography sx={{color: "#fff", padding: "5px 0px"}} variant="body2">Para receber notificações das novidades</Typography>
                </Box>
            </Container>
            {envio && 
                <Snackbar
                    anchorOrigin={{vertical, horizontal}}
                    open={envio.open}
                    onClose={fecharEnvio}
                    autoHideDuration={5000}
                    key={vertical + horizontal}
                >
                    <Alert onClose={fecharEnvio} severity="success" sx={{ width: '100%' }}>
                        Email cadastrado para o envio !
                    </Alert>
                </Snackbar>
            }
        </Box>
    )
}