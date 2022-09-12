import { Search } from "@mui/icons-material";
import { Box, Button, Container, FormControl, IconButton, InputAdornment, OutlinedInput, TextField, Typography } from "@mui/material";

export default function Filtro(props) {
    let evento = props.evento;
    let estabelecimento = props.estabelecimento;

    function buscarEstabelecimento(e) {
        if (estabelecimento) {
            props.filtroBusca(e.target.value);
        }
        if (evento) {
            props.filtro(e.target.value);
        }
    }
    function buscarDatas(event) {
        event.preventDefault();
        if (event.type === "submit") {
            let data = new FormData(event.currentTarget);
            const dados = {
                dataInicial: data.get('dataInicial')
            }
            props.filtroData(dados);
        } else {
            props.filtroData({dataInicial: null});
            const date = window.document.getElementById('dataInicial');
            date.value = "";
        }
    }
    return (
        <Container sx={{marginTop: "15px", marginBottom: "25px"}}>
            <Typography fontWeight="bold" variant="h5">Buscar</Typography>

            <FormControl sx={{width: "100%", marginTop: "15px"}}>
                <OutlinedInput
                    size="small"
                    id="buscar"
                    fullWidth
                    onChange={buscarEstabelecimento}
                    color="success"
                    type="text"
                    endAdornment={
                        <InputAdornment position="end">
                            <IconButton aria-label="toggle buscar">
                                <Search />
                            </IconButton>
                        </InputAdornment>
                    }
                />
                <Box sx={{displat: "flex"}}>
                    {/* {estabelecimento && } */}
                    {evento &&
                        <form onSubmit={buscarDatas} style={{marginTop: "10px"}}>
                            <Box sx={{display: "flex"}}>
                                <Box sx={{display: "flex", flexDirection: "column"}}>
                                    <label>Data Inicial</label>
                                    <TextField size="small" color="success" type="date" required id="dataInicial" name="dataInicial" />
                                </Box>
                            </Box>
                            <Button type="submit" color="success" sx={{marginTop: "10px"}} variant="contained">Buscar</Button>
                            <Button variant="contained" onClick={buscarDatas} color="primary" sx={{marginLeft: 1, marginTop: "10px"}}>Limpar</Button>
                        </form>
                    }
                </Box>
            </FormControl>
        </Container>
    )
}