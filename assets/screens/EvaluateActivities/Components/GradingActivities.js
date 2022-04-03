import React, {useState, useEffect} from 'react';
import { Animated, StyleSheet, Text, View, ScrollView, Image, TouchableHighlight, FlatList, TouchableOpacity } from 'react-native';
import AppLoading from 'expo-app-loading';
import { useFonts, RedHatDisplay_400Regular } from '@expo-google-fonts/red-hat-display';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faChevronLeft, faMapMarkedAlt, faUser, faCalendarAlt, faClock, faStar} from '@fortawesome/free-solid-svg-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function GradingActivities() {
    const scrollY= new Animated.Value(0);
    let scrollYValue = scrollY._value;
    const [scrolled, setScrolled] = useState(false);
    const [loaded, setLoaded] = useState(false);
    const [allActivity, setAllActivity] = useState(null);
    const [valueToken, setValueToken] = useState(null);
    const [firstActivitieSports, setFirstActivitieSports] = useState(0);
    const [disableEvaluation, setDisableEvaluation] = useState(false);
    const [experienceValue, setExpirienceValue] = useState(null);

    //Star rating
    const [ratingOne, setRatingOne] = useState(false);
    const [ratingTwo, setRatingTwo] = useState(false);
    const [ratingThree, setRatingThree] = useState(false);
    const [ratingFour, setRatingFour] = useState(false);
    const [ratingFive, setRatingFive] = useState(false);
    const handleRatingOne = async () => {
        setRatingOne(true);
        setRatingTwo(false);
        setRatingThree(false);
        setRatingFour(false);
        setRatingFive(false);
        await AsyncStorage.setItem('activitiesExpirienceValue', "1");
    };
    const handleRatingTwo = async () => {
        setRatingOne(true);
        setRatingTwo(true);
        setRatingThree(false);
        setRatingFour(false);
        setRatingFive(false);
        setExpirienceValue(2);
        await AsyncStorage.setItem('activitiesExpirienceValue', "2");
    };
    const handleRatingThree = async () => {
        setRatingOne(true);
        setRatingTwo(true);
        setRatingThree(true);
        setRatingFour(false);
        setRatingFive(false);
        setExpirienceValue(3);
        await AsyncStorage.setItem('activitiesExpirienceValue', "3");
    };
    const handleRatingFour = async () => {
        setRatingOne(true);
        setRatingTwo(true);
        setRatingThree(true);
        setRatingFour(true);
        setRatingFive(false);
        setExpirienceValue(4);
        await AsyncStorage.setItem('activitiesExpirienceValue', "4");
    };
    const handleRatingFive = async () => {
        setRatingOne(true);
        setRatingTwo(true);
        setRatingThree(true);
        setRatingFour(true);
        setRatingFive(true);
        setExpirienceValue(5);
        await AsyncStorage.setItem('activitiesExpirienceValue', "5");
    };


    let [fontsLoaded] = useFonts({
        RedHatDisplay_400Regular,
    });
    if (!fontsLoaded && !loaded) {
        return <AppLoading/>;
    } else {
        return(
                <View style={styles.starContainer}>
                    <FontAwesomeIcon icon={faStar} style={ratingOne ? styles.starSelected : styles.star} size={32} onPress={handleRatingOne}/>
                    <FontAwesomeIcon icon={faStar} style={ratingTwo ? styles.starSelected : styles.star} size={32} onPress={handleRatingTwo}/>
                    <FontAwesomeIcon icon={faStar} style={ratingThree ? styles.starSelected : styles.star} size={32} onPress={handleRatingThree}/>
                    <FontAwesomeIcon icon={faStar} style={ratingFour ? styles.starSelected : styles.star} size={32} onPress={handleRatingFour}/>
                    <FontAwesomeIcon icon={faStar} style={ratingFive ? styles.starSelected : styles.star} size={32} onPress={handleRatingFive}/>
                </View>
        )
    }
}

const styles = StyleSheet.create({

    inscriptionButtonContainer:{
        width:"100%",
        height:100,
        borderTopWidth:2,
        borderTopColor:"#F1F1F1",
        backgroundColor:"transparent",
        justifyContent:'space-evenly',
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
        borderColor:"#1A82C4",
        borderRadius:50,
    },

    inscriptionButtonText:{
        fontSize:20,
        fontFamily:"RedHatDisplay_400Regular",
        color:"#1A82C4",
    },

    inscriptionJoinedButton:{
        width:115,
        height:40,
        justifyContent:'center',
        alignItems:"center",
        flexDirection:'column',
        backgroundColor:'#1A82C4',
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

    starContainer:{
        justifyContent:'center',
        alignItems:"center",
        flexDirection:'row',
    },

    star:{
        color:"#EFEFEF",
    },

    starSelected:{
        color:"#1A82C4",
    },
});