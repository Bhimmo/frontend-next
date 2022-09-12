import { requisicaoApi } from "../useFecth";

async function criarUsuario(user) {
    const data = await requisicaoApi("usuarios", "POST", {
        nome: user.nome,
        email: user.email,
        senha: user.senha
    });
    if (data.status === 201) {
        localStorage.setItem('login', JSON.stringify({
            nome: user.nome,
            email: user.email,
            senha: user.senha,
            id: data.data.id
        }));
        return true
    }
    return false
}

function verificarLogin() {
    const valid = localStorage.getItem('login')
    return JSON.parse(valid);
}

async function pegarUsuario(id) {
    const user = await requisicaoApi("usuarios/"+id, "GET");
    return user.data
}

async function salvarUsuario(user) {
    console.log(user);
    const data = await requisicaoApi("usuarios/verificar", "POST", {
        email: user.email,
        senha: user.senha
    });
    if (data.status === 200) {
        let newUser = {
            id: data.data._id,
            nome: data.data.nome,
            email: user.email,
            senha: user.senha
        }
        localStorage.setItem("login", JSON.stringify(newUser));
        return true
    }
    return false
}
function deslogar() {
    localStorage.setItem("login", "null");
}

function pegarLetraAvatar(user) {
    if (user) {
        let letraNome = user.nome.substr(0, 1);
        return letraNome.toUpperCase();
    }
}
export {
    criarUsuario,
    pegarLetraAvatar,
    deslogar,
    salvarUsuario,
    pegarUsuario,
    verificarLogin
}