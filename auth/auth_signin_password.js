import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { toast } from "react-toastify";
import "../firebase/firebaseConfig";

const auth = getAuth();

export const signin = (email, password) => {
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
        console.log("signin success");
        toast.success("Connexion réussie !"); 
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(error);
        toast.error(errorMessage);
    });
};
