import { AttachMoney, East } from "@mui/icons-material";
import { Alert, Box, Button, Card, CardContent, CardMedia, Tab, Tabs, Typography } from "@mui/material";
import { useState } from "react";
import styles from "../../styles/Cards.module.css";

function TabPainel({ value, index, eventos }) {
    let date = new Date();
    var primeiroDiaSemana = date.getDate() - date.getDay();
    var hoje = new Date(date.setDate(primeiroDiaSemana + value));

    function irEvento() {
        window.location.href = "/eventos/" + eventos._id;  
    }
    
    return (
        <Box sx={{paddingTop: 3, borderTop: 1, borderColor: "divider"}} role="tabpanel" hidden={value !== index}>
            <Typography sx={{textAlign: "center", marginBottom: 2}} variant="h5">
                {hoje.getDate()} de {hoje.toLocaleDateString("pt-br", {month: "long"})}
            </Typography>

            {eventos ? (
                <Card onClick={irEvento} className={styles.cardAgenda}  sx={{display: "flex", borderRadius: 8, cursor: "pointer"}}>
                    <CardMedia
                        component="img"
                        alt="Imagem do evento"
                        sx={{width: {xs: 90, sm: 150}, height: {xs: 90, sm: 150}}}
                        src={eventos.foto}
                    />
                    <Box sx={{width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between"}}>
                        <CardContent>
                            <Typography fontSize={18} fontWeight="bold">{eventos.nome}</Typography>
                            <Typography sx={{maxWidth: {xs: 150, sm: 180, md: "100%"},whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis"}}>{eventos.descricao}</Typography>
                            <Box sx={{display: "flex", alignItems: "center"}}>
                                <AttachMoney fontSize="small" sx={{color: "#32936F"}} />
                                <Typography fontWeight="bold" sx={{color: "#32936F"}}>{eventos.valor}</Typography>
                            </Box>
                        </CardContent>
                        <East sx={{paddingRight: 2}}  />
                    </Box>
                </Card>
            ) : (
                <Alert sx={{marginTop: 2, textAlign: "center"}} severity="error">
                    <strong>Alerta</strong> - Sem evento nesse dia !
                </Alert>
            )}
            <Box sx={{display: "flex", justifyContent: "center", marginTop: 2}}>
                <Button onClick={() => window.location.href = "/eventos"} color="success" variant="outlined">Visualizar todos os eventos</Button>
            </Box>
        </Box>
    )
};

export default function CardAgenda({eventos}) {
    const [valueTabs, setValueTabs] = useState(0);
    const handleChangeTabs = (event, newValue) => setValueTabs(newValue);

    const arraySemana = ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"];

    return (
        <Box sx={{marginTop: 2, maxWidth: {xs: 320, sm: 400, md: "100%"}}}>
            <Tabs allowScrollButtonsMobile value={valueTabs} onChange={handleChangeTabs} variant="scrollable">
                {arraySemana.map((item, index) => (<Tab sx={{color: "#70798C"}} key={index} value={index} label={item} />))}
            </Tabs>
            {arraySemana.map((item, index) => (
                <TabPainel eventos={eventos[index]} key={index} index={index} value={valueTabs} />
            ))}
        </Box>
    )
}