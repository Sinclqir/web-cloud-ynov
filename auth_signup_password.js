import Toast from "react-native-root-toast";
import "./firebaseConfig";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

const auth = getAuth();
export const signup = (email, password) => {
    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredentials) => {
            const user = userCredentials.user;
            console.log(user);
            Toast.show("Vous êtes inscrit !", {
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
            Toast.show("Impossible d'ajouter le compte", {
                duration: Toast.durations.SHORT,
                position: Toast.positions.BOTTOM,
                shadow: true,
                animation: false,
                hideOnPress: true,
            });

        });
}