import React, {useState, useEffect} from 'react';
import { useFonts, RedHatDisplay_400Regular } from '@expo-google-fonts/red-hat-display';
import AppLoading from 'expo-app-loading';
import { StatusBar } from 'expo-status-bar';
import { Animated, StyleSheet, Text, View, Image, TouchableHighlight, TouchableOpacity, ScrollView } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faArrowCircleRight, faChevronLeft, faComments } from '@fortawesome/free-solid-svg-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function HomeWithoutLogin({ navigation }){
  const scrollY= new Animated.Value(0);
  let scrollYValue = scrollY._value;
  const [scrolled, setScrolled] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [activities, setActivities] = useState(null);
  //Sport
  const [upcomingSport, setUpcomingSport] = useState(null);
  const [sportNotNull, setSportNotNull] = useState(false);
  //Literature
  const [upcomingLiterature, setUpcomingLiterature] = useState(null);
  const [literatureNotNull, setLiteratureNotNull] = useState(false);
  //Music
  const [upcomingMusic, setUpcomingMusic] = useState(null);
  const [musicNotNull, setMusicNotNull] = useState(false);
  //Cinema
  const [upcomingCinema, setUpcomingCinema] = useState(null);
  const [cinemaNotNull, setCinemaNotNull] = useState(false);
  //Video Games
  const [upcomingVideoGames, setUpcomingVideoGames] = useState(null);
  const [videoGamesNotNull, setVideoGamesNotNull] = useState(false);

  useEffect(() => {
    async function submit() {
        const response = await fetch("http://192.168.1.74:8080/api/activities", {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
        });
        const response_1 = await response.json();
        //Sport
        let s = 0;
        for(let i=0; i<response_1.length; i++){
          if(response_1[i].status=="Aprovada" && response_1[i].activityType.idActivityType==3 && s==0){
            ++s;
            setUpcomingSport(response_1[i].title);
            setSportNotNull(true);
          }
        }
        //Literature
        let l = 0;
        for(let i=0; i<response_1.length; i++){
          if(response_1[i].status=="Aprovada" && response_1[i].activityType.idActivityType==4 && l==0){
            ++l;
            setUpcomingLiterature(response_1[i].title);
            setLiteratureNotNull(true);
          }
        }
        //Music
        let m = 0;
        for(let i=0; i<response_1.length; i++){
          if(response_1[i].status=="Aprovada" && response_1[i].activityType.idActivityType==5 && m==0){
            ++m;
            setUpcomingMusic(response_1[i].title);
            setMusicNotNull(true);
          }
        }
        //Cinema
        let c = 0;
        for(let i=0; i<response_1.length; i++){
          if(response_1[i].status=="Aprovada" && response_1[i].activityType.idActivityType==6 && c==0){
            ++c;
            setUpcomingCinema(response_1[i].title);
            setCinemaNotNull(true);
          }
        }
        //VideoGames
        let v = 0;
        for(let i=0; i<response_1.length; i++){
          if(response_1[i].status=="Aprovada" && response_1[i].activityType.idActivityType==7 && v==0){
            ++v;
            setUpcomingVideoGames(response_1[i].title);
            setVideoGamesNotNull(true);
          }
        }
        //console.log(profileData);
        return response_1;
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
    return <AppLoading />;
  } else {
    return (
      <View style={styles.container}>
        {/*<StatusBar style="auto" />*/}
        <View style={scrolled ? styles.topNavbarScrolled : styles.topNavbar}>
          <FontAwesomeIcon icon={faChevronLeft} onPress={() => navigation.navigate('OpenScreen')} style={styles.chevronLeft}/>
          <Image source={require("../../LOGOPNG.png")} style={styles.logoPng}/>
        </View>
        <Text style={styles.forumText}>Fórum</Text>
        <TouchableOpacity style={styles.forumIconContainer}  onPress={() => navigation.navigate('ForumWithoutLogin')}>
          <FontAwesomeIcon icon={faComments} size={25} style={styles.commentsIcon}/>
        </TouchableOpacity>
        <Text style={styles.activitiesOfTheWeek}>Proximas atividades</Text>
        <ScrollView style={styles.activitiesScrollView}>
          <View style={styles.activitiesContainer}>
            <View style={styles.sportView}>
              <Image source={require("../../sports.png")} style={styles.eachActivitiesPng}/>
              <Text style={styles.upcomingActivitiesViewText} numberOfLines={2}>{sportNotNull?upcomingSport:'Não temos atividades desportivas disponíveis de momento'}</Text>
            </View>
          </View>
          <View style={styles.activitiesContainer}>
            <View style={styles.sportView}>
              <Image source={require("../../literature.png")} style={styles.eachActivitiesPng}/>
              <Text style={styles.upcomingActivitiesViewText} numberOfLines={2}>{literatureNotNull?upcomingLiterature:'Não temos atividades literaturiais disponíveis de momento'}</Text>
            </View>
          </View>
          <View style={styles.activitiesContainer}>
            <View style={styles.sportView}>
              <Image source={require("../../music.png")} style={styles.eachActivitiesPng}/>
              <Text style={styles.upcomingActivitiesViewText} numberOfLines={2}>{musicNotNull?upcomingMusic:'Não temos atividades musicais disponíveis de momento'}</Text>
            </View>
          </View>
          <View style={styles.activitiesContainer}>
            <View style={styles.sportView}>
              <Image source={require("../../cinema.png")} style={styles.eachActivitiesPng}/>
              <Text style={styles.upcomingActivitiesViewText} numberOfLines={2}>{cinemaNotNull?upcomingCinema:'Não temos atividades cinematográficas disponíveis de momento'}</Text>
            </View>
          </View>
          <View style={styles.activitiesContainer}>
            <View style={styles.sportView}>
              <Image source={require("../../videogames.png")} style={styles.eachActivitiesPng}/>
              <Text style={styles.upcomingActivitiesViewText} numberOfLines={2}>{videoGamesNotNull?upcomingVideoGames:'Não temos atividades de video jogos disponíveis de momento'}</Text>
            </View>
          </View>
        </ScrollView>
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
    position:'absolute',
    bottom:15,
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
});