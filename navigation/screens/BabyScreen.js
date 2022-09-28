import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Text, Image, Button} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {getBabies} from '../BabyService.js'
import SelectDropdown from 'react-native-select-dropdown'

export default function BabyScreen({navigation}) {


  const [data, setData ] = useState(null);

  useEffect(()=>{
    try{
    getBabies().then((result)=>{
      setData(result);
    
    })}catch(err){
      console.lot("nope")
    }
  }, []);


  const babies = ['baby1', 'baby2'];

  return (
    <View style={styles.container}>

<SelectDropdown
	data={babies}
	onSelect={(selectedItem, index) => {
		console.log(selectedItem, index)
	}}
	buttonTextAfterSelection={(selectedItem, index) => {
		return selectedItem
	}}
	rowTextForSelection={(item, index) => {
		return item
	}}
/>

      <Text style={styles.dummyText}>Baby Screen</Text>
    {data ? <Text>{data[0].name}</Text> :<Text> loading </Text> } 
      
      <Button
        style={styles.button}
        title="Food"
        onPress={() => navigation.navigate('Food')}
      />

      <Button
        style={styles.button}
        title="Sleep"
        onPress={() => navigation.navigate('Sleep')}
      />
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
  logo: {
    width: 305,
    height: 159,
    marginBottom: 10,
  },
  button: {
    margin: 10,
    width: 80,
    color: '#f34fg6',
  },
});
