import Header from "../components/header";
import Footer from "../components/footer";
import Cards from "../components/cards/estabelecimentos";
import Filtro from "../components/filtro/filtro";
import { Alert, Box, CircularProgress, Container, Pagination, Snackbar, Stack } from "@mui/material";
import usePaginacao from "../hooks/paginacao/ordenar";
import {requisicaoApi} from "../hooks/useFecth";
import { useState } from "react";
import { Close } from "@mui/icons-material";
import Head from "next/head";

export default function Estabelecimentos({data}) {
    const [valuePagina, setValuePagina] = useState(0);
    const [estabs, setEstabs] = useState([]);

    //Paginacao
    var newDados;
    if (estabs.length > 0) {
        if (estabs[0].id) {
            newDados = []
        } else {
            newDados = estabs
        }
    } else {
        newDados = data;
    }
    var paginacao = usePaginacao(newDados, 6);
    function chamarPagina(e, value) {
        setValuePagina(value - 1);
    }

    //Filtro categorias
    function filtroCategorias(categoriaSelecionada) {
        const retorno = data.filter((esta) => {
            return esta.tipo.includes(categoriaSelecionada);
        })
        if (retorno.length > 0) {
            setEstabs(retorno);
        } else {
            setEstabs(data)
        }
    }

    //Filtro texto
    function filtroBusca(textoDigitado) {
        if (textoDigitado !== "") {
            const retorno = data.filter((esta) => {
                return esta.nome.toLowerCase().includes(textoDigitado.toLowerCase());
            })
            if (retorno.length > 0) {
                setEstabs(retorno);
            } else {
                setEstabs([{id: 1}])
            }
        } else {
            setEstabs(data);
        }
    }
    
    return (
        <div>
            <Head>
                <title>Estabelecimentos - Turismo campo mourao</title>
            </Head>
            <Header />
            <Filtro filtroCategorias={filtroCategorias} filtroBusca={filtroBusca} estabelecimento={true} />
            <Box sx={{backgroundColor: "#EBEBEB", borderRadius: "19px", boxShadow: "rgba(0,0,0,0.35) 0px 5px 15px"}}>
                <Container sx={{height: "auto", padding: "35px"}}>
                    <Box sx={{display: "flex", justifyContent: "center", flexWrap: "wrap"}}>
                        {paginacao.paginas[valuePagina].map((esta, index) => (
                            <Cards level={esta.level_price} telefone={esta.telefone} id={esta._id} nome={esta.nome} stars={esta.rating} starsTotal={esta.rating_total} key={index} />
                        ))}
                        {paginacao.paginas[0].length <= 0 &&
                            <Alert icon={<Close />} severity="error" sx={{marginTop: 5, marginBottom: 5}}>
                                <strong>Nenhum estabelecimento encontrado com esse filtro</strong>
                            </Alert>
                        }
                    </Box>
                    <Box sx={{marginTop: "20px", display: "flex", justifyContent: "center"}}>
                        <Stack spacing={2}>
                            <Pagination onChange={chamarPagina} count={paginacao.numero} variant="outlined" shape="rounded" />
                        </Stack>
                    </Box>
                </Container>
            </Box>
            <Footer />
        </div>
    )
}

export const getStaticProps = async () => {
    const response = await requisicaoApi("estabelecimentos", "GET");
    return {
        props: {
            data: response.data
        }
    }
}