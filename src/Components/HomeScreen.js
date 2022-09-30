
import React, {useState} from 'react';
import {StyleSheet, View, Text, TextInput, Image, TouchableOpacity} from 'react-native';
import logo from './baby-logo.jpeg';
import {postBaby} from '../Services/BabyService.js';
import moment from 'moment';
import DatePicker from 'react-native-date-picker';
import renderIf from "./renderIf.js";


export default function HomeScreen({navigation}) {
  const [name, setName] = React.useState(null);
  const [dob, setDob] = React.useState(null);
  const [date, setDate] = useState(new Date())
  const [open, setOpen] = useState(false)
  const [showContent, setShowContent] = useState(null)

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

      <TouchableOpacity style={styles.buttonContainer} onPress={()=> setShowContent(!showContent)}>
                      <Text style={styles.buttonText}>Add New Baby</Text>
                    </TouchableOpacity>

      {renderIf(showContent,
      <View>


        <Text style={{textAlign: 'center', fontWeight: 'bold', color: '#fff', fontSize: 18}}>
          First Name:
        </Text>
        <TextInput
          style={styles.textInputName}
          onChangeText={value => setName(value)}
          value={name}
          placeholder="Enter First Name: "
          placeholderTextColor="grey"
          autoCapitalize="sentences"
          activeUnderlineColor="green"
          underlineColor="red"
        />
        <Text style={{textAlign: 'center', fontWeight: 'bold',  color: '#fff', fontSize: 18}}>
          Date of Birth:
        </Text>

        <>
        <TouchableOpacity style={styles.buttonContainerDate} onPress={() => setOpen(true)} >
                        <Text style={styles.buttonTextDate}>{moment(date).format('Do MMM YYYY')}</Text>
                        </TouchableOpacity>
            <DatePicker
                modal
                mode="date"
                open={open}
                date={date}
                onConfirm={(date) => {
                  setOpen(false)
                  setDate(date)
                }}
                onCancel={() => {
                  setOpen(false)
                }}
              />
        </>

        <TouchableOpacity style={styles.buttonContainer} onPress={createBaby} >
          <Text style={styles.buttonText}>Add Baby</Text>
        </TouchableOpacity>

      </View>)}
      {renderIf(!showContent, null)}
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
    },
       buttonTextDate: {
           fontSize: 18,
           color: "grey",
           fontWeight: "bold",
           alignSelf: "center",
         },
         buttonContainerDate: {
              elevation: 8,
              backgroundColor: "#BAE6F2",
              paddingVertical: 5,
              paddingHorizontal: 12,
              marginBottom: 5,

                          height: 40,
                          width: 200,
                          borderColor: '#081b4f',
                          color: '#E0E0E0',
                          borderWidth: 2,
                          borderRadius: 10,
                          fontSize: 18,
                          textAlign:'center',
                          fontWeight:'bold'
            },

            textInputName: {
                        backgroundColor: '#BAE6F2',
                        height: 40,
                        width: 200,
                        borderColor: '#081b4f',
                        color: '#000',
                        borderWidth: 2,
                        borderRadius: 10,
                        marginBottom: 5,
                        fontSize: 18,
                        textAlign:'center',
                        fontWeight:'bold'
                      }
});

