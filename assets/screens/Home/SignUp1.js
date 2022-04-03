import React, { useState } from 'react';
import { StyleSheet, View, TouchableHighlight, Text, TextInput, Alert} from 'react-native';
import { useFonts, RedHatDisplay_400Regular } from '@expo-google-fonts/red-hat-display';
import AppLoading from 'expo-app-loading';
import { StatusBar } from 'expo-status-bar';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
//import RNPickerSelect from 'react-native-picker-select';

export default function SignUp1 ({ navigation }){
        const [nameValue,setNameValue] = useState(null);
        const [emailValue,setEmailValue] = useState(null);
        const [ageValue,setAgeValue] = useState(null);
        const [passwordValue,setPasswordValue] = useState(null);
        const [confirmpasswordValue,setconfirmPasswordValue] = useState(null);
        const [addressValue,setAddressValue] = useState(null);
        const [contactValue,setContactValue] = useState(null);
        const [idRoleValue,setidRoleValue] = useState(null);

        const handleNameText = (text) => {
            setNameValue(text);
        }

        const handleEmailText = (text) => {
            setEmailValue(text);
        }

        const handleAgeText = (text) => {
            setAgeValue(text);
        }

        const handlePasswordText = (text) => {
            setPasswordValue(text);
        }

        const handleConfirmPassword = (text) => {
            setconfirmPasswordValue(text);
        }

        const handleAddressText = (text) => {
            setAddressValue(text);
        }

        const handleContactText = (text) => {
            setContactValue(text);
        }
    

    //Fetch
        /*const submit = async () => {
                const response = await fetch("http://192.168.1.67:8080/api/children", {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        name:nameValue,
                        email:emailValue,
                        age:ageValue,
                        password:passwordValue,
                        confirmpassword:confirmpasswordValue,
                        address:addressValue,
                        role:{
                            idRole:3,
                        },
                        contact:contactValue,
                    })
                });
                const response_1 = await response.json();
                return response_1;
        }
        

        */
        
        const submit = async () => {
            if(ageValue>13){
                try {
                    const response = await fetch("http://192.168.1.74:8080/api/children", {
                        method: 'POST',
                        headers: {
                            Accept: 'application/json',
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            email:emailValue,
                            age:ageValue,
                            password : passwordValue,
                            contact: contactValue,
                            confirmPassword: confirmpasswordValue,
                            name: nameValue,
                            address:addressValue,
                            role: {
                                idRole: 3
                            },
                        
                        })
                    });
                    const response_1 = await response.json();
                    console.log(response_1.success);
                    createdUserId = response_1.objectId;
                    if(response_1.success==false){
                        Alert.alert(
                            "Erro",
                            "Os dados não foram bem introduzidos",
                            [
                            { text: "OK" }
                            ]
                        );
                    }
                    if(response_1.success==true){
                        await AsyncStorage.setItem('createdUserId',JSON.stringify({createdUserId}));
                        navigation.navigate('SignUp3');
                    }
                    /*if(response_1.error=="Unauthorized"){
                        setBorderError(true);
                        return response_1;
                    }else{
                        const userId = response_1.userId;
                        console.log(userId);
                        await AsyncStorage.setItem('userToken',JSON.stringify({userId}));
                        navigation.navigate('BottomNavbar');
                        return response_1;
                    }*/
                    
                }catch (error) {
                    console.error(error);
                    console.log("asdadada");
                }
            }else
            if(ageValue<13 && ageValue>0 && emailValue!=null && ageValue!=null && passwordValue!=null && contactValue!=null && confirmpasswordValue!=null && nameValue!=null && addressValue!=null){
                await AsyncStorage.setItem('createUnderageUser',JSON.stringify({
                    email:emailValue,
                    age:ageValue,
                    password : passwordValue,
                    contact: contactValue,
                    confirmPassword: confirmpasswordValue,
                    name: nameValue,
                    address:addressValue,
                    role: {
                        idRole: 3
                    },
                }));
                navigation.navigate('SignUpUnder');
            }
        };
        /*
        const submit = async () => {
            await AsyncStorage.setItem('userData', JSON.stringify({
                name:nameValue,
                email:emailValue,
                age:ageValue,
                password:passwordValue,
                confirmpassword:confirmpasswordValue,
                address:addressValue,
                role:{
                    idRole:3,
                },
                contact:contactValue,
            }));
        }
        */
    
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
                    <Text style={styles.insertData}>Introduz os teus dados!</Text>
                    <TouchableHighlight onPress={() => navigation.navigate('Login')} style={styles.back}>
                        <FontAwesomeIcon icon={faChevronLeft} style={styles.chevronLeft} size={15}/>
                    </TouchableHighlight>
                </View>
                <Text style={styles.emailText}>E-mail</Text>
                <TextInput onChangeText={handleEmailText} style={styles.emailBox}></TextInput>
                <Text style={styles.nameText}>Nome Completo</Text>
                <TextInput onChangeText={handleNameText} style={styles.nameBox}></TextInput>
                <Text style={styles.passwordText}>Palavra-passe</Text>
                <TextInput onChangeText={handlePasswordText} style={styles.passwordBox} secureTextEntry={true}></TextInput>
                <Text style={styles.confirmPasswordText}>Confirmar Palavra-passe</Text>
                <TextInput onChangeText={handleConfirmPassword} style={styles.confirmPasswordBox} secureTextEntry={true}></TextInput>
                <Text style={styles.cellphoneText}>Contacto</Text>
                <TextInput onChangeText={handleContactText} style={styles.cellphoneBox} keyboardType='numeric' maxLength={9}></TextInput>
                <Text style={styles.townHallText}>Câmara Municipal</Text>
                <TextInput onChangeText={handleAddressText} style={styles.townHallBox}></TextInput>
                <Text style={styles.ageText}>Idade</Text>
                <TextInput onChangeText={handleAgeText} style={styles.ageBox}></TextInput>
                <TouchableHighlight style={styles.continueButton} onPress={submit}>
                    <View style={styles.continueButtonView}>
                        <Text style={styles.textContinueButton}>Continuar</Text>
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

    headContainer:{
        position: 'absolute',
        maxWidth: 375,
        height: '10%',
        width: '100%',
        top: '2%',
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

    insertData:{
        fontFamily:'RedHatDisplay_400Regular',
        fontSize:28,
        position:'absolute',
        color:'#1A82C4',
        textAlign: 'center',
    },

    emailText:{
        fontFamily:'RedHatDisplay_400Regular',
        fontSize:20,
        position:'absolute',
        top:'11%',
        color:'#1A82C4',
    },

    emailBox:{
        position: 'absolute',
        maxWidth: 360,
        width: '92%',
        height: '6%',
        top: '15%',
        backgroundColor: '#FAFAFA',
        borderWidth: 1,
        borderColor: '#EBEBEB',
        borderRadius: 30,
        fontFamily:'RedHatDisplay_400Regular',
        fontSize: 18,
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        color: '#B4B4B4',
    },

    nameText:{
        fontFamily:'RedHatDisplay_400Regular',
        fontSize:20,
        position:'absolute',
        top:'22%',
        color:'#1A82C4',
    },

    nameBox:{
        position: 'absolute',
        maxWidth: 360,
        width: '92%',
        height: '6%',
        top: '26%',
        backgroundColor: '#FAFAFA',
        borderWidth: 1,
        borderColor: '#EBEBEB',
        borderRadius: 30,
        fontFamily:'RedHatDisplay_400Regular',
        fontSize: 18,
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        color: '#B4B4B4',
    },

    passwordText:{
        fontFamily:'RedHatDisplay_400Regular',
        fontSize:20,
        position:'absolute',
        top:'33%',
        color:'#1A82C4',
    },

    passwordBox:{
        position: 'absolute',
        maxWidth: 360,
        width: '92%',
        height: '6%',
        top: '37%',
        backgroundColor: '#FAFAFA',
        borderWidth: 1,
        borderColor: '#EBEBEB',
        borderRadius: 30,
        fontFamily:'RedHatDisplay_400Regular',
        fontSize: 18,
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        color: '#B4B4B4',
    },

    confirmPasswordText:{
        fontFamily:'RedHatDisplay_400Regular',
        fontSize:20,
        position:'absolute',
        top:'44%',
        color:'#1A82C4',
    },

    confirmPasswordBox:{
        position: 'absolute',
        maxWidth: 360,
        width: '92%',
        height: '6%',
        top: '48%',
        backgroundColor: '#FAFAFA',
        borderWidth: 1,
        borderColor: '#EBEBEB',
        borderRadius: 30,
        fontFamily:'RedHatDisplay_400Regular',
        fontSize: 18,
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        color: '#B4B4B4',
    },

    cellphoneText:{
        fontFamily:'RedHatDisplay_400Regular',
        fontSize:20,
        position:'absolute',
        top:'55%',
        color:'#1A82C4',
    },

    cellphoneBox:{
        position: 'absolute',
        maxWidth: 360,
        width: '92%',
        height: '6%',
        top: '59%',
        backgroundColor: '#FAFAFA',
        borderWidth: 1,
        borderColor: '#EBEBEB',
        borderRadius: 30,
        fontFamily:'RedHatDisplay_400Regular',
        fontSize: 18,
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        color: '#B4B4B4',
    },

    townHallText:{
        fontFamily:'RedHatDisplay_400Regular',
        fontSize:20,
        position:'absolute',
        top:'66%',
        color:'#1A82C4',
    },

    townHallBox:{
        position: 'absolute',
        maxWidth: 360,
        width: '92%',
        height: '6%',
        top: '70%',
        backgroundColor: '#FAFAFA',
        borderWidth: 1,
        borderColor: '#EBEBEB',
        borderRadius: 30,
        fontFamily:'RedHatDisplay_400Regular',
        fontSize: 18,
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        color: '#B4B4B4',
    },

    ageText:{
        fontFamily:'RedHatDisplay_400Regular',
        fontSize:20,
        position:'absolute',
        top:'77%',
        color:'#1A82C4',
    },

    ageBox:{
        position: 'absolute',
        maxWidth: 360,
        width: '92%',
        height: '6%',
        top: '81%',
        backgroundColor: '#FAFAFA',
        borderWidth: 1,
        borderColor: '#EBEBEB',
        borderRadius: 30,
        fontFamily:'RedHatDisplay_400Regular',
        fontSize: 18,
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        color: '#B4B4B4',
    },

    continueButton:{
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

})