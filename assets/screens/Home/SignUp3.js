import React, {useState, useEffect} from 'react';
import { StyleSheet, View, TouchableHighlight, Text, Image, Alert} from 'react-native';
import { useFonts, RedHatDisplay_400Regular } from '@expo-google-fonts/red-hat-display';
import AppLoading from 'expo-app-loading';
import { StatusBar } from 'expo-status-bar';
import AsyncStorage from '@react-native-async-storage/async-storage';
//import RNPickerSelect from 'react-native-picker-select';

export default function SignUp3 ({ navigation }){
    const [idAvatarValue,setidAvatarValue] = useState(null);
    const [loaded, setLoaded] = useState(false);
    const [valueToken, setValueToken] = useState(null);

    useEffect(() => {
        async function submit() {
            const valueTokenStorage = await AsyncStorage.getItem('createdUserId');
            const valueToken = JSON.parse(valueTokenStorage);
            console.log(valueToken.createdUserId)
            setValueToken(valueToken.createdUserId);
            setLoaded(true);
        }
        if(!loaded){
            submit();
            setLoaded(true);
        }
    });

    const handleAvatar1 = () => {
        setidAvatarValue(1);
    }

    const handleAvatar2 = () => {
        setidAvatarValue(2);
    }

    const handleAvatar3 = () => {
        setidAvatarValue(3);
    }

    const handleAvatar4 = () => {
        setidAvatarValue(4);
    }

    const handleAvatar5 = () => {
        setidAvatarValue(5);
    }

    const handleAvatar6 = () => {
        setidAvatarValue(6);
    }

    const handleAvatar7 = () => {
        setidAvatarValue(7);
    }

    const handleAvatar8 = () => {
        setidAvatarValue(8);
    }

     //Fetch
        const submit = async () => {
            const createdUserId = await AsyncStorage.getItem('createdUserId');
            const createdUserIdParsed = JSON.parse(createdUserId);
            console.log(createdUserIdParsed);

            if(idAvatarValue!=null){
                const response = await fetch("http://192.168.1.74:8080/api/children/"+createdUserIdParsed.createdUserId+"/avatar", {
                    method: 'PUT',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        idAvatar:idAvatarValue,
                    })
                });
                const response_1 = await response.json();
                console.log(response_1);
                navigation.navigate('SignUp4');
            }else{
                Alert.alert(
                    "Erro",
                    "Nenhum avatar foi selecionado",
                    [
                      { text: "OK" }
                    ]
                );
            }
        }

        /*const submit = async () => {
            await AsyncStorage.setItem('userData', JSON.stringify({
                idAvatar:idAvatarValue,
            }));
        }*/
    
    
    let [fontsLoaded] = useFonts({
        RedHatDisplay_400Regular,
    });
    if (!fontsLoaded && !loaded) {
        return <AppLoading/>;
    } else {
        return (
            <View style={styles.container}>
                <StatusBar style="auto" />
                <View style={styles.headContainer}>
                    <Text style={styles.pickAvatar}>Escolhe o teu avatar!</Text>
                </View>
                <View style={styles.avatarsContainer}>
                    <TouchableHighlight style={styles.avatar1} onPress={handleAvatar1}>
                        <Image source={require("../../avatar1.png")} style={styles.avatar1png}/>
                    </TouchableHighlight>
                    <TouchableHighlight style={styles.avatar2} onPress={handleAvatar2}>
                        <Image source={require("../../avatar2.png")} style={styles.avatar2png}/>
                    </TouchableHighlight>
                    <TouchableHighlight style={styles.avatar3} onPress={handleAvatar3}>
                        <Image source={require("../../avatar3.png")} style={styles.avatar3png}/>
                    </TouchableHighlight>
                    <TouchableHighlight style={styles.avatar4} onPress={handleAvatar4}>
                        <Image source={require("../../avatar4.png")} style={styles.avatar4png}/>
                    </TouchableHighlight>
                    <TouchableHighlight style={styles.avatar5} onPress={handleAvatar5}>
                        <Image source={require("../../avatar5.png")} style={styles.avatar5png}/>
                    </TouchableHighlight>
                    <TouchableHighlight style={styles.avatar6} onPress={handleAvatar6}>
                        <Image source={require("../../avatar6.png")} style={styles.avatar6png}/>
                    </TouchableHighlight>
                    <TouchableHighlight style={styles.avatar7} onPress={handleAvatar7}>
                        <Image source={require("../../avatar7.png")} style={styles.avatar7png}/>
                    </TouchableHighlight>
                    <TouchableHighlight style={styles.avatar8} onPress={handleAvatar8}>
                        <Image source={require("../../avatar8.png")} style={styles.avatar8png}/>
        </TouchableHighlight>
                </View>
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

    pickAvatar:{
        fontFamily:'RedHatDisplay_400Regular',
        fontSize:28,
        position:'absolute',
        color:'#1A82C4',
        textAlign: 'center',
    },

    avatarsContainer:{
        position: 'absolute',
        maxWidth: 360,
        top: '15%',
        width: '90%',
        height: '70%',
        alignItems: 'center',
    },

    avatar1:{
        position: 'absolute',
        top: '0%',
        left: '16%',
        width: 100,
        height: 100,
        borderRadius: 90,
    },

    avatar1png:{
        position: 'absolute',
        width: 100,
        height: 100,
        borderRadius: 90,
    },

    avatar2:{
        position: 'absolute',
        top: '0%',
        left: '56%',
        width: 100,
        height: 100,
        borderRadius: 90,
    },

    avatar2png:{
        position: 'absolute',
        width: 100,
        height: 100,
        borderRadius: 90,
    },

    avatar3:{
        position: 'absolute',
        top: '25%',
        left: '16%',
        width: 100,
        height: 100,
        borderRadius: 90,
    },

    avatar3png:{
        position: 'absolute',
        width: 100,
        height: 100,
        borderRadius: 90,
    },

    avatar4:{
        position: 'absolute',
        top: '25%',
        left: '56%',
        width: 100,
        height: 100,
        borderRadius: 90,
    },

    avatar4png:{
        position: 'absolute',
        width: 100,
        height: 100,
        borderRadius: 90,
    },

    avatar5:{
        position: 'absolute',
        top: '50%',
        left: '16%',
        width: 100,
        height: 100,
        borderRadius: 90,
    },

    avatar5png:{
        position: 'absolute',
        width: 100,
        height: 100,
        borderRadius: 90,
    },

    avatar6:{
        position: 'absolute',
        top: '50%',
        left: '56%',
        width: 100,
        height: 100,
        borderRadius: 90,
    },

    avatar6png:{
        position: 'absolute',
        width: 100,
        height: 100,
        borderRadius: 90,
    },

    avatar7:{
        position: 'absolute',
        top: '75%',
        left: '16%',
        width: 100,
        height: 100,
        borderRadius: 90,
    },

    avatar7png:{
        position: 'absolute',
        width: 100,
        height: 100,
        borderRadius: 90,
    },

    avatar8:{
        position: 'absolute',
        top: '75%',
        left: '56%',
        width: 100,
        height: 100,
        borderRadius: 90,
    },

    avatar8png:{
        position: 'absolute',
        width: 100,
        height: 100,
        borderRadius: 90,
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