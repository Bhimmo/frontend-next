import { Alert, Avatar, Box, Button, Container, Input, Paper, Snackbar, Typography } from "@mui/material";
import Header from "../components/header";
import FormularioEvento from "../components/eventos/criar";
import { useState } from "react";
import TableEventos from "../components/table";
import useFetch from "../hooks/useFecth";
import { verificarLogin } from "../hooks/usuario/login";
import { salvarImage } from "../hooks/images/salvar";
import { Cake, Image } from "@mui/icons-material";
import Head from "next/head";

export default function Perfil() {
    const [open, setOpen] = useState(false);
    const [eventoCriado, setEventoCriado] = useState({open: false, vertical: "bottom", horizontal: "center"})
    const { vertical, horizontal } = eventoCriado;
    const [imgPerfil, setImgPerfil] = useState();
    const [errorImagem, setErrorImagem]= useState(false);

    var data;
    var meusEventos;
    var imagemMostrar;
    if (typeof window !== "undefined") {
        var user = verificarLogin();
        if (!user) {
            window.location.href = "/";
        }
        data = useFetch("usuarios/"+user.id).data;
        meusEventos = useFetch("eventos/usuario/"+user.id).data;
        
        var date = new Date(data.createdAt);
        var dia = String(date.getDate()).padStart(2, '0');
        var mes = String(date.getMonth() + 1).padStart(2, '0');
        var ano = date.getFullYear()
        var dataAtual = dia + "/" + mes + "/" + ano;

        imagemMostrar = imgPerfil || data.avatar_url;
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

    async function verImage(event) {
        const file = event.target.files[0];

        const reader = new FileReader();
        var irBackend = new FormData();
        irBackend.append("idReferencia", user.id);
        irBackend.append("file", file);
        const rr = await salvarImage(irBackend);
        if (rr.status === 500) {
            setErrorImagem(true);
        } else {
            setErrorImagem(false);
            reader.addEventListener('load', (e) => {
                setImgPerfil(e.target.result);
            })
            reader.readAsDataURL(file);
        }
    }

    return (
        <Box sx={{marginBottom: 5}}>
            <Head>
                <title>Perfil - Turismo campo mourao</title>
            </Head>
            <Header />
            {data &&
            <Container sx={{display: "flex", alignItems: "center", flexDirection: "column", marginTop: 5}}>
                <Avatar onChange={verImage} src={imagemMostrar} sx={{width: "200px", height: "200px"}} />
                <label>
                    <Avatar sx={{marginTop: 2, bgcolor: "#3D8361"}} variant="rounded">
                        <Image />
                        <Input sx={{display: "none"}} onChange={verImage} type="file" />
                    </Avatar>
                </label>
                {errorImagem &&
                    <Alert sx={{marginTop: 2}} severity="error">Tipo da imagem não permitida</Alert>
                }
                <Typography sx={{marginTop: 2}} variant="h3">{data.nome}</Typography>

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
            
                {data.tipo === "Admin" &&
                    <Box>
                        {meusEventos && meusEventos.length > 0 ? (
                            <TableEventos eventos={meusEventos} />
                        ) : (
                            <Typography fontWeight="bold" variant="body1" sx={{marginTop: 5}}>
                                Nenhum evento econtrado para esse usuario
                            </Typography>
                        )}
                    </Box>
                }
            </Container>
            }
        </Box>
    )
}