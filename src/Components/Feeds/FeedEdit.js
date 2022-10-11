import React, {useState, useCallback, useEffect} from 'react';
import {StyleSheet, View, Text, Image, TouchableOpacity} from 'react-native';
import DatePicker from 'react-native-date-picker';
import moment from 'moment';
import VerticalSlider from 'rn-vertical-slider';
import {updateFeed, deleteFeed} from '../../Services/FeedService';
import logo from '../baby-logo.jpeg';
import {useIsFocused} from '@react-navigation/native';

export default function FeedEdit({route, navigation}) {
  const isFocused = useIsFocused();
  const {item} = route.params;
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [finalValue, setFinalValue] = useState(0);

  useEffect(() => {
    setDate(new Date(item.startDate));
    setFinalValue(item.volume);
  }, [isFocused]);

  const saveFeed = async () => {
    newFeed = {
      id: item.id,
      time: moment(date).add(1, 'hours'),
      volume: finalValue,
      baby: {
        id: item.babyId,
      },
    };
    await updateFeed(item.babyId, newFeed);
    navigation.navigate('List');
  };

  const deleteSingleFeed =  async () => {
    await deleteFeed(item.id);
    navigation.navigate('List');
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.navigate('Home')}>
        <Image source={logo} style={styles.logo} />
      </TouchableOpacity>
      <Text style={styles.foodText1}>Time of Feed: </Text>

      <>
        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={() => setOpen(true)}>
          <Text style={styles.buttonText}>Enter Time</Text>
        </TouchableOpacity>
        <DatePicker
          modal
          open={open}
          date={date}
          onConfirm={date => {
            setOpen(false);
            setDate(date);
          }}
          onCancel={() => {
            setOpen(false);
          }}
        />
      </>

      <Text style={styles.foodText2}>
        {moment(date).utcOffset('+0100').format('MMM Do, h:mm a')} oz
      </Text>

      <VerticalSlider
        value={0}
        disabled={false}
        min={0}
        max={12}
        onChange={(value: number) => {
          setFinalValue(value);
        }}
        width={50}
        height={300}
        step={0.5}
        borderRadius={5}
        minimumTrackTintColor={'#18C0EA'}
        maximumTrackTintColor={'#BAE6F2'}
      />
      <Text style={styles.foodText3}>Amount: {finalValue} oz</Text>

      <TouchableOpacity style={styles.buttonContainer} onPress={saveFeed}>
        <Text style={styles.buttonText}>Save</Text>
      </TouchableOpacity>
      
      <TouchableOpacity
        style={styles.buttonContainer}
        onPress={deleteSingleFeed}>
        <Text style={styles.buttonText}>Delete</Text>
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
  foodText1: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 30,
    textAlign: 'center',
    marginBottom: 5,
  },
  foodText2: {
    color: '#fff',
    fontWeight: 'bold',
    marginTop: 10,
    fontSize: 30,
    textAlign: 'center',
    marginBottom: 15,
  },
  foodText3: {
    color: '#fff',
    fontWeight: 'bold',
    marginTop: 10,
    fontSize: 30,
    textAlign: 'center',
    marginBottom: 5,
  },
  buttonContainer: {
    elevation: 8,
    backgroundColor: '#FE8E0D',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
    marginTop: 10,
  },
  buttonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
    alignSelf: 'center',
    textTransform: 'uppercase',
  },
});
