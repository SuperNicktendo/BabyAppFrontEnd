import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Text, Image, Button, ScrollView} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

export default function FeedCard({style, item, dayIndex, daysTotal}) {
    return ( 
        <View style={{
            ...style,
            backgroundColor: '#18C0EA',
            borderRadius: 10,
            elevation: 5,
        }}>
            <Text>{item.title}</Text>
            <Text>{dayIndex} of {daysTotal}</Text>
        </View>
    )
}