import React from 'react';
import {StyleSheet, View, Text, Image, Button} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

//Screens
import HomeScreen from './screens/HomeScreen';
import FoodScreen from './screens/FoodScreen';
import SleepScreen from './screens/SleepScreen';
import BabyScreen from './screens/BabyScreen';

//Screen names
const homeName = 'Home';
const foodName = 'Food';
const sleepName = 'Sleep';
const babyName = 'Baby';

const Tab = createBottomTabNavigator();

export default function MainContainer() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName={homeName}
        screenOptions={({route}) => ({
          tabBarIcon: ({focused, color, size}) => {
            let iconName;
            let rn = route.name;

            if (rn === homeName) {
              iconName = focused ? 'home' : 'home-outline';
            } else if (rn === babyName) {
              iconName = focused ? 'list' : 'list-outline';
            } else if (rn === foodName) {
              iconName = focused ? 'settings' : 'settings-outline';
            } else if (rn === sleepName) {
              iconName = focused ? 'settings' : 'settings-outline';
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
        screenOptions={{
          tabBarActiveTintColor: 'tomato',
          tabBarInactiveTintColor: 'grey',
          tabBarLabelStyle: {paddingBottom: 10, fontSize: 10},
          style: {padding: 10, height: 70},
        }}>
        <Tab.Screen name={babyName} component={BabyScreen} />
        <Tab.Screen name={homeName} component={HomeScreen} />
        <Tab.Screen name={foodName} component={FoodScreen} />
        <Tab.Screen name={sleepName} component={SleepScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
