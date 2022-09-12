import { Box, Container, Typography } from "@mui/material";
import Footer from "../components/footer";
import Header from "../components/header";
import styles from "../styles/Sobre.module.css";

export default function About() {
    return (
      <div>
        <Header />
            <Box className={styles.divImageAbout}>
                <Box className={styles.imagemAbout}/>
            </Box>
        <Container sx={{marginTop: "35px"}}>
          <Box>
          <Typography sx={{textAlign: "center", fontWeight: "bold", color: "#1f1b2d"}} variant="h3">Sobre Campo Mourão</Typography>
            <Typography sx={{marginTop: "15px", color: "#666276"}} variant="h5">ㅤCampo Mourão é um município predominantemente agrícola, localizado no estado do Paraná e sendo sede da Coamo, a maior cooperativa do Brasil e terceira maior do mundo. De acordo com as últimas estatísticas do IBGE levantadas em 2021, sua população era de 96.102 habitantes.</Typography>
            <Typography sx={{textAlign: "center", fontWeight: "bold", color: "#1f1b2d", marginTop: 5}} variant="h3">História</Typography>
            <Typography sx={{marginTop: "15px", color: "#666276", marginBottom: 2}} variant="h5">ㅤInicialmente a região pertenceu à antiga possessão espanhola chamada Província do Guairá, que hoje é o Paraguai. Em 1765 começou a ser vasculhada por milícias do governo da capitania de São Paulo, e em homenagem ao seu governador Dom Luís António de Sousa Botelho e Mourão, a região foi denominada "Campos do Mourão".</Typography>
            <Typography sx={{marginTop: "15px", color: "#666276", marginBottom: 2}} variant="h5">ㅤAté 1943, a região pertencia ao município de Guarapuava, e a partir desse ano passou a ser distrito do município de Pitanga e em 1947 passou a andar com suas próprias pernas, tendo como seu primeiro prefeito José Antônio dos Santos, nomeado em 18 de outubro de 1947.</Typography>
            <Typography sx={{marginTop: "15px", color: "#666276", marginBottom: 3}} variant="h5">ㅤNa década de 1980, foram desmembrados dois dos seus últimos distritos administrativos: Luiziana e Farol, ficando sobre sua tutela apenas o distrito de Piquirivaí. A partir de então começou a receber migrantes gaúchos e catarinenses que vinham atraídos pela fertilidade da terra roxa, formando assim a base da sociedade mourãoense.</Typography>
            <Typography sx={{textAlign: "right", marginTop: "15px", color: "#666276", marginBottom: 10}} variant="h6">Fonte: Prefeitura de Campo Mourão.</Typography>
          </Box>
        </Container>

        <Footer />
    </div>
  );
}