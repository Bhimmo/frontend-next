import { requisicaoApi } from "../useFecth";

async function salvarImagem(imagem, id) {
    var salvarImagem = new FormData();
    salvarImagem.append("eventoId", id);
    salvarImagem.append("file", imagem);
    const subirImagem = await requisicaoApi("upload/images/eventos", "POST", salvarImagem);
    if (subirImagem.status === 200) {
        return true;
    }
    return false;
}
export {salvarImagem}