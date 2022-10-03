import React, {useState} from 'react';
import {StyleSheet, View, Text, TextInput, Image, TouchableOpacity} from 'react-native';
import logo from './baby-logo.jpeg';
import CountDown from 'react-native-countdown-component';

export default function TeethTimer(navigation){
     return (

    <CountDown
        until={60 * 2}
        size={30}
        onFinish={() => alert('Finished')}
        digitStyle={{backgroundColor: 'blue'}}
        digitTxtStyle={{color: '#1CC625'}}
        timeToShow={['M', 'S']}
        timeLabels={{m: 'MM', s: 'SS'}}
      />
     )
}