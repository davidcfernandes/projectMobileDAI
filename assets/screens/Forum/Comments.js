import React, {useState, useEffect} from 'react';
import { Animated, StyleSheet, Text, View, ScrollView, Image, TouchableHighlight, FlatList, TextInput } from 'react-native';
import AppLoading from 'expo-app-loading';
import { useFonts, RedHatDisplay_400Regular, RedHatDisplay_500Medium } from '@expo-google-fonts/red-hat-display';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faChevronLeft, faMapMarkedAlt, faUser, faCalendarAlt, faClock, faPaperPlane, faEllipsisH, faHeart, faComments} from '@fortawesome/free-solid-svg-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function LiteratureInscriptionButton({navigation}) {
    const scrollY= new Animated.Value(0);
    let scrollYValue = scrollY._value;
    const [scrolled, setScrolled] = useState(false);
    const [loaded, setLoaded] = useState(false);
    const [contentPost, setContentPost] = useState(null);
    const [allPosts, setAllPosts] = useState(null);
    const [postIdSelected, setPostIdSelected] = useState(null);
    const [selectedPostContent, setSelectedPostContent] = useState(null);
    const [selectedPostTime, setSelectedPostTime] = useState(null);
    const [selectedPostName, setSelectedPostName] = useState(null);
    const [valueTokenValue, setValueTokenValue] = useState(null);
    const [postStorageValue, setPostStorageValue] = useState(null);

    //Initial Fetch
    useEffect(() => {
        async function submit() {
            const postIdStorage = await AsyncStorage.getItem('postIdStorage');
            const postStorage = JSON.parse(postIdStorage);
            console.log(postIdStorage);
            setPostStorageValue(postStorage);
            const valueTokenStorage = await AsyncStorage.getItem('userToken');
            const valueToken = JSON.parse(valueTokenStorage);
            const valueTokenUserId = parseInt(valueToken.userId);
            setValueTokenValue(valueTokenUserId);

            const response2 = await fetch("http://192.168.1.74:8080/api/posts/"+postStorage.idPost, {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
            });
            const response_3 = await response2.json();
            console.log(response_3);
            setSelectedPostContent(response_3.post);
            setSelectedPostTime(response_3.insert_data.slice(0, 10));
            setSelectedPostName(response_3.child.name)

            const response = await fetch("http://192.168.1.74:8080/api/posts/"+postStorage.idPost+"/comments", {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
            });
            const response_1 = await response.json();
            setAllPosts(response_1);


            setLoaded(true);
        }
        if(!loaded){
            submit();
            setLoaded(true);
        }
    });
    //Post on Forum Fetch
    const publishPost = async () => {
        console.log(postStorageValue.idPost);

        const response = await fetch("http://192.168.1.74:8080/api/posts/"+postStorageValue.idPost+"/comments", {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                idChild: valueTokenValue,
                post: contentPost
            })
        });
        const response_1 = await response.json();
        console.log(response_1);
        
        const response2 = await fetch("http://192.168.1.74:8080/api/posts/"+postStorageValue.idPost+"/comments", {
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
                <View style={styles.topNavbar}>
                    <FontAwesomeIcon icon={faChevronLeft} onPress={() => navigation.navigate('Forum')} style={styles.chevronLeft}/>
                    <View style={styles.posterDataView}>
                        <Image source={require("../../avatar1.png")} style={styles.posterAvatarImage}/>
                        <View>
                            <Text style={styles.postNameStyle}>{selectedPostName}</Text>
                            <View style={styles.timePosterData}>
                                <FontAwesomeIcon icon={faClock} style={styles.clock}/>
                                <Text style={styles.postTimeStyle}>{selectedPostTime}</Text>
                            </View>
                        </View>
                        <FontAwesomeIcon icon={faEllipsisH} onPress={() => navigation.navigate('Forum')} style={styles.ellipsis}/>
                    </View>
                </View>
                <View style={styles.posterContentContainer}>
                    <Text style={styles.posterContentContainerPostContentStyle}>{selectedPostContent}</Text>
                    <View style={styles.interactionstView}>
                        <View style={styles.heartView}>
                            <FontAwesomeIcon icon={faHeart} onPress={() => navigation.navigate('Forum')} style={styles.heart} size={20}/>
                            <Text style={styles.interactionstViewInteractionStyle}>Gosto</Text>
                        </View>
                        <View style={styles.commentsView}>
                            <FontAwesomeIcon icon={faComments} onPress={() => navigation.navigate('Forum')} style={styles.comments} size={20}/>
                            <Text style={styles.interactionstViewInteractionStyle}>Comentar</Text>
                        </View>
                    </View>
                    <View style={styles.numberOfLikesView}>
                        <FontAwesomeIcon icon={faHeart} onPress={() => navigation.navigate('Forum')} style={styles.heart} size={15}/>
                        <Text style={styles.interactionstViewInteractionStyle}>6</Text>
                    </View>
                </View>
                <FlatList/>
                <View style={styles.commentScreen}>
                    <FlatList
                        data={allPosts}
                        scrollEventThrottle={1} onScroll={(e)=>{scrollY.setValue(e.nativeEvent.contentOffset.y); scrollYValue = scrollY._value; scrollYValue > 0 ? setScrolled(true) : setScrolled(false);}}
                        extraData={allPosts}
                        renderItem={({ item, index }) => {
                            return(
                                    <View style={styles.eachCommentViewCenter}>
                                        <View style={styles.eachCommentView}>
                                            <Image source={require("../../avatar1.png")} style={styles.commenterAvatarImage}/>
                                            <View style={styles.ContentTextView}>
                                                <Text style={styles.commentContentText}>{item.child.name}</Text>
                                                <Text style={styles.commentContentText}>{item.comment}</Text>
                                            </View>
                                        </View>
                                    </View>
                                    
                            )
                        }}
                        keyExtractor={(item, index) => index.toString()}
                    />
                </View>
                <View style={styles.sendPostView}>
                    <Image source={require("../../avatar1.png")} style={styles.avatar1png}/>
                    <TextInput style={styles.sendPostTextInput} onChangeText={text => setContentPost(text)}/>
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
    //TopNavBar
    topNavbar: {
        flex: 1.5,
        width:"100%",
        backgroundColor: '#FCFCFC',
        flexDirection: 'row', 
        alignItems: 'center',
        justifyContent: 'flex-start',
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

    chevronLeft:{
        color:"#B0B0B0",
        marginLeft:10,
        marginRight:10,
    },

    ellipsis:{
        color:"#B0B0B0",
        marginLeft:10,
    },

    clock:{
        color:"#B0B0B0",
        marginLeft:10,
        marginRight:5,
    },
    
    posterDataView:{
        flexDirection:'row'
    },

    timePosterData:{
        flexDirection:'row'
    },

    posterAvatarImage:{
        height:50,
        width:50,
    },
    //InteractionsBar
    interactionstView:{
        borderTopWidth:2,
        borderBottomWidth:2,
        borderTopColor:"#F1F1F1",
        borderBottomColor:"#F1F1F1",
        flexDirection: 'row',
    },
    heartView:{
        marginTop:10,
        marginBottom:10,
        width:150,
        flexDirection: 'row',
        alignItems:'center',
        justifyContent:'center',
    },
    heart:{
        color:"#1A82C4",
    },
    commentsView:{
        width:150,
        flexDirection: 'row',
        alignItems:'center',
        justifyContent:'center',
    },
    comments:{
        color:"#1A82C4",
    },
    posterContentContainer:{
        maxWidth:414,
        width:"100%",
        backgroundColor:"#FCFCFC",
        alignItems:'center',
        justifyContent:'center',
        flexDirection:'column',
    },
    //
    numberOfLikesView:{
        marginLeft:20,
        width:"100%",
        flexDirection: 'row',
        alignItems:'center',
        justifyContent:'flex-start',
    },
    //Comment Section
    commentScreen:{
        flex: 5,
        maxWidth:414,
        width:"100%",
        backgroundColor: '#FCFCFC',
        alignItems: 'center',
        justifyContent: 'flex-start',
        flexDirection: "column",
    },
    commenterAvatarImage:{
        width:45,
        height:45,
        marginLeft:5,
    },
    eachCommentView:{
        flexDirection:'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        flexDirection: "row",
        height:60,
        width:"90%",
        borderRadius:50,
        backgroundColor:"#fff",
        margin:7,
    },
    eachCommentViewCenter:{
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'center',
        width:360,
    },
    ContentTextView:{
        flexDirection:'column',
    },
    commentContentText:{
        marginLeft:15,
    },
    //Send Post
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

    postNameStyle:{
        color:"#1A82C4",
        fontSize:18,
        fontFamily:'RedHatDisplay_400Regular',
        fontWeight:'700',
        marginLeft:10,
    },

    postTimeStyle:{
        width:200,
        color:"#CECECE",
        fontSize:14,
        fontFamily:'RedHatDisplay_400Regular',
    },

    posterContentContainerPostContentStyle:{
        color:"#BABABA",
        fontSize:20,
        fontFamily:'RedHatDisplay_400Regular',
    },

    interactionstViewInteractionStyle:{
        color:"#1A82C4",
        fontSize:18,
        fontFamily:'RedHatDisplay_400Regular',
        marginLeft:10,
    },
});