import { useState } from "react";
import Header from "../components/header";
import Footer from "../components/footer";
import Filtro from "../components/filtro/filtro";
import useFecth from "../hooks/useFecth";
import Card from "../components/cards/eventos";
import usePaginacao from "../hooks/paginacao/ordenar";
import { Alert, Box, Container, Pagination } from "@mui/material";
import { Close } from "@mui/icons-material";

export default function Eventos() {
    const [valuePagina, setValuePagina] = useState(0);
    const [events, setEvents] = useState([]);
    const { data, isLoading } = useFecth("eventos");

    var dados;
    if (events.length > 0) {
        if (events[0].id) {
            dados = []
        } else {
            dados = events
        }
    } else {
        dados = data;
    }
    dados = usePaginacao(dados, 6);
    function chamarPagina(e, value) {
        setValuePagina(value - 1);
    }

    //Filtro texto
    function meuFiltro(textoDigitado) {
        if (textoDigitado !== "") {
            const retorno = data.filter((esta) => {
                return esta.nome.toLowerCase().includes(textoDigitado.toLowerCase());
            })
            if (retorno.length > 0) {
                setEvents(retorno);
            } else {
                setEvents([{id: 1}])
            }
        } else {
            setEvents(data);
        }
    }

    function meuFiltroDatas(buscar) {
        var { dataInicial } = buscar;
        if (dataInicial) {
            dataInicial = new Date(dataInicial);
            const retorno = data.filter((evet) => {
                const estaDataInicial = new Date(evet.dataInicial);
                if(estaDataInicial > dataInicial) {
                    return evet
                }
            })
            if (retorno.length > 0) {
                setEvents(retorno);
            } else {
                setEvents([{id: 1}])
            }
        } else {
            setEvents(data);
        }
    }
    return (
        <Box>
            <Header />
            <Filtro evento={true} filtroData={meuFiltroDatas} filtro={meuFiltro} />
            {data.length > 0 &&
                <Box>
                    <Container sx={{display: "flex", flexWrap: "wrap", justifyContent: "center"}}>
                        {dados.paginas[valuePagina].map((evento, index) => (
                            <Card key={index} id={evento._id} dataEvento={evento.dataInicial} nome={evento.nome} />
                        ))}
                        {!isLoading && dados.paginas[0].length <= 0 &&
                            <Alert icon={<Close />} severity="error" sx={{marginTop: 5, marginBottom: 5}}>
                                <strong>Nenhum evento encontrado com esse filtro</strong>
                            </Alert>
                        }
                    </Container>
                    <Box sx={{marginTop: "20px", marginBottom: "25px", display: "flex", justifyContent: "center"}}>
                        <Pagination onChange={chamarPagina} count={dados.numero} />
                    </Box>
                </Box>
            }
            {!isLoading && data.length <= 0 &&
                <Alert icon={<Close />} severity="info" sx={{marginTop: 5, marginBottom: 5}}>
                    <strong>Nenhum evento encontrado</strong>
                </Alert>
            }
            <Footer />
        </Box>
    )
}