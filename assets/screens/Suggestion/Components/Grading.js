import React, { useState } from "react";
import { Button, Text, View, StyleSheet, TouchableHighlight, SafeAreaView, TextInput, TouchableOpacity, Alert } from "react-native";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faChevronLeft, faFrown, faSmile, faMeh, faMicrophone } from '@fortawesome/free-solid-svg-icons';


{/*export default class App extends Component {
    constructor(props){
        super(props);
        this.state = {
            firstButtonEnable: false,
            secondButtonEnable: false,
            thirdButtonEnable: false,
        }
        this.handlingButton = this.handlingButton.bind(this)
    }

    handlingButton(){
        firstButtonEnable
        ?  this.setState({secondButtonEnable:false},{thirdButtonEnable:false})
        : null;
    }
    render() {
        return (
            <View style={styles.gradeView}>
                <FontAwesomeIcon icon={faSmile} style={styles.smileFaceIcon} onPress={()=>{this.setState({firstButtonEnable:true});handlingButton();}} size={60}/>
                <FontAwesomeIcon icon={faMeh} style={styles.mehFaceIcon} size={60}/>
                <FontAwesomeIcon icon={faFrown} style={styles.sadFaceIcon} size={60}/>
            </View>
        );
    }
}*/}
export default function Grading() {
    const [faSmileEnabled, setfaSmileEnabled] = useState(false);
    const [faMehEnabled, setfaMehEnabled] = useState(false);
    const [faFrownEnabled, setfaFrownEnabled] = useState(false);
    const [experienceValue, setExpirienceValue] = useState(null);
    const [suggestionText, setSuggestionText] = useState(null);

    const handlefaSmilePressed = () => {
        setfaSmileEnabled(true);
        setfaMehEnabled(false);
        setfaFrownEnabled(false);
        setExpirienceValue(3);
    };
    const handlefaMehPressed = () => {
        setfaSmileEnabled(false);
        setfaMehEnabled(true);
        setfaFrownEnabled(false);
        setExpirienceValue(2);
    };
    const handlefaFrownPressed = () => {
        setfaSmileEnabled(false);
        setfaMehEnabled(false);
        setfaFrownEnabled(true);
        setExpirienceValue(1);
    };
    const handleSuggestionText = (text) => {
        setSuggestionText(text);
    }

    //Fetch
    const submit = async () => {
        if(!faSmileEnabled && !faMehEnabled && !faFrownEnabled){
            Alert.alert(
                "Erro",
                "A sugestão não foi avaliada.",
                [
                { text: "OK" }
                ]
            );
        }else{
            if(suggestionText!=null){
                const response = await fetch("http://192.168.1.74:8080/api/sugestions", {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        experience: experienceValue,
                        content: suggestionText,
                        idChild: 7 /////////////////////MUDAR PRO ID DO CHILD LOGADO////////////////////////////
                    })
                });
                const response_1 = await response.json();
                Alert.alert(
                    "Sucesso",
                    "A sua sugestão foi enviada com sucesso.",
                    [
                    { text: "OK" }
                    ]
                );
                return response_1;
            }else{
                Alert.alert(
                    "Erro",
                    "Preenche a caixa de texto de forma a enviar a sua sugestão.",
                    [
                    { text: "OK" }
                    ]
                );
            }
        }
    }


    return (
        <View style={styles.notificationScreen}>
            <Text style={styles.howYouClassifyText}>Como classificas a tua experiência até agora?</Text>
            <View style={styles.gradeView}>
                <FontAwesomeIcon icon={faFrown} onPress={handlefaFrownPressed} style={faFrownEnabled ? styles.sadFaceIconClicked : styles.sadFaceIcon} size={60}/>
                <FontAwesomeIcon icon={faMeh} onPress={handlefaMehPressed} style={faMehEnabled ? styles.mehFaceIconClicked : styles.mehFaceIcon} size={60}/>
                <FontAwesomeIcon icon={faSmile} onPress={handlefaSmilePressed} style={faSmileEnabled ? styles.smileFaceIconClicked : styles.smileFaceIcon} size={60}/>
            </View>
            <Text style={styles.helpUsGettingBetter}>Ajuda-nos a melhorar</Text>
            <Text style={styles.sendUsYourSuggestions}>Envia-nos as tuas sugestões!</Text>
            <SafeAreaView style={styles.safeAreaViewOfText}>
                <TextInput multiline={true} numberOfLines={15} maxLength={255} style={styles.suggestionBox} onChangeText={handleSuggestionText}></TextInput>
            </SafeAreaView>
            <TouchableOpacity style={styles.sendButton} activeOpacity={0.6}>
                <Text style={styles.sendButtonText} onPress={submit}>Enviar</Text>
            </TouchableOpacity>
            {/*<View style={styles.erroMessage}></View>*/}
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },

    topNavbar: {
        flex: 1,
        width:"100%",
        height:100,
        backgroundColor: '#fff',
        flexDirection: 'row', 
        alignItems: 'center',
        justifyContent: 'center',
    },
    
    notificationText:{
        position:'absolute',
        bottom:"0%",
        fontSize:36,
        color:"#1A82C4",
        fontFamily:'RedHatDisplay_400Regular',
    },

    chevronLeft:{
        position:'absolute',
        bottom:17,
        left:'4.83%',
        color:"#B0B0B0",
    },

    notificationScreen:{
        flex: 5,
        width:"100%",
        backgroundColor:"#aaa",
        flexDirection: 'column', 
        alignItems: 'center',
        justifyContent: 'center',
        marginTop:20,
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

    smileFaceIcon:{
        margin:5,
        color:"#5F5F5F",
    },
    smileFaceIconClicked:{
        margin:5,
        color:"#1A82C4",
    },

    mehFaceIcon:{
        margin:5,
        color:"#5F5F5F",
    },
    mehFaceIconClicked:{
        margin:5,
        color:"#1A82C4",
    },

    sadFaceIcon:{
        margin:5,
        color:"#5F5F5F",
    },
    sadFaceIconClicked:{
        margin:5,
        color:"#1A82C4",
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

    erroMessage:{
        width:200,
        height:200,
        backgroundColor:"#9E1010",
        zIndex:3,
        position:"absolute",
        top:"50%",
    }
});