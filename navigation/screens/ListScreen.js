import React from 'react'
import { StyleSheet, View, Text, Image, Button } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

export default function ListScreen({navigation}){
    return (
         <View style={styles.container}>
            <Text style={styles.dummyText}>Weekly Food and Sleep data</Text>

            

         <Button
            title="Summary"
            onPress={() => navigation.navigate("Summary")}/>
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