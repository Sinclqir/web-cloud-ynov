import Toast from "react-native-root-toast";
import "./firebaseConfig";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const auth = getAuth();
export const signin = (email, password) => {
    signInWithEmailAndPassword(auth, email, password)
        .then((userCredentials) => {
            const user = userCredentials.user;
            console.log(user);
            Toast.show("Connexion OK !", {
                duration: Toast.durations.SHORT,
                position: Toast.positions.BOTTOM,
                shadow: true,
                animation: false,
                hideOnPress: true,
            });
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            Toast.show("Identifiant ou mot de passe incorrect", {
                duration: Toast.durations.SHORT,
                position: Toast.positions.BOTTOM,
                shadow: true,
                animation: false,
                hideOnPress: true,
            });

        });
}