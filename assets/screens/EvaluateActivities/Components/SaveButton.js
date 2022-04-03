import React, {useState, useEffect} from 'react';
import { Animated, StyleSheet, Text, View, ScrollView, Image, TouchableHighlight, FlatList } from 'react-native';
import AppLoading from 'expo-app-loading';
import { useFonts, RedHatDisplay_400Regular } from '@expo-google-fonts/red-hat-display';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faChevronLeft, faMapMarkedAlt, faUser, faCalendarAlt, faClock, faStar} from '@fortawesome/free-solid-svg-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function SaveButton() {
    const [disableEvaluation, setDisableEvaluation] = useState(false);
    
    const disable = async () => {
        setDisableEvaluation(true);
    }

    let [fontsLoaded] = useFonts({
        RedHatDisplay_400Regular,
    });
    if (!fontsLoaded) {
        return <AppLoading/>;
    } else {
        return(
            <TouchableOpacity style={disableEvaluation ? styles.inscriptionJoinedButton : styles.inscriptionButton} onPress={() => disable()}>
                <Text style={disableEvaluation ? styles.inscriptionJoinedButtonText : styles.inscriptionButtonText}>Salvar</Text>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },

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

    //Avaliar Screen
    evaluationScreen:{
        flex: 5,
        maxWidth:414,
        width:"100%",
        backgroundColor: '#FCFCFC',
        alignItems: 'center',
        justifyContent: 'flex-start',
        flexDirection: "column",
    },

    evaluationScreenView: {
        flex: 1,
        backgroundColor:"#FCFCFC",
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection:'column',
        marginTop:10,
    },

    musicActivitiesScreenView: {
        flex: 1,
        backgroundColor:"#FCFCFC",
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection:'column',
        marginTop:10,
    },
    
    musicsActivitiesTextView:{
        justifyContent:'flex-start',
        flexDirection:'column',
        alignItems:'flex-start',
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

    //Register
    registerActivityView:{
        width:"99%",
        maxWidth:414,
        height:240,
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
        width:0,
        height:0,
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