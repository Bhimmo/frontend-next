import { ArrowForward } from "@mui/icons-material";
import { Button, Card, CardActions, CardContent, CardMedia, Container, Rating, Typography } from "@mui/material";
import styles from "../../../styles/Cards.module.css";

export default function ApresentacaoHoteis({id, nome, stars, fotos}) {
    var imagem;
    if (fotos[0] && process.env.NEXT_PUBLIC_IMAGENS_GOOGLE == "true") {
        imagem = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=1000&photo_reference=${fotos[0].photo_reference}&key=${process.env.NEXT_PUBLIC_GOOGLE_KEY}`;
    } else {
        imagem = "/images/zyro-image2.png"
    }
    return (
        <Card sx={{width: "35vh", margin: "15px"}}>
            <CardMedia
                sx={{height: 200}}
                component="img"
                image={imagem}
                alt="hotel"
            />
            <CardContent>
                <Typography sx={{whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis"}} variant="h5" fontWeight="bold">{nome}</Typography>
                <Rating precision={0.5} value={stars} readOnly />
            </CardContent>
            <Container sx={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                <CardActions>
                    <Button href={"/estabelecimentos/"+id} className={styles.iconHotel} endIcon={<ArrowForward />} size="small">Ver mais</Button>
                </CardActions>
            </Container>
        </Card>
    )
}