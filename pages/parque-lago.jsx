import { AccessTime, CalendarToday } from "@mui/icons-material";
import { Box, Card, CardContent, Chip, Container, ImageList, ImageListItem, Typography } from "@mui/material";
import Footer from "../components/footer";
import Header from "../components/header";

var itensImagens = [
    {img: "https://media.tribunadointerior.com.br/2021/06/b04df131-608d4d73855fa-parque-do-lago.jpg"},
    {img: "https://blogdoraoni.com/wp-content/uploads/2018/01/thumbnail_parque-do-lago-2-800x534.jpg"},
    {img: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/11/5a/8e/9e/catedral-sao-jose.jpg?w=700&h=500&s=1"}
];

export default function ParqueLago() {

    const diasDaSemana = ["domingo", "segunda-feira", "terça-feira", "quarta-feira", "quinta-feira", "sexta-feira", "sábado"];

    //Open or not open
    var informacaoTime = {open: "Fechado", color: "error"};
    const time = new Date();
    const hora = time.getHours();
    if (hora > 7 && hora < 21) informacaoTime = {open: "Aberto", color: "success"};
    const dia = diasDaSemana[time.getDay()];

    return (
        <Box>
            <Header />

            <Container sx={{marginTop: "40px", marginBottom: 5}}>
                <Typography fontWeight="bold" variant="h2">Parque do lago</Typography>

                <Box sx={{display: "flex", marginTop: 2}}>
                    <AccessTime sx={{color: "#70798C"}} />
                    <Typography sx={{marginLeft: 1 }}>07:00 ás 21:00</Typography>
                </Box>
                <Box sx={{display: "flex", alignItems: "center"}}>
                    <CalendarToday sx={{color: "#70798C"}} />
                    <Typography sx={{marginLeft: 1 }} variant="body1">Hoje - {dia}</Typography>
                    <Chip sx={{marginLeft: 1}} label={informacaoTime.open} color={informacaoTime.color} />
                </Box>

                {/* Historia */}
                <Card sx={{marginTop: 2}}>
                    <CardContent>
                        <Typography color="text.secondary" variant="h5">
                            História
                        </Typography>
                        <Typography>Segundo Valéria Machado e Marcos C. Bovo, inicialmente o local era destinado à captação de água para o abastecimento público. Foi transformado em parque em 1971 com “quadra esportiva, bancos, mesas, quiosques, sanitários, churrasqueiras e uma pista de dança ao ar livre, contando com uma área de 60 mil metros quadrados”. Melhorias ocorreram no fim da década de 1970, com o represamento do Rio do Campo para formação do lago, anexação de área externa para construção de estacionamento, restaurante e vegetação na margem direita da área verde.</Typography>
                        <br />
                        <Typography>Em 1987 o parque foi criado oficialmente pela lei 568/87 com uma área de quase 230.000 m², recebendo uma nova revitalização no ano de 1993, o aumento da lâmina de água delimitada com uma malha de rochas e telas no seu entorno, construção de duas pontes que permitiu a construção de uma pista de caminhada de 1200 m de extensão, serviços de terraplanagem em uma área de várzea para o plantio de gramas. instalação de equipamentos de ginásticas e playground e cancha de areia” (Machado & Bovo, 2009).</Typography>
                        <br />
                        <Typography>Três anos mais tarde, o parque teve nova ampliação de sua área para 22,96 hectares. Atualmente o parque dispõe de pista de caminhada, academia de terceira e de primeira idade, parque infantil, iluminação, duas quadras esportivas, concha acústica, monumentos artísticos e o lago como principais atrativos.</Typography>
                        <br />
                        <Typography color="text.secondary">Fonte: <a target="_blank" href="https://trilhaselugares.com/parque-municipal-joaquim-teodoro-de-oliveira/">T&L</a></Typography>
                   </CardContent>
                </Card>

                {/* Galery */}
                <ImageList cols={3} rowHeight={300}>
                    {itensImagens.map((item, index) => (
                        <ImageListItem key={index}>
                            <img src={item.img} alt="Imagem do parque" loading="lazy" />
                        </ImageListItem>
                    ))}
                </ImageList>

            </Container>

            <Footer />
        </Box>
    )
}