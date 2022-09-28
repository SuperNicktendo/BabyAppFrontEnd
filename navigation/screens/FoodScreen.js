import React, { useState, useCallback } from 'react';
import { StyleSheet, View, Text, Image, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DatePicker from 'react-native-date-picker';
import moment from 'moment';
import VerticalSlider from 'rn-vertical-slider';



export default function FoodScreen({navigation}){
    const [date, setDate] = useState(new Date())
    const [open, setOpen] = useState(false)
    const [finalValue, setFinalValue] = useState(0)


    return (
         <View style={styles.container}>
            <Text style={styles.dummyText}>Time of Feed: </Text>

            <>
              <Button title="Start Time" onPress={() => setOpen(true)} />
              <DatePicker
                modal
                open={open}
                date={date}
                onConfirm={(date) => {
                  setOpen(false)
                  setDate(date)
                  console.log(date)
                }}
                onCancel={() => {
                  setOpen(false)
                }}
              />
            </>
            <Text style={styles.dummyText}>Time Entered is : {moment(date).format('MMM Do, h:mm a')}</Text>




            <VerticalSlider
                      value={0}
                      disabled={false}
                      min={0}
                      max={12}
                      onChange={(value: number) => {
                        setFinalValue(value);
                        console.log("CHANGE", value);
                      }}
                      onComplete={(value: number) => {
                        console.log("Final value is", finalValue);
                      }}
                      width={50}
                      height={300}
                      step={0.5}
                      borderRadius={5}
                      minimumTrackTintColor={"blue"}
                      maximumTrackTintColor={"tomato"}
                      showBallIndicator={true}
                      ballIndicatorColor={"gray"}
                      ballIndicatorTextColor={"cream"}
                    />
            <Text style={styles.dummyText}>Amount Selected is : {finalValue}</Text>


            <Button
                title="Save"
                onPress={() => navigation.navigate('Baby')}/>

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
    textAlign: 'center'
  }
});