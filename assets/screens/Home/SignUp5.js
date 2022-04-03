import React from 'react';
import { StyleSheet, View, TouchableHighlight, Text, Image} from 'react-native';
import { useFonts, RedHatDisplay_400Regular } from '@expo-google-fonts/red-hat-display';
import AppLoading from 'expo-app-loading';
import { StatusBar } from 'expo-status-bar';

export default function SignUp5 ({ navigation }){
    let [fontsLoaded] = useFonts({
        RedHatDisplay_400Regular,
    });
    if (!fontsLoaded) {
        return <AppLoading/>;
    } else {
        return (
            <View style={styles.container}>
                <StatusBar style="auto" />
                <Image source={require("../../check.png")} style={styles.checkimg}/>
                <Text style={styles.accCreated}>Conta criada com sucesso!</Text>
                <TouchableHighlight style={styles.startUsingButton} onPress={() => navigation.navigate('Login')}>
                    <View style={styles.startButtonView}>
                        <Text style={styles.textStartButton}>Começar a utilizar</Text>
                    </View>
                </TouchableHighlight>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#FCFCFC',
        alignItems: 'center',
        justifyContent: 'center',
    },

    checkimg:{
        position: 'absolute',
        width: 150,
        height: 150,
        top: '30%',
        alignItems: 'center',
        justifyContent: 'center',
    },

    accCreated:{
        fontFamily:'RedHatDisplay_400Regular',
        fontSize:28,
        position:'absolute',
        color:'#1a82c4',
        textAlign: 'center',
        maxWidth: 360,
        top: '55%',
    },














    startUsingButton:{
        position: 'absolute',
        maxWidth: 360,
        top: '90%',
        width: '91%',
        height: '7%',
        backgroundColor: '#1A82C4',
        borderRadius: 90,
        alignItems: 'center',
        justifyContent: 'center',
    },

    startButtonView:{
        flexDirection: 'row', 
        alignItems: 'center', 
        justifyContent:'center'
    },

    textStartButton:{
        color: "white",
        fontSize: 22,
        fontFamily:'RedHatDisplay_400Regular',
        width:275,
        textAlign: 'center',
    },


})