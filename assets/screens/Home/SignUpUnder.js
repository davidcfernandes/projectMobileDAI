import React, {useState, useEffect} from 'react';
import { Animated, StyleSheet, Text, View, ScrollView, Image, TouchableHighlight, FlatList, TouchableOpacity, TextInput, Alert} from 'react-native';
import AppLoading from 'expo-app-loading';
import { useFonts, RedHatDisplay_400Regular } from '@expo-google-fonts/red-hat-display';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faChevronLeft, faTrophy} from '@fortawesome/free-solid-svg-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { withSafeAreaInsets } from 'react-native-safe-area-context';

// Verificar se o scroll ta bem
export default function Rank({navigation}) {
    const [loaded, setLoaded] = useState(false);
    const [parentalEmailValue,setParentalEmailValue] = useState(null);

    //Storage
    const [nameValue,setNameValue] = useState(null);
    const [emailValue,setEmailValue] = useState(null);
    const [ageValue,setAgeValue] = useState(null);
    const [passwordValue,setPasswordValue] = useState(null);
    const [confirmpasswordValue,setconfirmPasswordValue] = useState(null);
    const [addressValue,setAddressValue] = useState(null);
    const [contactValue,setContactValue] = useState(null);

    const handleEmailText = (text) => {
        setParentalEmailValue(text);
    }
    
    //Fetch
    useEffect(() => {
        async function submit() {
            const createdUnderage = await AsyncStorage.getItem('createUnderageUser');
            const createdU = JSON.parse(createdUnderage);
            setNameValue(createdU.name);
            setEmailValue(createdU.email);
            setAgeValue(parseInt(createdU.age));
            setPasswordValue(createdU.password);
            setconfirmPasswordValue(createdU.confirmPassword);
            setAddressValue(createdU.address);
            setContactValue(parseInt(createdU.contact));
        }
        if(!loaded){
            submit();
            setLoaded(true);
        }
    });

    //Create Under 13 Account
    const createUnderAccount = async () => {
        try {
            console.log(nameValue);
            console.log(ageValue);
            console.log(contactValue);
            console.log(addressValue);
            console.log(passwordValue);
            console.log(confirmpasswordValue);
            console.log(emailValue);
            console.log(parentalEmailValue);
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
                    parentEmail:parentalEmailValue,
                    role: {
                        idRole: 3
                    }
                
                })
            });
            const response_1 = await response.json();
            console.log(response_1.success);
            const createdUserId = response_1.objectId;
            if(response_1.success==false){
                Alert.alert(
                    "Erro",
                    "Os dados da primeira etapa ou da atual não foram bem introduzidos",
                    [
                    { text: "OK" }
                    ]
                );
            }
            if(response_1.success==true){
                await AsyncStorage.setItem('createdUserId',JSON.stringify({createdUserId}));
                navigation.navigate('SignUp3');
            }
        }catch (error) {
            console.error(error);
            console.log("Error");
        }
        
    };
    
    let [fontsLoaded] = useFonts({
        RedHatDisplay_400Regular,
    });
    if (!fontsLoaded) {
        return <AppLoading/>;
    } else {
        return(
            <View style={styles.container}>
                <View style={styles.topNavbar}>
                    <FontAwesomeIcon icon={faChevronLeft} onPress={() => navigation.navigate('SignUp1')} style={styles.chevronLeft}/>
                    <Text style={styles.underageText}>Introduz os teus dados!</Text>
                </View>
                <View style={styles.rankScreenScrollContainer}>
                    <View style={styles.exclamationMarkStyleView}>
                        <Text style={styles.exclamationMarkStyle}>!</Text>
                    </View>
                    <Text style={styles.youHaveLessThanText}>Reparamos que tens menos de 13 anos!</Text>
                    <Text style={styles.weNeedStyle}>Precisamos do e-mail do teu Encarregado de Educação para utilizares a aplicação.</Text>
                    <TextInput onChangeText={handleEmailText} placeholder="Introduza o seu email parental" style={styles.parentalEmailInput}></TextInput>
                </View>
                    <TouchableOpacity style={styles.continueButton} onPress={createUnderAccount}>
                        <Text style={styles.continueText}>Continuar</Text>
                    </TouchableOpacity>
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

    topNavbar: {
        flex: 1,
        width:"100%",
        backgroundColor: '#FCFCFC',
        flexDirection: 'row', 
        alignItems: 'center',
        justifyContent: 'center',
        zIndex:2,
    },

    underageText:{
        position:'absolute',
        bottom:"8%",
        fontSize:28,
        color:"#1A82C4",
        fontFamily:'RedHatDisplay_400Regular',
    },

    chevronLeft:{
        position:'absolute',
        bottom:17,
        left:'4.83%',
        color:"#B0B0B0",
    },

    rankScreenScrollContainer:{
        flex: 5.5,
        width:"100%",
        flexDirection: 'column', 
        alignItems: 'center',
        justifyContent: 'center',
    },

    exclamationMarkStyleView:{
        borderRadius: 100,
        width:130,
        height:130,
        borderWidth: 5,
        borderColor: "#1A82C4",
        alignItems:'center',
        justifyContent: 'center',
        marginBottom:20,
    },

    exclamationMarkStyle:{
        fontSize:130,
        color:"#1A82C4",
        fontFamily:'RedHatDisplay_400Regular',
    },

    parentalEmailInput:{
        height:49,
        maxWidth:376,
        width:"90%",
        borderWidth: 1,
        borderColor: "#EBEBEB",
        textAlign:'center',
        borderRadius:50,
        fontSize:20,
        fontFamily:'RedHatDisplay_400Regular',
        color:"#B4B4B4",
        marginTop:10,
    },

    weNeedStyle:{
        textAlign:'center',
        fontSize:18,
        fontFamily:'RedHatDisplay_400Regular',
        color:"#CDCDCD",
    },

    youHaveLessThanText:{
        textAlign:'center',
        fontSize:19.3,
        fontFamily:'RedHatDisplay_400Regular',
        color:"#1A82C4",
        fontWeight:'bold',
    },

    continueButton:{
        maxWidth:374,
        width:"90%",
        height:59,
        backgroundColor:"#1A82C4",
        borderRadius:100,
        alignItems:'center',
        justifyContent: 'center',
        margin:20,
        marginBottom:10,
    },

    continueText:{
        fontFamily:'RedHatDisplay_400Regular',
        fontWeight:'bold',
        fontSize:24,
        color:"#fff",
    },
});