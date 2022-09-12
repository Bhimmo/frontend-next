import { Box, Container, Divider, Paper, Rating, Typography } from "@mui/material";
import Header from "../../components/header";
import Footer from "../../components/footer";
import Carrosel from "react-material-ui-carousel";
import CriacaoComentarios from "../../components/comentario/criacao";
import Comentarios from "../../components/comentario/listar";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useState } from "react";
import useFetch from "../../hooks/useFecth";
import { Language, Phone, Signpost } from "@mui/icons-material";

var items = [
    {
        img: "https://www.feriasbrasil.com.br/fotosfb/576094600-M.jpg",
        name: "Random",
        description: "alt"
    }
]

const EnderecoComponent = ({endereco, url}) => {
    if (endereco.logradouro && endereco.numero !== "null") {
        return <a target="blank" style={{textDecoration: "none", marginLeft: 5}} href={url}>
            {endereco.logradouro}, {endereco.numero}
        </a>
    }
    return <a target="blank" style={{textDecoration: "none", marginLeft: 5}} href={url}>
        Clique aqui
    </a>
}

export default function DetalhesEstabelecimentos() {
    const router = useRouter();
    const id = router.query.id;
    const data = useFetch("estabelecimentos/"+id).data;

    const dataComentarios = useFetch("comentarios/"+id);
    const [dataComent, setDataComent] = useState([]);
    useEffect(() => {
        if (dataComent.length === 0) {
            setDataComent(dataComentarios.data);
        }
    }, [dataComentarios, dataComent])

    return (
        <Box>
            {data && data._id &&
                <Box>
                    <Header />
                    <Container sx={{marginBottom: 5}}>
                        <Typography sx={{textAlign: "center", marginTop: 5}} variant="h3">{data.nome}</Typography>
                    
                        <Carrosel sx={{marginTop: 5, width: "100%"}}>
                            {items.map((item, index) => (
                                <Box key={index} sx={{display: "flex", justifyContent: "center"}}>
                                    <img src={item.img} style={{maxHeight: 300, maxWidth: 300, margin: 5}} />
                                    <img src={item.img} style={{maxHeight: 300, maxWidth: 300}} />
                                    <img src={item.img} style={{maxHeight: 300, maxWidth: 300, margin: 5}} />
                                </Box>
                            ))}
                        </Carrosel>
                        <Divider sx={{marginTop: 5}}/>
                        <Box sx={{display: "flex", justifyContent: "space-between", flexWrap: "wrap"}}>
                            {/* Contato */}
                            <Paper sx={{padding: 3, backgroundColor: "#F9F9F9", marginTop: 5, maxWidth: "400px"}}>
                                <Typography variant="h4" sx={{textAlign: "center"}}>Contato</Typography>
                                <Box sx={{display: "flex", alignItems: "center", marginTop: 1}}>
                                    <Phone fontSize="small"/>
                                    <Typography variant="body2">Telefone: {data.telefone}</Typography>
                                </Box>
                                <Box sx={{display: "flex", alignItems: "center", marginTop: 1}}>
                                    <Language fontSize="small"/>
                                    <Typography sx={{overflow: "hidden", whiteSpace: "nowrap", textOverflow: "ellipsis"}} variant="body2">Site: <a target="blank" style={{textDecoration: "none"}} href={data.site}>{(data.site ? data.site : "Nao registrado")}</a></Typography>
                                </Box>
                                <Box sx={{display: "flex", alignItems: "center", marginTop: 1}}>
                                    <Signpost fontSize="small"/>
                                    <Typography variant="body2" sx={{overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap"}}>
                                        Endereco: 
                                        <EnderecoComponent endereco={data.endereco} url={data.place_url} />
                                    </Typography>
                                </Box>
                            </Paper>
                            {/* Avaliacoes */}
                            <Paper sx={{paddingTop: 2, backgroundColor: "#F9F9F9", marginTop: 5, width: "350px", maxWidth: "400px", height: "100%"}}>
                                <Typography sx={{textAlign: "center"}} variant="h4">Avaliacoes</Typography>
                                <Box sx={{marginTop: 2, padding: 3, display: "flex", backgroundColor: "#52AA5E", justifyContent: "center", alignItems: "center"}}>
                                    <Rating precision={0.5} value={data.rating} readOnly />
                                    <Typography sx={{color: "#fff"}}> / {data.rating_total} avaliacoes</Typography>
                                </Box>
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
                    <Footer />
                </Box>
            }
        </Box>
    )
}