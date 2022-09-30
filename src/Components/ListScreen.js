import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Text, Image, TouchableOpacity, ScrollView, useWindowDimensions, Dimensions} from 'react-native';
import logo from './baby-logo.jpeg'
import Dropdown from './Dropdown.js';

import Timetable from 'react-native-calendar-timetable';
import moment from 'moment';
import SleepCard from './SleepCard';
import { getSleeps, showSleeps } from '../Services/SleepService';

export default function ListScreen({navigation}){
         
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
            <TouchableOpacity onPress={()=> navigation.navigate('Home')}>
              <Image source={logo} style={styles.logo} />
            </TouchableOpacity>
            <Text style={styles.listText}>Weekly Food and Sleep data</Text>
                       <Dropdown/>
        <View style={styles.container}>
        <Text style={styles.dummyText}>
            Summary Screen
        </Text>

        <ScrollView>
          <Timetable
            hourHeight={20}
            columnWidth={120}
            items={items}
            cardComponent={SleepCard}
            range={range}
          />
        </ScrollView>
        </View>
        </View>
    )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#4F6C73',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 15,
    height: 5,
    marginBottom: 7,
    padding: 60,
    borderColor: 'black',
    borderWidth: 2.5,
    borderRadius: 200 /2
  },
  listText: {
    color: '#fff',
    fontWeight: 'bold',
    marginTop: 15,
    fontSize: 30,
    textAlign: 'center'
  },
  buttonContainer: {
    elevation: 8,
    backgroundColor: "#FE8E0D",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12
  },
  buttonText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
    alignSelf: "center",
    textTransform: "uppercase"
  }
});