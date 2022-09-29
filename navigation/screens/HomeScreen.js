
import React from 'react';
import {StyleSheet, View, Text, TextInput, Image, Button, TouchableOpacity} from 'react-native';
import logo from './baby-logo.jpeg';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {postBaby} from '../BabyService.js';
import moment from 'moment';


export default function HomeScreen({navigation}) {
  const [name, setName] = React.useState(null);
  const [dob, setDob] = React.useState(null);

  const createBaby = async () => {
    // console.log('name on press ', name);
    // console.log('dob on press: ', dob);

    const newBaby = {
      name: name,
      birthdate: moment(dob).format('YYYY-MM-DD'),
    };
    await postBaby(newBaby);


    navigation.navigate('Baby')
 
  };




  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.navigate('Baby')}>
      <Image source={logo} style={styles.logo} />
      </TouchableOpacity>

      <Button
        style={styles.buttons}
        title="Enter"
        onPress={() => navigation.navigate('Baby')}
      />
      <Text style={styles.dummyText}> Create Baby</Text>
      <View>
        <Text style={{textAlign: 'center', fontWeight: 'bold'}}>

          First Name:
        </Text>
        <TextInput
          style={{
            backgroundColor: '#DA4167',
            height: 40,
            width: 200,
            borderColor: '#081b4f',
            color: '#081b4f',
            borderWidth: 2,
            borderRadius: 10,
            marginBottom: 20,
            fontSize: 14,
          }}
          onChangeText={value => setName(value)}
          value={name}
          placeholder="Enter First Name: "
          autoCapitalize="sentences"
          activeUnderlineColor="green"
          underlineColor="red"
        />
        <Text style={{textAlign: 'center', fontWeight: 'bold'}}>
          Date of Birth:
        </Text>
        <TextInput
          style={{
            backgroundColor: '#70A0AF',
            color: '#081b4f',
            height: 40,
            width: 200,
            borderColor: '#081b4f',
            borderWidth: 2,
            borderRadius: 10,
            marginBottom: 20,
            fontSize: 14,
          }}
          onChangeText={value => setDob(value)}
          value={dob}
          maxLength={8}
          keyboardType="numeric"
          placeholder="Enter D.O.B (yyyy-mm-dd) :"
          activeUnderlineColor="green"
          underlineColor="purple"
        />
        <Button title="Create" onPress={createBaby} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7e4b0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dummyText: {
    color: '#081b4f',
    fontWeight: 'bold',
    marginTop: 15,
    fontSize: 30,
    textAlign: 'center',
  },
  logo: {
    width: 305,
    height: 159,
    marginBottom: 10,
    padding: 100,
    borderColor: 'black',
    borderWidth: 5,
    borderRadius: 305 /2

  },
  input: {
    margin: 15,
    height: 40,
    borderColor: 'grey',
    borderWidth: 1,
  },
  buttons: {
    backgroundColor: '#FA7921',
    color: '#FA7921',
  },
});

