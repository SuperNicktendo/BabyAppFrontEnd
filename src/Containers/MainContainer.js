import React from 'react';
import {StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
//import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

//Components
import HomeScreen from '../Components/HomeScreen';
import FoodScreen from '../Components/FoodScreen';
import SleepScreen from '../Components/SleepScreen';
import BabyScreen from '../Components/BabyScreen';
import ListScreen from '../Components/ListScreen';
import SummaryScreen from '../Components/SummaryScreen';
import FeedEdit from '../Components/FeedEdit';
import SleepEdit from '../Components/SleepEdit';
import TimerScreen from '../Components/TimerScreen';
import WaterAnimation from '../Components/WaterAnimation';
//Screen names
const homeName = "Home";
const foodName = "Food";
const sleepName = "Sleep";
const babyName = "Babies";
const listName = "List";
const summaryName = "Summary";
const feedEdit = "FeedEdit";
const sleepEdit = "SleepEdit";
const teethName = "Timer";

const Tab = createBottomTabNavigator();

export default function MainContainer(){
    return(
       <NavigationContainer>
             
             <Tab.Navigator
               initialRouteName={homeName}
               screenOptions={({ route }) => ({
                 tabBarIcon: ({ focused, color, size }) => {
                   let iconName;
                   let rn = route.name;

                   if (rn === babyName) {
                     iconName = focused ? 'home' : 'home-outline';

                   } else if (rn === listName) {
                     iconName = focused ? 'list' : 'list-outline';

                   } 

                   return <Ionicons name={iconName} size={size} color={color} />;
                   
                 },
               })}
               screenOptions={{
                headerShown: false,
                 tabBarActiveTintColor: '#fff',
                 tabBarInactiveTintColor: 'black',
                 tabBarInactiveBackgroundColor: '#fff',
                 tabBarActiveBackgroundColor: 'orange',
                 tabBarLabelStyle: { 
                  paddingBottom: 12, 
                  fontSize: 15,
                  fontStyle: 'bold',
                 },
                 style: { padding: 10, height: 70},
                 tabBarIconStyle: { display: "none" },
               }}>

                <Tab.Screen name={homeName} component={HomeScreen} options={{
                  tabBarButton: ()=> null,
                  tabBarVisible: false,
                }}/>
               <Tab.Screen name={foodName} component={FoodScreen} options={{
                tabBarButton: ()=> null,
                tabBarVisible: false,
               }}/>
               <Tab.Screen name={sleepName} component={SleepScreen} options={{
                tabBarButton: ()=> null,
                tabBarVisible: false,
               }}/>
               <Tab.Screen name={babyName} component={BabyScreen} />
               <Tab.Screen name={listName} component={ListScreen} />
               <Tab.Screen name={feedEdit} component={FeedEdit} options={{
                tabBarButton: ()=> null,
                tabBarVisible: false,
               }} />
               <Tab.Screen name={sleepEdit} component={SleepEdit}options={{
                tabBarButton: ()=> null,
                tabBarVisible: false,
               }} />
               <Tab.Screen name={summaryName} component={SummaryScreen} options={{
                tabBarButton: ()=> null,
                tabBarVisible: false,
               }}/>
               <Tab.Screen name={teethName} component={TimerScreen}/>
             </Tab.Navigator>
             
       </NavigationContainer>

    )

}
