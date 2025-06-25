import React, { useEffect, useState } from 'react';
import { View, Text, Image, FlatList, TouchableOpacity } from 'react-native';
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase.js";
import { useRouter } from "expo-router";
import { images } from "@/constants/images";
import { icons } from "@/constants/icons";
import MovieCard from "@/components/MovieCard";

const Saved = () => {
    const [user, setUser] = useState(null);
    const router = useRouter();
    
    // 這裡可以放置收藏的電影數據
    const [savedMovies, setSavedMovies] = useState([]);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUser(user);
        });
        return unsubscribe;
    }, []);

    return (
        <View className="flex-1 bg-primary">
            <Image
                source={images.bg}
                className="flex-1 absolute w-full z-0"
                resizeMode="cover"
            />
            
            <View className="flex-1 px-5">
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
                    /* 已登入 - 顯示收藏內容 */
                    <View className="flex-1">
                        <Text className="text-white text-2xl font-bold mb-6">我的收藏</Text>
                        
                        {savedMovies.length > 0 ? (
                            <FlatList
                                data={savedMovies}
                                renderItem={({ item }) => <MovieCard {...item} />}
                                keyExtractor={(item) => item.id.toString()}
                                numColumns={3}
                                columnWrapperStyle={{
                                    justifyContent: "flex-start",
                                    gap: 20,
                                    paddingRight: 5,
                                    marginBottom: 10,
                                }}
                                contentContainerStyle={{ paddingBottom: 100 }}
                                showsVerticalScrollIndicator={false}
                            />
                        ) : (
                            <View className="flex-1 justify-center items-center">
                                <Image 
                                    source={icons.save} 
                                    className="w-16 h-16 mb-4 opacity-50" 
                                    tintColor="#A8B5DB"
                                />
                                <Text className="text-accentText text-lg font-medium text-center">
                                    還沒有收藏任何電影
                                </Text>
                                <Text className="text-accentText text-sm text-center mt-2 opacity-70">
                                    開始探索並收藏您喜愛的電影吧！
                                </Text>
                                <TouchableOpacity 
                                    onPress={() => router.push('/(tabs)')}
                                    className="bg-darkAccent px-6 py-3 rounded-full mt-6"
                                >
                                    <Text className="text-white font-semibold">探索電影</Text>
                                </TouchableOpacity>
                            </View>
                        )}
                    </View>
                ) : (
                    /* 未登入狀態 */
                    <View className="flex-1 justify-center items-center px-4">
                        <Image 
                            source={icons.save} 
                            className="w-24 h-24 mb-6 opacity-30" 
                            tintColor="#A8B5DB"
                        />
                        <Text className="text-white text-2xl font-bold mb-4 text-center">
                            登入以查看收藏
                        </Text>
                        <Text className="text-accentText text-base text-center mb-8 leading-6">
                            登入您的帳戶以收藏和管理{'\n'}您喜愛的電影
                        </Text>
                        
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
                    </View>
                )}
            </View>
        </View>
    );
};

export default Saved;