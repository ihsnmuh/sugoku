import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import sudoku from '../assets/sudoku.gif';
import { Picker } from '@react-native-picker/picker';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  TouchableOpacity,
  Image,
} from 'react-native';

export default function HomeScreen({ navigation }) {
  const [name, setName] = useState('');
  const [level, setLevel] = useState('easy');

  function setNameText(text) {
    // console.log(text);
    setName(text);
  }

  function changePage() {
    name
      ? navigation.replace('Game', { name: name, level: level })
      : alert('Please insert your name !');
  }

  return (
    <View style={styles.container}>
      <StatusBar style='auto' />
      <Text
        style={{
          marginBottom: 30,
          fontSize: 40,
          fontWeight: 'bold',
          color: '#1e212d',
        }}
      >
        SUDOKU SIMPLY
      </Text>
      <Image
        source={sudoku}
        style={{ width: 200, height: 200, alignItems: 'center', margin: 20 }}
      />
      <TextInput
        style={styles.textInput}
        placeholder='Input your name here '
        onChangeText={(text) => setNameText(text)}
        // defaultValue={text}
      />

      <View style={{ width: 200 }}>
        <Text style={styles.textCaptions}>Select Difficulty :</Text>
        <Picker
          selectedValue={level}
          onValueChange={(itemValue, itemIndex) => setLevel(itemValue)}
          style={{
            height: 40,
            width: 200,
            textAlign: 'center',
            justifyContent: 'center',
            fontSize: 16,
          }}
        >
          <Picker.Item label='Easy' value='Easy' />
          <Picker.Item label='Medium' value='Medium' />
          <Picker.Item label='Hard' value='Hard' />
          <Picker.Item label='Random' value='Random' />
        </Picker>
      </View>
      <Text style={styles.textCaptions}>Difficulty Selected: {level}</Text>
      <TouchableOpacity style={styles.button} onPress={(e) => changePage()}>
        <Text style={styles.buttonText}>Play Game</Text>
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
  textInput: {
    // height: 40,
    fontWeight: 'bold',
    textAlign: 'center',
    minHeight: 50,
    fontSize: 20,
    paddingHorizontal: 5,
    borderBottomWidth: 1,
    marginBottom: 5,
  },
  textCaptions: {
    fontWeight: 'bold',
    textAlign: 'center',
    justifyContent: 'center',
    minHeight: 20,
    fontSize: 16,
    paddingHorizontal: 5,
    // backgroundColor: 'red',
  },
});
