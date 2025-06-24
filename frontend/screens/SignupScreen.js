// screens/SignupScreen.js
import React, { useState } from "react";
import { View, TextInput, Text, StyleSheet, Alert, TouchableOpacity } from "react-native";
import { auth } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { MaterialIcons } from '@expo/vector-icons';

export default function SignupScreen({ navigation }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSignup = async () => {
        try {
            await createUserWithEmailAndPassword(auth, email, password);
        } catch (error) {
            Alert.alert("註冊失敗", error.message);
        }
    };

    return (
        <View style={styles.container}>
            <MaterialIcons name="person-add-alt-1" size={64} color="#3b82f6" />
            <Text style={styles.title}>註冊帳號</Text>
            <TextInput
                style={styles.input}
                placeholder="電子郵件"
                onChangeText={setEmail}
                autoCapitalize="none"
            />
            <TextInput
                style={styles.input}
                placeholder="密碼（至少6字）"
                onChangeText={setPassword}
                secureTextEntry
            />
            <TouchableOpacity style={styles.button} onPress={handleSignup}>
                <Text style={styles.buttonText}>註冊</Text>
            </TouchableOpacity>
            <Text onPress={() => navigation.navigate("Login")} style={styles.link}>
                已有帳號？回登入
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
