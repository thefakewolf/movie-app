import {
    View,
    Text,
    ActivityIndicator,
    ScrollView,
    Image,
    FlatList,
    TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from 'react';
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase.js";
import { useRouter } from "expo-router";
import {images} from "@/constants/images";
import {icons} from "@/constants/icons";
import SearchBar from "@/components/SearchBar";
import useFetch from "@/services/useFetch";
import {fetchMovies} from "@/services/api";
import MovieCard from "@/components/MovieCard";

export default function Index() {
    const router = useRouter();
    const [user, setUser] = useState(null);

    const {data:movies, loading:moviesLoading, error:moviesError} = useFetch (() => fetchMovies({query:''}));

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUser(user);
        });
        return unsubscribe;
    }, []);

    return (
        <View className={"flex-1 bg-primary relative"}>
            <Image source={images.bg} className="flex-1 absolute w-full z-0" resizeMode="cover"/>
            <ScrollView className="flex-1 px-5" showsVerticalScrollIndicator={false} contentContainerStyle={{minHeight:"100%", paddingBottom: 100}}>
                
                {/* Header */}
                <View className="flex-row justify-between items-center mt-20 mb-5">
                    <Image source={icons.logo} className="w-12 h-10"/>
                    {!user && (
                        <TouchableOpacity 
                            onPress={() => router.push("/login")}
                            className="bg-darkAccent px-4 py-2 rounded-full"
                        >
                            <Text className="text-white font-semibold text-sm">登入</Text>
                        </TouchableOpacity>
                    )}
                </View>

                {moviesLoading ? (
                    <ActivityIndicator
                        size="large"
                        color="#AB8BFF"
                        className="mt-100 self-center"
                    />
                ) : moviesError ? (
                    <View className="flex-1 justify-center items-center">
                        <Text className="text-red-500 text-center">錯誤：{moviesError?.message}</Text>
                        <Text className="text-accentText text-sm text-center mt-2">
                            請檢查網路連線或稍後再試
                        </Text>
                    </View>
                ) : (
                    <View className="flex-1 mt-5">
                        <SearchBar
                            onPress={() => router.push('/search')}
                            placeholder="搜尋電影..."
                        />

                        <>
                            <Text className="text-lg text-white font-bold mt-5 mb-3">
                                熱門電影
                            </Text>

                            <FlatList
                                data={movies}
                                renderItem={({ item }) => (
                                    <MovieCard
                                        {...item}
                                    />
                                )}
                                keyExtractor={(item) => item.id.toString()}
                                numColumns={3}
                                columnWrapperStyle={{
                                    justifyContent: "flex-start",
                                    gap: 20,
                                    paddingRight: 5,
                                    marginBottom: 10,
                                }}
                                className="mt-2"
                                scrollEnabled={false}
                            />
                        </>
                    </View>
                )}
            </ScrollView>
        </View>
    );
}