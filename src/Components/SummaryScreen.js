import {StyleSheet, View, Text} from 'react-native';
import React, {useState, useEffect} from 'react';
import {useIsFocused} from "@react-navigation/native";
import {getBabies} from '../Services/BabyService.js'
import Dropdown from './Dropdown.js';
import DropDownPicker from 'react-native-dropdown-picker';



export default function SummaryScreen({navigation}){
    
  const isFocused = useIsFocused()
  const [data, setData ] = useState(null);
  const [babies, setBabies] = useState(null);
  const [babyName, setBabyName] = useState(null);
  const [baby, setBaby] = useState(null);
  const [items, setItems] = useState(null)
  const [openDropDown, setOpenDropDown] = useState(false);

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


    return (
        <View style={styles.container}>
          
          {items ?<DropDownPicker
                    open={openDropDown}
                    value={baby}
                    items={items}
                    setOpen={setOpenDropDown}
                    setValue={setBaby}
                    setItems={setItems}
             />: <Text style={styles.loadingText}>Loading...</Text>}

        <Text style={styles.dummyText}>
            7 Day Sleep Summary
        </Text>
        <Text >
                    Total Average Sleep per Day:
        </Text>
        <Text >
                    Total Nap Time per Day:
        </Text>
        <Text >
           Total Night Sleep per Day:
        </Text>


        <Text style={styles.dummyText}>
                    7 Day Feed Summary
                </Text>

                <Text >
                            Average Bottles per Day:
                </Text>
                <Text >
                            Average Amount per Day:
                </Text>
                <Text >
                   Average Amount per Bottle
                </Text>
                <Text >
                  Average Time Between Bottle
                </Text>
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
      textAlign: 'center',
    },
  });