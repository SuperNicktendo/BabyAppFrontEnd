import React from 'react';
import {StyleSheet, View} from 'react-native';

export default function SleepFormContainer() {
  return <View style={styles.form}></View>;
}

const styles = StyleSheet.create({
  form: {
    flex: 1,
    justifyContent: 'center',
    paddingLeft: 60,
    paddingRight: 60,
  },
});
