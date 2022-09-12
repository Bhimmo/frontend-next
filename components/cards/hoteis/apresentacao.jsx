import { ArrowForward } from "@mui/icons-material";
import { Button, Card, CardActions, CardContent, CardMedia, Container, Rating, Typography } from "@mui/material";
import styles from "../../../styles/Cards.module.css";

export default function ApresentacaoHoteis({id, nome, stars}) {
    return (
        <Card sx={{width: "40vh", margin: "15px"}}>
            <CardMedia
                sx={{height: 200}}
                component="img"
                image="images/hotel.jpg"
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