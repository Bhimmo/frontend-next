import { ArrowDownward, Delete } from "@mui/icons-material";
import { Box, IconButton, TableCell, TableHead, Toolbar, Tooltip, Typography, TableRow, Checkbox, TableBody, Table, Paper, createTheme, ThemeProvider, TableContainer } from "@mui/material";
import { useState } from "react";
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
    const [eventoSelectionado, setEventoSelecionado] = useState([]);

    function deletarEvento() {
        console.log("deletar evento");
    }

    const isSelected = (nome) => eventoSelectionado.indexOf(nome) !== -1;
    function eventoClicado(e, nome) {
        var newSelected = [];
        const item = eventoSelectionado.indexOf(nome);

        if (item === -1) {
            newSelected = newSelected.concat(eventoSelectionado, nome);
        } else if (item === 0) {
            newSelected = newSelected.concat(eventoSelectionado.slice(0, -1));
        } else if (item > 0) {
            newSelected = newSelected.concat(
                eventoSelectionado.slice(0, item),
                eventoSelectionado.slice(item + 1)
            )
        } else if (item === eventoSelectionado.length - 1) {
            newSelected = newSelected.concat(eventoSelectionado.slice(0, -1));
        }
        setEventoSelecionado(newSelected);
    }

    return (
        <Box sx={{marginTop: 5}}>
            {eventos &&
            <TableContainer component={Paper} sx={{backgroundColor: "#90B77D"}}>
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
                    {eventoSelectionado.length > 0 &&
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
                            const itemSelected = isSelected(evento.nome);
                            return (
                                <TableRow
                                    key={index}
                                    onChange={(event) => eventoClicado(event, evento.nome)}
                                    selected={itemSelected}>
                                    <TableCell padding="checkbox">
                                        <Checkbox />
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