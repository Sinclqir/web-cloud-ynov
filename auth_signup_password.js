import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { toast } from "react-toastify";
import "./firebaseConfig";

const auth = getAuth();

export const signup = (email, password) => {
    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        // Signed up
        const user = userCredential.user;
        console.log(user);
        console.log("signup success");
        toast.success("Inscription réussie !"); // Notification de succès
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(error);
        toast.error(errorMessage); // Notification d'erreur
    });
};

