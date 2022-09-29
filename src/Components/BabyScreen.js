
import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Text, Image, Button, TouchableOpacity} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useIsFocused} from "@react-navigation/native";
import {getBabies} from '../Services/BabyService.js'
import SelectDropdown from 'react-native-select-dropdown'
import DropDownPicker from 'react-native-dropdown-picker';
import logo from './baby-logo.jpeg'

export default function BabyScreen({navigation}) {
  
  const isFocused = useIsFocused()


  const [data, setData ] = useState(null);
  const [babies, setBabies] = useState(null);
  const [babyName, setBabyName] = useState(null);
  const [baby, setBaby] = useState(null);
  const [items, setItems] = useState(null)
  const [openDropDown, setOpenDropDown] = useState(false);
 
  
  
  useEffect(()=>{

    try{
      // console.log("this page send a fetch request")
    getBabies().then((result)=>{
      setData(result);
      console.log(result)
      tempBabies = result.map(baby => {
        return {label: baby.name, value: baby} })
      setItems(tempBabies)
      // console.log(tempBabies)
    })}catch(err){
      console.log("CATCH STATEMENT RAN FOR THE USE EFFECT IN BABY SCREEN.JS")
    }
  }, [isFocused]);

// console.log(baby)
  return (
    <View style={styles.container}>
    
    <TouchableOpacity onPress={()=> navigation.navigate('Home')}>
        <Image source={logo} style={styles.logo} />
   </TouchableOpacity>
   <Text style={styles.babyText}>Select child and log a feed or sleep entry</Text>

{items ?<DropDownPicker
                    style={styles.selector}
                    open={openDropDown}
                    value={baby}
                    items={items}
                    setOpen={setOpenDropDown}
                    setValue={setBaby}
                    setItems={setItems}
             />: <Text>loading</Text>}

      
      
      <TouchableOpacity
        style={styles.buttonContainer1}
        onPress={() => navigation.navigate('Food', {baby})}>
          <Text style={styles.buttonText}>Feed</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.buttonContainer2}
        onPress={() => navigation.navigate('Sleep' , {baby})}>
          <Text style={styles.buttonText}>Sleep</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#4F6C73',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  logo: {
    width: 225,
    height: 75,
    marginBottom: 10,
    padding: 100,
    borderColor: 'black',
    borderWidth: 5,
    borderRadius: 305 /2

  },
  babyText: {
    color: '#fff',
    fontWeight: 'bold',
    marginTop: 15,
    fontSize: 18,
    textAlign: 'center',
  },
  buttonContainer1: {
    elevation: 8,
    backgroundColor: "#FE8E0D",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 109,
    marginBottom: 10,
    marginTop: 25,
  },
  buttonContainer2: {
    elevation: 8,
    backgroundColor: "#18C0EA",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 101,
    marginBottom: 10,
  },
  buttonText: {
    fontSize: 25,
    padding: 45,
    color: "#fff",
    fontWeight: "bold",
    alignSelf: "center",
    textTransform: "uppercase",
  },
  selector: {
    marginTop: 15,
  }
});
