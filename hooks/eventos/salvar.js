import { requisicaoApi } from "../useFecth";

async function salvarEvento(evento) {
    var result;
    if (!evento.endereco.logradouro) {
        result = await requisicaoApi("eventos", "POST", {
            nome: evento.nome,
            descricao: evento.descricao,
            usuarioId: evento.usuarioId,
            dataInicial: evento.dataInicial,
            dataFinal: evento.dataFinal,
            valor: evento.valor,
            onlineUrl: evento.onlineUrl
        })
    } else {
        result = await requisicaoApi("eventos", "POST", {
            nome: evento.nome,
            descricao: evento.descricao,
            dataInicial: evento.dataInicial,
            usuarioId: evento.usuarioId,
            dataFinal: evento.dataFinal,
            valor: evento.valor,
            endereco: evento.endereco
        })
    }

    if (result.status === 201) {
        var irBackend = new FormData();
        irBackend.append("eventoId", result.data._id);
        irBackend.append("file", evento.foto);
        const subirImagem = await requisicaoApi("eventos/imagem", "POST", irBackend);
        if (subirImagem.status === 200) {
            return true;
        }
    }
}

async function updateEvento(evento) {
    const result = await requisicaoApi(`eventos/${evento.id}`, "PATCH", evento)
    if (result.status === 200) {
        return true;
    }
}
export { salvarEvento, updateEvento}