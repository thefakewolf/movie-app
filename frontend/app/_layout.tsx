// frontend/app/_layout.js
import { Stack } from "expo-router";

export default function RootLayout() {
    return (
        <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="movie/[id]" options={{ headerShown: false }} />
            <Stack.Screen name="login" options={{ headerShown: true, title: "登入" }} />   // ✅ 加這個
            <Stack.Screen name="signup" options={{ headerShown: true, title: "註冊" }} />  // ✅ 加這個
        </Stack>
    );
}
