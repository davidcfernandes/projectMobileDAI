import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import {  } from 'react-native';
import HomeWithoutLogin from "./assets/screens/Home/HomeWithoutLogin";
import OpenScreen from "./assets/screens/Home/OpenScreen";
import BottomNavbar from "./assets/screens/Home/Components/BottomNavbar";
import Login from "./assets/screens/Home/Login";
import SignUp1 from "./assets/screens/Home/SignUp1";
import SignUp2 from "./assets/screens/Home/SignUp2";
import SignUp3 from "./assets/screens/Home/SignUp3";
import SignUp4 from "./assets/screens/Home/SignUp4";
import SignUp5 from "./assets/screens/Home/SignUp5";
import ForumWithoutLogin from "./assets/screens/Home/ForumWithoutLogin";
import SignUpUnder from "./assets/screens/Home/SignUpUnder";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="OpenScreen" component={OpenScreen} options={{headerShown: false, transitionSpec: {open: transition,close: transition}}}/>
        <Stack.Screen name="HomeWithoutLogin" component={HomeWithoutLogin} options={{headerShown: false, transitionSpec: {open: transition,close: transition}}}/>
        <Stack.Screen name="BottomNavbar" component={BottomNavbar} options={{headerShown: false, transitionSpec: {open: transition,close: transition}}}/>
        <Stack.Screen name="Login" component={Login} options={{headerShown: false, transitionSpec: {open: transition,close: transition}}}/>
        <Stack.Screen name="SignUp1" component={SignUp1} options={{headerShown: false, transitionSpec: {open: transition,close: transition}}}/>
        <Stack.Screen name="SignUp2" component={SignUp2} options={{headerShown: false, transitionSpec: {open: transition,close: transition}}}/>
        <Stack.Screen name="SignUp3" component={SignUp3} options={{headerShown: false, transitionSpec: {open: transition,close: transition}}}/>
        <Stack.Screen name="SignUp4" component={SignUp4} options={{headerShown: false, transitionSpec: {open: transition,close: transition}}}/>
        <Stack.Screen name="SignUp5" component={SignUp5} options={{headerShown: false, transitionSpec: {open: transition,close: transition}}}/>
        <Stack.Screen name="ForumWithoutLogin" component={ForumWithoutLogin} options={{headerShown: false, transitionSpec: {open: transition,close: transition}}}/>
        <Stack.Screen name="SignUpUnder" component={SignUpUnder} options={{headerShown: false, transitionSpec: {open: transition,close: transition}}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const transition = {
  animation: 'timing',
  config:{
    duration:200,
  }
};