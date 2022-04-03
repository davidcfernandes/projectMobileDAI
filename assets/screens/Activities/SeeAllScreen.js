import React, {useState, useEffect} from 'react';
import { Animated, StyleSheet, Text, View, ScrollView, Image, TouchableHighlight, FlatList, TouchableOpacity } from 'react-native';
import AppLoading from 'expo-app-loading';
import { useFonts, RedHatDisplay_400Regular } from '@expo-google-fonts/red-hat-display';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faChevronLeft, faMapMarkedAlt, faUser, faCalendarAlt, faClock} from '@fortawesome/free-solid-svg-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function SeeAllScreen({ navigation }){
    const scrollY= new Animated.Value(0);
    let scrollYValue = scrollY._value;
    const [scrolled, setScrolled] = useState(false);
    const [loaded, setLoaded] = useState(false);
    const [allActivity, setAllActivity] = useState(null);
    const [valueToken, setValueToken] = useState(null);
    const [firstActivitieSports, setFirstActivitieSports] = useState(0);
    //Sport
    const [upcomingSport, setUpcomingSport] = useState(null);
    const [addressUpcomingSport, setAddressUpcomingSport] = useState(null);
    const [dateUpcomingSport, setDateUpcomingSport] = useState(null);
    const [hourUpcomingSport, setHourUpcomingSport] = useState(null);
    const [spacesUpcomingSport, setSpacesUpcomingSport] = useState(null);
    const [sportNotNull, setSportNotNull] = useState(false);
    //Literature
    const [upcomingLiterature, setUpcomingLiterature] = useState(null);
    const [addressUpcomingLiterature, setAddressUpcomingLiterature] = useState(null);
    const [dateUpcomingLiterature, setDateUpcomingLiterature] = useState(null);
    const [hourUpcomingLiterature, setHourUpcomingLiterature] = useState(null);
    const [spacesUpcomingLiterature, setSpacesUpcomingLiterature] = useState(null);
    const [literatureNotNull, setLiteratureNotNull] = useState(false);
    //Music
    const [upcomingMusic, setUpcomingMusic] = useState(null);
    const [addressUpcomingMusic, setAddressUpcomingMusic] = useState(null);
    const [dateUpcomingMusic, setDateUpcomingMusic] = useState(null);
    const [hourUpcomingMusic, setHourUpcomingMusic] = useState(null);
    const [spacesUpcomingMusic, setSpacesUpcomingMusic] = useState(null);
    const [musicNotNull, setMusicNotNull] = useState(false);
    //Cinema
    const [upcomingCinema, setUpcomingCinema] = useState(null);
    const [addressUpcomingCinema, setAddressUpcomingCinema] = useState(null);
    const [dateUpcomingCinema, setDateUpcomingCinema] = useState(null);
    const [hourUpcomingCinema, setHourUpcomingCinema] = useState(null);
    const [spacesUpcomingCinema, setSpacesUpcomingCinema] = useState(null);
    const [cinemaNotNull, setCinemaNotNull] = useState(false);
    //Video Games
    const [upcomingVideoGames, setUpcomingVideoGames] = useState(null);
    const [addressUpcomingVideoGames, setAddressUpcomingVideoGames] = useState(null);
    const [dateUpcomingVideoGames, setDateUpcomingVideoGames] = useState(null);
    const [hourUpcomingVideoGames, setHourUpcomingVideoGames] = useState(null);
    const [spacesUpcomingVideoGames, setSpacesUpcomingVideoGames] = useState(null);
    const [videoGamesNotNull, setVideoGamesNotNull] = useState(false);
    
    //Fetch
    useEffect(() => {
        async function submit() {
            const valueTokenStorage = await AsyncStorage.getItem('userToken');
            const valueToken = JSON.parse(valueTokenStorage);
            setValueToken(valueToken);
            

            const response = await fetch("http://192.168.1.74:8080/api/activities", {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
            });
            const response_1 = await response.json();
            setAllActivity(response_1);
            //console.log(profileData);

            const response2 = await fetch("http://192.168.1.74:8080/api/activities", {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
            });
            const response_3 = await response2.json();
            //Sport
            let s = 0;
            let snull = 0;
            for(let i=0; i<response_3.length; i++){
                if(response_3[i].status=="Aprovada" && response_3[i].activityType.idActivityType==3 && s==0){
                    ++s;
                    ++snull;
                    setUpcomingSport(response_3[i].title);
                    setAddressUpcomingSport(response_3[i].address);
                    setDateUpcomingSport(response_3[i].init_data.slice(0, 10));
                    setHourUpcomingSport(response_3[i].init_data.slice(10, 16));
                    setSpacesUpcomingSport(response_3[i].spaces);
                    setSportNotNull(true);
                }
            }
            if(snull==0){
                setUpcomingSport("N/A");
                setAddressUpcomingSport("N/A");
                setDateUpcomingSport("N/A");
                setHourUpcomingSport("N/A");
                setSpacesUpcomingSport("N/A");
            }
            //Literature
            let l = 0;
            let lnull = 0;
            for(let i=0; i<response_3.length; i++){
                if(response_3[i].status=="Aprovada" && response_3[i].activityType.idActivityType==4 && l==0){
                    ++l;
                    ++lnull;
                    setUpcomingLiterature(response_3[i].title);
                    setAddressUpcomingLiterature(response_3[i].address);
                    setDateUpcomingLiterature(response_3[i].init_data.slice(0, 10));
                    setHourUpcomingLiterature(response_3[i].init_data.slice(10, 16));
                    setSpacesUpcomingLiterature(response_3[i].spaces);
                    setLiteratureNotNull(true);
                }
            }
            if(lnull==0){
                setUpcomingLiterature("N/A");
                setAddressUpcomingLiterature("N/A");
                setDateUpcomingLiterature("N/A");
                setHourUpcomingLiterature("N/A");
                setSpacesUpcomingLiterature("N/A");
            }
            //Music
            let m = 0;
            let mnull = 0;
            for(let i=0; i<response_3.length; i++){
                if(response_3[i].status=="Aprovada" && response_3[i].activityType.idActivityType==5 && m==0){
                    ++m;
                    ++mnull;
                    setUpcomingMusic(response_3[i].title);
                    setAddressUpcomingMusic(response_3[i].address);
                    setDateUpcomingMusic(response_3[i].init_data.slice(0, 10));
                    setHourUpcomingMusic(response_3[i].init_data.slice(10, 16));
                    setSpacesUpcomingMusic(response_3[i].spaces);
                    setMusicNotNull(true);
                }
            }
            if(mnull==0){
                setUpcomingMusic("N/A");
                setAddressUpcomingMusic("N/A");
                setDateUpcomingMusic("N/A");
                setHourUpcomingMusic("N/A");
                setSpacesUpcomingMusic("N/A");
            }
            //Cinema
            let c = 0;
            let cnull = 0;
            for(let i=0; i<response_3.length; i++){
                if(response_3[i].status=="Aprovada" && response_3[i].activityType.idActivityType==6 && c==0){
                    ++c;
                    ++cnull;
                    setUpcomingCinema(response_3[i].title);
                    setAddressUpcomingCinema(response_3[i].address);
                    setDateUpcomingCinema(response_3[i].init_data.slice(0, 10));
                    setHourUpcomingCinema(response_3[i].init_data.slice(10, 16));
                    setSpacesUpcomingCinema(response_3[i].spaces);
                    setCinemaNotNull(true);
                }
            }
            if(cnull==0){
                setUpcomingCinema("N/A");
                setAddressUpcomingCinema("N/A");
                setDateUpcomingCinema("N/A");
                setHourUpcomingCinema("N/A");
                setSpacesUpcomingCinema("N/A");
            }
            //VideoGames
            let v = 0;
            let vnull = 0;
            for(let i=0; i<response_3.length; i++){
                if(response_3[i].status=="Aprovada" && response_3[i].activityType.idActivityType==7 && v==0){
                    ++v;
                    ++vnull;
                    setUpcomingVideoGames(response_3[i].title);
                    setAddressUpcomingVideoGames(response_3[i].address);
                    setDateUpcomingVideoGames(response_3[i].init_data.slice(0, 10));
                    setHourUpcomingVideoGames(response_3[i].init_data.slice(10, 16));
                    setSpacesUpcomingVideoGames(response_3[i].spaces);
                    setVideoGamesNotNull(true);
                }
            }
            if(vnull==0){
                setUpcomingVideoGames("N/A");
                setAddressUpcomingVideoGames("N/A");
                setDateUpcomingVideoGames("N/A");
                setHourUpcomingVideoGames("N/A");
                setSpacesUpcomingVideoGames("N/A");
            }
        }
        if(!loaded){
            submit();
            setLoaded(true);
            //console.log(profileData);
        }
    });
    

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
                    <Text style={styles.profileText}>Atividades</Text>
                </View>
                <View style={styles.seeAllActivitiesScreen}>
                    <ScrollView scrollEventThrottle={1} onScroll={(e)=>{scrollY.setValue(e.nativeEvent.contentOffset.y); scrollYValue = scrollY._value; scrollYValue > 0 ? setScrolled(true) : setScrolled(false);}}>
                        <View style={styles.centerActivities}>
                            <View style={styles.allActivitiesTextView}>
                                <Text style={styles.forYouText}>Para ti!</Text>
                                <Text style={styles.comingSoonText}>Escolhe uma das nossas categorias!</Text>
                            </View>
                            <View style={styles.sportActivities}>
                                <Text style={styles.sportActivitiesSportText}>Desporto</Text>
                                <Image source={require("../../sports.png")} style={styles.sportsPng}/>
                                <View>
                                    <Text style={styles.activityTitle} numberOfLines={1}>{upcomingSport}</Text>
                                </View>
                                <View style={styles.firstCollum}>
                                    <View>
                                        <View style={styles.firstRowFirstCollum}>
                                            <FontAwesomeIcon icon={faMapMarkedAlt} style={styles.mapMarked}/>
                                            <Text style={styles.addressText} numberOfLines={1}>{addressUpcomingSport}</Text>
                                        </View>
                                        <View style={styles.firstRowFirstCollum}>
                                            <FontAwesomeIcon icon={faUser} style={styles.mapMarked}/>
                                            <Text style={styles.addressText}>{spacesUpcomingSport}</Text>
                                        </View>
                                    </View>
                                    <View style={styles.SecondCollum}>
                                        <View style={styles.firstRowFirstCollum}>
                                            <FontAwesomeIcon icon={faCalendarAlt} style={styles.mapMarked}/>
                                            <Text style={styles.addressText}>{dateUpcomingSport}</Text>
                                        </View>
                                        <View style={styles.firstRowFirstCollum}>
                                            <FontAwesomeIcon icon={faClock} style={styles.mapMarked}/>
                                            <Text style={styles.addressText}>{hourUpcomingSport}</Text>
                                        </View>
                                    </View>
                                </View>
                                <View style={styles.sportActivitiesSearchContainer}>
                                    <TouchableHighlight style={styles.sportActivitiesSearch} onPress={() => navigation.navigate('SportsScreen')}>
                                        <Text style={styles.sportActivitiesSearchText}>Ver +</Text>
                                    </TouchableHighlight>
                                </View>
                            </View>
                            <View style={styles.literatureActivities}>
                                <Text style={styles.literatureActivitiesSportText}>Literatura</Text>
                                <Image source={require("../../literature.png")} style={styles.literaturePng}/>
                                <View>
                                    <Text style={styles.activityTitle} numberOfLines={1}>{upcomingLiterature}</Text>
                                </View>
                                <View style={styles.firstCollum}>
                                    <View>
                                        <View style={styles.firstRowFirstCollum}>
                                            <FontAwesomeIcon icon={faMapMarkedAlt} style={styles.mapMarked}/>
                                            <Text style={styles.addressText} numberOfLines={1}>{addressUpcomingLiterature}</Text>
                                        </View>
                                        <View style={styles.firstRowFirstCollum}>
                                            <FontAwesomeIcon icon={faUser} style={styles.mapMarked}/>
                                            <Text style={styles.addressText}>{spacesUpcomingLiterature}</Text>
                                        </View>
                                    </View>
                                    <View style={styles.SecondCollum}>
                                        <View style={styles.firstRowFirstCollum}>
                                            <FontAwesomeIcon icon={faCalendarAlt} style={styles.mapMarked}/>
                                            <Text style={styles.addressText}>{dateUpcomingLiterature}</Text>
                                        </View>
                                        <View style={styles.firstRowFirstCollum}>
                                            <FontAwesomeIcon icon={faClock} style={styles.mapMarked}/>
                                            <Text style={styles.addressText}>{hourUpcomingLiterature}</Text>
                                        </View>
                                    </View>
                                </View>
                                <TouchableHighlight style={styles.literatureActivitiesSearch} onPress={() => navigation.navigate('LiteratureScreen')}>
                                    <Text style={styles.literatureActivitiesSearchText}>Ver +</Text>
                                </TouchableHighlight>
                            </View>
                            <View style={styles.musicActivities}>
                                <Text style={styles.musicActivitiesSportText}>Música</Text>
                                <Image source={require("../../music.png")} style={styles.musicPng}/>
                                <View>
                                    <Text style={styles.activityTitle} numberOfLines={1}>{upcomingMusic}</Text>
                                </View>
                                <View style={styles.firstCollum}>
                                    <View>
                                        <View style={styles.firstRowFirstCollum}>
                                            <FontAwesomeIcon icon={faMapMarkedAlt} style={styles.mapMarked}/>
                                            <Text style={styles.addressText} numberOfLines={1}>{addressUpcomingMusic}</Text>
                                        </View>
                                        <View style={styles.firstRowFirstCollum}>
                                            <FontAwesomeIcon icon={faUser} style={styles.mapMarked}/>
                                            <Text style={styles.addressText}>{spacesUpcomingMusic}</Text>
                                        </View>
                                    </View>
                                    <View style={styles.SecondCollum}>
                                        <View style={styles.firstRowFirstCollum}>
                                            <FontAwesomeIcon icon={faCalendarAlt} style={styles.mapMarked}/>
                                            <Text style={styles.addressText}>{dateUpcomingMusic}</Text>
                                        </View>
                                        <View style={styles.firstRowFirstCollum}>
                                            <FontAwesomeIcon icon={faClock} style={styles.mapMarked}/>
                                            <Text style={styles.addressText}>{hourUpcomingMusic}</Text>
                                        </View>
                                    </View>
                                </View>
                                <TouchableHighlight style={styles.musicActivitiesSearch} onPress={() => navigation.navigate('MusicScreen')}>
                                    <Text style={styles.musicActivitiesSearchText}>Ver +</Text>
                                </TouchableHighlight>
                            </View>
                            <View style={styles.cinemaActivities}>
                                <Text style={styles.cinemaActivitiesSportText}>Cinema</Text>
                                <Image source={require("../../cinema.png")} style={styles.cinemaPng}/>
                                <View>
                                    <Text style={styles.activityTitle} numberOfLines={1}>{upcomingCinema}</Text>
                                </View>
                                <View style={styles.firstCollum}>
                                    <View>
                                        <View style={styles.firstRowFirstCollum}>
                                            <FontAwesomeIcon icon={faMapMarkedAlt} style={styles.mapMarked}/>
                                            <Text style={styles.addressText} numberOfLines={1}>{addressUpcomingCinema}</Text>
                                        </View>
                                        <View style={styles.firstRowFirstCollum}>
                                            <FontAwesomeIcon icon={faUser} style={styles.mapMarked}/>
                                            <Text style={styles.addressText}>{spacesUpcomingCinema}</Text>
                                        </View>
                                    </View>
                                    <View style={styles.SecondCollum}>
                                        <View style={styles.firstRowFirstCollum}>
                                            <FontAwesomeIcon icon={faCalendarAlt} style={styles.mapMarked}/>
                                            <Text style={styles.addressText}>{dateUpcomingCinema}</Text>
                                        </View>
                                        <View style={styles.firstRowFirstCollum}>
                                            <FontAwesomeIcon icon={faClock} style={styles.mapMarked}/>
                                            <Text style={styles.addressText}>{hourUpcomingCinema}</Text>
                                        </View>
                                    </View>
                                </View>
                                <TouchableHighlight style={styles.cinemaActivitiesSearch} onPress={() => navigation.navigate('CinemaScreen')}>
                                    <Text style={styles.cinemaActivitiesSearchText}>Ver +</Text>
                                </TouchableHighlight>
                            </View>
                            <View style={styles.videoGamesActivities}>
                                <Text style={styles.videoGamesActivitiesSportText}>Video Jogos</Text>
                                <Image source={require("../../videogames.png")} style={styles.videogamesPng}/>
                                <View>
                                    <Text style={styles.activityTitle} numberOfLines={1}>{upcomingVideoGames}</Text>
                                </View>
                                <View style={styles.firstCollum}>
                                    <View>
                                        <View style={styles.firstRowFirstCollum}>
                                            <FontAwesomeIcon icon={faMapMarkedAlt} style={styles.mapMarked}/>
                                            <Text style={styles.addressText} numberOfLines={1}>{addressUpcomingVideoGames}</Text>
                                        </View>
                                        <View style={styles.firstRowFirstCollum}>
                                            <FontAwesomeIcon icon={faUser} style={styles.mapMarked}/>
                                            <Text style={styles.addressText}>{spacesUpcomingVideoGames}</Text>
                                        </View>
                                    </View>
                                    <View style={styles.SecondCollum}>
                                        <View style={styles.firstRowFirstCollum}>
                                            <FontAwesomeIcon icon={faCalendarAlt} style={styles.mapMarked}/>
                                            <Text style={styles.addressText}>{dateUpcomingVideoGames}</Text>
                                        </View>
                                        <View style={styles.firstRowFirstCollum}>
                                            <FontAwesomeIcon icon={faClock} style={styles.mapMarked}/>
                                            <Text style={styles.addressText}>{hourUpcomingVideoGames}</Text>
                                        </View>
                                    </View>
                                </View>
                                <TouchableHighlight style={styles.videoGamesActivitiesSearch} onPress={() => navigation.navigate('VideoGameScreen')}>
                                    <Text style={styles.videoGamesActivitiesSearchText}>Ver +</Text>
                                </TouchableHighlight>
                            </View>
                        </View>
                    </ScrollView>
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
    
    profileText:{
        position:'absolute',
        bottom:"0%",
        fontSize:40,
        color:"#1A82C4",
        fontFamily:"RedHatDisplay_400Regular",
    },

    chevronLeft:{
        position:'absolute',
        bottom:17,
        left:'4.83%',
        color:"#B0B0B0",
    },

    seeAllActivitiesScreen:{
        flex: 5,
        maxWidth:414,
        width:"100%",
        backgroundColor: '#FCFCFC',
        alignItems: 'center',
        justifyContent: 'flex-start',
        flexDirection: "column",
    },

    allActivitiesTextView:{
        justifyContent:'flex-start',
        flexDirection:'column',
        alignItems:'flex-start',
        marginTop:20,
        marginBottom:20,
    },

    forYouText:{
        color:"#1A82C4",
        fontFamily:"RedHatDisplay_400Regular",
        fontSize:36,
        fontWeight:"bold",
    },

    comingSoonText:{
        color:"#B1B1B1",
        fontFamily:"RedHatDisplay_400Regular",
        fontSize:20,
    },

    centerActivities:{
        flex:1,
        alignItems:'center',
        justifyContent:"center",
        flexDirection:"column",
    },

    //Sports
    sportActivities:{
        marginTop:15,
        maxWidth:370,
        width:"100%",
        height:280,
        backgroundColor:"#FAFAFA",
        shadowColor: "#000",
        shadowOffset: {
	        width: 0,
	        height: 1,
        },
        shadowOpacity: 0.1,
        shadowRadius: 1.00,
        elevation: 1,
        alignItems:'center',
        justifyContent:'center',
        borderRadius:15,
    },
    sportActivitiesSearch:{
        backgroundColor:"#F0F0F0",
        width:"36.2%",
        borderRadius:50,
    },
    sportActivitiesSearchContainer:{
        borderTopWidth:2,
        borderTopColor:"#F1F1F1",
        width:"100%",
        height:65,
        borderRadius:50,
        alignItems:'center',
        justifyContent:'center',
        position:'absolute',
        bottom:0,
    },
    sportActivitiesSearchText:{
        textAlign:'center',
        fontSize:18,
        fontFamily:"RedHatDisplay_400Regular",
        color:"#FF5A5F",
    },
    sportActivitiesSportText:{
        textAlign:'center',
        fontSize:34,
        fontFamily:"RedHatDisplay_400Regular",
        fontWeight:"bold",
        color:"#FF5A5F",
        position:"absolute",
        top:"12%",
        left:"6.9%",
    },
    sportActivitiesHowManyText:{
        color:"#CDCDCD",
        fontSize:18,
        position:"absolute",
        left:"8.9%",
    },
    sportsPng:{
        width:60,
        height:60,
        position:"absolute",
        top:"12%",
        right:"4.9%",
    },
    activityTitle:{
        fontFamily:"RedHatDisplay_400Regular",
        fontSize:22,
        color:"#D6D6D6",
        fontWeight:'bold',
        textAlign:'left',
        width:270,
    },
    firstCollum:{
        marginTop:20,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        width:270,
    },
    SecondCollum:{
        width:80,
    },
    firstRowFirstCollum:{
        flexDirection:'row',
    },
    mapMarked:{
        color:"#D7D7D7",
    },
    addressText:{
        color:"#D7D7D7",
        marginLeft:5,
        width:170,
    },

    //Literature
    literatureActivities:{
        marginTop:15,
        maxWidth:370,
        width:"100%",
        height:230,
        backgroundColor:"#FAFAFA",
        shadowColor: "#000",
        shadowOffset: {
	        width: 0,
	        height: 1,
        },
        shadowOpacity: 0.1,
        shadowRadius: 1.00,
        elevation: 1,
        alignItems:'center',
        justifyContent:'center',
        borderRadius:15,
    },
    literatureActivitiesSearch:{
        backgroundColor:"#F0F0F0",
        width:"36.2%",
        position:"absolute",
        bottom:"12%",
        borderRadius:50,
    },
    literatureActivitiesSearchText:{
        textAlign:'center',
        fontSize:18,
        fontFamily:"RedHatDisplay_400Regular",
        color:"#FABE55",
    },
    literatureActivitiesSportText:{
        textAlign:'center',
        fontSize:34,
        fontFamily:"RedHatDisplay_400Regular",
        fontWeight:"bold",
        color:"#FABE55",
        position:"absolute",
        top:"12%",
        left:"6.9%",
    },
    literatureActivitiesHowManyText:{
        color:"#CDCDCD",
        fontSize:18,
        position:"absolute",
        left:"8.9%",
    },
    literaturePng:{
        width:60,
        height:60,
        position:"absolute",
        top:"12%",
        right:"4.9%",
    },
    
    //Music
    musicActivities:{
        marginTop:15,
        maxWidth:370,
        width:"100%",
        height:230,
        backgroundColor:"#FAFAFA",
        shadowColor: "#000",
        shadowOffset: {
	        width: 0,
	        height: 1,
        },
        shadowOpacity: 0.1,
        shadowRadius: 1.00,
        elevation: 1,
        alignItems:'center',
        justifyContent:'center',
        borderRadius:15,
    },
    musicActivitiesSearch:{
        backgroundColor:"#F0F0F0",
        width:"36.2%",
        position:"absolute",
        bottom:"12%",
        borderRadius:50,
    },
    musicActivitiesSearchText:{
        textAlign:'center',
        fontSize:18,
        fontFamily:"RedHatDisplay_400Regular",
        color:"#1A82C4",
    },
    musicActivitiesSportText:{
        textAlign:'center',
        fontSize:34,
        fontFamily:"RedHatDisplay_400Regular",
        fontWeight:"bold",
        color:"#1A82C4",
        position:"absolute",
        top:"12%",
        left:"6.9%",
    },
    musicActivitiesHowManyText:{
        color:"#CDCDCD",
        fontSize:18,
        position:"absolute",
        left:"8.9%",
    },
    musicPng:{
        width:60,
        height:60,
        position:"absolute",
        top:"12%",
        right:"4.9%",
    },

    //Cinema
    cinemaActivities:{
        marginTop:15,
        maxWidth:370,
        width:"100%",
        height:230,
        backgroundColor:"#FAFAFA",
        shadowColor: "#000",
        shadowOffset: {
	        width: 0,
	        height: 1,
        },
        shadowOpacity: 0.1,
        shadowRadius: 1.00,
        elevation: 1,
        alignItems:'center',
        justifyContent:'center',
        borderRadius:15,
    },
    cinemaActivitiesSearch:{
        backgroundColor:"#F0F0F0",
        width:"36.2%",
        position:"absolute",
        bottom:"12%",
        borderRadius:50,
    },
    cinemaActivitiesSearchText:{
        textAlign:'center',
        fontSize:18,
        fontFamily:"RedHatDisplay_400Regular",
        color:"#6A4C93",
    },
    cinemaActivitiesSportText:{
        textAlign:'center',
        fontSize:34,
        fontFamily:"RedHatDisplay_400Regular",
        fontWeight:"bold",
        color:"#6A4C93",
        position:"absolute",
        top:"12%",
        left:"6.9%",
    },
    cinemaActivitiesHowManyText:{
        color:"#CDCDCD",
        fontSize:18,
        position:"absolute",
        left:"8.9%",
    },
    cinemaPng:{
        width:60,
        height:60,
        position:"absolute",
        top:"12%",
        right:"4.9%",
    },

    //Video Games
    videoGamesActivities:{
        marginTop:15,
        maxWidth:370,
        width:"100%",
        height:230,
        backgroundColor:"#FAFAFA",
        shadowColor: "#000",
        shadowOffset: {
	        width: 0,
	        height: 1,
        },
        shadowOpacity: 0.1,
        shadowRadius: 1.00,
        elevation: 1,
        alignItems:'center',
        justifyContent:'center',
        borderRadius:15,
        marginBottom:20,
    },
    videoGamesActivitiesSearch:{
        backgroundColor:"#F0F0F0",
        width:"36.2%",
        position:"absolute",
        bottom:"12%",
        borderRadius:50,
    },
    videoGamesActivitiesSearchText:{
        textAlign:'center',
        fontSize:18,
        fontFamily:"RedHatDisplay_400Regular",
        color:"#8AC926",
    },
    videoGamesActivitiesSportText:{
        textAlign:'center',
        fontSize:34,
        fontFamily:"RedHatDisplay_400Regular",
        fontWeight:"bold",
        color:"#8AC926",
        position:"absolute",
        top:"12%",
        left:"6.9%",
    },
    videoGamesActivitiesHowManyText:{
        color:"#CDCDCD",
        fontSize:18,
        position:"absolute",
        left:"8.9%",
    },
    videogamesPng:{
        width:60,
        height:60,
        position:"absolute",
        top:"12%",
        right:"4.9%",
    },
});