import { Box, Rating, Typography } from "@mui/material";
import styles from "../../styles/Cards.module.css";

export default function CardsEstabelecimentos({id, nome, stars, starsTotal}) {
    const irEsta = () => {
        window.location.href = "/estabelecimentos/"+id;
    }
    return (
        <Box onClick={irEsta} className={styles.divCard} sx={{cursor: "pointer", display: "flex", alignItems: "center", margin: "15px", height: "20vh", boxShadow: "rgba(0,0,0,0.35) 0px 5px 25px"}}>
            <img className={styles.imgEstabelecimentos} alt="estabelecimentos" src="images/hotel.jpg" />
            <Box sx={{
                borderRadius: "0px 5px 5px 0px",
                width: "40vh",
                backgroundColor: "#fff",
                height: "100%",
                paddingLeft: 1
            }}>
                <Typography variant="h6" sx={{whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis"}}>{nome}</Typography>
                <Box sx={{display: "flex", alignItems: "center"}}>
                    <Rating readOnly value={stars} precision={0.5} />
                    <Typography sx={{marginLeft: "5px"}} variant="">{starsTotal}</Typography>
                </Box>
            </Box>
        </Box>
    )
}