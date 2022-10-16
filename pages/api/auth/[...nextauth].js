import NextAuth from "next-auth";
import { requisicaoApi } from "../../../hooks/useFecth";
import { criarUsuarioGoogle } from "../../../hooks/usuario/login";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";

export default NextAuth({
    secret: process.env.SECRET_AUTH,
    providers: [
        Google({
            clientId: process.env.CLIENT_ID,
            clientSecret: process.env.SECRECT_GOOGLE_KEY
        }),
        Credentials({
            name: "Password and user",
            credentials: {},
            async authorize(credentials) {
                if (credentials.acao === "login") {
                    const result = await requisicaoApi(
                        "usuarios/verificar",
                        "POST", {email: credentials.email, senha: credentials.senha}
                    );

                    if (result.status === 200) {
                        return {
                            name: result.data.nome,
                            email: result.data.email,
                            image: result.data.avatar_url
                        }
                    }
                    return null;
                }
                const result = await requisicaoApi("usuarios", "POST", {
                    email: credentials.email,
                    senha: credentials.senha,
                    nome: credentials.nome
                })
                if (result.status === 201) {
                    return {
                        name: result.data.nome,
                        email: result.data.email,
                        image: result.data.avatar_url
                    }
                }
                return null
            }
        })
    ],
    callbacks: {
        async signIn({user, account, profile, email, credentials}) {
            if (!credentials) {
                await criarUsuarioGoogle(user)
            }

            return {
                name: user.name,
                email: user.email,
                image: user.image
            }
        }
    }
})