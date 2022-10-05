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
import {useIsFocused} from '@react-navigation/native';
import moment from 'moment';
import {getBabies} from '../Services/BabyService.js';
import {deleteTemp} from '../Services/TemperatureService';

export default function TemperatureScreen({navigation}) {
  // Dropdown
  const isFocused = useIsFocused();
  const [data, setData] = useState(null);
  const [items, setItems] = useState(null);
  const [openDropDown, setOpenDropDown] = useState(false);
  const [temperatureArray, setTemperatureArray] = React.useState([]);
  const [baby, setBaby] = useState(null);

  // selecter data
  useEffect(() => {
    try {
      setTemperatureArray([]);
      getBabies().then(result => {
        setData(result);
        tempBabies = result.map((baby, index) => {
          return {label: baby.name, value: index, baby: baby};
        });
        setItems(tempBabies);
        makeBabyData();
      });
    } catch (err) {}
  }, [isFocused, baby]);

  React.useEffect(() => {
    const cleanState = navigation.addListener('blur', () => {
      setBaby(null);
      setTemperatureArray([]);
    });

    return cleanState;
  }, [navigation]);

  const makeBabyData = () => {
    if (baby != null && baby != undefined) {
      let temps = items[baby].baby.temperatures.map(temperature => {
        return {
          time: temperature.time,
          id: temperature.id,
          babyId: baby,
          temperature: temperature.temperature,
        };
      });

      setTemperatureArray(
        temps.sort((a, b) =>
          moment(a.time, 'DD-MM-YYYY').diff(moment(b.time, 'DD-MM-YYYY')),
        ),
      );
    }
  };

  const DeleteTemp = id => e => {
    setTemperatureArray(temperatureArray.filter(temp => temp.id !== id));
    deleteTemp(id);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.navigate('Home')}>
        <Image source={logo} style={styles.logo} />
      </TouchableOpacity>
      <Text style={styles.listText}>Temperature data</Text>

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

      {temperatureArray.length ? (
        <ScrollView>
          {temperatureArray.map((temp, index) => {
            return (
              <View style={styles.summaryContainer1}>
                <Text style={styles.summaryText}>
                  {moment(temp.time).format('ddd/DD/MMM HH:MM')} :{' '}
                  {temp.temperature}°C
                </Text>

                <TouchableOpacity index={index} onPress={DeleteTemp(temp.id)}>
                  <Text>Delete</Text>
                </TouchableOpacity>
              </View>
            );
          })}
        </ScrollView>
      ) : (
        <Text>loading...</Text>
      )}
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
  summaryContainer1: {
    flex: 1,
    backgroundColor: '#4F6C73',
    marginBottom: 5,
    alignItems: 'center',
    padding: 20,
    borderWidth: 3,
    borderColor: '#fff',
    borderRadius: 10,
    marginTop: 10,
  },
  summaryText: {
    justifyContent: 'flex-start',
    color: '#fff',
    fontWeight: 'bold',
    padding: 3,
  },
});
