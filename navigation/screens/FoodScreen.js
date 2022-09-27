import React from 'react'
import { StyleSheet, View, Text, Image, Button } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

export default function FoodScreen({navigation}){
    return (
         <View style={styles.container}>
            <Text style={styles.dummyText}>Record Feeding</Text>

         <Button
            title="Feeding Summary"
            onPress={() => alert("Link to summary charts")}/>

         <Button
            title="Baby"
            onPress={() => navigation.navigate('Baby')}/>
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
    textAlign: 'center'
  },
  logo: {
    width: 305,
    height: 159,
    marginBottom: 10,
  }
});