import React from 'react';
import { StyleSheet, View, TouchableHighlight, Text, Image} from 'react-native';
import { useFonts, RedHatDisplay_400Regular } from '@expo-google-fonts/red-hat-display';
import AppLoading from 'expo-app-loading';
import { StatusBar } from 'expo-status-bar';

export default function SignUp2 ({ navigation }){
        
    let [fontsLoaded] = useFonts({
        RedHatDisplay_400Regular,
    });
    if (!fontsLoaded) {
        return <AppLoading/>;
    } else {
        return (
            <View style={styles.container}>
                <StatusBar style="auto" />
                <View style={styles.headContainer}>
                    <Text style={styles.fingerprinttext}>Insere a tua impressão digital!</Text>
                </View>
                <Image source={require("../../fingerprint.png")} style={styles.fingerprintimg}/>
                <Text style={styles.fingerprinttext2}>Coloque o dedo no sensor de impressões digitais do seu smartphone</Text>
                <TouchableHighlight style={styles.continueButton}>
                    <View style={styles.continueButtonView} >
                        <Text style={styles.textContinueButton}>Continuar</Text>
                    </View>
                </TouchableHighlight>
                <TouchableHighlight style={styles.ignore} onPress={() => navigation.navigate('SignUp3')}>
                        <Text style={styles.ignoretxt}> Ignorar </Text>
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

    headContainer:{
        position: 'absolute',
        maxWidth: 375,
        height: '10%',
        width: '100%',
        top: '2%',
        alignItems: 'center',
        justifyContent: 'center',
    },

    fingerprinttext:{
        fontFamily:'RedHatDisplay_400Regular',
        fontSize:22,
        position:'absolute',
        color:'#1A82C4',
        textAlign: 'center',
    },

    fingerprinttext2:{
        fontFamily:'RedHatDisplay_400Regular',
        fontSize:20,
        position:'absolute',
        top:'50%',
        color:'#C4C4C4',
        textAlign: 'center',
        maxWidth: 340,
    },

    fingerprintimg:{
        width:100,
        height:100,
        position:"absolute",
        top:"30%",
    },

    continueButton:{
        position: 'absolute',
        maxWidth: 360,
        top: '80%',
        width: '91%',
        height: '7%',
        backgroundColor: '#1A82C4',
        borderRadius: 90,
        alignItems: 'center',
        justifyContent: 'center',
    },

    ContinueButtonView:{
        flexDirection: 'row', 
        alignItems: 'center', 
        justifyContent:'center'
    },

    textContinueButton:{
        color: "white",
        fontSize: 22,
        fontFamily:'RedHatDisplay_400Regular',
        width:275,
        textAlign: 'center',
    },

    ignore:{
        position:'absolute',
        textAlign: 'center',
        top: '90%',
    },

    ignoretxt:{
        fontFamily:'RedHatDisplay_400Regular',
        fontSize:22,
        color:'#1A82C4',

    },

})