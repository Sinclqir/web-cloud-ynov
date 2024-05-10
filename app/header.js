import React, { useState, useEffect } from "react";
import "../firebase/firebaseConfig";
import { StyleSheet, Text, View, Pressable, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { Link } from 'expo-router';
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";


export default function Header() {
    const [user, setUser] = useState(null)
    const auth = getAuth();

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            setUser(user);
        });
    }, [])

    const logout = () => {
        signOut(auth);
        router.push("connexion");
    }
    return (
        <NavigationContainer independent={true}>
            <View style={styles.container}>
                <Link style={styles.logoContainer} href="/">
                    <Image source={require('../assets/logo.png')} style={styles.logo} />
                </Link>
                <View style={styles.linksContainer}>
                    {user ? <>
                        <Link style={styles.link} href="/addpost">Ajouter un poste</Link>
                        <Link style={styles.link} href="/profil">Profil</Link>
                        <Pressable onPress={logout}>
                            <Text style={styles.link}>Déconnexion</Text>
                        </Pressable>
                    </> : <>
                        <Link style={styles.link} href="/connexion">Connexion</Link>
                        <Link style={styles.link} href="/inscription">Inscription</Link>
                    </>}
                </View>
            </View>
        </NavigationContainer>
    );
}
const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "space-between",
        height: 100,
        width: "100%",
        backgroundColor: '#0F1C3F',
        color: '#FFFFFF',
        overflowX: 'hidden',
        overflowY: 'auto',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    logoContainer: {
        marginRight: 'auto',
    },
    logo: {
        width: 120,
        height: 80,
    },
    linksContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    link: {
        marginHorizontal: 20,
        textTransform: 'uppercase',
        fontSize: 18,
        color: '#FFFFFF',
    }
});
