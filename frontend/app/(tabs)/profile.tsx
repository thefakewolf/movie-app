import { View, Text, Image, ScrollView, TouchableOpacity } from 'react-native';
import React from 'react';
import { images } from "@/constants/images";

const Profile = () => {
    return (
        <View className="flex-1 bg-black"> {/* Main container for the screen */}
            <Image
                source={images.bg}
                className="flex-1 absolute w-full z-0" // Make it cover the whole screen and stay static
                resizeMode="cover"
            />
            <ScrollView className="flex-1"> {/* Scrollable content */}
                <View className="items-center mt-20">
                    <Image
                        source={images.avatar}
                        className="w-32 h-32 rounded-full border-2 border-white"
                        resizeMode="cover"
                    />
                    <Text className="mt-4 text-white text-xl font-bold">Jon Moller</Text>
                    <Text className="text-gray-400 text-base">Visual Designer</Text>
                    <Text className="text-gray-400 text-sm">Stockholm, Sweden</Text>
                    <TouchableOpacity className="mt-6 bg-pink-600 px-6 py-2 rounded-full">
                        <Text className="text-white text-center">Upgrade Now - Go Pro</Text>
                    </TouchableOpacity>
                </View>
                <View className="mt-10">
                    <Text className="text-white text-lg font-semibold ml-5">Settings</Text>
                    <TouchableOpacity className="flex-row items-center p-4">
                        <Image source={images.darkModeIcon} className="w-6 h-6 mr-3" />
                        <Text className="text-white flex-1">Dark Mode</Text>
                        <Text className="text-gray-400">On</Text>
                    </TouchableOpacity>
                    <TouchableOpacity className="flex-row items-center p-4">
                        <Image source={images.notificationIcon} className="w-6 h-6 mr-3" />
                        <Text className="text-white flex-1">Notifications</Text>
                        <Text className="text-gray-400">On</Text>
                    </TouchableOpacity>
                    <TouchableOpacity className="flex-row items-center p-4">
                        <Image source={images.privacyIcon} className="w-6 h-6 mr-3" />
                        <Text className="text-white flex-1">Privacy</Text>
                        <Text className="text-gray-400">></Text>
                    </TouchableOpacity>
                    <TouchableOpacity className="flex-row items-center p-4">
                        <Image source={images.securityIcon} className="w-6 h-6 mr-3" />
                        <Text className="text-white flex-1">Security</Text>
                        <Text className="text-gray-400">></Text>
                    </TouchableOpacity>
                    <TouchableOpacity className="flex-row items-center p-4">
                        <Image source={images.accountIcon} className="w-6 h-6 mr-3" />
                        <Text className="text-white flex-1">Account</Text>
                        <Text className="text-gray-400">></Text>
                    </TouchableOpacity>
                    <TouchableOpacity className="flex-row items-center p-4">
                        <Image source={images.helpIcon} className="w-6 h-6 mr-3" />
                        <Text className="text-white flex-1">Help</Text>
                        <Text className="text-gray-400">></Text>
                    </TouchableOpacity>
                    <TouchableOpacity className="flex-row items-center p-4">
                        <Image source={images.aboutIcon} className="w-6 h-6 mr-3" />
                        <Text className="text-white flex-1">About</Text>
                        <Text className="text-gray-400">></Text>
                    </TouchableOpacity>
                </View>
                {/* Add some padding at the bottom to ensure all content is scrollable past the bottom edge of the screen */}
                <View className="pb-20" />
            </ScrollView>
        </View>
    );
};

export default Profile;