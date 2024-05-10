import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, TextInput, Button } from 'react-native';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore, collection, doc, getDocs, addDoc } from "firebase/firestore";
import { getPostData } from '../post/getpost';
export default function PostPage() {
    const [posts, setPosts] = useState([]);
    const [user, setUser] = useState(null);
    const auth = getAuth();
    const db = getFirestore();

    useEffect(() => {
        onAuthStateChanged(auth, (newUser) => {
            setUser(newUser);
        });

        const fetchData = async () => {
            const data = await getPostData();
            const postsWithComments = await Promise.all(data.map(async post => {
                const commentSnap = await getDocs(collection(db, `posts/${post.id}/comments`));
                return { ...post, comments: commentSnap.docs.map(doc => doc.data()), newComment: '' };
            }));
            setPosts(postsWithComments);
        };
        fetchData();
    }, []);

    const addComment = async (postId, newComment) => {
        if (user && newComment) {
            const commentRef = collection(db, `posts/${postId}/comments`);
            await addDoc(commentRef, {
                email: user.email,
                text: newComment,
                createdAt: new Date()
            });
            const updatedPosts = posts.map(post => {
                if (post.id === postId) {
                    return {...post, comments: [...post.comments, { email: user.email, text: newComment }], newComment: ''};
                }
                return post;
            });
            setPosts(updatedPosts);
        }
    };

    const handleCommentChange = (text, postId) => {
        const updatedPosts = posts.map(post => {
            if (post.id === postId) {
                return {...post, newComment: text};
            }
            return post;
        });
        setPosts(updatedPosts);
    };

    return (
        <View style={styles.container}>
            <Text>Voici la liste des postes</Text>
            {posts.map((post) => (
                <View key={post.id} style={styles.item}>
                    <Text style={styles.itemTitle}>{post.title}</Text>
                    <Text>{post.text}</Text>
                    {post.comments.map((c, index) => (
                        <Text key={index}>{c.email}: {c.text}</Text>
                    ))}
                    {user && (
                        <>
                            <TextInput
                                style={styles.input}
                                onChangeText={(text) => handleCommentChange(text, post.id)}
                                value={post.newComment}
                                placeholder="Add a comment..."
                            />
                            <Button title="Comment" onPress={() => addComment(post.id, post.newComment)} />
                        </>
                    )}
                </View>
            ))}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'whitesmoke',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    item: {
        borderWidth: 1,
        borderColor: 'lightgrey',
        padding: 10,
        margin: 10,
        backgroundColor: 'white',
    },
    input: {
        height: 40,
        width: '100%',
        borderColor: 'gray',
        borderWidth: 1,
        paddingHorizontal: 10,
    },
    itemTitle: {
        fontWeight: 'bold',
    },
});