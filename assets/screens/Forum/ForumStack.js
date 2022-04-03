import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import {  } from 'react-native';
import Forum from "./Forum";
import Comments from "./Comments";
const Stack = createStackNavigator();

export default function App() {
  return (
    <Stack.Navigator>
        <Stack.Screen name="Forum" component={Forum} options={{headerShown: false, transitionSpec: {open: transition,close: transition}}}/>
        <Stack.Screen name="Comments" component={Comments} options={{headerShown: false, transitionSpec: {open: transition,close: transition}}}/>
    </Stack.Navigator>
  );
}


const transition = {
  animation: 'timing',
  config:{
    duration:200,
  }
};