import React, {useState, useRef} from 'react';
import {StyleSheet, View, Text, TextInput, Image, TouchableOpacity, TouchableHighlight} from 'react-native';
import logo from './baby-logo.jpeg';
import Wave from 'react-native-waveview';

export default function WaterAnimation(){
    return(
        <View style={styles.waterContainer} >
        <TouchableHighlight onPress={()=>{
        // Stop Animation
        this._waveRect && this._waveRect.stopAnim();

        // set water baseline height
        this._waveRect && this._waveRect.setWaterHeight(70);

        // reset wave effect
        this._waveRect && this._waveRect.setWaveParams([
            {A: 10, T: 180, fill: '#FF9F2E'},
            {A: 15, T: 140, fill: '#F08200'},
            {A: 20, T: 100, fill: '#B36100'},
        ]);
        
    }}>
    <Wave
        style={styles.waveBall}
        H={70}
        waveParams={[
            {A: 10, T: 180, fill: '#62c2ff'},
            {A: 15, T: 140, fill: '#0087dc'},
            {A: 20, T: 100, fill: '#1aa7ff'},
        ]}
        animated={true}
    />
    </TouchableHighlight>
</View>
    )
}
const styles = StyleSheet.create({
    waveBall: {
        width: 100,
        aspectRatio: 1,
        borderRadius: 100,
        overflow: 'hidden',
        marginBottom:90,
    }
});