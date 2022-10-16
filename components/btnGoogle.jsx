import { GoogleLoginButton } from "react-social-login-buttons";
import { signIn } from "next-auth/react";

export default function BtnGoogle() {
    const resultGoogle = () => {
        signIn('google');
    }

    return (
        <>
            <GoogleLoginButton onClick={resultGoogle}>
                <span>Continuar com o Google</span>
            </GoogleLoginButton>
        </>
    )
}