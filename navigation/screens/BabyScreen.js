import React from 'react';
import {StyleSheet, View, Text, Image, Button} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

export default function BabyScreen({navigation}) {
  return (
    <View style={styles.container}>
      <Text style={styles.dummyText}>Baby Screen</Text>

      <Button
        style={styles.button}
        title="Food"
        onPress={() => navigation.navigate('Food')}
      />

      <Button
        style={styles.button}
        title="Sleep"
        onPress={() => navigation.navigate('Sleep')}
      />
    </View>
  );
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
  logo: {
    width: 305,
    height: 159,
    marginBottom: 10,
  },
  button: {
    margin: 10,
    width: 80,
    color: '#f34fg6',
  },
});
