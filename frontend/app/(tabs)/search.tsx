import {View, Text, Image, FlatList, ActivityIndicator} from 'react-native'
import React from 'react'
import {images} from "@/constants/images";
import {icons} from "@/constants/icons";
import useFetch from "@/services/useFetch";
import {fetchMovies} from "@/services/api";
import MovieCard from "@/components/MovieCard";
import SearchBar from "@/components/SearchBar";
import {useEffect, useState} from 'react';



const Search = () => {
    const [searchQuery, setSearchQuery] = useState('');


    const {data:movies, loading, error} = useFetch (() => fetchMovies({query:searchQuery}), false)

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
                        <View className="w-full flex-row justify-center mt-20 items-center">
                            <Image source={icons.logo} className="w-12 h-10"/>
                        </View>

                        <View className="my-5">
                            < SearchBar
                                placeholder="Search movies ..."
                                value={searchQuery}
                                onChangeText={setSearchQuery}
                            />
                        </View>

                        {loading && (
                            <ActivityIndicator size="large" color="#0000ff" className="my-3"/>
                        )}

                        {error && (
                            <Text className="text-red-500 px-5 my-3">
                                Error:{error.message}
                            </Text>
                        )}

                        {!loading && !error && searchQuery.trim() && movies?.length > 0 && (
                            <Text className="text-xs text-white font-bold">
                                Search Results for {' '}
                                <Text className="text-accentText">{searchQuery}</Text>
                            </Text>
                        )}

                    </>
                }



            />
        </View>
    )
}
export default Search
