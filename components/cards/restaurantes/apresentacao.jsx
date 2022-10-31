import { Box, Card, CardContent, Rating, Typography } from "@mui/material";
import styles from "../../../styles/Cards.module.css";

export default function ApresentacaoRestaurantes({id, nome, stars, fotos}) {
    function pagina() {
        window.location.href = "/estabelecimentos/" + id;
    }

    var imagem;
    if (fotos[0] && process.env.NEXT_PUBLIC_IMAGENS_GOOGLE == true) {
        imagem = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=1000&photo_reference=${fotos[0].photo_reference}&key=${process.env.NEXT_PUBLIC_GOOGLE_KEY}`;
    } else {
        imagem = "/images/fotoRestaurante.jpg"
    }

    return (
        <Card onClick={pagina} sx={{cursor: "pointer", width: "38vh", boxShadow: "rgba(0,0,0,0.35) 0px 5px 15px", margin: "15px"}}>
            <CardContent className={styles.restauranteApresentacao} sx={{height: 300}} style={{backgroundSize: "cover", backgroundImage: `linear-gradient(to bottom, transparent 0%, #000 150%), url(${imagem})` }}>
                <Box sx={{height: "100%", display: "flex", flexDirection: "column", justifyContent: "end"}}>
                    <Typography sx={{
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis"}}
                        fontSize="20px"
                        color="#fff"
                        variant="body1"
                    >{nome}</Typography>
                    <Rating precision={0.5} readOnly value={stars} />
                </Box>
            </CardContent>
        </Card>
    )
}