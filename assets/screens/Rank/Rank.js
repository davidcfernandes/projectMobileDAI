import React, {useState, useEffect} from 'react';
import { Animated, StyleSheet, Text, View, ScrollView, Image, TouchableHighlight, FlatList, TouchableOpacity } from 'react-native';
import AppLoading from 'expo-app-loading';
import { useFonts, RedHatDisplay_400Regular } from '@expo-google-fonts/red-hat-display';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faChevronLeft, faTrophy} from '@fortawesome/free-solid-svg-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Verificar se o scroll ta bem
export default function Rank({navigation}) {
    const scrollY= new Animated.Value(0);
    let scrollYValue = scrollY._value;
    const [scrolled, setScrolled] = useState(false);
    const [loaded, setLoaded] = useState(false);
    const [valueToken, setValueToken] = useState(null);
    const [rankPlaces, setRankPlaces] = useState(null);
    let i = 1;
    
    //Fetch
    useEffect(() => {
        async function submit() {
            const valueTokenStorage = await AsyncStorage.getItem('userToken');
            const valueToken = JSON.parse(valueTokenStorage);
            setValueToken(valueToken.userId);

            const response = await fetch("http://192.168.1.74:8080/api/ranks", {//MUDAR O 7
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
            });
            const response_1 = await response.json();
            setRankPlaces(response_1)
            console.log(response_1);
            setLoaded(true);
        }
        if(!loaded){
            submit();
            setLoaded(true);
        }
    });

    let [fontsLoaded] = useFonts({
        RedHatDisplay_400Regular,
    });
    if (!fontsLoaded) {
        return <AppLoading/>;
    } else {
        return(
            <View style={styles.container}>
                <View style={scrolled ? styles.topNavbarScrolled : styles.topNavbar}>{/* Não deve estar a dar agora*/}
                    <FontAwesomeIcon icon={faChevronLeft} onPress={() => navigation.navigate('HomeMenu')} style={styles.chevronLeft}/>
                    <Text style={styles.rankText}>Rank</Text>
                </View>
                <View style={styles.rankScreenScrollContainer}>
                    <FlatList data={rankPlaces} 
                        renderItem={({ item, index }) => {
                            if(valueToken==item.idChild && index+1==1){
                                return(
                                    <View style={styles.everyRankView}>
                                        <View style={styles.myRankPosition}>
                                            <Text style={styles.positionRank}>#{index+1}</Text>
                                            <Image source={require("../../avatar1.png")} style={styles.avatar}/>
                                            <View style={styles.textPositionRank}>
                                                <Text style={styles.nameTextPositionRank}>{item.name}</Text>
                                                <Text style={styles.pointsTextPositionRank}>{item.points}</Text>
                                            </View>
                                            <FontAwesomeIcon icon={faTrophy} style={styles.faTrophy1stPlace} size={25}/>
                                        </View>
                                    </View>
                                )
                            }else if(index+1==1){
                                return(
                                    <View style={styles.everyRankView}>
                                        <View style={styles.otherRankPosition}>
                                            <Text style={styles.positionRank}>#{index+1}</Text>
                                            <Image source={require("../../avatar1.png")} style={styles.avatar}/>
                                            <View style={styles.textPositionRank}>
                                                <Text style={styles.nameTextPositionRank}>{item.name}</Text>
                                                <Text style={styles.pointsTextPositionRank}>{item.points}</Text>
                                            </View>
                                            <FontAwesomeIcon icon={faTrophy} style={styles.faTrophy1stPlace} size={25}/>
                                        </View>
                                    </View>
                                )
                            }else if(valueToken==item.idChild && index+1==2){
                                return(
                                    <View style={styles.everyRankView}>
                                        <View style={styles.myRankPosition}>
                                            <Text style={styles.positionRank}>#{index+1}</Text>
                                            <Image source={require("../../avatar1.png")} style={styles.avatar}/>
                                            <View style={styles.textPositionRank}>
                                                <Text style={styles.nameTextPositionRank}>{item.name}</Text>
                                                <Text style={styles.pointsTextPositionRank}>{item.points}</Text>
                                            </View>
                                            <FontAwesomeIcon icon={faTrophy} style={styles.faTrophy2ndPlace} size={25}/>
                                        </View>
                                    </View>
                                )
                            }else if(index+1==2){
                                return(
                                    <View style={styles.everyRankView}>
                                        <View style={styles.otherRankPosition}>
                                            <Text style={styles.positionRank}>#{index+1}</Text>
                                            <Image source={require("../../avatar1.png")} style={styles.avatar}/>
                                            <View style={styles.textPositionRank}>
                                                <Text style={styles.nameTextPositionRank}>{item.name}</Text>
                                                <Text style={styles.pointsTextPositionRank}>{item.points}</Text>
                                            </View>
                                            <FontAwesomeIcon icon={faTrophy} style={styles.faTrophy2ndPlace} size={25}/>
                                        </View>
                                    </View>
                                )
                            }else if(valueToken==item.idChild && index+1==3){
                                return(
                                    <View style={styles.everyRankView}>
                                        <View style={styles.myRankPosition}>
                                            <Text style={styles.positionRank}>#{index+1}</Text>
                                            <Image source={require("../../avatar1.png")} style={styles.avatar}/>
                                            <View style={styles.textPositionRank}>
                                                <Text style={styles.nameTextPositionRank}>{item.name}</Text>
                                                <Text style={styles.pointsTextPositionRank}>{item.points}</Text>
                                            </View>
                                            <FontAwesomeIcon icon={faTrophy} style={styles.faTrophy3rdPlace} size={25}/>
                                        </View>
                                    </View>
                                )
                            }else if(index+1==3){
                                return(
                                    <View style={styles.everyRankView}>
                                        <View style={styles.otherRankPosition}>
                                            <Text style={styles.positionRank}>#{index+1}</Text>
                                            <Image source={require("../../avatar1.png")} style={styles.avatar}/>
                                            <View style={styles.textPositionRank}>
                                                <Text style={styles.nameTextPositionRank}>{item.name}</Text>
                                                <Text style={styles.pointsTextPositionRank}>{item.points}</Text>
                                            </View>
                                            <FontAwesomeIcon icon={faTrophy} style={styles.faTrophy3rdPlace} size={25}/>
                                        </View>
                                    </View>
                                )
                            }else if(valueToken==item.idChild){
                                return(
                                    <View style={styles.everyRankView}>
                                        <View style={styles.myRankPosition}>
                                            <Text style={styles.positionRank}>#{index+1}</Text>
                                            <Image source={require("../../avatar1.png")} style={styles.avatar}/>
                                            <View style={styles.textPositionRank}>
                                                <Text style={styles.nameTextPositionRank}>{item.name}</Text>
                                                <Text style={styles.pointsTextPositionRank}>{item.points}</Text>
                                            </View>
                                            <FontAwesomeIcon icon={faTrophy} style={styles.faNoTrophy} size={25}/>
                                        </View>
                                    </View>
                                )
                            }else{
                                return(
                                    <View style={styles.everyRankView}>
                                        <View style={styles.otherRankPosition}>
                                            <Text style={styles.positionRank}>#{index+1}</Text>
                                            <Image source={require("../../avatar1.png")} style={styles.avatar}/>
                                            <View style={styles.textPositionRank}>
                                                <Text style={styles.nameTextPositionRank}>{item.name}</Text>
                                                <Text style={styles.pointsTextPositionRank}>{item.points}</Text>
                                            </View>
                                            <FontAwesomeIcon icon={faTrophy} style={styles.faNoTrophy} size={25}/>
                                        </View>
                                    </View>
                                )
                            }
                        }}
                        keyExtractor={(item, index) => index.toString()}
                        style={styles.rankScreenScroll}
                    />
                </View>
            </View>
        )
    }
}
const changeRankPosition = () =>{
    rankingPosition=rankingPosition+1;
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

    rankText:{
        position:'absolute',
        bottom:"0%",
        fontSize:40,
        color:"#1A82C4",
    },

    chevronLeft:{
        position:'absolute',
        bottom:17,
        left:'4.83%',
        color:"#B0B0B0",
    },

    rankScreenScrollContainer:{
        flex: 5,
        width:"100%",
        flexDirection: 'column', 
        alignItems: 'center',
        justifyContent: 'center',
    },

    rankScreenScroll:{
        flex: 5,
        width:"100%",
    },

    everyRankView:{
        flex: 1,
        backgroundColor:"#FCFCFC",
        alignItems: 'center',
        justifyContent: 'center',
    },

    myRankPosition:{
        maxWidth:400,
        width:"90%",
        height:80,
        backgroundColor:"#F0F0F0",
        borderRadius:50,
        marginTop:10,
        alignItems:"center",
        justifyContent:"space-evenly",
        flexDirection:"row",
    },

    otherRankPosition:{
        maxWidth:400,
        width:"90%",
        height:80,
        borderRadius:50,
        marginTop:10,
        alignItems:"center",
        justifyContent:"space-evenly",
        flexDirection:"row",
    },

    textPositionRank:{
        alignItems:"flex-start",
        justifyContent:"space-evenly",
        flexDirection:"column",
        width:150,
    },

    avatar:{
        width:60,
        height:60,
    },

    positionRank:{
        color:"#1A82C4",
    },

    faTrophy1stPlace:{
        color:"#DEBB02",
    },

    faTrophy2ndPlace:{
        color:"#C5C4C3",
    },

    faTrophy3rdPlace:{
        color:"#C58143",
    },

    faNoTrophy:{
        color:"transparent",
    },

    nameTextPositionRank:{
        fontWeight:"bold",
        color:"#1A82C4",
    },

    pointsTextPositionRank:{
        color:"#1A82C4",
    },
});