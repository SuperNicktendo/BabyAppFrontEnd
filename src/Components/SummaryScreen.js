import {StyleSheet, ScrollView, View, Text, Image, TouchableOpacity} from 'react-native';
import React, {useState, useEffect} from 'react';
import {useIsFocused} from "@react-navigation/native";
import {getBabies} from '../Services/BabyService.js'
import {getFeeds} from '../Services/FeedService.js'
import Dropdown from './Dropdown.js';
import moment from 'moment';
import DropDownPicker from 'react-native-dropdown-picker';
import logo from './baby-logo.jpeg'
import dayjs from 'dayjs';

import VerticalBarGraph from '@chartiful/react-native-vertical-bar-graph';


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
  const [chartValueFeed, setChartValueFeed] = useState(null);


const config = {
  hasXAxisBackgroundLines: true,
  xAxisLabelStyle: {
    position: 'left',
    suffix: 'oz',
    color:"white"
  },
  hasYAxisBackgroundLines:true,
  yAxisLabelStyle: {
      color:"white",
    }
};



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

    const getVolumePerDayById = ()=>{
                getFeeds().then((result) =>{

                tempFeeds = result.map(feeds => {
                return {babyId: feeds.baby.id, time:feeds.time, volume:feeds.volume }})

                filteredFeeds = tempFeeds.filter(feed => feed.babyId === baby && dayjs(feed.time).diff(dayjs(), 'day') > -6)

//                console.log("data", filteredFeeds)
                days = getChartDays()

                tempDays = days.map(day => {
                    const tempObj = {};
                    tempObj[day] = 0;
                    return tempObj;
                })

//                console.log("temps",tempDays)
                temp = filteredFeeds.forEach(feed => {

                for (let i = 0; i < 7; i++) {
                    if (moment(feed.time).format('ddd') == Object.keys(tempDays[i])){
                     tempDays[i][Object.keys(tempDays[i])[0]]+= feed.volume
                    }
                }

                })
                valueList = []
                for (let i = 0; i < 7; i++) {
                      value = Object.values(tempDays[i])
                      valueList.push(value)
                    }
               flattened = valueList.flatMap(num => num)
//               console.log(flattened)
              setChartValueFeed(flattened)

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
//get all feed data, map it by id and time. filter it by id and las 7 days, map again to get an array of times, check time diff between each index.
//total the time between and divide by number of feeds
    const getAvgTimeBetweenFeeds = ()=>{
                getFeeds().then((result) =>{

                tempFeeds = result.map(feeds => {
                return {babyId: feeds.baby.id, time:feeds.time}})

                filteredFeedsTime = tempFeeds.filter(feed => feed.babyId === baby  && dayjs(feed.time).diff(dayjs(), 'day') > -6)
                let totalTime = 0;

                tempSortedTimes = filteredFeedsTime.map(times => { return times.time}).sort()
                differenceTime = tempSortedTimes.forEach((feed, index) => {

                    if (tempSortedTimes[index+1]){
                        currentTime = feed;
                        nextTime = tempSortedTimes[index+1];
                        difference = dayjs(nextTime).diff(dayjs(currentTime), 'hour')
                        totalTime += difference;
                    }

                })
                setTimeBetweenFeeds((totalTime/(filteredFeedsTime.length-1)).toFixed(0))
                })
        }

    const getChartDays = ()=>{
        const dayList=[]

        for (let i = 0; i < 7; i++) {
          day = moment().subtract(i,"day")
          dayList.push(day.format("ddd"))
        }
        return dayList.reverse()
    }

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
            getVolumePerDayById()
            getChartDays()
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

            <ScrollView style={styles.container2}>

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

                <Text style={styles.result}>Average Bottles per Day</Text>
                <Text style={styles.summaryText}>{feedNumber}</Text>

                <Text style={styles.result}>Average Amount per Day</Text>
                <Text style={styles.summaryText}>{feeds} oz</Text>

                <Text style={styles.result}>Average Amount per Bottle</Text>
                <Text style={styles.summaryText}>{(feeds/feedNumber).toFixed(2)} oz</Text>

                <Text style={styles.result}>Average Time Between Bottle</Text>
                <Text style={styles.summaryText}>{timeBetweenFeeds} hours</Text>
            </View>
            <View>
              {chartValueFeed ?  <VerticalBarGraph
                  data={chartValueFeed}
                  labels={getChartDays()}
                  width={375}
                  height={300}
                  barRadius={5}
                  barColor="white"
                  barWidthPercentage={0.65}
                  baseConfig={config}
                  style={styles.chart}
                /> : <Text>loading....</Text>}
            </View>
           </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#4F6C73',
      padding: 7,
      alignItems:"center",
    },
    container2: {
          flex: 1,
          backgroundColor: '#4F6C73',
          padding: 7,
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
    },
    chart: {
        marginBottom: 30,
        padding: 10,
        paddingTop: 20,
        borderRadius: 20,
        backgroundColor: '#4F6C73',
        width: 375
      }
  });