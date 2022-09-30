import {StyleSheet, View, Text, Image, TouchableOpacity} from 'react-native';
import React, {useState, useEffect} from 'react';
import {useIsFocused} from "@react-navigation/native";
import {getBabies} from '../Services/BabyService.js'
import Dropdown from './Dropdown.js';
import DropDownPicker from 'react-native-dropdown-picker';
import logo from './baby-logo.jpeg'


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

          <TouchableOpacity onPress={()=> navigation.navigate('Home')}>
            <Image source={logo} style={styles.logo} />
          </TouchableOpacity>
          
          {items ?<DropDownPicker
                    style={styles.selector}
                    open={openDropDown}
                    value={baby}
                    items={items}
                    setOpen={setOpenDropDown}
                    setValue={setBaby}
                    setItems={setItems}
            />: <Text style={styles.loadingText}>Loading...</Text>}
        
        <View style={styles.summaryContainer1}>
        <Text style={styles.summaryHeader}>
            7 Day Sleep Summary
        </Text>

        <Text style={styles.summaryText}>
          Total Average Sleep per Day:
        </Text>
        <Text style={styles.result}>Result</Text>

        <Text style={styles.summaryText}>
          Total Nap Time per Day:
        </Text>
        <Text style={styles.result}>Result</Text>

        <Text style={styles.summaryText}>
          Total Night Sleep per Day:
        </Text>
        <Text style={styles.result}>Result</Text>
        </View>
        
        <View style={styles.summaryContainer2}>
        <Text style={styles.summaryHeader2}>
                    7 Day Feed Summary
                </Text>

                <Text style={styles.summaryText}>
                            Average Bottles per Day:
                </Text>
                <Text style={styles.result}>Result</Text>

                <Text style={styles.summaryText}>
                            Average Amount per Day:
                </Text>
                <Text style={styles.result}>Result</Text>

                <Text style={styles.summaryText}>
                  Average Amount per Bottle: 
                </Text>
                <Text style={styles.result}>Result</Text>

                <Text style={styles.summaryText}>
                  Average Time Between Bottle: 
                </Text>
                <Text style={styles.result}>Result</Text>
        </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#4F6C73',
      padding: 7,
      alignItems: 'center'
    },
    logo: {
      width: 15,
      height: 5,
      marginTop:4,
      marginBottom: 3,
      padding: 60,
      borderColor: 'black',
      borderWidth: 2.5,
      borderRadius: 200 /2,
      alignItem: 'center',
    },
    summaryContainer1: {
        flex: 1,
        backgroundColor: '#4F6C73',
        marginBottom: 5,
        alignItems: 'center',
        paddingHorizontal: 30,
        borderWidth: 3,
        borderColor: "#fff",
        borderRadius: 10
      },
      summaryContainer2: {
        flex: 1,
        backgroundColor: '#4F6C73',
        paddingVertical: 10,
        paddingHorizontal: 35,
        alignItems: 'center',
        borderWidth: 3,
        borderColor: "#fff",
        borderRadius: 10,
        marginBottom: 5,
      },
    summaryHeader: {
      color: '#fff',
      fontWeight: 'bold',
      marginTop: 5,
      fontSize: 25,
      textAlign: 'center',
      marginBottom: 2,
    },
    summaryHeader2: {
      color: '#fff',
      fontWeight: 'bold',
      marginTop: 5,
      fontSize: 25,
      textAlign: 'center',
    },
    summaryText: {
      justifyContent: 'flex-start',
      color: '#fff',
      fontWeight: 'bold',
      padding: 3,
    },
    result: {
      justifyContent: 'flex-start',
      color: '#fff',
      fontWeight: 'bold',
      fontSize: 20,
      padding: 2,
    },   
    selector: {
      marginTop: 10,
      marginBottom: 10,
    }
  });