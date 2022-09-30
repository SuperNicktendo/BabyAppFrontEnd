import React from 'react';
import {StyleSheet, View, Text} from 'react-native';

export default function SummaryScreen({navigation}){
    return (
        <View style={styles.container}>
        <Text style={styles.dummyText}>
            Summary Screen
        </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    dummyText: {
      color: 'black',
      fontWeight: 'bold',
      marginTop: 15,
      fontSize: 30,
      textAlign: 'center',
    },
  });