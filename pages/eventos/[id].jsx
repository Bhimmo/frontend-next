import { Box, Chip, Container, Divider, Paper, Typography } from "@mui/material";
import Header from "../../components/header";
import Carrosel from "react-material-ui-carousel";
import CriacaoComentarios from "../../components/comentario/criacao";
import Comentarios from "../../components/comentario/listar";
import Footer from "../../components/footer";
import {requisicaoApi} from "../../hooks/useFecth";
import { useState } from "react";
import { Home, LocalAtm, Web } from "@mui/icons-material";
import Head from "next/head";

export default function DetalhesEventos({data, comentarios, imagens}) {
    const [dataComent, setDataComent] = useState(comentarios);

    let statusData = "Andamento";
    let color = "warning";

    let dataAtual = new Date();
    let dataFinal = new Date(data.dataFinal);
    let dataInicial = new Date(data.dataInicial);

    if (dataAtual > dataFinal) {
        statusData = "Encerrado";
    } else if (dataAtual < dataInicial) {
        statusData = "Pendente"
    }

    
    if (statusData === "Encerrado") {
        color = "error";
    } else if (statusData === "Pendente") {
        color = "primary";
    }
    var status = {
        status: statusData,
        color: color
    }

    var valor;
    if (data.valor > 0) {
        valor = "R$" + data.valor;
    } else {
        valor = "Gratuito";
    }

    return (
        <Box>
            <Header />
            <Container sx={{marginBottom: 5}}>
                <Head>
                    <title>{data.nome} - Campo Mourao</title>
                </Head>
                <Box sx={{display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", marginTop: 5}}>
                    <Typography sx={{textAlign: "center"}} variant="h3">{data.nome}</Typography>
                    <Chip sx={{marginTop: 3}} color={status.color} label={status.status} />
                </Box>

                <Carrosel sx={{marginTop: 5, width: "100%"}}>
                    {imagens.length > 0 ?
                        imagens.map((item, i) => (
                            <Box key={i} sx={{display: "flex", justifyContent: "center"}}>
                                <img alt="Eventos" src={item.url} style={{maxHeight: 300, maxWidth: 300}} />
                            </Box>
                        ))
                    : (
                        <Box sx={{display: "flex", justifyContent: "center"}}>
                            <img alt="Eventos" src={data.foto} style={{maxHeight: 300, maxWidth: 300}} />
                        </Box>
                    )}
                </Carrosel>
                <Divider sx={{marginTop: 5}} />
                <Box sx={{display: "flex", justifyContent: "space-around", flexWrap: "wrap"}}>
                    <Paper sx={{padding: 5, backgroundColor: "#CDF0EA", marginTop: 5, maxWidth: "500px"}}>
                        <Typography variant="h4">Descri????o</Typography>
                        <Typography variant="body2">{data.descricao}</Typography>
                    </Paper>

                    <Paper sx={{padding: 5, backgroundColor: "#F9F9F9", marginTop: 5, maxWidth: "400px"}}>
                        <Typography variant="h4">Detalhes do evento</Typography>
                        <Box sx={{display: "flex", alignItems: "center", marginTop: 1}}>
                            <LocalAtm fontSize="small" />
                            <Typography variant="body2">Valor: <strong>{valor}</strong></Typography>
                        </Box>
                        {data.onlineUrl &&
                            <Box sx={{display: "flex", alignItems: "center", marginTop: 1}}>
                                <Web fontSize="small" />
                                <a target="blank" style={{textDecoration: "none", color: "rgba(0, 0, 0, 0.87)"}} href={data.onlineUrl}><Typography variant="body2">Transmicao: <strong>{data.onlineUrl}</strong></Typography></a>
                            </Box>
                        }
                        {data.endereco &&
                            <Box sx={{display: "flex", alignItems: "center", marginTop: 1}}>
                            <Home fontSize="small" />
                            <a target="blank" style={{textDecoration: "none", color: "rgba(0, 0, 0, 0.87)"}}><Typography variant="body2">Endereco: <strong>{data.endereco.logradouro + ", " + data.endereco.bairro}</strong></Typography></a>
                        </Box>
                        }
                    </Paper>
                </Box>

                {/* Comentarios */}
                <Box sx={{marginTop: 5}}>
                    <Box sx={{display: "flex", alignItems: "start", flexDirection: "column"}}>
                        <Typography variant="h4">Coment??rios</Typography>
                        <CriacaoComentarios obter={dataComent} inserir={setDataComent} id={data._id} />
                    </Box>
                    <Box sx={{marginTop: 4}}>
                        {dataComent.map((comentario, index) => (
                            <Comentarios key={index} comentarios={comentario} />
                        ))}
                    </Box>
                </Box>
            </Container>

            <Footer />
        </Box>
    )
}

export const getServerSideProps = async (context) => {
    const { data } = await requisicaoApi("eventos/"+context.params.id);
    
    if (!data) {
        return {
            redirect: {
                destination: "/",
                permanent: false
            }
        }
    }
    const comentarios = await requisicaoApi("comentarios/"+context.params.id);
    const imagens = await requisicaoApi("upload/images/eventos/"+context.params.id);

    return {
        props: {
            data,
            comentarios: comentarios.data,
            imagens: imagens.data
        }
    }
}