import { Alert, Avatar, Box, Button, Container, Paper, Snackbar, Typography } from "@mui/material";
import Header from "../components/header";
import Footer from "../components/footer";
import FormularioEvento from "../components/eventos/criar";
import { useState } from "react";
import useFetch from "../hooks/useFecth";
import { verificarLogin } from "../hooks/usuario/login";
import { Cake } from "@mui/icons-material";

export default function Perfil() {
    const [open, setOpen] = useState(false);
    const [eventoCriado, setEventoCriado] = useState({open: false, vertical: "bottom", horizontal: "center"})
    const { vertical, horizontal } = eventoCriado;
    var data;
    if (typeof window !== "undefined") {
        const user = verificarLogin();
        if (!user) {
            window.location.href = "/";
        }
        data = useFetch("usuarios/"+user.id).data;
        
        var date = new Date(data.createdAt);
        var dia = String(date.getDate()).padStart(2, '0');
        var mes = String(date.getMonth() + 1).padStart(2, '0');
        var ano = date.getFullYear()
        var dataAtual = dia + "/" + mes + "/" + ano;
    }

    function openEvento() {
        if (open) {
            setOpen(false);
        } else {
            setOpen(true);
        }
    }
    function fecharNotificacaoCriacao() {
        setEventoCriado({open: false, vertical: "bottom", horizontal: "center"})
    }


    return (
        <Box sx={{marginBottom: 5}}>
            <Header />
            {data &&
            <Container sx={{display: "flex", alignItems: "center", flexDirection: "column", marginTop: 5}}>
                <Avatar sx={{width: "100px", height: "100px"}} />
                <Typography sx={{marginTop: 5}} variant="h3">{data.nome}</Typography>

                <Box sx={{display: "flex", alignItems: "center"}}>
                    <Cake sx={{marginBottom: "5px"}} fontSize="small" />
                    <Typography variant="body1">Entrou dia {dataAtual}</Typography>
                </Box>
                {data.tipo === "Admin" &&
                    <Button sx={{marginTop: 3}} onClick={openEvento} color="success" variant="contained">Criar evento</Button>
                }
                {open &&
                    <Paper sx={{width: "100%", height: "auto", backgroundColor: "#F8F9FA", marginTop: "25px"}}>
                        <FormularioEvento criacaoEvento={setEventoCriado} mostrarForm={setOpen} />
                    </Paper>
                }
                <Snackbar
                    anchorOrigin={{vertical, horizontal}}
                    open={eventoCriado.open}
                    onClose={fecharNotificacaoCriacao}
                    key={vertical + horizontal}
                    autoHideDuration={5000}>
                    <Alert sx={{marginTop: 5}} severity="success">
                        Evento criado — <strong>já está disponível na lista de eventos!</strong>
                    </Alert>
                </Snackbar>
            </Container>
            }
        </Box>
    )
}