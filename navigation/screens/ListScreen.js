import React from 'react'
import { StyleSheet, View, Text, Image, Button, TouchableOpacity } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import logo from './baby-logo.jpeg'


export default function ListScreen({navigation}){
    return (
         <View style={styles.container}>
            <TouchableOpacity onPress={()=> navigation.navigate('Home')}>
              <Image source={logo} style={styles.logo} />
            </TouchableOpacity>
            <Text style={styles.listText}>Weekly Food and Sleep data</Text>

            

         <TouchableOpacity 
            style={styles.buttonContainer}
            onPress={() => navigation.navigate("Summary")}>
              <Text style={styles.buttonText}>
                  Summary
              </Text>
          </TouchableOpacity>
          
         </View>
    )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#4F6C73',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 15,
    height: 5,
    marginBottom: 7,
    padding: 60,
    borderColor: 'black',
    borderWidth: 2.5,
    borderRadius: 200 /2
  },
  listText: {
    color: '#fff',
    fontWeight: 'bold',
    marginTop: 15,
    fontSize: 30,
    textAlign: 'center'
  },
  buttonContainer: {
    elevation: 8,
    backgroundColor: "#FE8E0D",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12
  },
  buttonText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
    alignSelf: "center",
    textTransform: "uppercase"
  }
});