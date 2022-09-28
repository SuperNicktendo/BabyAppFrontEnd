import React, { useState } from 'react'
import { StyleSheet, View, Text, Image, Button } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DropDownPicker from 'react-native-dropdown-picker';
import DatePicker from 'react-native-date-picker'
import moment from 'moment'



export default function SleepForm(){
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [openStart, setStartOpen] = useState(false);
    const [openEnd, setEndOpen] = useState(false);
    const [items, setItems] = useState([{label: 'Night', value: 'night'}, {label: 'Nap', value: 'nap'}]);
    const [openDropDown, setOpenDropDown] = useState(false);
    const [value, setValue] = useState(null);




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
           
           <Text style={styles.dummyText}>Start Time is : {moment(startDate).format('MMM Do, h:mm a')}</Text>

         

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
           <Text style={styles.dummyText}>End Time is : {moment(endDate).format('MMM Do, h:mm a')}
           </Text>

           <DropDownPicker
                    open={openDropDown}
                    value={value}
                    items={items}
                    setOpen={setOpenDropDown}
                    setValue={setValue}
                    setItems={setItems}
             />




           <Button
               title="Save"
            />


        </View>
   )
}



const styles = StyleSheet.create({
    sleepForm:{
        alignSelf: 'stretch',
    }
})