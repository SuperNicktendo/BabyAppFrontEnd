import {StyleSheet, View, Text, Image, TouchableOpacity} from 'react-native';
import React, {useState, useEffect} from 'react';
import {useIsFocused} from "@react-navigation/native";
import {getBabies} from '../Services/BabyService.js'
import {getFeeds} from '../Services/FeedService.js'
import Dropdown from './Dropdown.js';
import moment from 'moment';
import DropDownPicker from 'react-native-dropdown-picker';
import logo from './baby-logo.jpeg'
import dayjs from 'dayjs';
import { getSleeps } from '../Services/SleepService.js';


export default function SummaryScreen({navigation}){
    
  const isFocused = useIsFocused()
  const [feeds, setFeeds] = useState(null);
  const [data, setData ] = useState(null);
  const [babies, setBabies] = useState(null);
  const [babyName, setBabyName] = useState(null);
  const [baby, setBaby] = useState(null);
  const [items, setItems] = useState(null)
  const [openDropDown, setOpenDropDown] = useState(false);
  const [feedNumber, setFeedNumber] = useState(0);
  const [timeBetweenFeeds, setTimeBetweenFeeds] = useState(0);
  const [sleeps, setSleeps] = useState(null);
  const [avgTotalSleep, setAvgTotalSleep] = useState(null);
  const [avgNapTime, setAvgNapTime] = useState(null);
  const [avgNightTime, setAvgNightTime] = useState(null);

//get all feed data, map it, filter by id and time less than 7 days, sum the volume and return the result to 2 dec places
    const getTotalVolumeFeedsById = ()=>{
            getFeeds().then((result) =>{
            tempFeeds = result.map(feeds => {
            return {babyId: feeds.baby.id, time:feeds.time, volume:feeds.volume }})

            filteredFeeds = tempFeeds.filter(feed => feed.babyId === baby && dayjs(feed.time).diff(dayjs(), 'day') > -6)
            .reduce((previousValue, currentValue) => { return previousValue + currentValue.volume},0)

            setFeeds(filteredFeeds.toFixed(2))

            })
    }
//    get all feed data, map it, filter it by id and last 7 days, returns the length of the array
    const getTotalNumberOfFeedsById = ()=>{
                getFeeds().then((result) =>{
                tempFeeds = result.map(feeds => {
                return {babyId: feeds.baby.id, time:feeds.time, volume:feeds.volume }})

                filteredFeeds = tempFeeds.filter(feed => feed.babyId === baby  && dayjs(feed.time).diff(dayjs(), 'day') > -6)
                setFeedNumber(filteredFeeds.length)

                })
        }
//get all feed data, map it by id and time. filter it by id and las 7 days, check time diff between each index.
//total the time between and divide by number of feeds
    const getAvgTimeBetweenFeeds = ()=>{
                getFeeds().then((result) =>{
                tempFeeds = result.map(feeds => {
                return {babyId: feeds.baby.id, time:feeds.time}})

                filteredFeedsTime = tempFeeds.filter(feed => feed.babyId === baby  && dayjs(feed.time).diff(dayjs(), 'day') > -6)
                let totalTime = 0;

                differenceTime = filteredFeedsTime.forEach((feed, index) => {

                    if (filteredFeedsTime[index+1]){
                        console.log("runn tot", totalTime)
                        currentTime = feed.time;
                        console.log("current", currentTime, "index",index)

                        nextTime = filteredFeedsTime[index+1].time;
                         console.log("next", nextTime,"index",index +1)

                        difference = dayjs(nextTime).diff(dayjs(currentTime), 'hour')
                        console.log("diff", difference)


                        totalTime += difference;
                    }

                })
                 console.log("total", totalTime)
                 console.log("filtered", filteredFeedsTime.length)
                setTimeBetweenFeeds(totalTime/(filteredFeedsTime.length-1))
                })
        }

    const getAvgTotalSleep = () => {
      getSleeps().then((result) => {
        tempSleeps = result.map(sleeps => {
          return {babyId: sleeps.baby.id, sleepType: sleeps.sleepType, startTime: sleeps.startTime, endTime: sleeps.endTime}})
        filteredSleeps = tempSleeps.filter(sleep => sleep.babyId === baby && dayjs(sleep.startTime).diff(dayjs(), 'day') > -6)
        totalTime = 0;

        filteredSleeps.forEach((sleep) => {
          
          difference = dayjs(sleep.endTime).diff(dayjs(sleep.startTime), 'hour');

          totalTime += difference;

          console.log('this sleep', sleep);
          console.log('this start time', sleep.startTime);
          console.log('this end time', sleep.endTime);
          console.log('totaltimesleep', totalTime);
        })
        averageTime = totalTime/7;
        console.log('totaltimesleep', averageTime);
        setAvgTotalSleep(averageTime.toFixed(2));
      })
    }

    const getTotalNapPerDay = () => {
      getSleeps().then((result) => {
        tempSleeps = result.map(sleeps => {
          return {babyId: sleeps.baby.id, sleepType: sleeps.sleepType, startTime: sleeps.startTime, endTime: sleeps.endTime}})
        filteredNaps = tempSleeps.filter(sleep => (sleep.babyId === baby && dayjs(sleep.startTime).diff(dayjs(), 'day') > -6) && sleep.sleepType === 'NAP')
        totalNapTime = 0;

        filteredNaps.forEach((nap) => {

          difference = dayjs(nap.endTime).diff(dayjs(nap.startTime), 'hour');

          totalNapTime += difference;

          console.log('this nap', nap);
          console.log('this start time', nap.startTime);
          console.log('this end time', nap.endTime);
          console.log('totalnaptime', totalNapTime);
        })
        averageNapTime = totalNapTime/7;
        console.log('totalnaptime', averageNapTime);
        setAvgNapTime(averageNapTime.toFixed(2));
      })
    }

    const getTotalNightPerDay = () => {
      getSleeps().then((result) => {
        tempSleeps = result.map(sleeps => {
          return {babyId: sleeps.baby.id, sleepType: sleeps.sleepType, startTime: sleeps.startTime, endTime: sleeps.endTime}})
        filteredNights = tempSleeps.filter(sleep => (sleep.babyId === baby && dayjs(sleep.startTime).diff(dayjs(), 'day') > -6) && sleep.sleepType === 'NIGHT')
        totalNightTime = 0;

        filteredNights.forEach((night) => {
          
          difference = dayjs(night.endTime).diff(dayjs(night.startTime), 'hour');

          totalNightTime += difference;

          console.log('this night', night);
          console.log('this start time', night.startTime);
          console.log('this end time', night.endTime);
          console.log('totaltimesleep', totalNightTime);
        })
        averageNightTime = totalNightTime/7;
        console.log('totaltimesleep', averageNightTime);
        setAvgNightTime(averageNightTime.toFixed(2));
      })
    }

    // // Get all sleep data for last 7 days
    // const getTotalSleepsById = () => {
    //   getSleeps().then((result) => {
    //     tempSleeps = result.map(sleeps => {
    //       return {babyId: sleeps.baby.id, type: sleeps.sleep_type, startTime: sleeps.start_time, endTime: sleeps.end_time}})
    //     filteredSleeps = tempSleeps.filter(sleep => sleep.babyId === baby && dayjs(sleep.startTime).diff(dayjs(), 'day') > -6)
    //     .reduce
    //     setSleeps(filteredSleeps);
    //     // console.log('filtered sleeps:' + JSON.stringify(filteredSleeps));
    //   })
    // }


    useEffect(()=>{
    try{
            getBabies().then((result)=>{
              setData(result);
              tempBabies = result.map((baby, index) => {
                return {label: baby.name, value: baby.id} })
              setItems(tempBabies)
            })
            getTotalVolumeFeedsById()
            getTotalNumberOfFeedsById()
            getAvgTimeBetweenFeeds()
            getAvgTotalSleep()
            getTotalNapPerDay()
            getTotalNightPerDay()
    }catch(err){
              console.log("CATCH STATEMENT RAN FOR THE USE EFFECT IN Summary SCREEN.JS")
            }
      }, [isFocused, baby]);



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
          Total Average Sleep per Day: {avgTotalSleep}
        </Text>
        <Text style={styles.result}>Result</Text>

        <Text style={styles.summaryText}>
          Total Nap Time per Day: {avgNapTime}
        </Text>
        <Text style={styles.result}>Result</Text>

        <Text style={styles.summaryText}>
          Total Night Sleep per Day: {avgNightTime}
        </Text>
        <Text style={styles.result}>Result</Text>
        </View>
        
        <View style={styles.summaryContainer2}>
        <Text style={styles.summaryHeader2}>
                    7 Day Feed Summary
                </Text>


                <Text style={styles.summaryText}>
                            Average Bottles per Day: {feedNumber}
                </Text>
                <Text style={styles.result}>Result</Text>

                <Text style={styles.summaryText}>
                            Average Amount per Day: {feeds} oz
                </Text>
                <Text style={styles.result}>Result</Text>

                <Text style={styles.summaryText}>
                  Average Amount per Bottle: {(feeds/feedNumber).toFixed(2)} oz
                </Text>
                <Text style={styles.result}>Result</Text>

                <Text style={styles.summaryText}>
                  Average Time Between Bottle: {timeBetweenFeeds} hours
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