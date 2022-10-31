import { ThumbDownAlt, ThumbDownOffAlt, ThumbUpAlt, ThumbUpOffAlt } from "@mui/icons-material";
import { Avatar, Box, Paper, Rating, Typography } from "@mui/material";
import { useState } from "react";
import { avaliarComDeslike, avaliarComLike } from "../../hooks/comentarios/avaliacao";
import styles from "../../styles/Comentario.module.css";
import {pegarLetraAvatar} from "../../hooks/usuario/login";

export default function ListarComentarios({comentarios}) {
    const [likes, setLikes] = useState(comentarios.likes);
    const [deslikes, setDeslikes] = useState(comentarios.deslikes);
    const [selectedLikes, setSelectedLikes] = useState(false);
    const [selectedDeslikes, setSelectedDeslikes] = useState(false);

    const user = {
        nome: comentarios.usuario
    }
    const letra = pegarLetraAvatar(user);

    async function like() {
        const dataSalvar = {
            id: comentarios.id,
            likes: likes
        }
        if (comentarios.likes + 1 === likes) {
            setLikes(likes - 1);
            setSelectedLikes(false);
            dataSalvar.likes -= 1;
            return;
        }
        if (selectedDeslikes) {
            setDeslikes(deslikes - 1);
            setSelectedDeslikes(false);
        }
        setLikes(likes + 1);
        setSelectedLikes(true);
        dataSalvar.likes += 1;
        await avaliarComLike(dataSalvar);
    }

    async function deslike() {
        const dataSalvar = {
            id: comentarios.id,
            deslikes: deslikes
        }
        if (comentarios.deslikes + 1 === deslikes) {
            setDeslikes(deslikes - 1);
            setSelectedDeslikes(false);
            dataSalvar.deslikes -= 1;
            return;
        }
        if (selectedLikes) {
            setLikes(likes - 1);
            setSelectedLikes(false);
        }
        setDeslikes(deslikes + 1);
        setSelectedDeslikes(true);
        dataSalvar.deslikes += 1;
        await avaliarComDeslike(dataSalvar);
    }

    return (
        <Paper sx={{marginTop: 1, display: "flex", alignItems: "center", maxWidth: "100%", backgroundColor: "#EEEEEE"}}>
            <Box sx={{padding: {md: 5, xs: 2}}}>
                <Avatar src={comentarios.fotoUsuario} sx={{height: 56, width: 56}}>{letra}</Avatar>
            </Box>
            <Box>
                <Box sx={{width: {xs: 250, sm: "auto"}, marginTop: 1, display: "flex", alignItems: "center"}}>
                    <Typography sx={{whiteSpace: "nowrap", textOverflow: "ellipsis", overflow: "hidden"}} variant="h6">{comentarios.usuario} - </Typography>
                    <Rating value={comentarios.estrelas} readOnly />
                </Box>
                <Typography variant="body2" sx={{width: {xs: 200, sm: 420, md: "auto"}, overflow: "hidden", textOverflow: "ellipsis"}}>{comentarios.comentario}</Typography>
                <Box sx={{display: "flex", marginTop: 2, alignItems: "center", padding: 1}}>
                    {selectedLikes &&
                        <ThumbUpAlt className={styles.likeComentario} onClick={like} sx={{cursor: "pointer", marginRight: 1}} />
                    }
                    {!selectedLikes &&
                        <ThumbUpOffAlt className={styles.likeComentario} onClick={like} sx={{cursor: "pointer", marginRight: 1}} />
                    }
                    <Typography variant="body2" sx={{marginRight: 1}}>{likes}</Typography>
                    {selectedDeslikes &&
                        <ThumbDownAlt className={styles.deslikeComentario} onClick={deslike} sx={{cursor: "pointer", marginRight: 1}} />
                    }
                    {!selectedDeslikes &&
                        <ThumbDownOffAlt className={styles.deslikeComentario} onClick={deslike} sx={{cursor: "pointer", marginRight: 1}} />
                    }
                    <Typography variant="body2" sx={{marginRight: 1}}>{deslikes}</Typography>
                </Box>
            </Box>
        </Paper>
    )
}