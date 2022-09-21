import Header from "../components/header";
import Footer from "../components/footer";
import { Box, Container, Typography } from "@mui/material";
import styles from "../styles/Home.module.css";
import { requisicaoApi } from "../hooks/useFecth";
import ApresentacaoRestaurantes from "../components/cards/restaurantes/apresentacao";
import ApresentacaoHoteis from "../components/cards/hoteis/apresentacao";
import Head from "next/head";

export default function Home({data}) {
    return (
        <div>
            <Head>
                <title>Turismo campo mourao</title>
            </Head>
            <Header />
            <Box className={styles.divImage}>
                <Box className={styles.imagemHome}></Box>
            </Box>
            <Container sx={{marginTop: "35px"}}>
                <Box>
                    <Typography sx={{textAlign: "center", fontWeight: "bold", color: "#1f1b2d"}} variant="h3">Explore lugares de Campo Mourao</Typography>
                    <Typography sx={{textAlign: "center", marginTop: "15px", color: "#666276"}} variant="h6">Quer conhecer mais?</Typography>
                </Box>
            </Container>

            <Box sx={{padding: "25px 0px"}}>
                <Container sx={{height: "auto", marginTop: "35px"}}>
                    <Box sx={{display: "flex", alignItems: "center", flexDirection: "column"}}>
                        <Typography sx={{color: "#7bbda1"}} fontWeight="bold" variant="body1">Conheca a nossa culinaria</Typography>
                        <Typography sx={{fontWeight: "bold", color: "#1f1b2d"}} variant="h4">RESTAURANTES</Typography>
                    </Box>
                    {data.restaurant &&
                        <Box sx={{marginTop: "45px", display: "flex", justifyContent: "center", flexWrap: "wrap"}}>
                            {data.restaurant.map((rest, index) => (
                                <ApresentacaoRestaurantes id={rest._id} key={index} nome={rest.nome} stars={rest.rating} />
                            ))}
                        </Box>
                    }
                </Container>
            </Box>

            <Box sx={{backgroundColor: "f8f9fa", padding: "25px 0px"}}>
                <Container sx={{marginTop: "35px"}}>
                    <Box sx={{display: "flex", alignItems: "center", flexDirection: "column"}}>
                        <Typography sx={{color: "#7bbda1"}} fontWeight="bold" variant="body1">Para seu descanso</Typography>
                        <Typography sx={{fontWeight: "bold", color: "#1f1b2d"}} variant="h4">HOTEIS</Typography>
                    </Box>
                    {data.lodging &&
                        <Box sx={{marginTop: "45px", display: "flex", justifyContent: "center", flexWrap: "wrap"}}>
                            {data.lodging.map((hotels, index) => (
                                <ApresentacaoHoteis id={hotels._id} key={index} nome={hotels.nome} stars={hotels.rating} />
                            ))}
                        </Box>
                    }
                </Container>
            </Box>
            <Footer />
        </div>
    )
}

export const getStaticProps = async () => {
    const response = await requisicaoApi("/estabelecimentos/home/two", "GET");
    return {
        props: {
            data: response.data
        }
    }
}