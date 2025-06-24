// frontend/screens/LoginScreen.js
import React, { useState } from "react";
import { View, TextInput, Text, StyleSheet, Alert, TouchableOpacity } from "react-native";
import { auth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

export default function LoginScreen() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async () => {
        try {
            await signInWithEmailAndPassword(auth, email, password);
        } catch (error) {
            Alert.alert("登入失敗", error.message);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>登入</Text>
            <TextInput style={styles.input} placeholder="Email" onChangeText={setEmail} />
            <TextInput style={styles.input} placeholder="密碼" secureTextEntry onChangeText={setPassword} />
            <TouchableOpacity style={styles.button} onPress={handleLogin}>
                <Text style={styles.buttonText}>登入</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: "center", padding: 20 },
    title: { fontSize: 24, fontWeight: "bold", marginBottom: 20 },
    input: { borderWidth: 1, padding: 10, marginBottom: 10, borderRadius: 8 },
    button: { backgroundColor: "#3b82f6", padding: 10, borderRadius: 8 },
    buttonText: { color: "white", textAlign: "center" },
});

