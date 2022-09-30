import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Text, Image, Button, ScrollView, useWindowDimensions, Dimensions} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Timetable from 'react-native-calendar-timetable';
import moment from 'moment';
import SleepCard from './SleepCard';
import FeedCard from './FeedCard';
import { getSleeps, showSleeps } from '../Services/SleepService';

export default function SummaryScreen({navigation}){

  const [from] = React.useState(moment().subtract(3, 'days').toDate());
  const [till] = React.useState(moment().toDate());
  const range = {from, till};

  const [babySleeps] = React.useState(getSleeps);
  console.log(babySleeps);
  console.log(JSON.stringify(babySleeps));

  const [items] = React.useState([
    {
      title: 'sleep',
      startDate: moment('2022-09-29 08:55:00').toDate(),
      endDate: moment('2022-09-29 09:55:00').toDate()
    },
    {
      title: 'sleep',
      startDate: moment('2022-09-28 20:06:00').toDate(),
      endDate: moment('2022-09-29 06:30:00').toDate()
    },
    {
      title: 'sleep',
      startDate: moment('2022-09-26 18:25:00').toDate(),
      endDate: moment('2022-09-27 04:53:00').toDate()
    },
    {
      title: 'feed',
      startDate: moment('2022-09-29 10:24:00').toDate(),
      endDate: moment('2022-09-29 10:26:00').toDate()
    }
  ]);

    return (
        <View style={styles.container}>
        <Text style={styles.dummyText}>
            Summary Screen
        </Text>

        <ScrollView>
          <Timetable
            hourHeight={50}
            columnWidth={120}
            items={items}
            cardComponent={SleepCard}
            range={range}
          />
        </ScrollView>
        </View>
    )
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
    redStyle: {
      backgroundColor: 'red'
    }
  });