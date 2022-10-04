import LineGraph from '@chartiful/react-native-line-graph';
import React from 'react';
import { View, StyleSheet } from 'react-native';

export default function SleepGraph({data, labels}) {

    const config = {
        startAtZero: true,
        hasXAxisBackgroundLines: false,
        xAxisLabelStyle: {
            suffix: 'am',
            offset: 0
        }
    };

    return (
        <View>
            <LineGraph 
                data={data}
                labels={labels}
                width={375}
                height={300}
                isBezier
                hasShadow
                baseConfig={config}
                style={StyleSheet.chart}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    chart: {
        marginBottom: 30,
        padding: 10,
        paddingTop: 20,
        borderRadius: 20,
        backgroundColor: '#4F6C73',
        width: 375,
      },
})