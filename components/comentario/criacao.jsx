import { Alert, Box, Button, createTheme, Rating, ThemeProvider } from "@mui/material";
import { useEffect, useState } from "react";
import Input from "../input";
import { salvarComentario } from "../../hooks/comentarios/avaliacao";
import { useSession } from "next-auth/react";

const threme = createTheme({
    palette: {
        text: {
            primary: "#fff"
        },
        primary: {
            main: "#fff"
        }
    }
})
export default function CriacaoComentario(props) {
    const { data: session } = useSession();
    var usuario;
    if (session) {
        usuario = session.user
    }
    const [valueRating, setValueRating] = useState(0);
    const [valueText, setValueText] = useState("");

    async function comentar(e) {
        e.preventDefault();
        let form = new FormData(e.currentTarget);
        const data = {
            usuario: usuario.name,
            estrelas: form.get('estrelas'),
            comentario: form.get('comentario'),
            estabelecimento: props.id
        }
        const result = await salvarComentario(data);
        if (result !== false) {
            props.inserir([...props.obter, result]);
            setValueRating(0);
            setValueText("");
        }
    }
    return (
        <Box sx={{width: "100%"}}>
            {usuario &&
                <Box sx={{backgroundColor: "#52AA5E", padding: 2, borderRadius: 3}}>
                    <form onSubmit={comentar}>
                        <ThemeProvider theme={threme} >
                            <Box sx={{display: "flex", justifyContent: "center"}}>
                                <Rating sx={{color: "#F2D388"}} name="estrelas" value={valueRating} onChange={(event, newValue) => {setValueRating(newValue)}} />
                            </Box>
                            <Box sx={{marginTop: 2}}>
                                <Input
                                    required={true}
                                    onChange={(v, nv) => {setValueText(nv)}}
                                    value={valueText}
                                    placeholder="Descreva sua experiencia"
                                    variant="filled"
                                    multiline={true}
                                    id="comentario"
                                    name="comentario"
                                    label="Comentario"
                                    type="text"
                                    focused={true} />
                            </Box>
                            <Box sx={{marginTop: 2, display: "flex", justifyContent: "center"}}>
                                <Button type="submit" variant="contained">comentar</Button>
                            </Box>
                        </ThemeProvider>
                    </form>
                </Box>
            }
            {!usuario &&
                <Box sx={{width: "100%"}}>
                    <Alert severity="info" action={
                        <Button href="/login" color="inherit" size="small">Entrar</Button>
                    }>
                        Deseja comentar? <strong>Entre com sua conta</strong>
                    </Alert>
                </Box>
            }
        </Box>
    )
}