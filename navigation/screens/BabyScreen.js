
import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Text, Image, Button, TouchableOpacity} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {getBabies} from '../BabyService.js'
import SelectDropdown from 'react-native-select-dropdown'
import DropDownPicker from 'react-native-dropdown-picker';

export default function BabyScreen({navigation}) {


  const [data, setData ] = useState(null);
  const [babies, setBabies] = useState(null);
  const [babyName, setBabyName] = useState(null);
  const [baby, setBaby] = useState(null);
  const [items, setItems] = useState(null)
  const [openDropDown, setOpenDropDown] = useState(false);
 
  
  
  useEffect(()=>{
    try{
    getBabies().then((result)=>{
      setData(result);
      tempBabies = result.map(baby => {
        return {label: baby.name, value: baby} })
      setItems(tempBabies)
      console.log(tempBabies)
    })}catch(err){
      console.lot("nope")
    }
  }, []);

console.log(baby)
  return (
    <View style={styles.container}>


{items ?<DropDownPicker
                    open={openDropDown}
                    value={baby}
                    items={items}
                    setOpen={setOpenDropDown}
                    setValue={setBaby}
                    setItems={setItems}
             />: <Text>loading</Text>}

             





      <Text style={styles.dummyText}>Baby Screen</Text>
      
      <TouchableOpacity
        style={styles.buttonContainer}
        onPress={() => navigation.navigate('Food', {baby})}>
          <Text style={styles.buttonText}>Food</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.buttonContainer}
        onPress={() => navigation.navigate('Sleep' , {baby})}>
          <Text style={styles.buttonText}>Sleep</Text>
      </TouchableOpacity>
    </View>
  );
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
    textAlign: 'center',
  },
  buttonContainer: {
    elevation: 8,
    backgroundColor: "#009688",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
    marginBottom: 5,
  },
  buttonText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
    alignSelf: "center",
    textTransform: "uppercase"
  }
});
