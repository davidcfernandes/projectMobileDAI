import React, {useState, useEffect} from 'react';
import { Animated, StyleSheet, Text, View, ScrollView, Image, TouchableHighlight, FlatList, TouchableOpacity, TextInput } from 'react-native';
import AppLoading from 'expo-app-loading';
import { useFonts, RedHatDisplay_400Regular } from '@expo-google-fonts/red-hat-display';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faChevronLeft, faPaperPlane, faUser, faCalendarAlt, faClock, faStar, faHeart, faComment} from '@fortawesome/free-solid-svg-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LikeButton from './Components/LikeButton';

// Verificar se o scroll ta bem
export default function Forum({navigation}) {
    const scrollY= new Animated.Value(0);
    let scrollYValue = scrollY._value;
    const [scrolled, setScrolled] = useState(false);
    const [valueToken, setValueToken] = useState(null);
    const [allPosts, setAllPosts] = useState(null);
    const [loaded, setLoaded] = useState(false);
    const [avatarChosenState, setAvatarChosenState] = useState(null);
    const [contentPost, setContentPost] = useState(null);

    const avatarChosen = (avatar) =>{
        if(avatar==1)
            setAvatarChosenState(require("../../avatar1.png"));
        if(avatar==2)
            setAvatarChosenState(require("../../avatar2.png"));
        if(avatar==3)
            setAvatarChosenState(require("../../avatar3.png"));
        if(avatar==4)
            setAvatarChosenState(require("../../avatar4.png"));
        if(avatar==5)
            setAvatarChosenState(require("../../avatar5.png"));
        if(avatar==6)
            setAvatarChosenState(require("../../avatar6.png"));
        if(avatar==7)
            setAvatarChosenState(require("../../avatar7.png"));
        if(avatar==8)
            setAvatarChosenState(require("../../avatar8.png"));
    };
    const handlerPostContent = (text) =>{
        setContentPost(text)
    };
    //Post on Forum Fetch
    const selectPost = async (idPost) => {
        await AsyncStorage.setItem('postIdStorage',JSON.stringify({idPost}));
        navigation.navigate('Comments');
    }
    //Initial Fetch
    useEffect(() => {
        async function submit() {
            const valueTokenStorage = await AsyncStorage.getItem('userToken');
            const valueToken = JSON.parse(valueTokenStorage);
            setValueToken(valueToken);

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

            const response2 = await fetch("http://192.168.1.74:8080/api/children/"+valueToken.userId, {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
            });
            const response_3 = await response2.json();
            avatarChosen(response_3.idAvatar);
            setLoaded(true);
        }
        if(!loaded){
            submit();
            setLoaded(true);
        }
    });
    //Post on Forum Fetch
    const publishPost = async (idActivity) => {
        const response = await fetch("http://192.168.1.74:8080/api/posts", {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                idChild: valueToken.userId,
                post: contentPost
            })
        });
        const response_1 = await response.json();
        
        const response2 = await fetch("http://192.168.1.74:8080/api/posts", {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
        });
        const response_3 = await response2.json();
        setAllPosts(response_3);
        
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
                    <Text style={styles.forumText}>Forum</Text>
                </View>
                {/*<View style={styles.forumScreenScrollContainer}>
                    <ScrollView style={styles.forumScreenScroll} scrollEventThrottle={1} onScroll={(e)=>{scrollY.setValue(e.nativeEvent.contentOffset.y); scrollYValue = scrollY._value; scrollYValue > 0 ? setScrolled(true) : setScrolled(false);}}>
                        <View style={styles.forumPostsContainer}>
                            <View style={styles.postView}>
                                <View style={styles.userInformationView}>
                                    <Image source={require("../../avatar1.png")} style={styles.avatarPoster}/>
                                    <Text style={styles.namePoster}>asdsasda</Text>
                                </View>
                                <View style={styles.contentView}>
                                    <Text style={styles.contentPoster}>asdsasda</Text>
                                </View>
                                <View style={styles.interactionView}>
                                    <FontAwesomeIcon icon={faHeart} onPress={() => navigation.navigate('HomeMenu')} style={styles.heart} size={25}/>
                                    <FontAwesomeIcon icon={faComment} onPress={() => navigation.navigate('HomeMenu')} style={styles.heart} size={25}/>
                                </View>
                            </View>
                        </View>
                    </ScrollView>
                </View>*/}
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
                                        <View style={styles.interactionView}>
                                            <LikeButton/>
                                            <FontAwesomeIcon icon={faComment} onPress={()=>selectPost(item.idPost)} style={styles.heart} size={25}/>
                                        </View>
                                    </View>
                                </View>
                            );
                        }}
                        keyExtractor={(item, index) => index.toString()}
                        style={styles.activitiesScreenScroll}
                    />
                </View>
                <View style={styles.sendPostView}>
                    <Image source={avatarChosenState} style={styles.avatar1png}/>
                    <TextInput style={styles.sendPostTextInput} onChangeText={handlerPostContent}/>
                    <FontAwesomeIcon icon={faPaperPlane} onPress={publishPost} style={styles.paperPlane} size={25}/>
                </View>
            </View>
        )
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

    forumText:{
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

    heart:{
        color:"#E9E9E9",
        margin:30,
    },
});