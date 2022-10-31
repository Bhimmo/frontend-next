import { Box, Card, CardContent, Rating, Typography } from "@mui/material";
import styles from "../../styles/Cards.module.css";

export default function Eventos(props) {
    const dataInicial = new Date(props.dataEvento);
    var dia = String(dataInicial.getDate()).padStart(2, '0');
    var mes = String(dataInicial.getMonth() + 1).padStart(2, '0');
    var ano = dataInicial.getFullYear();
    var dataAtual = dia + '/' + mes + '/' + ano;

    const horas = dataInicial.getHours();
    const min = String(dataInicial.getMinutes()).padStart(2, '0');
    const horario = `${horas}:${min}`;

    function irEvento() {
        window.location.href = "/eventos/"+props.id;
    }

    var imagem;
    if (props.foto) {
        imagem = props.foto;
    } else {
        imagem = "/images/fotoRestaurante.jpg"
    }

    return (
        <Card onClick={irEvento} sx={{cursor: "pointer", width: "38vh", boxShadow: "rgba(0,0,0,0.35) 0px 5px 15px", margin: "15px"}}>
            <CardContent className={styles.restauranteApresentacao} sx={{height: 300}} style={{backgroundSize: "cover", backgroundImage: `linear-gradient(to bottom, transparent 0%, #000 150%), url(${imagem})` }}>
                <Box sx={{height: "100%", display: "flex", flexDirection: "column", justifyContent: "end"}}>
                    <Typography sx={{
                        textAlign: "center",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis"}}
                        fontSize="24px"
                        color="#fff"
                        variant="body1"
                    >{props.nome}</Typography>
                    <Typography color="#fff" sx={{textAlign: "center"}}>{dataAtual} - {horario}</Typography>
                </Box>
            </CardContent>
        </Card>
    )
}