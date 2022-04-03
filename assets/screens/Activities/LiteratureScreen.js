import React, {useState, useEffect} from 'react';
import { Animated, StyleSheet, Text, View, ScrollView, Image, TouchableHighlight, FlatList } from 'react-native';
import AppLoading from 'expo-app-loading';
import { useFonts, RedHatDisplay_400Regular } from '@expo-google-fonts/red-hat-display';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faChevronLeft, faMapMarkedAlt, faUser, faCalendarAlt, faClock} from '@fortawesome/free-solid-svg-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TouchableOpacity } from 'react-native-gesture-handler';
import LiteratureInscriptionButton from './Components/LiteratureInscriptionButton';

export default function LiteratureScreen({navigation}) {
    const scrollY= new Animated.Value(0);
    let scrollYValue = scrollY._value;
    const [scrolled, setScrolled] = useState(false);
    const [loaded, setLoaded] = useState(false);
    const [literatureActivity, setLiteratureActivity] = useState(null);
    const [valueToken, setValueToken] = useState(null);
    const [inscriptions, setInscriptions] = useState(null);
    const [disableInscription, setDisableInscription] = useState(false);
    const [inscriptionSelected, setInscriptionSelected] = useState(null);
    

    //Fetch
    useEffect(() => {
        async function submit() {
            const valueTokenStorage = await AsyncStorage.getItem('userToken');
            const valueToken = JSON.parse(valueTokenStorage);
            setValueToken(valueToken);

            const response2 = await fetch("http://192.168.1.74:8080/api/children/"+ valueToken.userId +"/currentactivities", {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
            });
            const response_3 = await response2.json();
            setInscriptions(response_3);
            

            const response = await fetch("http://192.168.1.74:8080/api/activities", {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
            });
            const response_1 = await response.json();
            setLiteratureActivity(response_1);
            //console.log(profileData);
        }
        if(!loaded){
            submit();
            setLoaded(true);
            //console.log(profileData);
        }
    });

    const joinIn = async (idActivity) => {
        const response = await fetch("http://192.168.1.74:8080/api/activities/"+idActivity+"/children", {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                idChild: valueToken.userId
            })
        });
        const response_1 = await response.json();
        setDisableInscription(true);
        //console.log(idActivity);
        //console.log(response_1);
        return response_1;
        }


    let [fontsLoaded] = useFonts({
        RedHatDisplay_400Regular,
    });
    if (!fontsLoaded && !loaded) {
        return <AppLoading/>;
    } else {
        return(
            <View style={styles.container}>
                <View style={scrolled ? styles.topNavbarScrolled : styles.topNavbar}>
                    <FontAwesomeIcon icon={faChevronLeft} onPress={() => navigation.navigate('HomeMenu')} style={styles.chevronLeft}/>
                    <Image source={require("../../literature.png")} style={styles.literaturesImage}></Image>
                </View>
                <View style={styles.literaturesScreen}>
                    <FlatList data={literatureActivity}
                        scrollEventThrottle={1} onScroll={(e)=>{scrollY.setValue(e.nativeEvent.contentOffset.y); scrollYValue = scrollY._value; scrollYValue > 0 ? setScrolled(true) : setScrolled(false);}}
                        renderItem={({item, index}) => {
                            if(index==0 && item.activityType.idActivityType==4 && item.status=="Aprovada"){
                                return(
                                    <View style={styles.literatureActivitiesScreenView}>
                                                <View style={styles.registerActivityView}>
                                                    <View style={styles.tileFetchedTextContainer}>
                                                        <Text style={styles.tileFetchedText} numberOfLines={1}>{item.title}</Text>
                                                    </View>
                                                    <View style={styles.collumsContainerView}>
                                                        <View style={styles.firstCollumView}>
                                                            <View style={styles.adressView}>
                                                                <FontAwesomeIcon icon={faMapMarkedAlt} style={styles.mapMarkedAlt}/>
                                                                <Text style={styles.addressTextFirstCollum} numberOfLines={1}>{item.address}</Text>
                                                            </View>
                                                            <View style={styles.adressView}>
                                                                <FontAwesomeIcon icon={faUser} style={styles.mapMarkedAlt}/>
                                                                <Text style={styles.addressTextFirstCollum}>{item.spaces} Lugares</Text>{/* VER A PARTE DOS PONTOS */}
                                                            </View>
                                                        </View>
                                                        <View style={styles.sendondCollumView}>
                                                            <View style={styles.dateView}>
                                                                <FontAwesomeIcon icon={faCalendarAlt} style={styles.mapMarkedAlt}/>
                                                                <Text style={styles.dateText} numberOfLines={1}>{item.init_data.slice(0, 10)}</Text>
                                                            </View>
                                                            <View style={styles.dateView}>
                                                                <FontAwesomeIcon icon={faClock} style={styles.mapMarkedAlt}/>
                                                                <Text style={styles.hourText} numberOfLines={1}>{item.init_data.slice(10, 16)}</Text>
                                                            </View>
                                                        </View>
                                                    </View>
                                                    <View style={styles.inscriptionButtonContainer}>
                                                        <TouchableOpacity style={styles.inscriptionJoinedButton}>
                                                            <Text style={styles.inscriptionJoinedButtonText}>Inscrever</Text>
                                                        </TouchableOpacity>
                                                    </View>
                                                </View>
                                            </View>
                                )
                            }else{
                                if(index==0){
                                    return(
                                        <View style={styles.literatureActivitiesScreenView}>
                                            <View style={styles.literaturesActivitiesTextView}>
                                                <Text style={styles.forYouText}>Para ti!</Text>
                                                <Text style={styles.comingSoonText}>Próximas atividades nas proximidades</Text>
                                            </View>
                                        </View>
                                    )
                                }
                            }
                            if(item.activityType.idActivityType==4 && item.status=="Aprovada"){
                                for(let i = 0; i < inscriptions.length; i++){
                                    if(inscriptions[i].idActivity==item.idActivity){
                                        return(
                                            <View style={styles.literatureActivitiesScreenView}>
                                                <View style={styles.registerActivityView}>
                                                    <View style={styles.tileFetchedTextContainer}>
                                                        <Text style={styles.tileFetchedText} numberOfLines={1}>{item.title}</Text>
                                                    </View>
                                                    <View style={styles.collumsContainerView}>
                                                        <View style={styles.firstCollumView}>
                                                            <View style={styles.adressView}>
                                                                <FontAwesomeIcon icon={faMapMarkedAlt} style={styles.mapMarkedAlt}/>
                                                                <Text style={styles.addressTextFirstCollum} numberOfLines={1}>{item.address}</Text>
                                                            </View>
                                                            <View style={styles.adressView}>
                                                                <FontAwesomeIcon icon={faUser} style={styles.mapMarkedAlt}/>
                                                                <Text style={styles.addressTextFirstCollum}>{item.spaces} Lugares</Text>{/* VER A PARTE DOS PONTOS */}
                                                            </View>
                                                        </View>
                                                        <View style={styles.sendondCollumView}>
                                                            <View style={styles.dateView}>
                                                                <FontAwesomeIcon icon={faCalendarAlt} style={styles.mapMarkedAlt}/>
                                                                <Text style={styles.dateText} numberOfLines={1}>{item.init_data.slice(0, 10)}</Text>
                                                            </View>
                                                            <View style={styles.dateView}>
                                                                <FontAwesomeIcon icon={faClock} style={styles.mapMarkedAlt}/>
                                                                <Text style={styles.hourText} numberOfLines={1}>{item.init_data.slice(10, 16)}</Text>
                                                            </View>
                                                        </View>
                                                    </View>
                                                    <View style={styles.inscriptionButtonContainer}>
                                                        <TouchableOpacity style={styles.inscriptionJoinedButton}>
                                                            <Text style={styles.inscriptionJoinedButtonText}>Inscrever</Text>
                                                        </TouchableOpacity>
                                                    </View>
                                                </View>
                                            </View>
                                        )
                                    }
                                };
                                return(
                                    <View style={styles.literatureActivitiesScreenView}>
                                        <View style={styles.registerActivityView}>
                                            <View style={styles.tileFetchedTextContainer}>
                                                <Text style={styles.tileFetchedText} numberOfLines={1}>{item.title}</Text>
                                            </View>
                                            <View style={styles.collumsContainerView}>
                                                <View style={styles.firstCollumView}>
                                                    <View style={styles.adressView}>
                                                        <FontAwesomeIcon icon={faMapMarkedAlt} style={styles.mapMarkedAlt}/>
                                                        <Text style={styles.addressTextFirstCollum} numberOfLines={1}>{item.address}</Text>
                                                    </View>
                                                    <View style={styles.adressView}>
                                                        <FontAwesomeIcon icon={faUser} style={styles.mapMarkedAlt}/>
                                                        <Text style={styles.addressTextFirstCollum}>{item.spaces} Lugares</Text>{/* VER A PARTE DOS PONTOS */}
                                                    </View>
                                                </View>
                                                <View style={styles.sendondCollumView}>
                                                    <View style={styles.dateView}>
                                                        <FontAwesomeIcon icon={faCalendarAlt} style={styles.mapMarkedAlt}/>
                                                        <Text style={styles.dateText} numberOfLines={1}>{item.init_data.slice(0, 10)}</Text>
                                                    </View>
                                                    <View style={styles.dateView}>
                                                        <FontAwesomeIcon icon={faClock} style={styles.mapMarkedAlt}/>
                                                        <Text style={styles.hourText} numberOfLines={1}>{item.init_data.slice(10, 16)}</Text>
                                                    </View>
                                                </View>
                                            </View>
                                            <TouchableOpacity style={styles.inscriptionButtonContainer} onPress={joinIn(item.idActivity)}>
                                                <LiteratureInscriptionButton/>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                )
                            }
                        }}
                        keyExtractor={(item, index) => index.toString()}
                        style={styles.profileScreenScroll}
                    />
                </View>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F4F4F4',
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

    topNavbarScrolled:{
        flex: 1,
        width:"100%",
        backgroundColor: '#FCFCFC',
        flexDirection: 'row', 
        alignItems: 'center',
        justifyContent: 'center',
        zIndex:2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity:  0.4,
        shadowRadius: 3,
        elevation: 5,
    },

    literaturesImage:{
        position:'absolute',
        bottom:"0%",
        width:60,
        height:60,
    },

    chevronLeft:{
        position:'absolute',
        bottom:17,
        left:'4.83%',
        color:"#B0B0B0",
    },

    //literatures
    literaturesScreen:{
        flex: 5,
        maxWidth:414,
        width:"100%",
        backgroundColor: '#FCFCFC',
        alignItems: 'center',
        justifyContent: 'flex-start',
        flexDirection: "column",
    },

    literatureActivitiesScreenView: {
        flex: 1,
        backgroundColor:"#FCFCFC",
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection:'column',
        marginTop:10,
    },
    
    literaturesActivitiesTextView:{
        justifyContent:'flex-start',
        flexDirection:'column',
        alignItems:'flex-start',
        marginBottom:20,
    },

    forYouText:{
        color:"#FABE55",
        fontFamily:"RedHatDisplay_400Regular",
        fontSize:36,
        fontWeight:"bold",
    },

    comingSoonText:{
        color:"#B1B1B1",
        fontFamily:"RedHatDisplay_400Regular",
        fontSize:20,
    },

    //Register
    registerActivityView:{
        width:"99%",
        maxWidth:414,
        height:190,
        backgroundColor:"#FFF",
        borderRadius:15,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowOpacity: 1,
        shadowRadius: 3.84,

        elevation: 0.5,
        marginTop:5,
        marginBottom:5,
        justifyContent:'space-between',
        alignItems:"center",
        flexDirection:'column',
    },

    tileFetchedTextContainer:{
        width:"95%",
        justifyContent:"flex-start",
        alignItems:"flex-start",
        flexDirection:"row",
    },

    tileFetchedText:{
        width:"80%",
        textAlign:'left',
        fontSize:22,
        fontFamily:"RedHatDisplay_400Regular",
        fontWeight:"bold",
        color:"#000000",
        marginTop:10,
    },

    collumsContainerView:{
        justifyContent:'center',
        alignItems:"center",
        flexDirection:'row',
    },

    firstCollumView:{
        width:250,
        justifyContent:'flex-start',
        alignItems:"flex-start",
        flexDirection:'column',
    },

    secondCollumView:{
        width:100,
        justifyContent:'flex-start',
        alignItems:"flex-start",
        flexDirection:'column',
    },

    inscriptionButtonContainer:{
        width:"100%",
        height:70,
        borderTopWidth:2,
        borderTopColor:"#F1F1F1",
        backgroundColor:"transparent",
        justifyContent:'center',
        alignItems:"center",
        flexDirection:'column',
    },

    inscriptionButton:{
        width:115,
        height:40,
        justifyContent:'center',
        alignItems:"center",
        flexDirection:'column',
        borderWidth:1,
        borderColor:"#FABE55",
        borderRadius:50,
    },

    inscriptionButtonText:{
        fontSize:20,
        fontFamily:"RedHatDisplay_400Regular",
        color:"#FABE55",
    },

    inscriptionJoinedButton:{
        width:115,
        height:40,
        justifyContent:'center',
        alignItems:"center",
        flexDirection:'column',
        backgroundColor:'#FABE55',
        borderRadius:50,
    },

    inscriptionJoinedButtonText:{
        fontSize:20,
        fontFamily:"RedHatDisplay_400Regular",
        color:"#FFFFFF",
    },

    adressView:{
        justifyContent:'flex-start',
        alignItems:"center",
        flexDirection:'row',
    },

    addressTextFirstCollum:{
        fontSize:14,
        fontFamily:"RedHatDisplay_400Regular",
        color:"#D7D7D7",
        marginLeft:10,
        width:150,
    },

    mapMarkedAlt:{
        color:"#D7D7D7",
    },
    
    dateView:{
        marginLeft:-62,
        justifyContent:'flex-start',
        alignItems:"center",
        flexDirection:"row",
    },

    dateText:{
        marginLeft:10,
        fontSize:14,
        fontFamily:"RedHatDisplay_400Regular",
        color:"#D7D7D7",
    },

    hourText:{
        marginLeft:7,
        fontSize:14,
        fontFamily:"RedHatDisplay_400Regular",
        color:"#D7D7D7",
    },
});