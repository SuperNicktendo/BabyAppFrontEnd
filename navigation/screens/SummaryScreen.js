import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Text, Image, Button, ScrollView, useWindowDimensions, Dimensions} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Timetable from 'react-native-calendar-timetable';
import moment from 'moment';
import MyItemCard from '../CardComponent';
import { getSleeps } from '../SleepService';
import { showBaby } from '../BabyService';

const window = Dimensions.get("window");
const screen = Dimensions.get("screen");


export default function SummaryScreen({navigation}){

  const [dimensions, setDimensions] = useState({ window, screen });

  useEffect(() => {
    const subscription = Dimensions.addEventListener(
      "change",
      ({ window, scree }) => {
        setDimensions({ window, screen });
      }
    );
    return () => subscription?.remove();
  });

  // const [date] = React.useState(new Date());
  // const [from] = React.useState(moment().subtract(3, 'days').toDate());
  // const [till] = React.useState(moment().add(3, 'days').toISOString());
  const [from] = React.useState(moment().subtract(3, 'days').toDate());
  const [till] = React.useState(moment().toDate());
  const range = {from, till};

  // const [baby, setBaby] = React.useState(showBaby(2));
  // console.log(baby.name);

  // const [sleeps] = React.useState(getSleeps);
  // console.log(JSON.stringify(sleeps)); 

  const [items] = React.useState([
    // {
    //   title: 'Test Sleep',
    //   startDate: moment().subtract(1, 'hour').toDate(),
    //   endDate: moment().add(1, 'hour').toDate(),
    // },
    // {
    //   title: 'Test Sleep',
    //   startDate: new Date("2022-09-24 08:55:00"),
    //   endDate: new Date("2022-09-24 09:55:00")
    // },
    {
      title: 'Test Sleep',
      startDate: moment('2022-09-29 08:55:00').toDate(),
      endDate: moment('2022-09-29 09:55:00').toDate()
    },
    {
      title: 'Test Sleep',
      startDate: moment('2022-09-28 20:06:00').toDate(),
      endDate: moment('2022-09-29 06:30:00').toDate()
    },
    {
      title: 'Test Sleep',
      startDate: moment('2022-09-26 18:25:00').toDate(),
      endDate: moment('2022-09-27 04:53:00').toDate()
    },
  ]);

  console.log(items);

  // const dimensions = useWindowDimensions();
  // const windowWidth = Dimensions.get('window').width;
  // const windowHeight = Dimensions.get('window').height;

  

    return (
        <View style={styles.container}>
        <Text style={styles.dummyText}>
            Summary Screen
        </Text>

        <ScrollView>
          <Timetable 
            style={styles.timetable}
            items={items}
            cardComponent={MyItemCard}

            // date={date}
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
    timetable: {
      width: window.width,
      height: window.height,
      justifyContent: 'center',
      alignItems: 'center'
    }
  });