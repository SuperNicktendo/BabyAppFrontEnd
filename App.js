import React from 'react';
import {StyleSheet, View, Text, Image, Button} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import MainContainer from './navigation/MainContainer';

function App() {
  return <MainContainer />;
}

export default App;
