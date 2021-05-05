import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import clapping from '../assets/Clapping.gif';
import sad from '../assets/sad.gif';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  Image,
  TouchableOpacity,
} from 'react-native';

export default function FinishScreen({ route, navigation }) {
  const { name, level, status } = route.params;

  function changePage() {
    navigation.replace('Home');
  }

  return (
    <View style={styles.container}>
      <StatusBar style='auto' />
      {status === 'solved' ? (
        <View style={{ alignItems: 'center' }}>
          <Image
            source={clapping}
            style={{
              width: 200,
              height: 200,
              alignItems: 'center',
              margin: 20,
            }}
          />
          <Text
            style={{
              margin: 50,
              fontSize: 20,
              fontWeight: 'bold',
              textAlign: 'center',
              color: '#1e212d',
            }}
          >
            Congratulations {name}! you have completed SUDOKU with an {level}{' '}
            difficulty.
          </Text>
        </View>
      ) : (
        <View style={{ alignItems: 'center' }}>
          <Image
            source={sad}
            style={{
              width: 200,
              height: 200,
              alignItems: 'center',
              margin: 20,
            }}
          />
          <Text
            style={{
              margin: 50,
              fontSize: 20,
              fontWeight: 'bold',
              textAlign: 'center',
            }}
          >
            Sorry {name} you haven't finished in {level} difficulty !
          </Text>
        </View>
      )}
      <TouchableOpacity style={styles.button} onPress={(e) => changePage()}>
        <Text style={styles.buttonText}>Play Again</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#faf3e0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    backgroundColor: '#b68973',
    paddingHorizontal: 16,
    paddingVertical: 8,
    width: 150,
    borderRadius: 5,
    marginTop: 30,
  },
  buttonText: {
    textAlign: 'center',
    fontSize: 20,
    color: '#fff',
    fontWeight: 'bold',
  },
});
