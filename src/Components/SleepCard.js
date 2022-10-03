import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Pressable,
  TouchableOpacity,
  Text,
  Image,
  Button,
  ScrollView,
} from 'react-native';

export default function SleepCard({style, item, dayIndex, daysTotal}) {
  colorToBe = item.title === 'Sleep' ? '#18C0EA' : '#FE8E0D';

  const getDataForEdit = () => {
    if (item.title === 'Feed') {
      item.navigation.navigate('FeedEdit', {item});
    } else if (item.title === 'Sleep') {
      item.navigation.navigate('SleepEdit', {item});
    }
  };

  return (
    <View
      style={{
        ...style,
        backgroundColor: colorToBe,
        borderRadius: 10,
        elevation: 5,
        display: 'flex',
      }}>
      <Pressable style={{flex: 1}} onPress={getDataForEdit}></Pressable>
    </View>
  );
}
