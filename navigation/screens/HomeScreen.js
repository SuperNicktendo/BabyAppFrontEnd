
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


  const createBaby = async () => {
    const newBaby = {
      name: name,
      birthdate: moment(date).format('YYYY-MM-DD'),
    };
    await postBaby(newBaby);


    navigation.navigate('Baby')
 
  };




  return (
    <View style={styles.container}>
      <Text style={styles.headertext}>App Name</Text>
      <TouchableOpacity onPress={() => navigation.navigate('Baby')}>
      <Image source={logo} style={styles.logo} />
      </TouchableOpacity>

      <TouchableOpacity style={styles.buttonContainer} onPress={()=> navigation.navigate('Baby')}>
                <Text style={styles.buttonText}>Home</Text>
              </TouchableOpacity>

      <Text style={styles.homeText}>Add a child</Text>
      <View>
        <Text style={{textAlign: 'center', fontWeight: 'bold', color: '#fff'}}>
          First Name:
        </Text>
        <TextInput
          style={{
            backgroundColor: '#BAE6F2',
            height: 40,
            width: 200,
            borderColor: '#081b4f',
            color: '#fff',
            borderWidth: 2,
            borderRadius: 10,
            marginBottom: 5,
            fontSize: 14,
          }}
          onChangeText={value => setName(value)}
          value={name}
          placeholder="Enter First Name: "
          autoCapitalize="sentences"
          activeUnderlineColor="green"
          underlineColor="red"
        />
        <Text style={{textAlign: 'center', fontWeight: 'bold',  color: '#fff'}}>
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

        <TouchableOpacity style={styles.buttonContainer} onPress={createBaby} >
          <Text style={styles.buttonText}>Add Baby</Text>
        </TouchableOpacity>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#4F6C73',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headertext: {
    color: '#fff',
    fontWeight: 'bold',
    marginTop: 5,
    fontSize: 30,
    textAlign: 'center',
    paddingBottom: 7,
  },
  homeText: {
    color: '#fff',
    fontWeight: 'bold',
    marginTop: 10,
    fontSize: 22,
    textAlign: 'center',
    paddingBottom: 5,
  },
  logo: {
    width: 355,
    height: 341,
    marginBottom: 10,
    padding: 100,
    borderColor: 'black',
    borderWidth: 5,
    borderRadius: 355 /2

  },
  buttonContainer: {
    elevation: 8,
    backgroundColor: "#FE8E0D",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
    marginBottom: 10,
  },
  buttonText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
    alignSelf: "center",
    textTransform: "uppercase"
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

