
import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Text} from 'react-native';

import {useIsFocused} from "@react-navigation/native";
import {getBabies} from '../Services/BabyService.js'
import SelectDropdown from 'react-native-select-dropdown'
import DropDownPicker from 'react-native-dropdown-picker';

export default function Dropdown() {
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
    <View>

    <Text>Select child and log a feed or sleep entry</Text>

    {items ?<DropDownPicker


                    open={openDropDown}
                    value={baby}
                    items={items}
                    setOpen={setOpenDropDown}
                    setValue={setBaby}
                    setItems={setItems}
             />: <Text>loading</Text>}

    </View>
  );
}