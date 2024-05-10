import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import { TextInput, Button, Text } from 'react-native-paper';
import { signup } from '../auth/auth_signup_password';
import { uploadToFirebase } from '../storage_upload_file';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from '@react-navigation/native';
import { onAuthStateChanged } from 'firebase/auth';

export default function App() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [image, setImage] = useState(null);
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const navigation = useNavigation();

    const validateEmail = (inputEmail) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const isValid = emailRegex.test(inputEmail);
        setEmailError(isValid ? '' : 'Please enter a valid email address');
        return isValid;
    };

    const validatePassword = (inputPassword) => {
        const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{8,}$/;
        const isValid = passwordRegex.test(inputPassword);
        setPasswordError(isValid ? '' : 'The password must contain at least 8 characters with at least one uppercase letter and one digit');
        return isValid;
    };

    const handleSignup = async () => {
        if (validateEmail(email) && validatePassword(password)) {
            try {
                let photoURL = ''; 
                if (image) {
                    const fileName = email.split("@")[0]; 
                    photoURL = await uploadToFirebase(image, fileName);
                }
                await signup(email, password, name, photoURL);
                navigation.replace('/profil');
            } catch (error) {
                console.error("Signup error:", error);
            }
        }
    };

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.cancelled) {
            setImage(result.uri);
        }
    };

    return (
        <View style={styles.container}>
            <TextInput
                label="Nom"
                value={name}
                onChangeText={setName}
                mode="outlined"
                style={styles.input}
            />
            <TextInput
                label="Email"
                value={email}
                onChangeText={setEmail}
                onBlur={() => validateEmail(email)}
                mode="outlined"
                error={!!emailError}
                style={styles.input}
            />
            {!!emailError && <Text style={{ color: 'red', alignSelf: 'center' }}>{emailError}</Text>}

            <TextInput
                label="Mot de passe"
                value={password}
                onChangeText={setPassword}
                onBlur={() => validatePassword(password)}
                secureTextEntry={true}
                mode="outlined"
                error={!!passwordError}
                style={styles.input}
            />
            {!!passwordError && <Text style={{ color: 'red', alignSelf: 'center' }}>{passwordError}</Text>}

            <Button mode="contained" onPress={pickImage} style={styles.button}>
                Choisir une image
            </Button>

            <Button mode="contained" onPress={handleSignup} style={styles.button}>
                Inscription
            </Button>
        </View>
    );
}

const styles = {
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    input: {
        width: 300, 
        marginBottom: 10,
    },
    button: {
        width: 300,
        marginTop: 10,
    }
};
