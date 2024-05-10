import React, { useState, useEffect } from "react";
import { StyleSheet, View } from 'react-native';
import { TextInput, Button, Text, useTheme } from 'react-native-paper';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { Link } from "expo-router";
import { createPost } from "../post/addpost";

export default function App() {
    const [title, setTitle] = useState("");
    const [text, setText] = useState("");
    const [user, setUser] = useState(null);

    const auth = getAuth();
    useEffect(() => {
        onAuthStateChanged(auth, user => {
            setUser(user ? user : null);
        });
    }, []);

    const theme = useTheme();

    if (user) {
        return (
            <View style={styles.container}>
                <Text style={{ marginBottom: 8 }}>Titre</Text>
                <TextInput
                    mode="outlined"
                    label="Titre"
                    style={styles.input}
                    onChangeText={setTitle}
                    value={title}
                />
                <Text style={{ marginBottom: 8 }}>Description</Text>
                <TextInput
                    mode="outlined"
                    label="Description"
                    multiline
                    numberOfLines={4}
                    style={styles.input}
                    onChangeText={setText}
                    value={text}
                />
                <Button mode="contained" onPress={() => createPost(title, text, user.uid)} style={styles.button}>
                    Ajouter
                </Button>
            </View>
        );
    } else {
        return (
            <View style={styles.container}>
                <Text>Veuillez vous <Link style={styles.link} href="/connexion">connecter</Link> pour pouvoir ajouter un post.</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
        padding: 20
    },
    input: {
        width: '90%',
        marginBottom: 20
    },
    button: {
        marginTop: 10
    },
    link: {
        color: 'blue'
    }
});
