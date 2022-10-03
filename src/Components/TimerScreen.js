import React, {useState, useRef} from 'react';
import {StyleSheet, View, Text, TextInput, Image, TouchableOpacity} from 'react-native';
import logo from './baby-logo.jpeg';
import CountDown from 'react-native-countdown-component';
import {Timer, Countdown} from 'react-native-element-timer';

export default function TeethTimer(navigation){

        const timerRef = useRef(null);
        const countdownRef = useRef(null);

        return(
            <View>
            <Text style={styles.text}>Brush Your Teeth!</Text>
                
                <Countdown
                    ref={countdownRef}
                    style={styles.timer}
                    textStyle={styles.timerText}
                    formatTime='hh:mm:ss'
                    initialSeconds={120}
                    onTimes={e => {}}
                    onPause={e => {}}
                    onEnd={(e) => {}}
                />
                <TouchableOpacity
                    style={styles.button}
                    title={'Start'}
                    onPress={() => {
                        countdownRef.current.start();
                    }}>
                    <Text>Start</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.button}
                    title={'Pause'}
                    onPress={() => {
                        countdownRef.current.pause();
                    }}>
                    <Text>Pause</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.button}
                    title={'Resume'}
                    onPress={() => {
                        countdownRef.current.resume();
                    }}>
                    <Text>Resume</Text>
                    </TouchableOpacity>
                <TouchableOpacity
                    style={styles.button}
                    title={'Stop'}
                    onPress={() => {
                        countdownRef.current.stop();
                    }}>
                    <Text>Stop</Text>
                </TouchableOpacity>
            </View>
        )
    }
        const styles = StyleSheet.create({
            container: {
                flex: 1,
                alignItems: 'center',
                padding: 20,
            },
            text: {
                fontWeight: 'bold',
                fontSize: 16,
                marginTop: 40,
            },
            timer: {
                marginVertical: 10,
            },
            timerText: {
                fontSize: 20,
            },
            button: {
                marginVertical: 5,
                backgroundColor: 'blue',
                borderRadius: 24,
                width: 100,
            },
        });    

