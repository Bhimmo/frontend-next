import { Box, Chip, Container, Divider, Paper, Typography } from "@mui/material";
import Header from "../../components/header";
import Carrosel from "react-material-ui-carousel";
import CriacaoComentarios from "../../components/comentario/criacao";
import Comentarios from "../../components/comentario/listar";
import Footer from "../../components/footer";
import { useRouter } from "next/router";
import useFetch from "../../hooks/useFecth";
import { useEffect, useState } from "react";
import { LocalAtm, Web } from "@mui/icons-material";
import Image from "next/image";
import Head from "next/head";

var items = [
    {
        img: "https://www.feriasbrasil.com.br/fotosfb/576094600-M.jpg",
        name: "Random",
        description: "alt"
    }
]

export default function DetalhesEventos() {
    const router = useRouter();
    const id = router.query.id;
    const data = useFetch("eventos/"+id).data;

    var color = "primary";
    if (data) {
        if (data.status === "Encerrado") {
            color = "error";
        } else {
            color = "warning";
        }
        var status = {
            status: data.status,
            color: color
        }

        var valor;
        if (data.valor > 0) {
            valor = "R$" + data.valor;
        } else {
            valor = "Gratuito";
        }
    }

    const dataComentarios = useFetch("comentarios/"+id);
    const [dataComent, setDataComent] = useState([]);
    useEffect(() => {
        if (dataComent.length === 0) {
            setDataComent(dataComentarios.data);
        }
    }, [dataComent, dataComentarios])
 
    return (
        <Box>
            <Header />
            {data &&
            <Container sx={{marginBottom: 5}}>
                <Head>
                    <title>{data.nome} - Campo Mourao</title>
                </Head>
                <Box sx={{display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", marginTop: 5}}>
                    <Typography sx={{textAlign: "center"}} variant="h3">{data.nome}</Typography>
                    <Chip sx={{marginTop: 3}} color={status.color} label={status.status} />
                </Box>

                <Carrosel sx={{marginTop: 5, width: "100%"}}>
                    {items.map((item, index) => (
                        <Box key={index} sx={{display: "flex", justifyContent: "center"}}>
                            <Image alt="Eventos" src="/images/fotoRestaurante.jpg" width="250px" height="250px" />
                            <Image alt="Eventos" src="/images/fotoRestaurante.jpg" width="250px" height="250px" />
                            <Image alt="Eventos" src="/images/fotoRestaurante.jpg" width="250px" height="250px" />
                        </Box>
                    ))}
                </Carrosel>
                <Divider sx={{marginTop: 5}} />
                <Box sx={{display: "flex", justifyContent: "space-around", flexWrap: "wrap"}}>
                    <Paper sx={{padding: 5, backgroundColor: "#CDF0EA", marginTop: 5, maxWidth: "500px"}}>
                        <Typography variant="h4">Descricao</Typography>
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
                    </Paper>
                </Box>

                {/* Comentarios */}
                <Box sx={{marginTop: 5}}>
                    <Box sx={{display: "flex", alignItems: "start", flexDirection: "column"}}>
                        <Typography variant="h4">Comentarios</Typography>
                        <CriacaoComentarios obter={dataComent} inserir={setDataComent} id={id} />
                    </Box>
                    <Box sx={{marginTop: 4}}>
                        {dataComent.map((comentario, index) => (
                            <Comentarios key={index} comentarios={comentario} />
                        ))}
                    </Box>
                </Box>
            </Container>
            }
            <Footer />
        </Box>
    )
}