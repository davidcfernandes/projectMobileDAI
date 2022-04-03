import React, {useState, useEffect} from 'react';
import { StyleSheet, View, Image, TouchableHighlight, Text, TextInput, TouchableOpacity, Alert} from 'react-native';
import { useFonts, RedHatDisplay_400Regular } from '@expo-google-fonts/red-hat-display';
import AppLoading from 'expo-app-loading';
import { StatusBar } from 'expo-status-bar';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faChevronLeft, faEye} from '@fortawesome/free-solid-svg-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ErrorLogin from '../Error/ErroLogin';
import { 
    hasHardwareAsync,
    isEnrolledAsync,
    authenticateAsync 
 } from 'expo-local-authentication';

export default function Login ({ navigation }){
    const [emailLogin, setEmailLogin] = useState(null);
    const [passwordLogin, setPasswordLogin] = useState(null);
    const [borderError, setBorderError] = useState(false);
    const [isBiometricSupported, setIsBiometricSupported] = useState(false);
    const handleEmailInput = (text) => {
        setEmailLogin(text);
    };
    const handlePasswordInput = (text) => {
        setPasswordLogin(text);
    };

    //Fetch
    
    const submit = async () => {
        try {
            const response = await fetch("http://192.168.1.74:8080/api/auth/signin", {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: emailLogin,
                    password: passwordLogin,
                })
            })
            const response_1 = await response.json();
            console.log(response_1);
            if(response_1.error=="Unauthorized"){
                Alert.alert(
                    "Erro",
                    "Esta conta não existe ou ainda não foi ativada.",
                    [
                    { text: "OK" }
                    ]
                );
                setBorderError(true);
                return response_1;
            }else{
                const userId = response_1.userId;
                console.log(userId);
                await AsyncStorage.setItem('userToken',JSON.stringify({userId}));
                navigation.navigate('BottomNavbar');
                return response_1;
            }
            
        }catch (error) {
            console.error(error);
        }
    };

    //TouchID
    const biometricsAuth = async () => {
        const compatible = await hasHardwareAsync()
        if (!compatible) throw 'This device is not compatible for biometric authentication'
        const enrolled = await isEnrolledAsync()
        if (!enrolled) throw `This device doesn't have biometric authentication enabled`
        const result = await authenticateAsync()
        if (!result.success) throw `${result.error} - Authentication unsuccessful`
        const userId = 11;
        await AsyncStorage.setItem('userToken',JSON.stringify({userId}));
        navigation.navigate('BottomNavbar');
        return
    }
    
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
                    <Text style={styles.signIn}>Iniciar Sessão</Text>
                    <TouchableHighlight onPress={() => navigation.navigate('OpenScreen')} style={styles.back}>
                        <FontAwesomeIcon icon={faChevronLeft} style={styles.chevronLeft} size={15}/>
                    </TouchableHighlight>
                </View>
                <Image source={require("../../LOGOPNG.png")} style={styles.logoPng}/>
                <Text style={styles.emailText}>E-mail</Text>
                <TextInput style={borderError ? styles.emailBoxError : styles.emailBox} onChangeText={handleEmailInput}></TextInput>
                <Text style={styles.passwordText}>Palavra-passe</Text>
                <View style={borderError ? styles.passwordBoxError : styles.passwordBox}>
                    <TextInput style={styles.passwordBoxText} secureTextEntry={true} onChangeText={handlePasswordInput}></TextInput>
                    <TouchableHighlight style={styles.showPassword}>
                        <FontAwesomeIcon icon={faEye} size={25} style={styles.showPasswordIcon}/>
                    </TouchableHighlight>
                </View>
                <Text style={styles.forgottenPassword}>Esqueceste-te da tua palavra-passe?</Text>
                <TouchableHighlight style={styles.signInButton} onPress={submit}>
                    <View style={styles.signInButtonView}>
                        <Text style={styles.textSignInButton}>Iniciar Sessão</Text>
                    </View>
                </TouchableHighlight>
                <Text style={styles.orText}>OU</Text>
                <TouchableOpacity style={styles.fingerprint} onPress={biometricsAuth}>
                    <Image source={require("../../fingerprint.png")} style={styles.fingerprintPng}/>
                </TouchableOpacity>
                <Text style={styles.createAccountText}>Ainda não tens uma conta?</Text>
                <TouchableHighlight onPress={() => navigation.navigate('SignUp1')} style={styles.createAccountButton}>
                    <View style={styles.createAccountView}>
                        <Text style={styles.textCreateAccount}>Registar</Text>
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

    logoPng:{
        width:300,
        height:150,
        position:"absolute",
        top:"0%",
    },

    headContainer:{
        position: 'absolute',
        maxWidth: 375,
        height: '20%',
        width: '100%',
        top: '11%',
        alignItems: 'center',
        justifyContent: 'center',
    },

    back:{
        position:'absolute',
        left: '2%'
    },
    
    chevronLeft:{
        color: '#DBDBDB',
    },

    signIn:{
        fontFamily:'RedHatDisplay_400Regular',
        fontSize:32,
        position:'absolute',
        color:'#1A82C4',
        textAlign: 'center',
    },

    emailText:{
        fontFamily:'RedHatDisplay_400Regular',
        fontSize:20,
        position:'absolute',
        top:'28%',
        color:'#707070',
    },

    emailBox:{
        position: 'absolute',
        maxWidth: 360,
        width: '92%',
        height: '7%',
        top: '32%',
        backgroundColor: '#FAFAFA',
        borderWidth: 1,
        borderColor: '#EBEBEB',
        borderRadius: 30,
        fontFamily:'RedHatDisplay_400Regular',
        fontSize: 18,
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        color: '#707070',
    },

    emailBoxError:{
        position: 'absolute',
        maxWidth: 360,
        width: '92%',
        height: '7%',
        top: '32%',
        backgroundColor: '#FAFAFA',
        borderWidth: 1,
        borderColor: '#CD0000',
        borderRadius: 30,
        fontFamily:'RedHatDisplay_400Regular',
        fontSize: 18,
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        color: '#707070',
    },

    passwordText:{
        fontFamily:'RedHatDisplay_400Regular',
        fontSize:20,
        position:'absolute',
        top:'42%',
        color:'#707070',
    },

    passwordBox:{
        position: 'absolute',
        maxWidth: 360,
        height: '7%',
        width: '92%',
        top: '46%',
        backgroundColor: '#FAFAFA',
        borderWidth: 1,
        borderColor: '#EBEBEB',
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center',
    },

    passwordBoxError:{
        position: 'absolute',
        maxWidth: 360,
        height: '7%',
        width: '92%',
        top: '46%',
        backgroundColor: '#FAFAFA',
        borderWidth: 1,
        borderColor: '#CD0000',
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center',
    },

    passwordBoxText:{
        position: 'absolute',
        maxWidth: 360,
        height: '100%',
        width: '100%',
        fontFamily:'RedHatDisplay_400Regular',
        fontSize: 18,
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        color: '#707070',
    },

    showPassword:{
        position:'absolute',
        left: '85%',
    },

    showPasswordIcon:{
        color: '#1A82C4',
    },
    
    forgottenPassword:{
        fontFamily:'RedHatDisplay_400Regular',
        fontSize: 14,
        position:'absolute',
        top:'54%',
        color:'#A6A6A6', 
    },

    signInButton:{
        position: 'absolute',
        maxWidth: 360,
        top: '60%',
        width: '92%',
        height: '7%',
        backgroundColor: '#1A82C4',
        borderRadius: 90,
        alignItems: 'center',
        justifyContent: 'center',
    },

    signInButtonView:{
        flexDirection: 'row', 
        alignItems: 'center', 
        justifyContent:'center'
    },

    textSignInButton:{
        color: "white",
        fontSize: 22,
        fontFamily:'RedHatDisplay_400Regular',
        width:275,
        textAlign: 'center',
    },

    orText:{
        fontFamily:'RedHatDisplay_400Regular',
        fontSize:24,
        position:'absolute',
        top:'68%',
        color: '#1A82C4',
    },

    fingerprintPng:{
        width:70,
        height:70
    },
    fingerprint:{
        width:70,
        height:70,
        position:"absolute",
        top:"74%",
    },

    createAccountText:{
        fontFamily:'RedHatDisplay_400Regular',
        fontSize:14,
        position:'absolute',
        top:'86%',
        color:'#A6A6A6',
    },

    createAccountButton:{
        position: 'absolute',
        maxWidth: 170,
        top: '90%',
        width: '50%',
        height: '6%',
        backgroundColor: '#DBDBDB',
        borderRadius: 60,
        alignItems: 'center',
        justifyContent: 'center',
    },

    createAccountView:{
        flexDirection: 'row', 
        alignItems: 'center', 
        justifyContent:'center'
    },

    textCreateAccount:{
        color: "white",
        fontSize: 16,
        fontFamily:'RedHatDisplay_400Regular',
        width:130,
        textAlign: 'center',
    },

    orText:{
        fontFamily:'RedHatDisplay_400Regular',
        fontSize:24,
        position:'absolute',
        top:'69%',
        color: '#1A82C4'
    },
})
