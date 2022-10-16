import { requisicaoApi } from "../useFecth";

async function criarUsuario(user) {
    return requisicaoApi("usuarios", "POST", {
        nome: user.name,
        email: user.email,
        senha: user.senha
    });
}

async function criarUsuarioGoogle(user) {
    return requisicaoApi("usuarios/google", "POST", user);
}

async function pegarUsuario(id) {
    const user = await requisicaoApi("usuarios/"+id, "GET");
    return user.data
}

function pegarLetraAvatar(user) {
    if (user) {
        let letraNome = user.nome.substr(0, 1);
        return letraNome.toUpperCase();
    }
}
export {
    criarUsuario,
    criarUsuarioGoogle,
    pegarLetraAvatar,
    pegarUsuario
}