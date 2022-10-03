import logo from '../baby-logo.jpeg';
import React, {useState, useEffect} from 'react';
import {StyleSheet, Image, View, Text, TouchableOpacity} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import DatePicker from 'react-native-date-picker';
import moment from 'moment';
import {updateSleep, deleteSleep} from '../Services/SleepService.js';
import ListScreen from './ListScreen';
import {useIsFocused} from '@react-navigation/native';

export default function SleepEdit({route, navigation}) {
  const isFocused = useIsFocused();
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [openStart, setStartOpen] = useState(false);
  const [openEnd, setEndOpen] = useState(false);
  const [items, setItems] = useState([
    {label: 'Night', value: 'NIGHT'},
    {label: 'Nap', value: 'NAP'},
  ]);
  const [openDropDown, setOpenDropDown] = useState(false);
  const [sleepValue, setSleepValue] = useState(null);
  const {item} = route.params;

  useEffect(() => {
    setStartDate(new Date(item.startDate));
    setEndDate(new Date(item.endDate));
    setSleepValue(item.sleepType);
  }, [isFocused]);

  const saveSleep = async () => {
    tempSleep = {
      id: item.id,
      startTime: moment(startDate).add(1, 'hours'),
      endTime: moment(endDate).add(1, 'hours'),
      sleepType: sleepValue,
      baby: {
        id: item.babyId,
      },
    };
    await updateSleep(item.babyId, tempSleep);
    navigation.navigate('List');
  };

  const deleteSingleSleep = async () => {
    deleteSleep(item.id);
    navigation.navigate('List');
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.navigate('Home')}>
        <Image source={logo} style={styles.logo} />
      </TouchableOpacity>
      <Text style={styles.sleepText}>Record Sleep</Text>

      <>
        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={() => setStartOpen(true)}>
          <Text style={styles.buttonText}>Went down at...</Text>
        </TouchableOpacity>
        <DatePicker
          modal
          open={openStart}
          date={startDate}
          onConfirm={startDate => {
            setStartOpen(false);
            setStartDate(startDate);
          }}
          onCancel={() => {
            setStartOpen(false);
          }}
        />

        <Text style={styles.sleepFormText}>
          {' '}
          {moment(startDate).utcOffset('+0100').format('MMM Do, h:mm a')}
        </Text>

        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={() => setEndOpen(true)}>
          <Text style={styles.buttonText}>Woke up at...</Text>
        </TouchableOpacity>
        <DatePicker
          modal
          open={openEnd}
          date={endDate}
          onConfirm={endDate => {
            setEndOpen(false);
            setEndDate(endDate);
          }}
          onCancel={() => {
            setEndOpen(false);
          }}
        />
      </>
      <Text style={styles.sleepFormText2}>
        {moment(endDate).utcOffset('+0100').format('MMM Do, h:mm a')}
      </Text>
      <Text style={styles.sleepFormText3}>What type of sleep was it?</Text>

      <DropDownPicker
        open={openDropDown}
        value={sleepValue}
        items={items}
        setOpen={setOpenDropDown}
        setValue={setSleepValue}
        setItems={setItems}
      />

      <TouchableOpacity style={styles.saveButtonContainer} onPress={saveSleep}>
        <Text style={styles.buttonText}>Save</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.saveButtonContainer}
        onPress={deleteSingleSleep}>
        <Text style={styles.buttonText}>Delete</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  sleepForm: {
    flex: 1,
    alignItems: 'center',
  },
  sleepFormText: {
    color: '#fff',
    fontWeight: 'bold',
    marginTop: 10,
    fontSize: 22,
    textAlign: 'center',
    paddingBottom: 5,
  },
  sleepFormText2: {
    color: '#fff',
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 10,
    fontSize: 22,
    textAlign: 'center',
    paddingBottom: 5,
  },
  sleepFormText3: {
    color: '#fff',
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 0,
    fontSize: 22,
    textAlign: 'center',
    paddingBottom: 5,
  },
  buttonContainer: {
    elevation: 8,
    backgroundColor: '#FE8E0D',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  saveButtonContainer: {
    elevation: 8,
    backgroundColor: '#FE8E0D',
    marginTop: 10,
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  buttonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
    alignSelf: 'center',
    textTransform: 'uppercase',
  },
  container: {
    flex: 1,
    backgroundColor: '#4F6C73',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 50,
  },
  logo: {
    width: 15,
    height: 5,
    marginBottom: 7,
    padding: 60,
    borderColor: 'black',
    borderWidth: 2.5,
    borderRadius: 200 / 2,
  },
  sleepText: {
    color: '#fff',
    fontWeight: 'bold',
    marginTop: 15,
    marginBottom: 15,
    fontSize: 30,
    textAlign: 'center',
  },
});
