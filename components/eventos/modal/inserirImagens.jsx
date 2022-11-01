import { Add, Close } from "@mui/icons-material";
import { Avatar, Box, Button,  Dialog, DialogContent, DialogContentText, DialogTitle, Typography, CircularProgress } from "@mui/material";
import { useState } from "react";
import { salvarImagem } from "../../../hooks/eventos/imagens";

export default function InserirImagens({open, setOpen, evento}) {
    const [imagens, setImagens] = useState([]);
    const [loading, setLoading] = useState(false);

    const fecharModal = () => {
        setOpen(!open);
        setImagens([]);
    }
    const incluirImagens = (e) => {
        const files = e.target.files;
        for (let i = 0; i < files.length; i++) {
            const reader = new FileReader();
            reader.addEventListener('load', (e) => {
                setImagens(imagens => [...imagens, {imagem: e.target.result, file: files[i]}]);
            })
            reader.readAsDataURL(files[i]);
        }
    }
    const enviarImagens = () => {
        setLoading(true);
        imagens.map(async (imagem) => {
            await salvarImagem(imagem.file, evento._id);
        });

        setLoading(false);
        setImagens([]);
        setOpen(false);
    }

    return (
        <Dialog open={open} onClose={fecharModal}>
            <DialogTitle>
                <Box sx={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                    Inserir imagens ao evento
                    <Close onClick={fecharModal} sx={{marginLeft: 2, cursor: "pointer"}}/>
                </Box>
            </DialogTitle>
            {!loading.status ? (
                <DialogContent>
                    <DialogContentText>Selecione as imagens para o evento</DialogContentText>
                    <label>
                        <Box sx={{display: "flex", alignItems: "center", marginTop: 2}}>
                            <Avatar sx={{bgcolor: "#3D8361"}} variant="rounded">
                                <Add />
                                <input multiple onChange={incluirImagens} style={{display: "none"}} type="file" />
                            </Avatar>
                            <Typography fontWeight="bold" sx={{pl: 2}}>Adicionar Imagem</Typography>
                        </Box>
                    </label>
                    <Box sx={{marginTop: 2}}>
                        {imagens.map((imagem, index) => (
                            <img style={{
                                marginRight: 5,
                                borderRadius: 8,
                                height: "auto",
                                maxHeight: 200,
                                width: "auto",
                                maxWidth: 250
                            }} key={index} src={imagem.imagem} />
                        ))}
                    </Box>
                    <Box sx={{display: "flex", justifyContent: "center", marginTop: 2}}>
                        <Button onClick={enviarImagens} color="success" variant="contained">Enviar</Button>
                    </Box>
                </DialogContent>
            ) : (
                <DialogContent sx={{display: "flex", justifyContent: "center"}}>
                    {loading.icon}
                </DialogContent>
            )}
        </Dialog>
    )
}