import React, { useState } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { Button, Card, Avatar } from 'react-native-paper';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import * as ImagePicker from 'expo-image-picker';
import { updateUserPhotoUrl, uploadToFirebase } from '../auth/auth_update_photo_url';
import { Link } from 'expo-router';
import { RootSiblingParent } from 'react-native-root-siblings';


export default function App() {
    const auth = getAuth();
    const [user, setUser] = useState(auth.currentUser);
    const [image, setImage] = useState(null);


    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                console.log(user)
                setUser(user);
            } else {
                setUser(null);
            }
        });
    }, []);

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            setImage(result.assets[0].uri);
            const { uri } = result.assets[0];
            const fileName = uri.split("/").pop();
            const uploadResp = await uploadToFirebase(uri, fileName);
            await updateUserPhotoUrl(uploadResp).then(() => {
                setUser({ ...user, photoURL: uploadResp });
            }).catch((error) => {
                console.error("Error updating photo URL:", error);
            });
        }
    };

    return (
        <RootSiblingParent>
            <View style={styles.container}>
                {user ? (
                    <Card style={styles.card}>
                        <Card.Title title="Profile Details" />
                        <Card.Content>
                            <Avatar.Image size={90} source={{ uri: user.photoURL || 'default_avatar_url' }} style={styles.avatar} />
                            <Text style={styles.infoText}>Nom d'utilisateur: {user.displayName}</Text>
                            <Text style={styles.infoText}>Email: {user.email}</Text>
                            <Text style={styles.infoText}>Numéro de téléphone: {user.phoneNumber}</Text>
                            {image && <Image source={{ uri: image }} style={styles.image} />}
                            <Button mode="contained" onPress={pickImage} style={styles.button}>
                                Choisir une image
                            </Button>
                        </Card.Content>
                    </Card>
                ) : (
                    <View>
                        <Text>Vous n'êtes pas connecté.</Text>
                        <Link to="/connexion">Se connecter</Link>
                    </View>
                )}
            </View>
        </RootSiblingParent>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
        backgroundColor: '#f9f9f9',
    },
    card: {
        width: '90%',
        elevation: 3,
    },
    avatar: {

        alignSelf: 'left',
        margin: 20,
    },
    infoText: {
        fontSize: 16,
        marginVertical: 10,
    },
    image: {
        width: 200,
        height: 200,
        marginBottom: 20,
    },
    button: {
        marginVertical: 10,
        width: 200,
    },
});
