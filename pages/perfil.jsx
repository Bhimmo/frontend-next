import { Alert, Avatar, Box, Button, Input, Container, Paper, Snackbar, Typography, Collapse, Fade, Grow, Slide } from "@mui/material";
import Header from "../components/header";
import FormularioEvento from "../components/eventos/criar";
import { useState } from "react";
import TableEventos from "../components/table";
import {requisicaoApi} from "../hooks/useFecth";
import { salvarImage } from "../hooks/images/salvar";
import { Cake, DriveFileRenameOutline, Image } from "@mui/icons-material";
import Head from "next/head";
import { getSession } from "next-auth/react";
import InputPerso from "../components/input";

export default function Perfil(props) {
    const data = props.data;
    const [nomeEdit, setNomeEdit] = useState(false);
    const [open, setOpen] = useState(false);
    const [eventoCriado, setEventoCriado] = useState({open: false, vertical: "bottom", horizontal: "center"})
    const { vertical, horizontal } = eventoCriado;
    const [imgPerfil, setImgPerfil] = useState();
    const [errorImagem, setErrorImagem]= useState(false);

    var imagemMostrar;
    var date = new Date(data.createdAt);
    var dia = String(date.getDate()).padStart(2, '0');
    var mes = String(date.getMonth() + 1).padStart(2, '0');
    var ano = date.getFullYear()
    var dataAtual = dia + "/" + mes + "/" + ano;

    imagemMostrar = imgPerfil || data.avatar_url;

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
        irBackend.append("idReferencia", data._id);
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
    const trocarNome = () => {
        setNomeEdit(!nomeEdit)
    }

    return (
        <Box sx={{marginBottom: 5}}>
            <Head>
                <title>Perfil - Turismo campo mourao</title>
            </Head>
            <Header />
            {data && data._id &&
            <Container sx={{display: "flex", alignItems: "center", flexDirection: "column", marginTop: 5}}>
                <Avatar variant="rounded" onChange={verImage} src={imagemMostrar} sx={{width: "200px", height: "200px"}} />
                <Box sx={{marginBottom: 2, width: 200, display: "flex", justifyContent: "space-around"}}>
                    <label>
                        <Avatar sx={{marginTop: 2, bgcolor: "#3D8361"}} variant="rounded">
                            <Image />
                            <Input sx={{display: "none"}} onChange={verImage} type="file" />
                        </Avatar>
                    </label>
                    <label /*onClick={trocarNome}*/>
                        <Avatar sx={{marginTop: 2, bgcolor: "gray"}} variant="rounded">
                            <DriveFileRenameOutline />
                        </Avatar>
                    </label>
                </Box>
                <Collapse in={nomeEdit} direction="down">
                    <InputPerso color="success" fullWidth={false} label="Trocar nome" type="text" placeholder="Digite seu novo nome" />
                </Collapse>
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
                        <FormularioEvento usuario={data._id} criacaoEvento={setEventoCriado} mostrarForm={setOpen} />
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
                        {props.eventos && props.eventos.length > 0 ? (
                            <TableEventos eventos={props.eventos} />
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

export async function getServerSideProps(context) {
    const session = await getSession(context);

    if (!session) {
        return {
            redirect: {
                destination: "/",
                permanent: false
            }
        }
    }
    var dataUser = await requisicaoApi("usuarios/"+session.user.email, "GET");
    var meusEventos = await requisicaoApi("eventos/usuario/"+dataUser.data._id, "GET");

    return {
        props: {
            user: session.user,
            data: dataUser.data,
            eventos: meusEventos.data
        }
    }
}