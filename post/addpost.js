import "../firebase/firebaseConfig";
import { getFirestore } from "firebase/firestore";
import { collection, addDoc } from "firebase/firestore";

const db = getFirestore();

export const createPost = async (title, text, createdBy) => {
    try {
        const docRef = await addDoc(collection(db, "posts"), {
            title,
            text,
            date: new Date(),
            createdBy
        });
        console.log("Nouveau doc : " + docRef.id);
    } catch (e) {
        console.log("erreur => " + e);
    }
}