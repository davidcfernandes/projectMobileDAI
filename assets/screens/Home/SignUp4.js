import React, {useState, useEffect} from 'react';
import { StyleSheet, View, TouchableOpacity, Text, Image} from 'react-native';
import { useFonts, RedHatDisplay_400Regular } from '@expo-google-fonts/red-hat-display';
import AppLoading from 'expo-app-loading';
import { StatusBar } from 'expo-status-bar';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function SignUp4 ({ navigation }){
    const [valueToken, setValueToken] = useState(null);
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        async function submit() {
            const valueTokenStorage = await AsyncStorage.getItem('createdUserId');
            const valueToken = JSON.parse(valueTokenStorage);
            setValueToken(valueToken.createdUserId);
            console.log(valueToken.createdUserId);
        }
        if(!loaded){
            submit();
            setLoaded(true);
        }
    });

    //Fetch
    const sportsPref = async () => {
        const response = await fetch("http://192.168.1.74:8080/api/preferences/"+valueToken+"/3", {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
        });
        const response_1 = await response.json();
        console.log(response_1);
        return response_1;
    }
    const literaturePref = async () => {
        const response = await fetch("http://192.168.1.74:8080/api/preferences/"+valueToken+"/4", {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
        });
        const response_1 = await response.json();
        console.log(response_1);
        return response_1;
    }
    const musicPref = async () => {
        const response = await fetch("http://192.168.1.74:8080/api/preferences/"+valueToken+"/5", {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
        });
        const response_1 = await response.json();
        console.log(response_1);
        return response_1;
    }
    const cinemaPref = async () => {
        const response = await fetch("http://192.168.1.74:8080/api/preferences/"+valueToken+"/6", {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
        });
        const response_1 = await response.json();
        console.log(response_1);
        return response_1;
    }
    const videoGamesPref = async () => {
        const response = await fetch("http://192.168.1.74:8080/api/preferences/"+valueToken+"/7", {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
        });
        const response_1 = await response.json();
        console.log(response_1);
        return response_1;
    }

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
                    <Text style={styles.pickAreas}>Escolhe as tuas áreas de interesse!</Text>
                    <TouchableOpacity onPress={() => navigation.navigate('SignUp3')} style={styles.back}>
                        <FontAwesomeIcon icon={faChevronLeft} style={styles.chevronLeft} size={15}/>
                    </TouchableOpacity>
                </View>
                <Text style={styles.recomendations}>As recomendações serão feitas consoante as tuas escolhas</Text>
                <TouchableOpacity style={styles.sports} onPress={sportsPref}>
                    <View style={styles.sportsView}>
                        <Text style={styles.sportsText}>Desporto</Text>
                        <Image source={require("../../sports.png")} style={styles.sportsimg}/>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.literature} onPress={literaturePref}>
                    <View style={styles.literatureView}>
                        <Text style={styles.literatureText}>Literatura</Text>
                        <Image source={require("../../literature.png")} style={styles.literatureimg}/>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.music} onPress={musicPref}>
                    <View style={styles.musicView}>
                        <Text style={styles.musicText}>Música</Text>
                        <Image source={require("../../music.png")} style={styles.musicimg}/>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.cinema} onPress={cinemaPref}>
                    <View style={styles.cinemaView}>
                        <Text style={styles.cinemaText}>Cinema</Text>
                        <Image source={require("../../cinema.png")} style={styles.cinemaimg}/>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.videogames} onPress={videoGamesPref}>
                    <View style={styles.videogamesView}>
                        <Text style={styles.videogamesText}>Videojogos</Text>
                        <Image source={require("../../videogames.png")} style={styles.videogamesimg}/>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.continueButton} onPress={() => navigation.navigate('SignUp5')}>
                    <View style={styles.continueButtonView} /*onPress={submit}*/>
                        <Text style={styles.textContinueButton}>Continuar</Text>
                    </View>
                </TouchableOpacity>
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

    pickAreas:{
        fontFamily:'RedHatDisplay_400Regular',
        fontSize:20,
        position:'absolute',
        color:'#1A82C4',
        textAlign: 'center',
    },

    recomendations:{
        fontFamily:'RedHatDisplay_400Regular',
        fontSize:20,
        position:'absolute',
        color:'#D4D4D4',
        textAlign: 'center',
        maxWidth: 350,
        top: '10%',
    },

    sports:{
        position: 'absolute',
        maxWidth: 360,
        top: '20%',
        width: '85%',
        height: 70,
        backgroundColor: '#ff5a5f',
        borderRadius: 90,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection:"row",
        shadowColor: "#a0a0a0",
        shadowOffset: {
	        width: 6,
	        height: 6,
        },
        shadowOpacity: 0.58,
        shadowRadius: 16.00,
        elevation: 12,
        },

    sportsView:{
        width: '100%',
        flexDirection: 'row', 
        alignItems: 'center', 
        justifyContent:'flex-start',
    },

    sportsText:{
        position: 'absolute',
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        color: "white",
        fontSize: 36,
        fontFamily:'RedHatDisplay_400Regular',
        marginLeft:100,
    },

    sportsimg:{
        width: 70,
        height: 70,
    },

    literature:{
        position: 'absolute',
        maxWidth: 360,
        top: '33%',
        width: '85%',
        height: 70,
        backgroundColor: '#fabe55',
        borderRadius: 90,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: "#a0a0a0",
        flexDirection:"row",
        shadowOffset: {
	        width: 6,
	        height: 6,
        },
        shadowOpacity: 0.58,
        shadowRadius: 16.00,
        elevation: 12,
    },

    literatureView:{
        width: '100%',
        flexDirection: 'row', 
        alignItems: 'center', 
        justifyContent:'flex-start',
    },

    literatureText:{
        position: 'absolute',
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        color: "white",
        fontSize: 36,
        fontFamily:'RedHatDisplay_400Regular',
        marginLeft:100,
    },

    literatureimg:{
        width: 70,
        height: 70,
    },

    cinema:{
        position: 'absolute',
        maxWidth: 360,
        top: '46%',
        width: '85%',
        height: 70,
        maxHeight: 70,
        backgroundColor: '#6a4c93',
        borderRadius: 90,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection:"row",
        shadowColor: "#a0a0a0",
        flexDirection:"row",
        shadowOffset: {
	        width: 6,
	        height: 6,
        },
        shadowOpacity: 0.58,
        shadowRadius: 16.00,
        elevation: 12,
    },

    cinemaView:{
        width: '100%',
        flexDirection: 'row', 
        alignItems: 'center', 
        justifyContent:'flex-start',
    },

    cinemaText:{
        position: 'absolute',
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        color: "white",
        fontSize: 36,
        fontFamily:'RedHatDisplay_400Regular',
        marginLeft:100,
    },

    cinemaimg:{
        width: 70,
        height: 70,
    },

    music:{
        position: 'absolute',
        maxWidth: 360,
        top: '59%',
        width: '85%',
        height: 70,
        maxHeight: 70,
        backgroundColor: '#1a82c4',
        borderRadius: 90,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection:"row",
        shadowColor: "#a0a0a0",
        flexDirection:"row",
        shadowOffset: {
	        width: 6,
	        height: 6,
        },
        shadowOpacity: 0.58,
        shadowRadius: 16.00,
        elevation: 12,
    },

    musicView:{
        width: '100%',
        flexDirection: 'row', 
        alignItems: 'center', 
        justifyContent:'flex-start',
    },

    musicText:{
        position: 'absolute',
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        color: "white",
        fontSize: 36,
        fontFamily:'RedHatDisplay_400Regular',
        marginLeft:100,
    },

    musicimg:{
        width: 70,
        height: 70,
    },

    videogames:{
        position: 'absolute',
        maxWidth: 360,
        top: '72%',
        width: '85%',
        height: 70,
        maxHeight: 70,
        backgroundColor: '#8ac926',
        borderRadius: 90,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection:"row",
        shadowColor: "#a0a0a0",
        flexDirection:"row",
        shadowOffset: {
	        width: 6,
	        height: 6,
        },
        shadowOpacity: 0.58,
        shadowRadius: 16.00,
        elevation: 12,
    },

    videogamesView:{
        width: '100%',
        flexDirection: 'row', 
        alignItems: 'center', 
        justifyContent:'flex-start',
    },

    videogamesText:{
        position: 'absolute',
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        color: "white",
        fontSize: 36,
        fontFamily:'RedHatDisplay_400Regular',
        marginLeft:100,
    },

    videogamesimg:{
        width: 70,
        height: 70,
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