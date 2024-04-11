import Toast from "react-native-root-toast";
import "./firebaseConfig";
import { getAuth, signInWithPopup, GithubAuthProvider } from "firebase/auth";
import { provider } from "./auth_github_provider_create";

const auth = getAuth();
export const signwithgithub = () => {
    signInWithPopup(auth, provider)
        .then((result) => {
            const credential = GithubAuthProvider.credentialFromResult(result);
            const token = credential.token;
            const user = result.user;
            Toast.show("Connexion avec GitHub OK !", {
                duration: Toast.durations.SHORT,
                position: Toast.positions.BOTTOM,
                shadow: true,
                animation: false,
                hideOnPress: true,
            });
        })
        .catch((error) => {
            const credential = GithubAuthProvider.credentialFromError(error)
            Toast.show("Erreur d'authentification avec GitHub", {
                duration: Toast.durations.SHORT,
                position: Toast.positions.BOTTOM,
                shadow: true,
                animation: false,
                hideOnPress: true,
            });

        });
}