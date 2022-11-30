import { Box, Container, Divider, Paper, Rating, Typography } from "@mui/material";
import Header from "../../components/header";
import Footer from "../../components/footer";
import Carrosel from "react-material-ui-carousel";
import CriacaoComentarios from "../../components/comentario/criacao";
import Comentarios from "../../components/comentario/listar";
import { useState } from "react";
import { requisicaoApi } from "../../hooks/useFecth";
import {AttachMoney, DeliveryDining, Filter, Language, Phone, Signpost } from "@mui/icons-material";
import Head from "next/head";
import GoogleMaps from "../../components/goggleMaps";

var items = [
    {
        img: "https://www.feriasbrasil.com.br/fotosfb/576094600-M.jpg",
        name: "Random",
        description: "alt"
    }
]

export default function DetalhesEstabelecimentos({data, comentarios}) {
    const [dataComent, setDataComent] = useState(comentarios);

    var imagens = data.fotos;
    if (imagens && imagens.length <= 0) {
        imagens = ["One Elemnt"]
    }

    return (
        <Box>
            {data && data._id &&
                <Box>
                    <Head>
                        <title>{data.nome} - Campo Mourao</title>
                    </Head>
                    <Header />
                    <Container sx={{marginBottom: 5}}>
                        <Typography sx={{textAlign: "center", marginTop: 5}} variant="h3">{data.nome}</Typography>
                        {data.level_price
                        ? <Box sx={{marginTop: 3, display: "flex", justifyContent: "center"}}><Rating
                            sx={{color: "green"}}
                            emptyIcon={<AttachMoney />}
                            icon={<AttachMoney />}
                            value={data.level_price}
                            readOnly
                            /></Box>
                        : ""
                        }
                    
                        <Carrosel IndicatorIcon={<Filter />} sx={{marginTop: 5, width: "100%", height: 300}}>
                            {imagens.map((item, index) => (
                                <Box key={index} sx={{display: "flex", justifyContent: "center"}}>
                                    <img
                                        style={{backgroundImage: "cover"}}
                                        alt="Imagem referencia google"
                                        src={process.env.NEXT_PUBLIC_IMAGENS_GOOGLE == "true"
                                            ? `https://maps.googleapis.com/maps/api/place/photo?maxwidth=2000&maxheight=300&photo_reference=${item.photo_reference}&key=${process.env.NEXT_PUBLIC_GOOGLE_KEY}`
                                            : items[0].img }/>
                                </Box>
                            ))}
                        </Carrosel>
                        <Divider sx={{marginTop: 5}}/>
                        <Box sx={{display: "flex", justifyContent: "space-between", flexWrap: "wrap"}}>
                            {/* Contato */}
                            <Paper sx={{padding: 3, backgroundColor: "#F9F9F9", marginTop: 5, maxWidth: "400px", minWidth: "200px"}}>
                                <Typography variant="h4" sx={{textAlign: "center"}}>Detalhes</Typography>
                                <Box sx={{display: "flex", alignItems: "center", marginTop: 1}}>
                                    <Phone fontSize="small"/>
                                    <Typography variant="body2">Telefone: {data.telefone}</Typography>
                                </Box>
                                <Box sx={{display: "flex", alignItems: "center", marginTop: 1}}>
                                    <Language fontSize="small"/>
                                    <Typography sx={{overflow: "hidden", whiteSpace: "nowrap", textOverflow: "ellipsis"}} variant="body2">Site: <a target="blank" style={{textDecoration: "none"}} href={data.site ? data.site : data.place_url}>{(data.site ? data.site : "Não registrado")}</a></Typography>
                                </Box>
                                <Box sx={{display: "flex", alignItems: "center", marginTop: 1}}>
                                    <Signpost fontSize="small"/>
                                    <Typography variant="body2" sx={{overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap"}}>
                                        Endereco: 
                                        <a target="blank" style={{textDecoration: "none", marginLeft: 5}} href={data.place_url}>{data.endereco}</a>
                                    </Typography>
                                </Box>
                                {data.delivery &&
                                    <Box sx={{display: "flex", alignItems: "center", marginTop: 1}}>
                                        <DeliveryDining fontSize="small"/>
                                        <Typography
                                            sx={{overflow: "hidden", whiteSpace: "nowrap", textOverflow: "ellipsis"}}
                                            variant="body2">Delivery: <strong>Disponível para entregas</strong></Typography>
                                    </Box>
                                }
                            </Paper>
                            {/* Avaliacoes */}
                            <Paper sx={{paddingTop: 2, backgroundColor: "#F9F9F9", marginTop: 5, width: "350px", maxWidth: "400px", height: "100%"}}>
                                <Typography sx={{textAlign: "center"}} variant="h4">Avaliações</Typography>
                                <Box sx={{marginTop: 2, padding: 3, display: "flex", backgroundColor: "#52AA5E", justifyContent: "center", alignItems: "center"}}>
                                    <Rating precision={0.5} value={data.rating} readOnly />
                                    <Typography sx={{color: "#fff"}}> / {data.rating_total} avaliações</Typography>
                                </Box>
                            </Paper>
                        </Box>

                        {/* Mapa */}
                        <Box sx={{height: 300, marginTop: 5}}>
                            <GoogleMaps cordenadas={data.location} />
                        </Box>

                        {/* Comentarios */}
                        <Box sx={{marginTop: 5}}>
                            <Box sx={{display: "flex", alignItems: "start", flexDirection: "column"}}>
                                <Typography variant="h4">Comentários</Typography>
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
            }
        </Box>
    )
}

export const getServerSideProps = async (context) => {
    const { data } = await requisicaoApi("estabelecimentos/"+context.params.id);
    if (!data) {
        return {
            redirect: {
                destination: "/",
                permanent: false
            }
        }
    }
    const comentarios = await requisicaoApi("comentarios/"+context.params.id);
    return {
        props: {
            data,
            comentarios: comentarios.data
        }
    }
}