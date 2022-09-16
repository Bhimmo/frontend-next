import { requisicaoApi } from "../useFecth"

async function salvarImage(data) {
    const result = await requisicaoApi("usuarios/avatar", "POST", data);
    return result;
}
export {salvarImage}