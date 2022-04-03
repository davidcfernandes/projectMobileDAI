import React, {useState, useEffect} from 'react';
import { Animated, StyleSheet, Text, View, ScrollView, Image, TouchableHighlight, FlatList, TouchableOpacity, TextInput } from 'react-native';
import AppLoading from 'expo-app-loading';
import { useFonts, RedHatDisplay_400Regular } from '@expo-google-fonts/red-hat-display';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faHeart} from '@fortawesome/free-solid-svg-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';



export default function LikeButton() {
    const [likePressed, setLikePressed] = useState(false);
    const [loaded, setLoaded] = useState(false);
    const likePost= () =>{
        setLikePressed(true);
    };

    
    let [fontsLoaded] = useFonts({
        RedHatDisplay_400Regular,
    });
    if (!fontsLoaded && !loaded) {
        return <AppLoading/>;
    } else {
        return (
            <FontAwesomeIcon icon={faHeart} onPress={likePost} style={likePressed ? styles.heartClicked : styles.heart} size={25}/>
        );
    }
}

const styles = StyleSheet.create({
    heart:{
        color:"#E9E9E9",
        margin:30,
    },

    heartClicked:{
        color:"#3B8EC3",
        margin:30,
    },
});