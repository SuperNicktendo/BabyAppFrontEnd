import React, {useState, useRef} from 'react';
import {StyleSheet, View, Text, TextInput, Image, TouchableOpacity} from 'react-native';
import logo from './baby-logo.jpeg';

export default function WaterAnimation(){
    return(
        <View style={_styles.container} >
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
    
    </TouchableHighlight>
</View>
    )
}