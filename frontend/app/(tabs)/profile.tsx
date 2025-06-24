import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../../firebase";
import { useRouter } from "expo-router";

export default function ProfileScreen() {
    const [user, setUser] = useState(null);
    const router = useRouter();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUser(user);
        });
        return unsubscribe;
    }, []);

    const handleLogout = () => {
        signOut(auth);
    };


    return (
        <View style={styles.container}>
            {user ? (
                <>
                    <Text style={styles.title}>👋 歡迎 {user.email}</Text>
                    <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
                        <Text style={styles.btnText}>登出</Text>
                    </TouchableOpacity>
                </>
            ) : (
                <>
                    <Text style={styles.title}>尚未登入</Text>
                    <TouchableOpacity style={styles.loginBtn} onPress={() => router.push("/login")}>
                        <Text style={styles.btnText}>登入</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.signupBtn} onPress={() => router.push("/signup")}>
                        <Text style={styles.btnText}>註冊</Text>
                    </TouchableOpacity>
                </>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: "center", alignItems: "center" },
    title: { fontSize: 22, marginBottom: 20, color: "#3b82f6" },
    loginBtn: {
        backgroundColor: "#3b82f6",
        padding: 10,
        marginBottom: 10,
        borderRadius: 8,
        width: 200,
        alignItems: "center"
    },
    signupBtn: {
        backgroundColor: "#6366f1",
        padding: 10,
        borderRadius: 8,
        width: 200,
        alignItems: "center"
    },
    logoutBtn: {
        backgroundColor: "#ef4444",
        padding: 10,
        borderRadius: 8,
        width: 200,
        alignItems: "center"
    },
    btnText: { color: "#fff", fontWeight: "bold" }
});
