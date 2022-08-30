import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import React, { useContext } from "react";
import { Context } from "..";

const Login = () => {
    const { auth, provider } = useContext(Context);

    const login = async () => {
        signInWithPopup(auth, provider)
            .then((result) => {
                // This gives you a Google Access Token. You can use it to access the Google API.
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;
                // The signed-in user info.
                const user = result.user;
                console.log(user);
            })
            .catch((error) => {
                // Handle Errors here.
                const errorCode = error.code;
                const errorMessage = error.message;
                // The email of the user's account used.
                const email = error.customData.email;
                // The AuthCredential type that was used.
                const credential = GoogleAuthProvider.credentialFromError(error);
            });
    };

    return (
        <section className="login">
            <div className="login__container">
                <div className="login__body">
                    <h2 className="login__title">Log In with your Google account?</h2>
                    <button type="button" onClick={login} className="login__btn btn">
                        Log In
                    </button>
                </div>
            </div>
        </section>
    );
};

export default Login;
