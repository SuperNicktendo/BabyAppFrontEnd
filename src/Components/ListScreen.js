import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import logo from './baby-logo.jpeg';
import DropDownPicker from 'react-native-dropdown-picker';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import Timetable from 'react-native-calendar-timetable';
import moment from 'moment';
import SleepCard from './Sleeps/SleepCard';
import {getSleeps, showSleeps} from '../Services/SleepService';
import {getBabies, showBaby} from '../Services/BabyService.js';
import {set} from 'express/lib/application';

export default function ListScreen({navigation}) {
  // Dropdown
  const isFocused = useIsFocused();
  const [data, setData] = useState(null);
  const [items, setItems] = useState(null);
  const [openDropDown, setOpenDropDown] = useState(false);
  const [items1, setItems1] = React.useState([]);
  const [baby, setBaby] = useState(null);
  // selecter data
  useEffect(() => {
    try {
      setItems1(null);
      getBabies().then(result => {
        setData(result);
        tempBabies = result.map((baby, index) => {
          return {label: baby.name, value: index, baby: baby};
        });
        setItems(tempBabies);
        makeBabyData();
      });
    } catch (err) {
      console.log('CATCH STATEMENT RAN FOR THE USE EFFECT IN BABY SCREEN.JS');
    }
  }, [isFocused, baby]);

  React.useEffect(() => {
    const cleanState = navigation.addListener('blur', () => {
      setBaby(null);
      setItems1(null);
    });

    return cleanState;
  }, [navigation]);

  // Chart
  const [from] = React.useState(moment().subtract(7, 'days').toDate());
  const [till] = React.useState(moment().toDate());
  const range = {from, till};

  const [babySleeps] = React.useState(getSleeps);

  const makeBabyData = () => {
    let sleeps = items[baby].baby.sleeps.map(sleep => {
      return {
        title: 'Sleep',
        startDate: sleep.startTime,
        endDate: sleep.endTime,
        id: sleep.id,
        babyId: items[baby].baby.id,
        navigation: navigation,
        sleepType: sleep.sleepType,
      };
    });

    let feeds = items[baby].baby.feeds.map(feed => {
      return {
        title: 'Feed',
        startDate: feed.time,
        endDate: moment(feed.time).add(0.5, 'hours'),
        id: feed.id,
        babyId: items[baby].baby.id,
        navigation: navigation,
        volume: feed.volume,
      };
    });

    let calanderData = sleeps.concat(feeds);
    setItems1(calanderData);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.navigate('Home')}>
        <Image source={logo} style={styles.logo} />
      </TouchableOpacity>
      <Text style={styles.listText}>Weekly Feed and Sleep data</Text>

      <Text style={styles.babyText}>
        Select which child's feed/sleep data to view
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

      {items1 ? (
        <ScrollView style={styles.scrollStyle}>
          <Timetable
            hourHeight={20}
            columnWidth={100}
            items={items1}
            cardComponent={SleepCard}
            range={range}
          />
        </ScrollView>
      ) : (
        <Text style={styles.chartLoading}> Choose a child </Text>
      )}

      <TouchableOpacity style={styles.buttonContainer}>
        <Text
          style={styles.buttonText}
          onPress={() => navigation.navigate('Summary')}>
          Summary Screen
        </Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.buttonContainer}>
        <Text
          style={styles.buttonText}
          onPress={() => navigation.navigate('TempSummary')}>
          Temperatures
        </Text>
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
    padding: 7,
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
  },
  listText: {
    color: '#fff',
    fontWeight: 'bold',
    marginTop: 10,
    fontSize: 25,
    textAlign: 'center',
  },
  buttonContainer: {
    elevation: 8,
    backgroundColor: '#FE8E0D',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
    marginBottom: 10,
  },
  buttonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
    alignSelf: 'center',
    textTransform: 'uppercase',
  },
  babyText: {
    color: '#fff',
    fontWeight: 'bold',
    marginTop: 15,
    fontSize: 14,
    textAlign: 'center',
  },
  loadingText: {
    color: '#fff',
    fontWeight: 'bold',
    marginTop: 15,
    fontSize: 18,
    textAlign: 'center',
  },
  chartLoading: {
    color: '#fff',
    fontWeight: 'bold',
    marginTop: 15,
    fontSize: 15,
    textAlign: 'center',
    paddingVertical: 190,
    paddingHorizontal: 130,
    marginBottom: 10,
    borderWidth: 3,
    borderColor: '#fff',
    borderRadius: 10,
  },
  scrollStyle: {
    backgroundColor: '#D3F5FB',
    paddingHorizontal: 15,
    marginHorizontal: 5,
    marginBottom: 5,
    marginTop: 4,
  },
});
