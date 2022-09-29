import React from 'react'
import { StyleSheet, View, Text, Image, Button, TouchableOpacity } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

export default function ListScreen({navigation}){
    return (
         <View style={styles.container}>
            <Text style={styles.dummyText}>Weekly Food and Sleep data</Text>

            

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
  buttonContainer: {
    elevation: 8,
    backgroundColor: "#009688",
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