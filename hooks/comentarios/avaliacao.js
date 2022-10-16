import { requisicaoApi } from "../useFecth";
async function avaliarComLike({id, likes}) {
    await requisicaoApi("comentarios/likes/"+id, "PATCH", {likes})
}
async function avaliarComDeslike({id, deslikes}) {
    await requisicaoApi("comentarios/deslikes/"+id, "PATCH", {deslikes})
}
async function salvarComentario(data) {
    if (data.estrelas) {
        const dataEnviar = {
            idLugar: data.estabelecimento,
            comentario: data.comentario,
            estrelas: parseInt(data.estrelas),
            usuario: data.usuario
        }
        const enviadoComentario = await requisicaoApi("comentarios", "POST", dataEnviar);
        if (enviadoComentario.status === 201){
            return enviadoComentario.data
        }
    }
    return false;
}
export { avaliarComDeslike, avaliarComLike, salvarComentario }