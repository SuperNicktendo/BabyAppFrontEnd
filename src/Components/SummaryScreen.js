import {StyleSheet, View, Text} from 'react-native';
import React, {useState, useEffect} from 'react';
import {useIsFocused} from "@react-navigation/native";
import {getBabies} from '../Services/BabyService.js'
import Dropdown from './Dropdown.js';



export default function SummaryScreen({navigation}){

  const isFocused = useIsFocused()
  const [data, setData ] = useState(null);
  const [babies, setBabies] = useState(null);
  const [babyName, setBabyName] = useState(null);
  const [feed, setFeed] = useState(null);




    const getTotalFeeds=()=>{
    try{
            getBabies().then((result)=>{
              setData(result);
              console.log("results", result)
              feedData = result.feeds.map(feed => {
              console.log("feedData",feedData)
              console.log("feed", feed)
                return feed
                setFeed(feedData)})
            })}catch(err){
              console.log("CATCH STATEMENT RAN FOR THE USE EFFECT IN Summary screen")
            }

    }

    useEffect(()=>{
        getTotalFeeds()

      }, [isFocused]);


    return (
        <View style={styles.container}>
          <Dropdown/>
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