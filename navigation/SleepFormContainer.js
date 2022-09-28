import React from 'react'
import { StyleSheet, View, Text, Image, Button } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';



export default function SleepFormContainer(){

return( 
     
        <View style={styles.form}>
     
        </View>
    
    
    )
  
}

const styles = StyleSheet.create({
    form: {
        flex: 1,
        justifyContent: 'center',
        paddingLeft: 60,
        paddingRight: 60,
    },
});