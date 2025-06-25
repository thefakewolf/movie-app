import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Image, ScrollView } from "react-native";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../../firebase.js";
import { useRouter } from "expo-router";
import { images } from "@/constants/images";
import { icons } from "@/constants/icons";

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
        <View className="flex-1 bg-primary">
            <Image 
                source={images.bg} 
                className="flex-1 absolute w-full z-0" 
                resizeMode="cover"
            />
            
            <ScrollView 
                className="flex-1 px-5" 
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ minHeight: "100%", paddingBottom: 100 }}
            >
                {/* Header */}
                <View className="flex-row justify-between items-center mt-20 mb-8">
                    <Image source={icons.logo} className="w-12 h-10" />
                    {!user && (
                        <TouchableOpacity 
                            onPress={() => router.push("/login")}
                            className="bg-darkAccent px-4 py-2 rounded-full"
                        >
                            <Text className="text-white font-semibold text-sm">登入</Text>
                        </TouchableOpacity>
                    )}
                </View>

                {user ? (
                    /* 已登入狀態 */
                    <View className="items-center">
                        {/* 用戶頭像 */}
                        <View className="mb-6">
                            <Image 
                                source={images.avatar} 
                                className="w-24 h-24 rounded-full"
                                resizeMode="cover"
                            />
                        </View>

                        {/* 用戶信息 */}
                        <View className="items-center mb-8">
                            <Text className="text-white text-xl font-bold mb-2">
                                歡迎回來！
                            </Text>
                            <Text className="text-accentText text-base">
                                {user.email}
                            </Text>
                        </View>

                        {/* 功能選項 */}
                        <View className="w-full space-y-4 mb-8">
                            <TouchableOpacity className="bg-dark-200 rounded-xl p-4 flex-row items-center justify-between">
                                <View className="flex-row items-center">
                                    <Image source={icons.save} className="w-6 h-6 mr-3" tintColor="#AB8BFF" />
                                    <Text className="text-white font-medium">我的收藏</Text>
                                </View>
                                <Image source={icons.arrow} className="w-4 h-4" tintColor="#A8B5DB" />
                            </TouchableOpacity>

                            <TouchableOpacity className="bg-dark-200 rounded-xl p-4 flex-row items-center justify-between">
                                <View className="flex-row items-center">
                                    <Image source={icons.person} className="w-6 h-6 mr-3" tintColor="#AB8BFF" />
                                    <Text className="text-white font-medium">帳戶設定</Text>
                                </View>
                                <Image source={icons.arrow} className="w-4 h-4" tintColor="#A8B5DB" />
                            </TouchableOpacity>
                        </View>

                        {/* 登出按鈕 */}
                        <TouchableOpacity 
                            onPress={handleLogout}
                            className="bg-red-500 w-full py-4 rounded-xl items-center"
                        >
                            <Text className="text-white font-bold text-base">登出</Text>
                        </TouchableOpacity>
                    </View>
                ) : (
                    /* 未登入狀態 */
                    <View className="flex-1 justify-center items-center px-4">
                        <View className="items-center mb-8">
                            <Image 
                                source={images.avatar} 
                                className="w-32 h-32 rounded-full mb-6 opacity-50"
                                resizeMode="cover"
                            />
                            <Text className="text-white text-2xl font-bold mb-2 text-center">
                                歡迎使用電影應用
                            </Text>
                            <Text className="text-accentText text-base text-center leading-6">
                                登入以享受個人化體驗{'\n'}收藏您喜愛的電影
                            </Text>
                        </View>

                        <View className="w-full space-y-4">
                            <TouchableOpacity 
                                onPress={() => router.push("/login")}
                                className="bg-darkAccent w-full py-4 rounded-xl items-center"
                            >
                                <Text className="text-white font-bold text-base">登入</Text>
                            </TouchableOpacity>

                            <TouchableOpacity 
                                onPress={() => router.push("/signup")}
                                className="border border-darkAccent w-full py-4 rounded-xl items-center"
                            >
                                <Text className="text-darkAccent font-bold text-base">註冊新帳戶</Text>
                            </TouchableOpacity>
                        </View>

                        {/* 功能預覽 */}
                        <View className="w-full mt-12">
                            <Text className="text-white font-bold text-lg mb-4 text-center">
                                登入後可享受
                            </Text>
                            <View className="space-y-3">
                                <View className="flex-row items-center bg-dark-200 rounded-xl p-4 opacity-60">
                                    <Image source={icons.save} className="w-6 h-6 mr-3" tintColor="#AB8BFF" />
                                    <Text className="text-white">收藏喜愛的電影</Text>
                                </View>
                                <View className="flex-row items-center bg-dark-200 rounded-xl p-4 opacity-60">
                                    <Image source={icons.star} className="w-6 h-6 mr-3" tintColor="#AB8BFF" />
                                    <Text className="text-white">個人化推薦</Text>
                                </View>
                                <View className="flex-row items-center bg-dark-200 rounded-xl p-4 opacity-60">
                                    <Image source={icons.person} className="w-6 h-6 mr-3" tintColor="#AB8BFF" />
                                    <Text className="text-white">同步所有裝置</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                )}
            </ScrollView>
        </View>
    );
}