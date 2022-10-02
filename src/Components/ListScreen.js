import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Text, Image, TouchableOpacity, ScrollView, useWindowDimensions, Dimensions} from 'react-native';
import logo from './baby-logo.jpeg'
import Dropdown from './Dropdown.js';
import DropDownPicker from 'react-native-dropdown-picker';
import {useIsFocused} from "@react-navigation/native";

import Timetable from 'react-native-calendar-timetable';
import moment from 'moment';
import SleepCard from './SleepCard';

import { getSleeps, showSleeps } from '../Services/SleepService';
import {getBabies} from '../Services/BabyService.js'


export default function ListScreen({navigation}){

  // Dropdown
  const isFocused = useIsFocused()
  const [data, setData ] = useState(null);
  const [babies, setBabies] = useState(null);
  const [babyName, setBabyName] = useState(null);
  const [baby, setBaby] = useState(null);
  const [items, setItems] = useState(null)
  const [openDropDown, setOpenDropDown] = useState(false);
  const [items1, setItems1] = React.useState([])


  // selecter data
  useEffect(()=>{
    try{
    getBabies().then((result)=>{
      setData(result);
      tempBabies = result.map(baby => {
        return {label: baby.name, value: baby} })
      setItems(tempBabies)
    })}catch(err){
      console.log("CATCH STATEMENT RAN FOR THE USE EFFECT IN BABY SCREEN.JS")
    }
  }, [isFocused]);

// calnder data
  useEffect(()=> {

    if(baby != null){
      console.log(baby)
    
      sleeps = baby.sleeps.map((sleep) => {
          return {title: "sleep", startDate: sleep.startTime, endDate: sleep.endTime}
        })
        feeds = baby.feeds.map((feed) => {
          return {title: "feed" ,startDate: feed.time, endDate: feed.time}
        })
        calanderData = sleeps.concat(feeds)
        console.log(calanderData)
        setItems1(calanderData)
    }
  }, [baby, isFocused])
  
  // Chart
  const [from] = React.useState(moment().subtract(3, 'days').toDate());
  const [till] = React.useState(moment().toDate());
  const range = {from, till};

  const [babySleeps] = React.useState(getSleeps);
  console.log(babySleeps);
  console.log(JSON.stringify(babySleeps));





    return (
      <View style={styles.container}>
            <TouchableOpacity onPress={()=> navigation.navigate('Home')}>
              <Image source={logo} style={styles.logo} />
            </TouchableOpacity>
            <Text style={styles.listText}>Weekly Food and Sleep data</Text>
            
            <Text style={styles.babyText}>Select child and log a feed or sleep entry</Text>

    {items ?<DropDownPicker
                    open={openDropDown}
                    value={baby}
                    items={items}
                    setOpen={setOpenDropDown}
                    setValue={setBaby}
                    setItems={setItems}
             />: <Text style={styles.loadingText}>Loading...</Text>}

        <ScrollView style={styles.scrollStyle}>
          <Timetable
            hourHeight={20}
            columnWidth={100}
            items={items1}
            cardComponent={SleepCard}
            range={range}
          />
        </ScrollView>
        
        <TouchableOpacity style={styles.buttonContainer}>
        <Text style={styles.buttonText} onPress={()=> navigation.navigate('Summary')}>
            Summary Screen
        </Text>
          </TouchableOpacity> 
        </View>
        
    )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#4F6C73',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 7
  },
  logo: {
    width: 15,
    height: 5,
    marginTop:4,
    marginBottom: 3,
    padding: 60,
    borderColor: 'black',
    borderWidth: 2.5,
    borderRadius: 200 /2
  },
  listText: {
    color: '#fff',
    fontWeight: 'bold',
    marginTop: 10,
    fontSize: 25,
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
  },
  babyText: {
    color: '#fff',
    fontWeight: 'bold',
    marginTop: 15,
    fontSize: 14,
    textAlign: 'center'
  },
  loadingText: {
    color: '#fff',
    fontWeight: 'bold',
    marginTop: 15,
    fontSize: 18,
    textAlign: 'center',
  },
  scrollStyle: {
    backgroundColor: '#D3F5FB',
    paddingHorizontal: 15,
    marginHorizontal: 5,
    marginBottom: 5,
    marginTop: 4,
  }
});