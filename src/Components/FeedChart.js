import {StyleSheet, View} from 'react-native';
import React from 'react';
import VerticalBarGraph from '@chartiful/react-native-vertical-bar-graph';

export default function FeedChart({data, labels}) {
  const config = {
    hasXAxisBackgroundLines: true,
    xAxisLabelStyle: {
      position: 'left',
      suffix: 'oz',
      color: 'white',
    },
    hasYAxisBackgroundLines: true,
    yAxisLabelStyle: {
      color: 'white',
    },
  };
  return (
    <View>
      <VerticalBarGraph
        data={data}
        labels={labels}
        width={355}
        height={300}
        barRadius={5}
        barColor="white"
        barWidthPercentage={0.65}
        baseConfig={config}
        style={styles.chart}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  chart: {
    marginBottom: 30,
    paddingTop: 20,
    borderRadius: 20,
    backgroundColor: '#4F6C73',
    width: 375,
  },
});
