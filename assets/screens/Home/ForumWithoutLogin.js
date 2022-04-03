import React, {useState, useEffect} from 'react';
import { useFonts, RedHatDisplay_400Regular } from '@expo-google-fonts/red-hat-display';
import AppLoading from 'expo-app-loading';
import { StatusBar } from 'expo-status-bar';
import { Animated, StyleSheet, Text, View, Image, TouchableHighlight, TouchableOpacity, ScrollView, FlatList } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faArrowCircleRight, faChevronLeft, faComments } from '@fortawesome/free-solid-svg-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function ForumWithoutLogin({ navigation }){
  const scrollY= new Animated.Value(0);
  let scrollYValue = scrollY._value;
  const [scrolled, setScrolled] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [allPosts, setAllPosts] = useState(null);

  //Posts Fetch
    useEffect(() => {
        async function load() {
            const response = await fetch("http://192.168.1.74:8080/api/posts", {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
            });
            const response_1 = await response.json();
            setAllPosts(response_1);
            console.log(response_1);
            setLoaded(true);
        }
        if(!loaded){
            load();
            setLoaded(true);
        }
    });


    let [fontsLoaded] = useFonts({
        RedHatDisplay_400Regular,
    });
    if (!fontsLoaded && !loaded) {
        return <AppLoading />;
    } else {
        return (
        <View style={styles.container}>
            {/*<StatusBar style="auto" />*/}
            <View style={/*scrolled ? styles.topNavbarScrolled :*/ styles.topNavbar}>
            <FontAwesomeIcon icon={faChevronLeft} onPress={() => navigation.navigate('HomeWithoutLogin')} style={styles.chevronLeft}/>
            <Image source={require("../../LOGOPNG.png")} style={styles.logoPng}/>
            </View>
            <Text style={styles.forumText}>Fórum</Text>
            <View style={styles.forumScreenScrollContainer}>
                <FlatList data={allPosts}
                    style={styles.forumScreenScroll}
                    scrollEventThrottle={1} onScroll={(e)=>{scrollY.setValue(e.nativeEvent.contentOffset.y); scrollYValue = scrollY._value; scrollYValue > 0 ? setScrolled(true) : setScrolled(false);}}
                    extraData={allPosts}
                    renderItem={({ item, index }) => {
                        return(
                            <View style={styles.forumPostsContainer}>
                                <View style={styles.postView}>
                                    <View style={styles.userInformationView}>
                                        <Image source={require("../../avatar1.png")} style={styles.avatarPoster}/>
                                        <Text style={styles.namePoster}>{item.child.name}</Text>
                                    </View>
                                    <View style={styles.contentView}>
                                        <Text style={styles.contentPoster}>{item.post}</Text>
                                    </View>
                                </View>
                            </View>
                        );
                    }}
                    keyExtractor={(item, index) => index.toString()}
                    style={styles.activitiesScreenScroll}
                />
            </View>
            <TouchableHighlight onPress={() => navigation.navigate('OpenScreen')} underlayColor={"rgba(15, 122, 190, 0.8)"} style={styles.buttonLogin}>
                <View style={styles.buttonLoginWithAccountView}>
                    <Text style={styles.textButtonLoginWithAccount}>Entrar com uma conta </Text>
                    <FontAwesomeIcon icon={faArrowCircleRight} style={styles.arrowIconButtonLoginWithAccount} size={30}/>
                </View>
            </TouchableHighlight>
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
    
    topNavbar: {
        flex: 1.5,
        width:"100%",
        backgroundColor: '#FCFCFC',
        flexDirection: 'row', 
        alignItems: 'center',
        justifyContent: 'center',
        zIndex:2,
    },

    chevronLeft:{
        position:'absolute',
        bottom:17,
        left:'3%',
        color:"#B0B0B0",
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

    buttonLogin:{
        alignItems: 'center',
        flexDirection: "row",
        backgroundColor: 'rgba(26, 130, 196, 1)',
        maxWidth: 370,
        maxHeight:80,
        width:"95%",
        height: "9%",
        marginBottom:15,
        borderRadius: 50,
    },
    
    textButtonLoginWithAccount:{
        color: "white",
        fontSize: 22,
        fontFamily:'RedHatDisplay_400Regular',
        marginLeft:"15%",
        width:275
    },
    
    arrowIconButtonLoginWithAccount:{
        color: "white",
        marginLeft:"-15%",
    },
    
    buttonLoginWithAccountView:{
        flexDirection: 'row', 
        alignItems: 'center', 
        justifyContent:'center'
    },

    logoPng:{
        width:300,
        height:150,
        position:"absolute",
        bottom:-50,
    },

    activitiesOfTheWeek:{
        fontFamily:'RedHatDisplay_400Regular',
        fontSize:31,
        color:'#1A82C4'
    },

    forumText:{
        fontFamily:'RedHatDisplay_400Regular',
        fontSize:32,
        color:'#1A82C4'
    },

    forumIconContainer:{
        width:80,
        height:80,
        borderRadius:50,
        alignItems: 'center', 
        justifyContent:'center',
        shadowColor: "#000",
        shadowOffset: {
        width: 2,
        height: 0,
        },
        shadowOpacity: 0.1,
        shadowRadius: 1,
        elevation: 1.5,
        margin:10,
        backgroundColor:"#fff",
    },

    commentsIcon:{
        color:"#1A82C4",
    },

    //Activities
    activitiesScrollView:{
        height:200,
        width:"100%",
        maxWidth:414,
        marginBottom:60,
    },
    activitiesContainer:{
        justifyContent:'center',
        alignItems:'center',
        flexDirection:'column',
    },
    upcomingActivitiesViewText:{
        width:"75%",
        fontFamily:'RedHatDisplay_400Regular',
        fontSize:16,
        marginLeft:10,
        color:'#000'
    },

    //Sport
    sportView:{
        width:"92%",
        maxWidth:414,
        height:80,
        backgroundColor:"#FFFFFF",
        borderRadius:50,
        alignItems:'center',
        flexDirection:'row',
        justifyContent:'flex-start',
        shadowColor: "#000",
        shadowOffset: {
        width: 2,
        height: 0,
        },
        shadowOpacity: 0.1,
        shadowRadius: 1,
        elevation: 1.5,
        margin:3,
        backgroundColor:"#fff",
    },
    eachActivitiesPng:{
        width:60,
        height:60,
        marginLeft:10,
    },


    //Forum
    
    forumScreenScrollContainer:{
        flex: 5,
        width:"100%",
        flexDirection: 'column', 
        alignItems: 'center',
        justifyContent: 'center',
    },

    forumScreenScroll:{
        flex: 5,
        width:"100%",
    },

    forumPostsContainer:{
        flex: 5,
        width:350,
        flexDirection: 'column', 
        alignItems: 'center',
        justifyContent: 'center',
    },

    postView:{
        width:"90%",
        maxWidth:400,
        marginTop:10,
        marginBottom:5,
        backgroundColor:"#FCFCFC",
        //borderColor:"#000",
        //borderWidth:3,
        shadowColor: "#000",
        shadowOffset: {
	        width: 0,
	        height: 0,
        },
        shadowOpacity: 0.25,
        shadowRadius: 1.00,
        elevation: 2,
        alignItems:'center',
        justifyContent:'center',
        flexDirection:"column",
        borderRadius:30,
    },

    sendPostView:{
        flex:0.7,
        backgroundColor:"#FCFCFC",
        zIndex:1,
        width:"100%",
        alignItems:'center',
        justifyContent:'space-evenly',
        flexDirection:"row",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 1,
        shadowRadius: 3.84,

        elevation: 5,
    },

    avatar1png:{
        width:35,
        height:35,
    },

    sendPostTextInput:{
        width:"68%",
        height:"70%",
        backgroundColor:"#fff",
        borderRadius:10,
        borderColor:"#F0F0F0",
        borderWidth: 1,
        fontSize:15,
    },

    paperPlane:{
        color:"#1A82C4",
    },

    userInformationView:{
        height:60,
        width:"100%",
        justifyContent:'flex-start',
        alignItems:'center',
        flexDirection:'row',
        marginLeft:25,
    },

    contentView:{
        width:"90%",
        justifyContent:'flex-start',
        alignItems:'flex-start',
        marginBottom:20,
    },

    interactionView:{
        height:60,
        width:100,
        justifyContent:'space-evenly',
        alignItems:'center',
        flexDirection:'row',
    },

    avatarPoster:{
        width:35,
        height:35,
    },

    namePoster:{
        marginLeft:10,
        fontFamily:"RedHatDisplay_400Regular",
        fontSize:18,
        color:"#1A82C4",
    },

    contentPoster:{
        color:"#A7A7A7",
        fontFamily:"RedHatDisplay_400Regular",
        fontSize:18,
    },

});