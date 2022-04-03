import React, {useEffect} from 'react';
import { StyleSheet, View, Image, TouchableHighlight, Text, BackHandler, Alert  } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faTrophy, faComments, faLightbulb, faStar, faHome } from '@fortawesome/free-solid-svg-icons';
import ForumStack from "../../Forum/ForumStack";
import Suggestion from "../../Suggestion/Suggestion";
import HomeMenuStack from "../../HomeMenu/HomeMenuStack";
import Rank from "../../Rank/Rank";
import EvaluateActivities from "../../EvaluateActivities/EvaluateActivities";

const Tab = createBottomTabNavigator();

export default function BottomNavbar() {
    return (
      <Tab.Navigator
        initialRouteName="HomeMenuStack"
        tabBarOptions={{
          activeTintColor: '#1A82C4',
          inactiveTintColor: '#E2E2E2',
        }}
      >
        <Tab.Screen
          name="ForumStack"
          component={ForumStack}
          options={{
            tabBarLabel: () => {return null},
            tabBarIcon: ({ color, size }) => (
              <FontAwesomeIcon icon={faComments} color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="Rank"
          component={Rank}
          options={{
            tabBarLabel: () => {return null},
            tabBarIcon: ({ color, size }) => (
              <FontAwesomeIcon icon={faTrophy} color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="HomeMenuStack"
          component={HomeMenuStack}
          options={{
            tabBarLabel: () => {return null},
            tabBarIcon: ({ color, size }) => (
              <FontAwesomeIcon icon={faHome} color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="EvaluateActivities"
          component={EvaluateActivities}
          options={{
            tabBarLabel: () => {return null},
            tabBarIcon: ({ color, size }) => (
              <FontAwesomeIcon icon={faStar} color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="Suggestion"
          component={Suggestion}
          options={{
            tabBarLabel: () => {return null},
            tabBarIcon: ({ color, size }) => (
              <FontAwesomeIcon icon={faLightbulb} color={color} size={size} />
            ),
          }}
        />
      </Tab.Navigator>
    );
  }