import "./firebaseConfig";
import { getAuth, signInWithPhoneNumber, RecaptchaVerifier } from 'firebase/auth';

const auth = getAuth();

export const loginWithPhoneNumber = async (phoneNumber) => {
    window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
        'size': 'normal',
        'callback': (response) => {
            console.log("response => " + response);
        },
        'expired-callback': () => {
            console.log('expired-callback');
        }
    });

    const appVerifier = window.recaptchaVerifier;
    signInWithPhoneNumber(auth, phoneNumber, appVerifier).then((confirmationResult) => {
        window.confirmationResult = confirmationResult;
        console.log("confirmationResult => " + confirmationResult);
        return confirmationResult;
    }).catch((error) => {
        console.log("erreur => " + error);
    });
}
