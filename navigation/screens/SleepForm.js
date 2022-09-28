import React, { useState } from 'react'
import { StyleSheet, View, Text, Image, Button } from 'react-native'
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
             <Button title="Start Time" onPress={() => setStartOpen(true)} />
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

         

<Button title="End Time" onPress={() => setEndOpen(true)} />
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




           <Button
               title="Save"
               onPress={saveSleep}
            />


        </View>
   )
}



const styles = StyleSheet.create({
    sleepForm:{
        alignSelf: 'stretch',
    }
})