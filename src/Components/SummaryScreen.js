import {StyleSheet, View, Text} from 'react-native';
import React, {useState, useEffect} from 'react';
import {useIsFocused} from "@react-navigation/native";
import {getBabies} from '../Services/BabyService.js'
import {getFeeds} from '../Services/FeedService.js'
import Dropdown from './Dropdown.js';
import moment from 'moment';

//&& feed.time > moment().subtract(7,"days").toDate()


export default function SummaryScreen({navigation}){

  const isFocused = useIsFocused()
  const [allData, setAllData ] = useState(null);
  const [feeds, setFeeds] = useState(null);


    const getTotalVolumeFeeds= ()=>{
             getFeeds().then((result) =>{
            tempFeeds = result.map(feeds => {
            return {babyId: feeds.baby.id, time:feeds.time, volume:feeds.volume }})
            console.log(moment().subtract(7,"days").toDate())
            filteredFeeds = tempFeeds.filter(feed => feed.babyId === 1 )
            .reduce((previousValue, currentValue) => { return previousValue + currentValue.volume},0)

            setFeeds(filteredFeeds)
            console.log("filtered",feeds)
            })
}


    useEffect(()=>{
        getTotalVolumeFeeds()

      }, [isFocused]);


    return (
        <View style={styles.container}>
          <Dropdown/>
        <Text style={styles.dummyText}>
            7 Day Sleep Summary
        </Text>
        <Text >
                    Total Average Sleep per Day:{}
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
                            Average Amount per Day:{}
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