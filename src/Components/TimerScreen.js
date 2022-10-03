import React, {useState, useRef} from 'react';
import {StyleSheet, View, Text, TextInput, Image, TouchableOpacity} from 'react-native';
import logo from './baby-logo.jpeg';
import CountDown from 'react-native-countdown-component';
import {Timer, Countdown} from 'react-native-element-timer';

export default function TeethTimer(navigation){

        const timerRef = useRef(null);
        const countdownRef = useRef(null);

        return(
            <View style={styles.container}>
                
            <TouchableOpacity>
              <Image source={logo} style={styles.logo} />
            </TouchableOpacity>
            
            <Text style={styles.timerHeader}>Brush Your Teeth!</Text>
                
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
                    style={styles.timerButton}
                    onPress={() => {
                        countdownRef.current.start();
                    }}>
                    <Text style={styles.buttonText}>Start</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.timerButton}
                    onPress={() => {
                        countdownRef.current.pause();
                    }}>
                    <Text style={styles.buttonText}>Pause</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.timerButton}
                    onPress={() => {
                        countdownRef.current.resume();
                    }}>
                    <Text style={styles.buttonText}>Resume</Text>
                    </TouchableOpacity>
                <TouchableOpacity
                    style={styles.timerButton}
                    onPress={() => {
                        countdownRef.current.stop();
                    }}>
                    <Text style={styles.buttonText}>Stop</Text>
                </TouchableOpacity>
            </View>
        )
    }
        
    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: '#4F6C73',
            alignItems: 'center',
            justifyContent: 'center',
        },
        logo: {
            width: 15,
            height: 5,
            marginBottom: 7,
            padding: 60,
            borderColor: 'black',
            borderWidth: 2.5,
            borderRadius: 200 /2
          },
        timerHeader: {
            color: '#fff',
            fontWeight: 'bold',
            marginTop: 10,
            fontSize: 30,
            textAlign: 'center',
            paddingBottom: 5,
        },
        timer: {
            marginVertical: 10,
        },
        timerText: {
            fontSize: 70,
            borderWidth: 3,
            borderColor: "black",
            borderRadius: 200,
            padding: 40,
            paddingVertical: 55,
            backgroundColor: '#fff',
            marginBottom: 10,
        },
        timerButton: {
            elevation: 8,
            backgroundColor: "#FE8E0D",
            borderRadius: 10,
            paddingVertical: 10,
            paddingHorizontal: 15,
            margin: 5,
        },
        buttonText: {
            fontSize: 18,
            color: "#fff",
            fontWeight: "bold",
            alignSelf: "center",
            textTransform: "uppercase"
        }
    });    

