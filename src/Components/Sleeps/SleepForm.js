import React, {useState} from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import DatePicker from 'react-native-date-picker';
import moment from 'moment';
import {postSleep} from '../../Services/SleepService.js';
import ListScreen from '../ListScreen';

const listName = 'List';

export default function SleepForm({navigation, baby}) {
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

  const saveSleep = async () => {
    tempSleep = {
      startTime: moment(startDate).add(1, 'hours'),
      endTime: moment(endDate).add(1, 'hours'),
      sleepType: sleepValue,
      baby: {
        id: baby,
      },
    };
    await postSleep(tempSleep);
    navigation.navigate('Babies');
  };

  return (
    <View style={styles.container}>
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
      placeholder='Choose a sleep type'
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
});
