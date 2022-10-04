import {StyleSheet, View, Text, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import logo from './baby-logo.jpeg';

import Video from './Video.js';

export default function MediaScreen({navigation}) {
  return (
    <View style={styles.container}>
      <View style={styles.container2}>
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <Image source={logo} style={styles.logo} />
        </TouchableOpacity>
      </View>
      <Text style={styles.result}>Pink Noise</Text>
      <Video videoId={'RA8gajb1KOU'} />
      <Text style={styles.result}>Sensory Video</Text>

      <Video videoId={'HPuD7w_TbSc'} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#4F6C73',
    padding: 10,
    paddingHorizontal: 3,
  },
  container2: {
    flex: 1,
    backgroundColor: '#4F6C73',
    padding: 10,
    paddingHorizontal: 3,
    alignItems: 'center',
  },
  logo: {
    width: 15,
    height: 5,
    marginTop: 4,
    marginBottom: 3,
    padding: 60,
    borderColor: 'black',
    borderWidth: 2.5,
    borderRadius: 200 / 2,
    alignItem: 'center',
  },

  result: {
    justifyContent: 'flex-start',
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 20,
    padding: 2,
    textAlign: 'center',
  },
});
