import { requisicaoApi } from "../useFecth";

async function salvarEvento(evento) {
    if (!evento.endereco.logradouro) {
        const result = await requisicaoApi("eventos", "POST", {
            nome: evento.nome,
            descricao: evento.descricao,
            usuarioId: evento.usuarioId,
            dataInicial: evento.dataInicial,
            dataFinal: evento.dataFinal,
            valor: evento.valor,
            onlineUrl: evento.onlineUrl
        })
        if (result.status === 201) {
            return result.data;
        }
    } else {
        const result = await requisicaoApi("eventos", "POST", {
            nome: evento.nome,
            descricao: evento.descricao,
            dataInicial: evento.dataInicial,
            usuarioId: evento.usuarioId,
            dataFinal: evento.dataFinal,
            valor: evento.valor,
            endereco: evento.endereco
        })
        if (result.status === 201) {
            return result.data;
        }
    }
}
export { salvarEvento }