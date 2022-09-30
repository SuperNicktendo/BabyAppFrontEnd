import React from 'react'
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native'
import SleepForm from './SleepForm.js'
import logo from './baby-logo.jpeg'

export default function SleepScreen({route, navigation}){
  const { baby } = route.params;
    return (
         <View style={styles.container}>
            <TouchableOpacity onPress={()=> navigation.navigate('Home')}>
              <Image source={logo} style={styles.logo} />
            </TouchableOpacity>
            <Text style={styles.sleepText}>Record Sleep</Text>
            <SleepForm navigation={navigation} baby={baby}/>
         </View>
    )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#18C0EA',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 50
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
  sleepText: {
    color: '#fff',
    fontWeight: 'bold',
    marginTop: 15,
    marginBottom: 15,
    fontSize: 30,
    textAlign: 'center'
  },

});