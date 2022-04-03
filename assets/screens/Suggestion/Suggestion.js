import React, {useState} from 'react';
import { Animated, Text, View, StyleSheet, TextInput, SafeAreaView, ScrollView , TouchableOpacity} from 'react-native';
import AppLoading from 'expo-app-loading';
import { useFonts, RedHatDisplay_400Regular } from '@expo-google-fonts/red-hat-display';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faChevronLeft, faMicrophone} from '@fortawesome/free-solid-svg-icons';
import Grading from './Components/Grading';

export default function Notifications({navigation}) {
    const scrollY= new Animated.Value(0);
    let scrollYValue = scrollY._value;
    const [scrolled, setScrolled] = useState(false);
    {/*const handleScrolled = () => {
        scrollYValue > 0 ? setScrolled(true) : setScrolled(false);
        console.log(scrolled);
    };*/}

    let [fontsLoaded] = useFonts({
        RedHatDisplay_400Regular,
    });
    if (!fontsLoaded) {
        return <AppLoading/>;
    } else {
        return(
            <View style={styles.container}>
                <View style={scrolled ? styles.topNavbarScrolled : styles.topNavbar}>
                    <FontAwesomeIcon icon={faChevronLeft} onPress={() => navigation.navigate('HomeMenu')} style={styles.chevronLeft}/>
                    <Text style={styles.notificationText}>Enviar Sugestões</Text>
                </View>
                <View style={styles.notificationScreenScrollContainer}>
                    <Animated.ScrollView style={styles.notificationScreenScroll} scrollEventThrottle={1} onScroll={(e)=>{scrollY.setValue(e.nativeEvent.contentOffset.y); scrollYValue = scrollY._value; scrollYValue > 0 ? setScrolled(true) : setScrolled(false);}}>
                        <Grading/>
                    </Animated.ScrollView>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:"#FCFCFC",
        alignItems: 'center',
        justifyContent: 'center',
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
    
    notificationText:{
        position:'absolute',
        bottom:"10%",
        fontSize:36,
        color:"#1A82C4",
        fontFamily:'RedHatDisplay_400Regular',
    },

    chevronLeft:{
        position:'absolute',
        bottom:"24%",
        left:'4.83%',
        color:"#B0B0B0",
    },

    notificationScreenScrollContainer:{
        flex: 5,
        width:"100%",
        flexDirection: 'column', 
        alignItems: 'center',
        justifyContent: 'center',
    },

    notificationScreenScroll:{
        flex: 5,
        width:"100%",
    },

    notificationScreen:{
        width:"100%",
        flexDirection: 'column', 
        alignItems: 'center',
        justifyContent: 'center',
    },

    howYouClassifyText:{
        color:"#1A82C4",
        fontSize:18,
        fontFamily:'RedHatDisplay_400Regular',
    },

    gradeView:{
        flexDirection: 'row', 
        alignItems: 'center',
        justifyContent: 'center',
    },

    helpUsGettingBetter:{
        fontFamily:"RedHatDisplay_400Regular",
        fontSize:22,
        color:"#1A82C4",
        marginTop:10,
    },

    sendUsYourSuggestions:{
        fontFamily:"RedHatDisplay_400Regular",
        fontSize:22,
        color:"#C7CED5",
    },

    safeAreaViewOfText:{
        width:"87.2%",
        height:300,
        borderRadius:10,
        borderColor:"#EBEBEB",
        borderWidth: 1,
        alignItems:'center',
    },

    suggestionBox:{
        fontFamily:"RedHatDisplay_400Regular",
        justifyContent: "flex-start",
        textAlignVertical: 'top',
        width:"90%",
        height:290,
        margin:5,
        fontSize:18,
    },

    microphoneView:{
        backgroundColor:"#1A82C4",
        width: 75,
        height: 75,
        borderRadius:50,
        alignItems:'center',
        justifyContent:"center",
        margin:10,
    },

    microphoneIcon:{
        color:"#fff",
    },

    sendButton:{
        width:227,
        height:57,
        backgroundColor:"#1A82C4",
        alignItems:'center',
        justifyContent:"center",
        margin:10,
        borderRadius:50,
    },

    sendButtonText:{
        fontFamily:"RedHatDisplay_400Regular",
        fontSize:32,
        color:"#fff",
    },
});