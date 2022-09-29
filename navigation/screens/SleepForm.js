import React, { useState } from 'react'
import { StyleSheet, View, Text, Image, Button, TouchableOpacity } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DropDownPicker from 'react-native-dropdown-picker';
import DatePicker from 'react-native-date-picker'
import moment from 'moment'
import {postSleep} from '../SleepService.js'
import ListScreen from './ListScreen';


const listName = "List";

export default function SleepForm({navigation, baby}){
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [openStart, setStartOpen] = useState(false);
    const [openEnd, setEndOpen] = useState(false);
    const [items, setItems] = useState([{label: 'Night', value: 'NIGHT'}, {label: 'Nap', value: 'NAP'}]);
    const [openDropDown, setOpenDropDown] = useState(false);
    const [sleepValue, setSleepValue] = useState(null);
 
  console.log(baby)

    const  saveSleep =async () => {
       tempSleep = {
        "startTime": startDate ,
        "endTime": endDate,
        "sleepType": sleepValue,
        "baby": {
          "id": baby.id,
      }
    }

    console.log(tempSleep)
    postSleep(tempSleep);
    navigation.navigate('List')
    }




    return (
        <View style={styles.container}>
           <Text style={styles.dummyText}>Time of Sleep: </Text>

           <>
             <TouchableOpacity style={styles.buttonContainer} onPress={() => setStartOpen(true)}>
                <Text style={styles.buttonText}>Start Time</Text>
             </TouchableOpacity> 
             <DatePicker
               modal
               open={openStart}
               date={startDate}
               onConfirm={(startDate) => {
                 setStartOpen(false)
                 setStartDate(startDate)
               }}
               onCancel={() => {
                 setStartOpen(false)
               }}
             />
           
           <Text style={styles.dummyText}>Start Time is : {moment(startDate).utcOffset("+0100").format('MMM Do, h:mm a')}</Text>

         

            <TouchableOpacity style={styles.buttonContainer} onPress={() => setEndOpen(true)}>
              <Text style={styles.buttonText}>End Time</Text>
            </TouchableOpacity>
             <DatePicker
               modal
               open={openEnd}
               date={endDate}
               onConfirm={(endDate) => {
                 setEndOpen(false)
                 setEndDate(endDate)
               }}
               onCancel={() => {
                 setEndOpen(false)
               }}
             />
           </>
           <Text style={styles.dummyText}>End Time is : {moment(endDate).utcOffset("+0100").format('MMM Do, h:mm a')}
           </Text>

           <DropDownPicker
                    open={openDropDown}
                    value={sleepValue}
                    items={items}
                    setOpen={setOpenDropDown}
                    setValue={setSleepValue}
                    setItems={setItems}
             />

           <TouchableOpacity
               style={styles.buttonContainer}
               onPress={saveSleep}>
                <Text style={styles.buttonText}>Save</Text>
          </TouchableOpacity>

        </View>
   )
}



const styles = StyleSheet.create({
    sleepForm:{
        alignSelf: 'stretch',
    },
    buttonContainer: {
      elevation: 8,
      backgroundColor: "#009688",
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
})