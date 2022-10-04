import React, {useState, useRef} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import logo from './baby-logo.jpeg';
import {Timer, Countdown} from 'react-native-element-timer';
import WaterAnimation from './WaterAnimation';

export default function TeethTimer(navigation) {
  const timerRef = useRef(null);
  const countdownRef = useRef(null);

  return (
    <View style={styles.container}>
      <Image source={logo} style={styles.logo} />

      <Text style={styles.timerHeader}>Let's brush our teeth!</Text>

      <WaterAnimation style={styles.waterAni} />

      <Countdown
        ref={countdownRef}
        style={styles.timer}
        textStyle={styles.timerText}
        formatTime="hh:mm:ss"
        initialSeconds={120}
        onTimes={seconds => {
          if (seconds === 0) {
            Alert.alert('Sparkle, sparkle!', 'Your Teeth Are Clean!');
          }
        }}
        onPause={e => {}}
        onEnd={e => {}}
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
        <Text style={styles.buttonText}>Reset</Text>
      </TouchableOpacity>
    </View>
  );
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
    borderRadius: 200 / 2,
  },
  timerHeader: {
    color: '#fff',
    fontWeight: 'bold',
    marginTop: 10,
    fontSize: 30,
    textAlign: 'center',
    paddingBottom: 5,
    marginBottom: 15,
    marginTop: 40,
  },
  timer: {
    marginVertical: 10,
    position: 'absolute',
    paddingTop: 105,
  },
  timerText: {
    fontSize: 90,
    color: '#fff',
  },
  timerButton: {
    elevation: 8,
    backgroundColor: '#FE8E0D',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 15,
    margin: 5,
  },
  buttonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
    alignSelf: 'center',
    textTransform: 'uppercase',
  },
});
