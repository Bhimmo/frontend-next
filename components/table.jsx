import { ArrowDownward, Delete } from "@mui/icons-material";
import { Box, IconButton, TableCell, TableHead, Toolbar, Tooltip, Typography, TableRow, Checkbox, TableBody, Table, Paper, createTheme, ThemeProvider, TableContainer } from "@mui/material";
import { useState } from "react";
import { deleteEvento } from "../hooks/eventos/deletar";
import { arrumarDate, arrumarValor } from "../hooks/geral";

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

export default function TableEventos({eventos}){
    const [evento, setEvento] = useState(eventos);
    const [eventoSelectionado, setEventoSelecionado] = useState([]);

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
            {evento &&
            <TableContainer component={Paper} sx={{backgroundColor: "#90B77D", width: {md: 1000, xs: 300}}}>
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
                    <Tooltip title="Deletar evento  ">
                        <IconButton onClick={deletarEvento}>
                                <Delete />
                        </IconButton>
                    </Tooltip>
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
                                        {evento.nome}
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
            }
        </Box>
    )
}