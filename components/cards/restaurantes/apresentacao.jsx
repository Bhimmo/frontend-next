import { Box, Card, CardContent, Rating, Typography } from "@mui/material";
import styles from "../../../styles/Cards.module.css";

export default function ApresentacaoRestaurantes({id, nome, stars}) {
    function pagina() {
        window.location.href = "/estabelecimentos/" + id;
    }

    return (
        <Card onClick={pagina} sx={{cursor: "pointer", width: "38vh", boxShadow: "rgba(0,0,0,0.35) 0px 5px 15px", margin: "15px"}}>
            <CardContent sx={{height: 300}} className={styles.restauranteApresentacao}>
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