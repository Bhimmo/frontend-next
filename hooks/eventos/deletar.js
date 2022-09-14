import { requisicaoApi } from "../useFecth";

async function deleteEvento(id) {
    const result = await requisicaoApi("eventos/"+id, "DELETE");
    return result.data;

}
export {deleteEvento}