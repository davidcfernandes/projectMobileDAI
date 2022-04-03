import React, { useState } from "react";
import { Button, Text, View, StyleSheet, TouchableHighlight, SafeAreaView, TextInput, TouchableOpacity } from "react-native";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faChevronLeft, faFrown, faSmile, faMeh, faMicrophone } from '@fortawesome/free-solid-svg-icons';

export default function Profile() {

    let [fontsLoaded] = useFonts({
        RedHatDisplay_400Regular,
    });
    if (!fontsLoaded && !loaded) {
        return <AppLoading/>;
    } else {
        return(
            <View style={styles.container}>
                <View style={styles.errorViewContainer}><Text>asdadasdasda</Text></View>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FCFCFC',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: "column",
    },

    errorViewContainer:{
        flex: 1,
        width:300,
        height:200,
        backgroundColor:"#CCC",
        zIndex:3,
    },
});