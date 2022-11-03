import Header from "../components/header";
import Footer from "../components/footer";
import { Box, Card, CardContent, CardMedia, Container, Typography } from "@mui/material";
import { requisicaoApi } from "../hooks/useFecth";
import ApresentacaoRestaurantes from "../components/cards/restaurantes/apresentacao";
import ApresentacaoHoteis from "../components/cards/hoteis/apresentacao";
import CardAgenda from "../components/cards/agenda";
import Head from "next/head";
import styles from "../styles/Home.module.css";

import Image from "next/image";
import Igreja from "../public/images/igreja_remaster.jpg";
import { AccessTime, DirectionsRun } from "@mui/icons-material";

export default function Home({data, eventosSemana, error}) {
    return (
        <div>
            {!error ? (
                <>
                    <Head>
                        <title>Turismo campo mourao</title>
                    </Head>
                    <Header />

                    <Image
                        objectFit="cover"
                        placeholder="Igreja catedral"
                        alt="Igreja catedral Campo Mourao"
                        priority={true}
                        quality={100}
                        height={1100}
                        objectPosition="bottom"
                        layout="responsive"
                        style={{borderRadius: "0px 0px 40px 40px"}}
                        src={Igreja}
                    />

                    <Container sx={{padding: "35px 0"}}>
                        <Box>
                            <Typography sx={{textAlign: "center", fontWeight: "bold", color: "#1f1b2d"}} variant="h3">Explore lugares de Campo Mourao</Typography>
                            <Typography sx={{textAlign: "center", marginTop: "15px", color: "#666276"}} variant="h6">Quer conhecer mais?</Typography>
                        </Box>
                    </Container>

                    <Box sx={{padding: "25px 0px", backgroundColor: "#f8f9fa"}}>
                        <Container sx={{height: "auto", marginTop: "35px"}}>
                            <Box sx={{display: "flex", alignItems: "center", flexDirection: "column"}}>
                                <Typography sx={{color: "#7bbda1"}} fontWeight="bold" variant="body1">O que temos essa semana</Typography>
                                <Typography sx={{fontWeight: "bold", color: "#1f1b2d"}} variant="h4">AGENDA</Typography>
                            </Box>
                            
                            <Box sx={{display: "flex", justifyContent: "center"}}>
                                <CardAgenda eventos={eventosSemana} />
                            </Box>
                            
                        </Container>
                    </Box>

                    <Box sx={{padding: "25px 0px"}}>
                        <Container sx={{height: "auto", marginTop: "35px"}}>
                            <Box sx={{display: "flex", alignItems: "center", flexDirection: "column"}}>
                                <Typography sx={{color: "#7bbda1"}} fontWeight="bold" variant="body1">Conheça a nossa culinária</Typography>
                                <Typography sx={{fontWeight: "bold", color: "#1f1b2d"}} variant="h4">RESTAURANTES</Typography>
                            </Box>
                            {data.restaurant &&
                                <Box sx={{marginTop: "45px", display: "flex", justifyContent: "center", flexWrap: "wrap"}}>
                                    {data.restaurant.map((rest, index) => (
                                        <ApresentacaoRestaurantes fotos={rest.fotos} id={rest._id} key={index} nome={rest.nome} stars={rest.rating} />
                                    ))}
                                </Box>
                            }
                        </Container>
                    </Box>

                    <Box sx={{backgroundColor: "#f8f9fa", padding: "25px 0px"}}>
                        <Container sx={{marginTop: "35px"}}>
                            <Box sx={{display: "flex", alignItems: "center", flexDirection: "column"}}>
                                <Typography sx={{color: "#7bbda1"}} fontWeight="bold" variant="body1">Para seu descanso</Typography>
                                <Typography sx={{fontWeight: "bold", color: "#1f1b2d"}} variant="h4">HOTEIS</Typography>
                            </Box>
                            {data.lodging &&
                                <Box sx={{marginTop: "45px", display: "flex", justifyContent: "center", flexWrap: "wrap"}}>
                                    {data.lodging.map((hotels, index) => (
                                        <ApresentacaoHoteis fotos={hotels.fotos} id={hotels._id} key={index} nome={hotels.nome} stars={hotels.rating} />
                                    ))}
                                </Box>
                            }
                        </Container>
                    </Box>

                    <Box sx={{padding: "25px 0px"}}>
                        <Container sx={{marginTop: "35px"}}>
                            <Box sx={{display: "flex", alignItems: "center", flexDirection: "column"}}>
                                <Typography sx={{color: "#7bbda1"}} fontWeight="bold" variant="body1">Para conhecer</Typography>
                                <Typography sx={{fontWeight: "bold", color: "#1f1b2d"}} variant="h4">TURISMO</Typography>
                            </Box>

                            <Card onClick={() => {window.location.href = "parque-lago"}} className={styles.pontoTurismo}>
                                <CardMedia
                                    component="img"
                                    sx={{width: "100%", height: 200}}
                                    src="images/parque-lago.jpeg"
                                    alt="Imagem parque do lago"
                                />
                                <Box sx={{display: "flex", flexDirection: "column"}}>
                                    <CardContent>
                                        <Typography sx={{fontWeight: "bold", textAlign: "center"}} component="div" variant="h5">Parque do lago</Typography>
                                        <Typography sx={{marginTop: "20px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis"}} component="div" variant="body">O Parque Municipal Joaquim Teodoro de Oliveira (Parque do Lago) é um lugar ideal para caminhadas, ginásticas e atividades recreativas em geral. Além de ser um dos principais cartões postais da cidade, é um dos locais mais frequentados na região.</Typography>
                                        <Box sx={{display: "flex", alignItems: "center", justifyContent: "center", marginTop: "10px"}}>
                                            <Box sx={{display: "flex", marginRight: "10px"}}>
                                                <AccessTime sx={{padding: "0px 5px "}} />
                                                <Typography sx={{fontWeight: "bold", color: "#32936F"}}>07:00 - 21:00</Typography>
                                            </Box>
                                            <Box sx={{display: "flex"}}>
                                                <DirectionsRun />
                                                <Typography sx={{fontWeight: "bold", color: "#32936F"}}>Pista com 2,5km</Typography>
                                            </Box>
                                        </Box>   
                                    </CardContent>
                                </Box>
                            </Card>
                        </Container>
                    </Box>
                    <Footer />
                </>
            ) : (
                <h1>Error</h1>
            )}
        </div>
    )
}

export const getServerSideProps = async () => {
    const response = await requisicaoApi("/estabelecimentos/home/two", "GET");

    if (!response.data) {
        return {
            props: {
                error: true
            }
        }
    }

    const eventosSemanais = await requisicaoApi("/eventos/semanais/home", "GET");

    return {
        props: {
            data: response.data,
            eventosSemana: eventosSemanais.data,
            error: false
        }
    }
}