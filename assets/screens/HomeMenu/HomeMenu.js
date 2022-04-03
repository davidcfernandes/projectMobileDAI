import React, {useState, useEffect} from 'react';
import { useFonts, RedHatDisplay_400Regular } from '@expo-google-fonts/red-hat-display';
import { Animated, StyleSheet, Text, View, ScrollView, Image, TouchableHighlight, FlatList, BackHandler, Alert, TouchableOpacity } from 'react-native';
import AppLoading from 'expo-app-loading';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faBell, faUser } from '@fortawesome/free-solid-svg-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function HomeMenu({ navigation }){
    const scrollY= new Animated.Value(0);
    let scrollYValue = scrollY._value;
    const [scrolled, setScrolled] = useState(false);
    const [favoriteList, setfavoriteList] = useState(null);
    const [loaded, setLoaded] = useState(false);

    const backAction = () => {
        navigation.navigate('HomeMenu');
        return true;
    };
    
    useEffect(() => {
        BackHandler.addEventListener("hardwareBackPress", backAction);
        return () => BackHandler.removeEventListener("hardwareBackPress", backAction);
    }, []);

    //Fetch
    useEffect(() => {
        async function submit() {
            const valueTokenStorage = await AsyncStorage.getItem('userToken');
            const valueToken = JSON.parse(valueTokenStorage);
            console.log(valueToken.userId)
            const response = await fetch("http://192.168.1.74:8080/api/preferences/"+valueToken.userId, {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
            });
            const response_1 = await response.json();
            setfavoriteList(response_1);
            console.log(response_1);
            setLoaded(true);
            /*fetch("http://192.168.1.74:8080/api/preferences/7",{method: 'GET'})
            .then(function (response) {
                return response.json();
            })
            .then(function (result) {
                if (result.status.response === "success") {
                    setfavoriteList(result);
                    console.log("1")
                };
                console.log(result.data_list);
            })
            .catch(function (error) {
                console.log("-------- error ------- "+error);
                alert("result:"+error)
            });*/
        }
        if(!loaded){
            submit();
            setLoaded(true);
        }
    });

    const emptyFavorites = () =>{
        return(
            <View style={styles.activitiesScreenScrollView}>
                <Text style={styles.activitiesText}>Atividades</Text>
                <TouchableOpacity style={styles.favoriteActivities} onPress={() => navigation.navigate('SeeAllScreen')}>
                    <Text style={styles.seeAllActivities}>Ver todas</Text>
                </TouchableOpacity>
            </View>
        )
    }

    let [fontsLoaded] = useFonts({
        RedHatDisplay_400Regular,
    });
    if (!fontsLoaded && !loaded) {
        return <AppLoading/>;
    } else {
        return(
            <View style={styles.container}>
                <View style={scrolled ? styles.topOfTheScreenScrolled : styles.topOfTheScreen}>
                    <TouchableOpacity onPress={() => navigation.navigate('Profile')} style={styles.profileButton}>
                        <FontAwesomeIcon icon={faUser} style={styles.profileIcon} size={20}/>
                    </TouchableOpacity>
                    <Image source={require("../../LOGOPNG.png")} style={styles.logoPng} />
                    <TouchableOpacity /*onPress={submit}*/ /*onPress={() => navigation.navigate('Notifications')}*/ style={styles.notificationButton}>
                        <FontAwesomeIcon icon={faBell} style={styles.bell} size={20}/>
                    </TouchableOpacity>
                </View>
                <View style={styles.activitiesScreen}>
                    <FlatList data={favoriteList}
                        scrollEventThrottle={1} onScroll={(e)=>{scrollY.setValue(e.nativeEvent.contentOffset.y); scrollYValue = scrollY._value; scrollYValue > 0 ? setScrolled(true) : setScrolled(false);}}
                        ListEmptyComponent={emptyFavorites}
                        renderItem={({ item, index }) => {
                            if(index==0 && item.activityType.idActivityType==3){
                                return(
                                    <View style={styles.activitiesScreenScrollView}>
                                        <Text style={styles.activitiesText}>Atividades</Text>
                                        <TouchableOpacity style={styles.favoriteActivities} onPress={() => navigation.navigate('SeeAllScreen')}>
                                            <Text style={styles.seeAllActivities}>Ver todas</Text>
                                        </TouchableOpacity>
                                        <View style={styles.sportActivities}>
                                            <TouchableHighlight style={styles.sportActivitiesSearch} onPress={() => navigation.navigate('SportsScreen')}>
                                                <Text style={styles.sportActivitiesSearchText}>Procurar</Text>
                                            </TouchableHighlight>
                                            <Text style={styles.sportActivitiesSportText}>Desporto</Text>
                                            <Text style={styles.sportActivitiesHowManyText}>1 atividades esta semana</Text>
                                            <Image source={require("../../sports.png")} style={styles.sportsPng}></Image>
                                        </View>
                                    </View>
                                )
                            }
                            if(index==0 && item.activityType.idActivityType==4){
                                return(
                                    <View style={styles.activitiesScreenScrollView}>
                                        <Text style={styles.activitiesText}>Atividades</Text>
                                        <TouchableOpacity style={styles.favoriteActivities} onPress={() => navigation.navigate('SeeAllScreen')}>
                                            <Text style={styles.seeAllActivities}>Ver todas</Text>
                                        </TouchableOpacity>
                                        <View style={styles.literatureActivities}>
                                            <TouchableHighlight style={styles.literatureActivitiesSearch} onPress={() => navigation.navigate('LiteratureScreen')}>
                                                <Text style={styles.literatureActivitiesSearchText}>Procurar</Text>
                                            </TouchableHighlight>
                                            <Text style={styles.literatureActivitiesSportText}>Literatura</Text>
                                            <Text style={styles.literatureActivitiesHowManyText}>1 atividades esta semana</Text>
                                            <Image source={require("../../literature.png")} style={styles.literaturePng}></Image>
                                        </View>
                                    </View>
                                )
                            }
                            if(index==0 && item.activityType.idActivityType==5){
                                return(
                                    <View style={styles.activitiesScreenScrollView}>
                                        <Text style={styles.activitiesText}>Atividades</Text>
                                        <TouchableOpacity style={styles.favoriteActivities} onPress={() => navigation.navigate('SeeAllScreen')}>
                                            <Text style={styles.seeAllActivities}>Ver todas</Text>
                                        </TouchableOpacity>
                                        <View style={styles.musicActivities}>
                                            <TouchableHighlight style={styles.musicActivitiesSearch} onPress={() => navigation.navigate('MusicScreen')}>
                                                <Text style={styles.musicActivitiesSearchText}>Procurar</Text>
                                            </TouchableHighlight>
                                            <Text style={styles.musicActivitiesSportText}>Música</Text>
                                            <Text style={styles.musicActivitiesHowManyText}>3 atividades esta semana</Text>
                                            <Image source={require("../../music.png")} style={styles.musicPng}></Image>
                                        </View>
                                    </View>
                                )
                            }
                            if(index==0 && item.activityType.idActivityType==6){
                                return(
                                    <View style={styles.activitiesScreenScrollView}>
                                        <Text style={styles.activitiesText}>Atividades</Text>
                                        <TouchableOpacity style={styles.favoriteActivities} onPress={() => navigation.navigate('SeeAllScreen')}>
                                            <Text style={styles.seeAllActivities}>Ver todas</Text>
                                        </TouchableOpacity>
                                        <View style={styles.cinemaActivities}>
                                            <TouchableHighlight style={styles.cinemaActivitiesSearch} onPress={() => navigation.navigate('CinemaScreen')}>
                                                <Text style={styles.cinemaActivitiesSearchText}>Procurar</Text>
                                            </TouchableHighlight>
                                            <Text style={styles.cinemaActivitiesSportText}>Cinema</Text>
                                            <Text style={styles.cinemaActivitiesHowManyText}>0 atividades esta semana</Text>
                                            <Image source={require("../../cinema.png")} style={styles.cinemaPng}></Image>
                                        </View>
                                    </View>
                                )
                            }
                            if(index==0 && item.activityType.idActivityType==7){
                                return(
                                    <View style={styles.activitiesScreenScrollView}>
                                        <Text style={styles.activitiesText}>Atividades</Text>
                                        <TouchableOpacity style={styles.favoriteActivities} onPress={() => navigation.navigate('SeeAllScreen')}>
                                            <Text style={styles.seeAllActivities}>Ver todas</Text>
                                        </TouchableOpacity>
                                        <View style={styles.videoGamesActivities}>
                                            <TouchableHighlight style={styles.videoGamesActivitiesSearch} onPress={() => navigation.navigate('videoGameScreen')}>
                                                <Text style={styles.videoGamesActivitiesSearchText}>Procurar</Text>
                                            </TouchableHighlight>
                                            <Text style={styles.videoGamesActivitiesSportText}>Video Jogos</Text>
                                            <Text style={styles.videoGamesActivitiesHowManyText}>11 atividades esta semana</Text>
                                            <Image source={require("../../videogames.png")} style={styles.videogamesPng}></Image>
                                        </View>
                                    </View>
                                )
                            }
                            if(index==0){
                                return(
                                    <View style={styles.activitiesScreenScrollView}>
                                        <Text style={styles.activitiesText}>Atividades</Text>
                                        <View style={styles.favoriteActivities}>
                                            <Text style={styles.seeAllActivities}>Ver todas</Text>
                                        </View>
                                    </View>
                                )
                            }
                            if(item.activityType.idActivityType==3){
                                return(
                                    <View style={styles.activitiesScreenScrollView}>
                                        <View style={styles.sportActivities}>
                                            <TouchableHighlight style={styles.sportActivitiesSearch} onPress={() => navigation.navigate('SportsScreen')}>
                                                <Text style={styles.sportActivitiesSearchText}>Procurar</Text>
                                            </TouchableHighlight>
                                            <Text style={styles.sportActivitiesSportText}>Desporto</Text>
                                            <Text style={styles.sportActivitiesHowManyText}>8 atividades esta semana</Text>
                                            <Image source={require("../../sports.png")} style={styles.sportsPng}></Image>
                                        </View>
                                    </View>
                                )
                            }
                            if(item.activityType.idActivityType==4){
                                return(
                                    <View style={styles.activitiesScreenScrollView}>
                                        <View style={styles.literatureActivities}>
                                            <TouchableHighlight style={styles.literatureActivitiesSearch} onPress={() => navigation.navigate('LiteratureScreen')}>
                                                <Text style={styles.literatureActivitiesSearchText}>Procurar</Text>
                                            </TouchableHighlight>
                                            <Text style={styles.literatureActivitiesSportText}>Literatura</Text>
                                            <Text style={styles.literatureActivitiesHowManyText}>7 atividades esta semana</Text>
                                            <Image source={require("../../literature.png")} style={styles.literaturePng}></Image>
                                        </View>
                                    </View>
                                )
                            }
                            if(item.activityType.idActivityType==5){
                                return(
                                    <View style={styles.activitiesScreenScrollView}>
                                        <View style={styles.musicActivities}>
                                            <TouchableHighlight style={styles.musicActivitiesSearch} onPress={() => navigation.navigate('MusicScreen')}>
                                                <Text style={styles.musicActivitiesSearchText}>Procurar</Text>
                                            </TouchableHighlight>
                                            <Text style={styles.musicActivitiesSportText}>Música</Text>
                                            <Text style={styles.musicActivitiesHowManyText}>3 atividades esta semana</Text>
                                            <Image source={require("../../music.png")} style={styles.musicPng}></Image>
                                        </View>
                                    </View>
                                )
                            }
                            if(item.activityType.idActivityType==6){
                                return(
                                    <View style={styles.activitiesScreenScrollView}>
                                        <View style={styles.cinemaActivities}>
                                            <TouchableHighlight style={styles.cinemaActivitiesSearch} onPress={() => navigation.navigate('CinemaScreen')}>
                                                <Text style={styles.cinemaActivitiesSearchText}>Procurar</Text>
                                            </TouchableHighlight>
                                            <Text style={styles.cinemaActivitiesSportText}>Cinema</Text>
                                            <Text style={styles.cinemaActivitiesHowManyText}>100 atividades esta semana</Text>
                                            <Image source={require("../../cinema.png")} style={styles.cinemaPng}></Image>
                                        </View>
                                    </View>
                                )
                            }
                            if(item.activityType.idActivityType==7){
                                return(
                                    <View style={styles.activitiesScreenScrollView}>
                                        <View style={styles.videoGamesActivities}>
                                            <TouchableHighlight style={styles.videoGamesActivitiesSearch} onPress={() => navigation.navigate('VideoGameScreen')}>
                                                <Text style={styles.videoGamesActivitiesSearchText}>Procurar</Text>
                                            </TouchableHighlight>
                                            <Text style={styles.videoGamesActivitiesSportText}>Video Jogos</Text>
                                            <Text style={styles.videoGamesActivitiesHowManyText}>11 atividades esta semana</Text>
                                            <Image source={require("../../videogames.png")} style={styles.videogamesPng}></Image>
                                        </View>
                                    </View>
                                )
                            }
                        }}
                        keyExtractor={(item, index) => index.toString()}
                        style={styles.activitiesScreenScroll}
                    />
                    {/*<Animated.ScrollView style={styles.activitiesScreenScroll} scrollEventThrottle={1} onScroll={(e)=>{scrollY.setValue(e.nativeEvent.contentOffset.y); scrollYValue = scrollY._value; scrollYValue > 0 ? setScrolled(true) : setScrolled(false);}}>
                        {data.map((postData) => {
								console.log(postData);
								return (
									<Card  key={postData.id}>
										<Card.Img variant="top" src={postData.image} />
										<Card.Body>
											<Card.Title className={style.tile}>
												{postData.title}
											</Card.Title>
											<Card.Subtitle className={style.tag}>
												{postData.tag + " "}
											</Card.Subtitle>

											<Card.Text className={style.para}>
												{postData.body}
											</Card.Text>
										</Card.Body>
									</Card>
								);
							})}
                        <View style={styles.activitiesScreenScrollView}>
                            <Text style={styles.activitiesText}>Atividades</Text>
                            <View style={styles.favoriteActivities}>
                                <Text style={styles.seeAllActivities}>Ver todas</Text>
                            </View>
                            <FlatList data={favoriteList} 
                                renderItem={({ item }) => {
                                    if(item.idPreference==9){
                                        return(
                                            <View style={styles.sportActivities}>
                                                <View style={styles.sportActivitiesSearch}>
                                                    <Text style={styles.sportActivitiesSearchText}>Procurar</Text>
                                                </View>
                                                <Text style={styles.sportActivitiesSportText}>Desporto</Text>
                                                <Text style={styles.sportActivitiesHowManyText}>8 atividades esta semana</Text>
                                                <Image source={require("../../sports.png")} style={styles.sportsPng}></Image>
                                            </View>
                                        )
                                    }
                                    if(item.idPreference==8){
                                        return(
                                            <Text>
                                                asdad
                                            </Text>
                                        )
                                    }
                                }}
                                keyExtractor={(item, index) => index}
                            />
                            <View style={styles.sportActivities}>
                                <View style={styles.sportActivitiesSearch}>
                                    <Text style={styles.sportActivitiesSearchText}>Procurar</Text>
                                </View>
                                <Text style={styles.sportActivitiesSportText}>Desporto</Text>
                                <Text style={styles.sportActivitiesHowManyText}>8 atividades esta semana</Text>
                                <Image source={require("../../sports.png")} style={styles.sportsPng}></Image>
                            </View>
                            <View style={styles.literatureActivities}>
                                <View style={styles.literatureActivitiesSearch}>
                                    <Text style={styles.literatureActivitiesSearchText}>Procurar</Text>
                                </View>
                                <Text style={styles.literatureActivitiesSportText}>Literatura</Text>
                                <Text style={styles.literatureActivitiesHowManyText}>7 atividades esta semana</Text>
                                <Image source={require("../../literature.png")} style={styles.literaturePng}></Image>
                            </View>
                            <View style={styles.videoGamesActivities}>
                                <View style={styles.videoGamesActivitiesSearch}>
                                    <Text style={styles.videoGamesActivitiesSearchText}>Procurar</Text>
                                </View>
                                <Text style={styles.videoGamesActivitiesSportText}>Video Jogos</Text>
                                <Text style={styles.videoGamesActivitiesHowManyText}>11 atividades esta semana</Text>
                                <Image source={require("../../videogames.png")} style={styles.videogamesPng}></Image>
                            </View>
                            <View style={styles.musicActivities}>
                                <View style={styles.musicActivitiesSearch}>
                                    <Text style={styles.musicActivitiesSearchText}>Procurar</Text>
                                </View>
                                <Text style={styles.musicActivitiesSportText}>Música</Text>
                                <Text style={styles.musicActivitiesHowManyText}>3 atividades esta semana</Text>
                                <Image source={require("../../music.png")} style={styles.musicPng}></Image>
                            </View>
                            <View style={styles.cinemaActivities}>
                                <View style={styles.cinemaActivitiesSearch}>
                                    <Text style={styles.cinemaActivitiesSearchText}>Procurar</Text>
                                </View>
                                <Text style={styles.cinemaActivitiesSportText}>Cinema</Text>
                                <Text style={styles.cinemaActivitiesHowManyText}>100 atividades esta semana</Text>
                                <Image source={require("../../cinema.png")} style={styles.cinemaPng}></Image>
                            </View>
                        </View>
                    </Animated.ScrollView>*/}
                </View>
            </View>
        );
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

    topOfTheScreen:{
        flex: 1,
        maxWidth:414,
        width:"100%",
        backgroundColor: '#FCFCFC',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: "row",
    },

    topOfTheScreenScrolled:{
        flex: 1,
        maxWidth:414,
        width:"100%",
        backgroundColor: '#FCFCFC',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: "column",
        zIndex:2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity:  0.4,
        shadowRadius: 3,
        elevation: 5,
    },

    logoPng:{
        width:220,
        height:110,
        marginTop:10,
    },

    notificationButton:{
        flex:1,
        alignItems:'center',
        justifyContent: 'center',
        width:60,
        height:60,
        backgroundColor: 'transparent',
        position:"absolute",
        right:"3.30%",
        zIndex:2,
    },

    bell:{
        color:"#515151",
    },

    profileButton:{
        flex:1,
        alignItems:'center',
        justifyContent: 'center',
        width:60,
        height:60,
        backgroundColor: 'transparent',
        position:"absolute",
        left:"3.30%",
        zIndex:2,
    },

    profileIcon:{
        color:"#515151",
    },

    activitiesScreen:{
        flex: 3.4,
        maxWidth:414,
        width:"100%",
        backgroundColor: '#FCFCFC',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: "column",
    },

    activitiesScreenScroll:{
        flex: 3,
        width:"100%",
    },

    activitiesScreenScrollView: {
        flex: 1,
        backgroundColor:"#FCFCFC",
        alignItems: 'center',
        justifyContent: 'center',
        marginTop:10,
    },

    favoriteActivities:{
    },

    activitiesText:{
        color:"#1A82C4",
        fontFamily:'RedHatDisplay_400Regular',
        fontWeight:"bold",
        fontSize:38,
    },

    seeAllActivities:{
        marginTop:15,
        backgroundColor:"#F0F0F0",
        color:"#1A82C4",
        borderRadius:180,
        width:140,
        textAlign:'center',
        fontSize:18,
        fontFamily:"RedHatDisplay_400Regular",
    },

    //Sports
    sportActivities:{
        marginTop:15,
        marginBottom:5,
        maxWidth:370,
        width:"90%",
        height:180,
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
        position:"absolute",
        bottom:"12%",
        borderRadius:50,
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
        left:"8.9%",
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

    //Literature
    literatureActivities:{
        marginTop:15,
        marginBottom:5,
        maxWidth:370,
        width:"90%",
        height:180,
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
        left:"8.9%",
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

    //Video Games
    videoGamesActivities:{
        marginTop:15,
        marginBottom:5,
        maxWidth:370,
        width:"90%",
        height:180,
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
        left:"8.9%",
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

    //Music
    musicActivities:{
        marginTop:15,
        marginBottom:5,
        maxWidth:370,
        width:"90%",
        height:180,
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
        left:"8.9%",
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
        marginBottom:5,
        maxWidth:370,
        width:"90%",
        height:180,
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
        left:"8.9%",
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
});