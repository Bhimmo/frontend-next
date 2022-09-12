import { Box, Button, Checkbox, Divider, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { salvarEvento } from "../../hooks/eventos/salvar";
import Input from "../input";

export default function CriarEvento(props) {
    const [online, setOnline] = useState(false);
    //const [presencial, setPresencial] = useState(true);

    function eventoOnline() {
        if (online) {
            setOnline(false);
        } else {
            setOnline(true);
        }
    }

    async function enviarFormulario(e) {
        e.preventDefault();
        let form = new FormData(e.currentTarget);
        let dataEvento = {
            nome: form.get('nomeEvento'),
            descricao: form.get('descricaoEvento'),
            valor: form.get('valorEvento'),
            dataInicial: form.get('dataInicial'),
            dataFinal: form.get('dataFinal'),
            onlineUrl: form.get('linkEvento'),
            endereco: {
                bairro: form.get('bairro'),
                logradouro: form.get('logradouro'),
                numero: form.get('numero'),
                cep: form.get('cep'),
                complemento: form.get('complemento'),
            }
        }
        const result = await salvarEvento(dataEvento);
        if (result) {
            props.mostrarForm(false);
            props.criacaoEvento({open: true, vertical: "bottom", horizontal: "center"})
        }
    }

    return (
        <form style={{padding: "15px"}} onSubmit={enviarFormulario}>
            <Typography sx={{marginBottom: "15px"}} variant="h5">Cadastro do evento</Typography>
            <Input color="success" required={true} label="Nome do evento" variant="standard" name="nomeEvento" type="text" />
            <Input color="success" required={true} multiline={true} label="Descricao do evento" variant="standard" name="descricaoEvento" type="text" />

            <Box sx={{marginTop: "15px", display: "flex", alignItems: "center", justifyContent: "space-around", flexWrap: "wrap"}}>
                <Box>
                    <Input required={true} label="Valor do evento" name="valorEvento" type="number" />
                </Box>
                <Box sx={{display: "flex", alignItems: "center"}}>
                    <Checkbox onChange={eventoOnline} />
                    <Typography>Evento online</Typography>
                </Box>
                    
                <Box sx={{display: "flex", flexWrap: "wrap"}}>
                    <Box sx={{padding: 3, display: "flex", flexDirection: "column", alignItems: "center"}}>
                        <label>Data de inicio</label>
                        <TextField required={true} name="dataInicial" type="datetime-local" />
                    </Box>
                    <Box sx={{padding: 3, display: "flex", flexDirection: "column", alignItems: "center"}}>
                        <label>Data final</label>
                        <TextField required={true} name="dataFinal" type="datetime-local" />
                    </Box>
                </Box>
            </Box>
            <Divider sx={{marginTop: 1}} />

            {/* endereco */}
            {!online &&
                <Box>
                    <Typography sx={{marginTop: "15px"}} variant="h5">Endereco</Typography>
                    <Box sx={{display: "flex", marginTop: "15px", justifyContent: "center", flexWrap: "wrap"}}>
                        <Box sx={{margin: "4px 10px"}}>
                            <Input required={true} fullWidth={false} variant="outlined" label="CEP" name="cep" id="cep"/>
                        </Box>
                        <Box sx={{margin: "4px 10px"}}>
                            <Input required={true} fullWidth={false} variant="outlined" label="Logradouro" name="logradouro" id="logradouro"/>
                        </Box>
                        <Box sx={{margin: "4px 10px"}}>
                            <Input required={true} fullWidth={false} variant="outlined" label="Bairro" name="bairro" id="bairro"/>
                        </Box>
                        <Box sx={{margin: "4px 10px"}}>
                            <Input required={true} fullWidth={false} variant="outlined" label="Numero" name="numero" id="numero"/>
                        </Box>
                        <Box sx={{margin: "4px 10px"}}>
                            <Input required={true} fullWidth={false} variant="outlined" label="Complemento" name="complemento" id="complemento"/>
                        </Box>
                    </Box>
                </Box>
            }
            {/* link transmicao */}
            {online &&
                <Box>
                    <Typography sx={{marginTop: "15px"}} variant="h5">Link transmicao</Typography>
                    <Box sx={{display: "flex", marginTop: "15px", justifyContent: "center"}}>
                        <Input required={true} variant="outlined" label="Link evento" name="linkEvento" id="linkEvento" />
                    </Box>
                </Box>
            }
            <Box sx={{marginTop: "35px", display: "flex", justifyContent: "flex-end"}}>
                <Button type="submit" variant="contained">Salvar</Button>
            </Box>
        </form>
    )
}