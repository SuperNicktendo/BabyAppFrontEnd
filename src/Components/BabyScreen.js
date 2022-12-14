import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Text, Image, TouchableOpacity} from 'react-native';

import {useIsFocused} from '@react-navigation/native';
import {getBabies} from '../Services/BabyService.js';
import DropDownPicker from 'react-native-dropdown-picker';
import logo from './baby-logo.jpeg';

export default function BabyScreen({navigation}) {
  const isFocused = useIsFocused();
  const [baby, setBaby] = useState(null);
  const [items, setItems] = useState(null);
  const [openDropDown, setOpenDropDown] = useState(false);

  useEffect(() => {
    try {
      getBabies().then(result => {
        const mappedBabies = result.map(baby => {
          return {label: baby.name, value: baby.id};
        });
        setItems(mappedBabies);
      });
    } catch (err) {
      console.log('CATCH STATEMENT RAN FOR THE USE EFFECT IN BABY SCREEN.JS');
    }
  }, [isFocused]);

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.navigate('Home')}>
        <Image source={logo} style={styles.logo} />
      </TouchableOpacity>

      <Text style={styles.babyText}>
        Select child and log a feed or sleep entry
      </Text>

      {items ? (
        <DropDownPicker
          placeholder="Select child"
          open={openDropDown}
          value={baby}
          items={items}
          setOpen={setOpenDropDown}
          setValue={setBaby}
          setItems={setItems}
        />
      ) : (
        <Text style={styles.loadingText}>Loading...</Text>
      )}

      <TouchableOpacity
        style={styles.buttonContainer1}
        onPress={() => navigation.navigate('Food', {baby})}>
        <Text style={styles.buttonText}>Feed</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.buttonContainer2}
        onPress={() => navigation.navigate('Sleep', {baby})}>
        <Text style={styles.buttonText}>Sleep</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.buttonContainer3}
        onPress={() => navigation.navigate('Temp', {baby})}>
        <Text style={styles.buttonText}>Temp</Text>
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
    borderRadius: 305 / 2,
  },
  loadingText: {
    color: '#fff',
    fontWeight: 'bold',
    marginTop: 15,
    fontSize: 18,
    textAlign: 'center',
  },
  babyText: {
    color: '#fff',
    fontWeight: 'bold',
    marginTop: 15,
    fontSize: 14,
    textAlign: 'center',
  },
  buttonContainer1: {
    elevation: 8,
    backgroundColor: '#FE8E0D',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 109,
    marginBottom: 10,
    marginTop: 25,
  },
  buttonContainer2: {
    elevation: 8,
    backgroundColor: '#18C0EA',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 101,
    marginBottom: 10,
  },
  buttonContainer3: {
    elevation: 8,
    backgroundColor: '#ea1818',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 101,
    marginBottom: 10,
  },
  buttonText: {
    fontSize: 25,
    padding: 32,
    color: '#fff',
    fontWeight: 'bold',
    alignSelf: 'center',
    textTransform: 'uppercase',
  },
  selector: {
    marginTop: 15,
  },
});
