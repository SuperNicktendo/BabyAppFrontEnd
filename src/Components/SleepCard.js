import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Text, Image, Button, ScrollView} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

export default function SleepCard({style, item, dayIndex, daysTotal}) {
    
    colorToBe = item.title === 'sleep' ? '#FE8E0D' : '#18C0EA';

    const getDataForEdit = () => {
        if(item.title === "feed"){
         item.navigation.navigate("FeedEdit", {item})
     }
         else if(item.title === "sleep"){
         item.navigation.navigate("SleepEdit",{item})
     }
        }
    


    return ( 
        <View
       
         style={{
            ...style,
            backgroundColor: colorToBe,
            borderRadius: 10,
            elevation: 5
        }}>
            <Text onPress={getDataForEdit} >{item.title}</Text>
            {/* <Text>{dayIndex} of {daysTotal}</Text> */}
        </View>
    )
}