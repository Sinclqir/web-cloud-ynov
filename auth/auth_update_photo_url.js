import "../firebase/firebaseConfig";
import { getAuth, updateProfile } from "firebase/auth";

const auth = getAuth();

export const updateUserPhotoUrl = async (downloadUrl) => {
    try {
        await updateProfile(auth.currentUser, { photoURL: downloadUrl });
        return true;
    } catch (err) { return false; }
}