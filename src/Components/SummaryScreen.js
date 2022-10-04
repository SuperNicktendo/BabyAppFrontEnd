import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  Image,
  TouchableOpacity,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {useIsFocused} from '@react-navigation/native';
import {getBabies} from '../Services/BabyService.js';
import {getFeeds} from '../Services/FeedService.js';
import moment from 'moment';
import DropDownPicker from 'react-native-dropdown-picker';
import logo from './baby-logo.jpeg';
import dayjs from 'dayjs';
import {getSleeps} from '../Services/SleepService.js';
import FeedChart from './FeedChart.js';
import SleepGraph from './SleepGraph.js';

export default function SummaryScreen({navigation}) {
  const isFocused = useIsFocused();
  const [feeds, setFeeds] = useState(null);
  const [data, setData] = useState(null);
  const [baby, setBaby] = useState(null);
  const [items, setItems] = useState(null);
  const [openDropDown, setOpenDropDown] = useState(false);
  const [feedNumber, setFeedNumber] = useState(0);
  const [timeBetweenFeeds, setTimeBetweenFeeds] = useState(0);
  const [chartValueFeed, setChartValueFeed] = useState(null);
  const [avgTotalSleep, setAvgTotalSleep] = useState(null);
  const [avgNapTime, setAvgNapTime] = useState(null);
  const [avgNightTime, setAvgNightTime] = useState(null);

  //get all feed data, map it, filter by id and time less than 7 days, sum the volume and return the result to 2 dec places
  const getTotalVolumeFeedsById = () => {
    getFeeds().then(result => {
      const mappedFeeds = result.map(feeds => {
        return {babyId: feeds.baby.id, time: feeds.time, volume: feeds.volume};
      });

      const filteredFeeds = mappedFeeds
        .filter(
          feed =>
            feed.babyId === baby && dayjs(feed.time).diff(dayjs(), 'day') > -6,
        )
        .reduce((previousValue, currentValue) => {
          return previousValue + currentValue.volume;
        }, 0);

      setFeeds(filteredFeeds.toFixed(2));
    });
  };

  const getTotalVolumePerDay = () => {
    getFeeds().then(result => {
      const mappedFeeds = result.map(feeds => {
        return {babyId: feeds.baby.id, time: feeds.time, volume: feeds.volume};
      });

      const filteredFeeds = mappedFeeds.filter(
        feed =>
          feed.babyId === baby && dayjs(feed.time).diff(dayjs(), 'day') > -6,
      );

      const daysLabels = getChartDays();

      const daysObject = daysLabels.map(day => {
        const tempObj = {};
        tempObj[day] = 0;
        return tempObj;
      });

      const totalVolumesByDay = filteredFeeds.forEach(feed => {
        for (let i = 0; i < 7; i++) {
          if (moment(feed.time).format('ddd') == Object.keys(daysObject[i])) {
            daysObject[i][Object.keys(daysObject[i])[0]] += feed.volume;
          }
        }
      });
      const valueList = [];
      for (let i = 0; i < 7; i++) {
        const value = Object.values(daysObject[i]);
        valueList.push(value);
      }
      const flattenedValueList = valueList.flatMap(num => num);
      setChartValueFeed(flattenedValueList);
    });
  };

  //    get all feed data, map it, filter it by id and last 7 days, returns the length of the array
  const getTotalNumberOfFeedsById = () => {
    getFeeds().then(result => {
      const mappedFeeds = result.map(feeds => {
        return {babyId: feeds.baby.id, time: feeds.time, volume: feeds.volume};
      });

      const filteredFeeds = mappedFeeds.filter(
        feed =>
          feed.babyId === baby && dayjs(feed.time).diff(dayjs(), 'day') > -6,
      );
      setFeedNumber(filteredFeeds.length);
    });
  };
  //get all feed data, map it by id and time. filter it by id and las 7 days, map again to get an array of times, check time diff between each index.
  //total the time between and divide by number of feeds
  const getAvgTimeBetweenFeeds = () => {
    getFeeds().then(result => {
      const mappedFeeds = result.map(feeds => {
        return {babyId: feeds.baby.id, time: feeds.time};
      });

      const filteredFeedsTime = mappedFeeds.filter(
        feed =>
          feed.babyId === baby && dayjs(feed.time).diff(dayjs(), 'day') > -6,
      );
      let totalTime = 0;

      const sortedTimes = filteredFeedsTime
        .map(times => {
          return times.time;
        })
        .sort();

      const differenceTime = sortedTimes.forEach((feed, index) => {
        if (sortedTimes[index + 1]) {
          const currentTime = feed;
          const nextTime = sortedTimes[index + 1];
          const difference = dayjs(nextTime).diff(dayjs(currentTime), 'hour');
          totalTime += difference;
        }
      });
      setTimeBetweenFeeds(
        (totalTime / (filteredFeedsTime.length - 1)).toFixed(0),
      );
    });
  };

  const getChartDays = () => {
    const dayList = [];

    for (let i = 0; i < 7; i++) {
      const day = moment().subtract(i, 'day');
      dayList.push(day.format('ddd'));
    }
    return dayList.reverse();
  };

  const getAvgTotalSleep = () => {
    getSleeps().then(result => {
      tempSleeps = result.map(sleeps => {
        return {
          babyId: sleeps.baby.id,
          sleepType: sleeps.sleepType,
          startTime: sleeps.startTime,
          endTime: sleeps.endTime,
        };
      });
      filteredSleeps = tempSleeps.filter(
        sleep =>
          sleep.babyId === baby &&
          dayjs(sleep.startTime).diff(dayjs(), 'day') > -6,
      );
      totalTime = 0;

      filteredSleeps.forEach(sleep => {
        difference = dayjs(sleep.endTime).diff(dayjs(sleep.startTime), 'hour');

        totalTime += difference;
      });
      averageTime = totalTime / 7;
      setAvgTotalSleep(averageTime.toFixed(2));
    });
  };

  const getTotalNapPerDay = () => {
    getSleeps().then(result => {
      tempSleeps = result.map(sleeps => {
        return {
          babyId: sleeps.baby.id,
          sleepType: sleeps.sleepType,
          startTime: sleeps.startTime,
          endTime: sleeps.endTime,
        };
      });
      filteredNaps = tempSleeps.filter(
        sleep =>
          sleep.babyId === baby &&
          dayjs(sleep.startTime).diff(dayjs(), 'day') > -6 &&
          sleep.sleepType === 'NAP',
      );
      totalNapTime = 0;

      filteredNaps.forEach(nap => {
        difference = dayjs(nap.endTime).diff(dayjs(nap.startTime), 'hour');

        totalNapTime += difference;
      });
      averageNapTime = totalNapTime / 7;
      setAvgNapTime(averageNapTime.toFixed(2));
    });
  };

  const getTotalNightPerDay = () => {
    getSleeps().then(result => {
      tempSleeps = result.map(sleeps => {
        return {
          babyId: sleeps.baby.id,
          sleepType: sleeps.sleepType,
          startTime: sleeps.startTime,
          endTime: sleeps.endTime,
        };
      });
      filteredNights = tempSleeps.filter(
        sleep =>
          sleep.babyId === baby &&
          dayjs(sleep.startTime).diff(dayjs(), 'day') > -6 &&
          sleep.sleepType === 'NIGHT',
      );
      totalNightTime = 0;

      filteredNights.forEach(night => {
        difference = dayjs(night.endTime).diff(dayjs(night.startTime), 'hour');

        totalNightTime += difference;
      });
      averageNightTime = totalNightTime / 7;
      setAvgNightTime(averageNightTime.toFixed(2));
    });
  };

  useEffect(() => {
    try {
      getBabies().then(result => {
        setData(result);
        tempBabies = result.map((baby) => {
          return {label: baby.name, value: baby.id};
        });
        setItems(tempBabies);
      });
      getTotalVolumeFeedsById();
      getTotalNumberOfFeedsById();
      getAvgTimeBetweenFeeds();
      getTotalVolumePerDay();
      getChartDays();
      getAvgTotalSleep();
      getTotalNapPerDay();
      getTotalNightPerDay();
    } catch (err) {
      console.log(
        'CATCH STATEMENT RAN FOR THE USE EFFECT IN Summary SCREEN.JS',
      );
    }
  }, [isFocused, baby]);

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.navigate('Home')}>
        <Image source={logo} style={styles.logo} />
      </TouchableOpacity>

      {items ? (
        <DropDownPicker
          style={styles.selector}
          open={openDropDown}
          value={baby}
          items={items}
          setOpen={setOpenDropDown}
          setValue={setBaby}
          setItems={setItems}
        />
      ) : (
        <Text style={styles.loadingText}>Loading...</Text>
      )}

      <ScrollView style={styles.container2}>
        <View style={styles.summaryContainer1}>
          <Text style={styles.summaryHeader}>7 Day Sleep Summary</Text>
          <Text style={styles.summaryText}>Total Average Sleep per Day:</Text>
          <Text style={styles.result}>{avgTotalSleep} hours</Text>

          <Text style={styles.summaryText}>Total Nap Time per Day:</Text>
          <Text style={styles.result}>{avgNapTime} hours</Text>

          <Text style={styles.summaryText}>Total Night Sleep per Day:</Text>
          <Text style={styles.result}>{avgNightTime} hours</Text>
        </View>

        <SleepGraph labels={getChartDays()}/>

        <View style={styles.summaryContainer2}>
          <Text style={styles.summaryHeader2}>7 Day Feed Summary</Text>

          <Text style={styles.result}>Average Bottles per Day</Text>
          <Text style={styles.summaryText}>{feedNumber}</Text>

          <Text style={styles.result}>Average Amount per Day</Text>
          <Text style={styles.summaryText}>{feeds} oz</Text>

          <Text style={styles.result}>Average Amount per Bottle</Text>
          <Text style={styles.summaryText}>
            {(feeds / feedNumber).toFixed(2)} oz
          </Text>

          <Text style={styles.result}>Average Time Between Bottle</Text>
          <Text style={styles.summaryText}>{timeBetweenFeeds} hours</Text>
        </View>
        {chartValueFeed ? (
          <FeedChart data={chartValueFeed} labels={getChartDays()} />
        ) : (
          <Text>loading ....</Text>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#4F6C73',
    padding: 7,
    alignItems: 'center',
  },
  container2: {
    flex: 1,
    backgroundColor: '#4F6C73',
    padding: 7,
  },
  logo: {
    width: 15,
    height: 5,
    marginTop: 4,
    marginBottom: 3,
    padding: 60,
    borderColor: 'black',
    borderWidth: 2.5,
    borderRadius: 200 / 2,
    alignItem: 'center',
  },
  summaryContainer1: {
    flex: 1,
    backgroundColor: '#4F6C73',
    marginBottom: 5,
    alignItems: 'center',
    paddingHorizontal: 30,
    borderWidth: 3,
    borderColor: '#fff',
    borderRadius: 10,
  },
  summaryContainer2: {
    flex: 1,
    backgroundColor: '#4F6C73',
    paddingVertical: 10,
    paddingHorizontal: 35,
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#fff',
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
});
