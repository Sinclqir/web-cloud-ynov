import { getAuth, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

const auth = getAuth();
const storage = getStorage();

export const signup = async (email, password, name, imageUri) => {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        let photoURL = null;
        if (imageUri) {
            const imageRef = ref(storage, `profile_images/${user.uid}`);
            const response = await fetch(imageUri);
            const blob = await response.blob();
            await uploadBytes(imageRef, blob);
            photoURL = await getDownloadURL(imageRef);
        }

        if (name || photoURL) {
            await updateProfile(user, {
                displayName: name,
                photoURL: photoURL
            });
        }

        console.log("Signup success", user);
    } catch (error) {
        console.error("Signup error:", error);
    }
};
