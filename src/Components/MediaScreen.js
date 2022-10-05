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
      <Text style={styles.videoText}>Pink Noise</Text>
      <View style={styles.video}>
      <Video style={styles.video} videoId={'RA8gajb1KOU'} />
      </View>
      <Text style={styles.videoText}>Sensory Video</Text>
      <View style={styles.video}>
      <Video  videoId={'HPuD7w_TbSc'} />
      </View>
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
    marginTop: 20,
    padding: 60,
    borderColor: 'black',
    borderWidth: 2.5,
    borderRadius: 200 / 2,
    alignItem: 'center',
  },
  videoText: {
    justifyContent: 'flex-start',
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 30,
    padding: 12,
    textAlign: 'center',
  },
  video: {
    marginBottom: 100,
    paddingBottom: 120
  }
});
