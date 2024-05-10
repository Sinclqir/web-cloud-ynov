import React, { useState, useEffect, useRef } from 'react';
import { View } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { signin } from '../auth/auth_signin_password';
import { signwithgithub } from '../auth/auth_signin_popup';
import { loginWithPhoneNumber } from '../auth/auth_phone_signin';
import { verifyCode } from '../auth/auth_verify_code';
import { RootSiblingParent } from 'react-native-root-siblings';
import {router} from "expo-router";
import {getAuth, onAuthStateChanged} from "firebase/auth";

const App = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [code, setCode] = useState("");
    const auth = getAuth();

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                router.push("profil");
            }
        });
    }, [])

    const handleSignin = async () => {
        try {
            await signin(email, password);
        } catch (error) {
            console.error("Signin error:", error);
        }
    };

    const handleSigninGitHub = () => {
        signwithgithub();
    };

    return (
        <RootSiblingParent>
            <View style={styles.container}>
                <TextInput
                    label="Email"
                    value={email}
                    onChangeText={setEmail}
                    mode="outlined"
                    style={[styles.input, styles.rounded]}
                />
                <TextInput
                    label="Mot de passe"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry={true}
                    mode="outlined"
                    style={[styles.input, styles.rounded]}
                />
                <Button mode="contained" onPress={handleSignin} style={[styles.button, styles.rounded]}>
                    Connexion
                </Button>
                <View style={{ height: 20 }} />
                <Button icon="github" mode="outlined" onPress={handleSigninGitHub} style={[styles.button, styles.rounded]}>
                    Se connecter avec GitHub
                </Button>
                <View style={{ height: 20 }} />
                <TextInput
                    label="Numéro de téléphone"
                    value={phoneNumber}
                    onChangeText={setPhoneNumber}
                    mode="outlined"
                    style={[styles.input, styles.rounded]}
                />
                <Button mode="contained" onPress={() => loginWithPhoneNumber(phoneNumber)} style={[styles.button, styles.rounded]}>
                    Valider
                </Button>
                <View style={{ height: 20 }} />
                <TextInput
                    label="Code"
                    value={code}
                    onChangeText={setCode}
                    mode="outlined"
                    style={[styles.input, styles.rounded]}
                />
                <Button mode="contained" onPress={() => verifyCode(code)} style={[styles.button, styles.rounded]}>
                    Vérifier le code
                </Button>
            </View>
        </RootSiblingParent>
    );
};

const styles = {
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20
    },
    input: {
        width: 300,
        marginBottom: 10
    },
    button: {
        width: 300,
        marginTop: 10
    },
    rounded: {
        borderRadius: 25
    }
};

export default App;
