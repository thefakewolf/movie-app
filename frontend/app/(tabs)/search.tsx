import {View, Text, Image, FlatList, ActivityIndicator, TouchableOpacity} from 'react-native'
import React, { useEffect, useState } from 'react';
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase.js";
import { useRouter } from "expo-router";
import {images} from "@/constants/images";
import {icons} from "@/constants/icons";
import useFetch from "@/services/useFetch";
import {fetchMovies} from "@/services/api";
import MovieCard from "@/components/MovieCard";
import SearchBar from "@/components/SearchBar";

const Search = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [user, setUser] = useState(null);
    const router = useRouter();

    const {data:movies, loading, error, refetch} = useFetch (() => fetchMovies({query:searchQuery}), false)

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUser(user);
        });
        return unsubscribe;
    }, []);

    useEffect(() => {
        if (searchQuery.trim()) {
            refetch();
        }
    }, [searchQuery]);

    return (
        <View className="flex-1 bg-primary">
            <Image source={images.bg} className="flex-1 absolute w-full z-0" resizeMode="cover"/>

            <FlatList
                data={movies}
                renderItem={({item}) => <MovieCard {...item} />}
                keyExtractor={(item) => item.id.toString()}
                className="px-5"
                numColumns={3}
                columnWrapperStyle={{
                    justifyContent: 'center',
                    gap:16,
                    marginVertical:16
                }}
                contentContainerStyle={{paddingBottom:100}}
                ListHeaderComponent = {
                    <>
                        <View className="w-full flex-row justify-between items-center mt-20 mb-5">
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

                        <View className="my-5">
                            <SearchBar
                                placeholder="搜尋電影..."
                                value={searchQuery}
                                onChangeText={setSearchQuery}
                            />
                        </View>

                        {loading && (
                            <ActivityIndicator size="large" color="#AB8BFF" className="my-3"/>
                        )}

                        {error && (
                            <Text className="text-red-500 px-5 my-3">
                                錯誤：{error.message}
                            </Text>
                        )}

                        {!loading && !error && searchQuery.trim() && movies?.length > 0 && (
                            <Text className="text-xs text-white font-bold mb-4">
                                搜尋結果：{' '}
                                <Text className="text-accentText">{searchQuery}</Text>
                            </Text>
                        )}

                        {!loading && !error && searchQuery.trim() && movies?.length === 0 && (
                            <View className="items-center py-8">
                                <Image 
                                    source={icons.search} 
                                    className="w-16 h-16 mb-4 opacity-50" 
                                    tintColor="#A8B5DB"
                                />
                                <Text className="text-accentText text-lg font-medium">
                                    找不到相關電影
                                </Text>
                                <Text className="text-accentText text-sm opacity-70 mt-2">
                                    請嘗試其他關鍵字
                                </Text>
                            </View>
                        )}
                    </>
                }
            />
        </View>
    )
}
export default Search