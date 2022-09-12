import { Box, Button, Typography } from "@mui/material";

export default function notFound() {
    return (
        <Box sx={{display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", flexDirection: "column", backgroundColor: "rgb(20, 170, 132)"}}>
            <img className="imgNotFound" src="images/404a.gif" alt="Pagina não encontrada"></img>
            <Typography sx={{width: "auto", color: "white"}} variant="h4">Página não encontrada</Typography>
            <Button href="/" sx={{marginTop: "20px", backgroundColor: "white"}} variant="outlined" color = "success">Voltar à home</Button>
        </Box>
    )
}