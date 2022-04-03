import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import {  } from 'react-native';
import HomeMenu from "./HomeMenu";
import Notifications from "../Home/Notifications";
import Profile from "../Profile/Profile";
import SportsScreen from '../Activities/SportsScreen';
import LiteratureScreen from '../Activities/LiteratureScreen';
import MusicScreen from '../Activities/MusicScreen';
import VideoGameScreen from '../Activities/VideoGameScreen';
import CinemaScreen from '../Activities/CinemaScreen';
import SeeAllScreen from '../Activities/SeeAllScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
      <Stack.Navigator>
        <Stack.Screen name="HomeMenu" component={HomeMenu} options={{headerShown: false, transitionSpec: {open: transition,close: transition}}}/>
        <Stack.Screen name="Notifications" component={Notifications} options={{headerShown: false, transitionSpec: {open: transition,close: transition}}}/>
        <Stack.Screen name="Profile" component={Profile} options={{headerShown: false, transitionSpec: {open: transition,close: transition}}}/>
        <Stack.Screen name="SportsScreen" component={SportsScreen} options={{headerShown: false, transitionSpec: {open: transition,close: transition}}}/>
        <Stack.Screen name="LiteratureScreen" component={LiteratureScreen} options={{headerShown: false, transitionSpec: {open: transition,close: transition}}}/>
        <Stack.Screen name="MusicScreen" component={MusicScreen} options={{headerShown: false, transitionSpec: {open: transition,close: transition}}}/>
        <Stack.Screen name="CinemaScreen" component={CinemaScreen} options={{headerShown: false, transitionSpec: {open: transition,close: transition}}}/>
        <Stack.Screen name="VideoGameScreen" component={VideoGameScreen} options={{headerShown: false, transitionSpec: {open: transition,close: transition}}}/>
        <Stack.Screen name="SeeAllScreen" component={SeeAllScreen} options={{headerShown: false, transitionSpec: {open: transition,close: transition}}}/>
      </Stack.Navigator>
  );
}


const transition = {
  animation: 'timing',
  config:{
    duration:200,
  }
};