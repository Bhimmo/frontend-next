import { ArrowDownward, Close, Delete, Edit, Check, Stop, Cancel, Add } from "@mui/icons-material";
import { Box, IconButton, TableCell, TableHead, Toolbar, Tooltip, Typography, TableRow, Checkbox, TableBody, Table, Paper, createTheme, ThemeProvider, TableContainer, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button, LinearProgress, CircularProgress, Fab } from "@mui/material";
import { useState } from "react";
import { deleteEvento } from "../hooks/eventos/deletar";
import { updateEvento } from "../hooks/eventos/salvar";
import { arrumarDate, arrumarValor, arrumarDateInput } from "../hooks/geral";
import Input from "./input";
import InserirImagens from "./eventos/modal/inserirImagens";

function ComponentData({data}) {
    const dataArrumada = arrumarDate(data);
    return (
        <span>{dataArrumada}</span>
    )
}
function ComponentValor({valor}) {
    const valorArrumado = arrumarValor(valor);
    return (
        <span>{valorArrumado}</span>
    )
}

function ModalEditarEvento({open, onClose, evento}) {
    const [loading, setLoading] = useState({nome: "Atualizando", status: false, icon: <Check/>});
    if (evento) {
        var dataInicial = arrumarDateInput(evento.dataInicial);
        var dataFinal = arrumarDateInput(evento.dataFinal);
    }
    const atualizarEvento = async (e) => {
        e.preventDefault();
        setLoading({nome: "Atualizando", status: true, icon: <CircularProgress color="success" size={40} />});
        let form = new FormData(e.currentTarget);
        let updateEvent = {
            id: evento._id,
            nome: evento.nome,
            descricao: form.get('descricaoEvento'),
            valor: form.get('valorEvento'),
            dataInicial: form.get('dataInicial'),
            dataFinal: form.get('dataFinal'),
            onlineUrl: evento.onlineUrl ? form.get('linkEvento') : undefined,
            usuarioId: evento.usuarioId,
            ativo: evento.ativo,
            status: evento.status,
            endereco: evento.endereco ? {
                bairro: form.get('bairro'),
                logradouro: form.get('logradouro'),
                numero: form.get('numero'),
                cep: form.get('cep'),
                complemento: form.get('complemento'),
            } : undefined
        }
        const retorno = await updateEvento(updateEvent);
        console.log(retorno);
        if (retorno) {
            window.setTimeout(() => {
                setLoading({nome: "Evento atualizado", status: true, icon: <Check color="success"/>});
                window.setTimeout(() => {
                    setLoading({nome: "Evento atualizado",status: false, icon: <Check color="success"/>});
                    onClose();
                    window.location.reload();
                }, 2000)
            }, 2000)
        } else {
            setLoading({nome: "Error na atualizacao", status: true, icon: <Cancel color="success"/>});
            window.setTimeout(() => {
                setLoading({nome: "Error na atualizacao", status: false, icon: <Cancel color="success"/>});
                onClose();
            }, 2000)
        }
    }
    return (
        <Box>
            {evento && (
                <Dialog open={open} onClose={onClose}>
                    {!loading.status ? (
                        <form onSubmit={atualizarEvento}>
                            <DialogTitle>
                                <Box sx={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                                    {evento.nome}
                                    <Close onClick={onClose} sx={{marginLeft: 2, cursor: "pointer"}}/>
                                </Box>
                            </DialogTitle>
                            <DialogContent>
                                <DialogContentText>Altere os campos e salve para fazer as alterações!</DialogContentText>
                                <Box sx={{marginTop: 3}}>
                                    <Input required={true} name="descricaoEvento" defaultValue={evento.descricao} type="descricao" label="Descricao do evento" color="success" />
                                    <Input required={true} name="valorEvento" marginTop={2} defaultValue={evento.valor} type="number" label="Valor do evento" color="success" />
                                    <Typography fontSize="20px" sx={{marginTop: 2, textAlign: "center"}}>Datas do evento</Typography>
                                    <Box sx={{marginTop: 1, display: "flex", flexWrap: {xs: "wrap", sm: "inherit"}}}>
                                        <Input required={true} name="dataInicial" defaultValue={dataInicial} type="datetime-local" label="Data inicial" />
                                        <Input required={true} name="dataFinal" defaultValue={dataFinal} type="datetime-local" label="Data final" />
                                    </Box>
                                    <Typography fontSize="20px" sx={{marginTop: 2, textAlign: "center"}}>Lugar do evento</Typography>
                                    <Box sx={{marginTop: 1}}>
                                        {evento.onlineUrl ? (
                                            <Input required={true} name="linkEvento" defaultValue={evento.onlineUrl} type="url" label="URL do evento" />
                                        ) : (
                                            <>
                                                <Input required={true} name="logradouro" defaultValue={evento.endereco.logradouro} type="text" label="Logradouro" />
                                                <Input required={true} name="numero" marginTop={2} defaultValue={evento.endereco.numero} type="number" label="Número" />
                                                <Input name="complemento" marginTop={2} defaultValue={evento.endereco.complemento} type="text" label="Complemento" />
                                                <Input required={true} name="bairro" marginTop={2} defaultValue={evento.endereco.bairro} type="text" label="Bairro" />
                                                <Input required={true} name="cep" marginTop={2} defaultValue={evento.endereco.cep} type="text" label="Cep" />
                                            </>
                                        )}
                                    </Box>
                                </Box>
                            </DialogContent>
                            <DialogActions>
                                <Button type="submit" >Salvar</Button>
                            </DialogActions>
                        </form>
                    ) : (
                        <Box>
                            <DialogTitle>{loading.nome}</DialogTitle>
                            <DialogContent sx={{display: "flex", justifyContent: "center"}}>
                                {loading.icon}
                            </DialogContent>
                        </Box>
                    )}
                </Dialog>
            )}
        </Box>
    )
}

export default function TableEventos({eventos}){
    const [evento, setEvento] = useState(eventos);
    const [eventoSelectionado, setEventoSelecionado] = useState([]);
    const [eventoEditarModal, setEventoEditarModal] = useState(false);
    const [eventoParaEditar, setEventoParaEditar] = useState();
    const [eventoImagensModal, setEventoImagensModal] = useState(false);

    function editarEvento() {
        setEventoEditarModal(true);
        setEventoParaEditar(evento[eventoSelectionado]);
    }
    function fecharModal() {
        eventoClicado(null,eventoSelectionado[0])
        setEventoEditarModal(false);
        setEventoParaEditar()  
    }

    function inserirImg() {
        setEventoImagensModal(!eventoImagensModal);
    }

    async function deletarEvento() {
        var itemDeletar = evento.splice(eventoSelectionado, 1);
        const id = itemDeletar[0]._id;
        await deleteEvento(id);
        setEventoSelecionado([]);
        setEvento(evento);
    }

    const isSelected = (index) => eventoSelectionado.indexOf(index) !== -1;
    function eventoClicado(e, index) {
        const item = eventoSelectionado.indexOf(index);
        var newSelected = [];

        if (item === -1) {
            newSelected = newSelected.concat(eventoSelectionado, index);
        } else if (item === 0) {
            newSelected = newSelected.concat(eventoSelectionado.slice(1));
        } else if (item === eventoSelectionado.length - 1) {
            newSelected = newSelected.concat(eventoSelectionado.slice(0, -1));
        } else if (item > 0) {
            newSelected = newSelected.concat(
                eventoSelectionado.slice(0, item),
                eventoSelectionado.slice(item + 1))
        }
        setEventoSelecionado(newSelected);
    }

    return (
        <Box sx={{marginTop: 5}}>
            <ModalEditarEvento open={eventoEditarModal} onClose={fecharModal} evento={eventoParaEditar} />
            <InserirImagens evento={evento[eventoSelectionado]} open={eventoImagensModal} setOpen={setEventoImagensModal} />
            <TableContainer component={Paper} sx={{backgroundColor: "#AEDCC0", width: {md: 1000, xs: 300}}}>
                <Toolbar sx={{
                    ...(eventoSelectionado.length > 0 && {
                        bgcolor: "#D9F8C4"
                    })}}>
                    {eventoSelectionado.length <= 0 ? (
                        <Typography sx={{ flex: '1 1 100%' }}>
                            Meus eventos
                        </Typography>
                    ) : (
                        <Typography color="inherit" sx={{ flex: '1 1 100%' }}>
                            {eventoSelectionado.length} selecionado
                        </Typography>
                    )}
                    {eventoSelectionado.length === 1 &&
                        <>
                            <Tooltip title="Deletar evento  ">
                                <IconButton onClick={deletarEvento}>
                                        <Delete />
                                </IconButton>
                            </Tooltip>
                            <Tooltip title="Editar evento  ">
                                <IconButton onClick={editarEvento}>
                                        <Edit />
                                </IconButton>
                            </Tooltip>
                            <Tooltip title="Inserir imagens  ">
                                <IconButton onClick={inserirImg}>
                                        <Add />
                                </IconButton>
                            </Tooltip>
                        </>
                    }
                </Toolbar>
                <Table>
                    <TableHead >
                        <TableRow>
                            <TableCell title="selecione um evento">
                                <ArrowDownward />
                            </TableCell>
                            <TableCell>
                                Nome
                            </TableCell>
                            <TableCell>
                                Data inicial
                            </TableCell>
                            <TableCell>
                                Data final
                            </TableCell>
                            <TableCell>
                                Custo
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {eventos.map((evento, index) => {
                            const itemSelected = isSelected(index);
                            return (
                                <TableRow
                                    key={index}
                                    onChange={(event) => eventoClicado(event, index)}
                                    selected={itemSelected}>
                                    <TableCell padding="checkbox">
                                        <Checkbox checked={itemSelected} />
                                    </TableCell>
                                    <TableCell>
                                        <a style={{textDecoration: "none"}} target="_blank" href={"eventos/" + evento._id}>{evento.nome}</a>
                                    </TableCell>
                                    <TableCell>
                                        <ComponentData data={evento.dataInicial} />
                                    </TableCell>
                                    <TableCell>
                                        <ComponentData data={evento.dataFinal} />
                                    </TableCell>
                                    <TableCell>
                                        <ComponentValor valor={evento.valor} />
                                    </TableCell>
                                </TableRow>
                            )
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    )
}