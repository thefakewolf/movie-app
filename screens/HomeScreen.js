// screens/HomeScreen.js
import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { MaterialIcons } from '@expo/vector-icons';

export default function HomeScreen() {
    const handleLogout = () => {
        signOut(auth);
    };

    return (
        <View style={styles.container}>
            <MaterialIcons name="explore" size={72} color="#3b82f6" />
            <Text style={styles.title}>歡迎使用旅遊規劃 App 🗺️</Text>
            <TouchableOpacity style={styles.button} onPress={handleLogout}>
                <Text style={styles.buttonText}>登出</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: "center", alignItems: "center", padding: 20 },
    title: { fontSize: 20, fontWeight: "bold", marginVertical: 20, color: "#3b82f6", textAlign: "center" },
    button: {
        backgroundColor: "#ef4444", padding: 12, borderRadius: 10,
        width: "60%", alignItems: "center"
    },
    buttonText: { color: "#fff", fontWeight: "bold" }
});
