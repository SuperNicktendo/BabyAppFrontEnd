
import React, {useState} from 'react';
import {StyleSheet, View, Text, TextInput, Image, Button, TouchableOpacity} from 'react-native';
import logo from './baby-logo.jpeg';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {postBaby} from '../BabyService.js';
import moment from 'moment';
import DatePicker from 'react-native-date-picker';



export default function HomeScreen({navigation}) {
  const [name, setName] = React.useState(null);
  const [dob, setDob] = React.useState(null);

  const [date, setDate] = useState(new Date())
  const [open, setOpen] = useState(false)

  const createBaby = () => {
    console.log('name on press ', name);
    console.log('dob on press: ', date);

    const newBaby = {
      name: name,
      birthdate: moment(date).format('YYYY-MM-DD'),
    };
    console.log('baby to be posted: ', newBaby);
    postBaby(newBaby);
    navigation.navigate('Baby');
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.navigate('Baby')}>
      <Image source={logo} style={styles.logo} />
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.buttons}

        onPress={() => navigation.navigate('Baby')}
      >
      <Text>Enter</Text>
      </TouchableOpacity>

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

        <>
        <TouchableOpacity style={styles.buttonContainer} onPress={() => setOpen(true)} >
                        <Text style={styles.buttonText}>Start Time</Text>
                        </TouchableOpacity>
            <DatePicker
                modal
                mode="date"
                open={open}
                date={date}
                onConfirm={(date) => {
                  setOpen(false)
                  setDate(date)
                  console.log("set time: ", date)
                }}
                onCancel={() => {
                  setOpen(false)
                }}
              />
        </>

        <TouchableOpacity
                style={styles.buttons}

                onPress={createBaby}
              >
              <Text>Add Baby</Text>
              </TouchableOpacity>
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
    alignItems: "center",
        backgroundColor: "#DDDDDD",
        padding: 10
  },
  buttonText: {
      fontSize: 18,
      color: "#fff",
      fontWeight: "bold",
      alignSelf: "center",
      textTransform: "uppercase"
    }
});

