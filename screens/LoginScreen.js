// screens/LoginScreen.js
import React, { useState } from "react";
import { View, TextInput, Text, StyleSheet, Alert, TouchableOpacity } from "react-native";
import { auth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { MaterialIcons } from '@expo/vector-icons';

export default function LoginScreen({ navigation }) {
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
            <MaterialIcons name="travel-explore" size={64} color="#3b82f6" />
            <Text style={styles.title}>歡迎回來！</Text>
            <TextInput
                style={styles.input}
                placeholder="電子郵件"
                onChangeText={setEmail}
                autoCapitalize="none"
            />
            <TextInput
                style={styles.input}
                placeholder="密碼"
                onChangeText={setPassword}
                secureTextEntry
            />
            <TouchableOpacity style={styles.button} onPress={handleLogin}>
                <Text style={styles.buttonText}>登入</Text>
            </TouchableOpacity>
            <Text onPress={() => navigation.navigate("Signup")} style={styles.link}>
                沒有帳號？註冊
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: "center", alignItems: "center", padding: 20 },
    title: { fontSize: 24, fontWeight: "bold", color: "#3b82f6", marginBottom: 20 },
    input: {
        width: "100%", padding: 12, borderWidth: 1, borderColor: "#ccc", borderRadius: 10,
        marginBottom: 10
    },
    button: {
        backgroundColor: "#3b82f6", padding: 12, borderRadius: 10, width: "100%",
        alignItems: "center"
    },
    buttonText: { color: "#fff", fontWeight: "bold" },
    link: { marginTop: 15, color: "#3b82f6" }
});

