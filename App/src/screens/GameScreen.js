import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import LoadingGIF from '../assets/Loading.gif';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  TouchableOpacity,
  Dimensions,
  Image,
} from 'react-native';

import {
  fetchBoard,
  updateBoard,
  solveBoard,
  validateBoard,
  setStatus,
} from '../store/actions/actions';

const windowWidth = Dimensions.get('window').width;

export default function GameScreen({ route, navigation }) {
  const { name, level } = route.params;

  const dispatch = useDispatch();
  const board = useSelector((state) => state.sugoku.board);
  const localBoard = useSelector((state) => state.sugoku.localBoard);
  const status = useSelector((state) => state.sugoku.status);
  const loading = useSelector((state) => state.sugoku.loading);

  useEffect(() => {
    console.log('masuk ini');
    dispatch(fetchBoard(level));
  }, [dispatch]);

  function inputOnChange(text, irow, icol) {
    console.log(text, '<<<< Inputnya');
    console.log(irow, '<<<< Rownya');
    console.log(icol, '<<<< colnya');
    if (text.length > 1) alert('1 to 9 input required');
    else {
      let newBoard = [...localBoard];
      newBoard[irow][icol] = Number(text);
      dispatch(updateBoard(newBoard));
    }
  }

  function validateSudo() {
    let newBoard = { board: localBoard };
    dispatch(validateBoard(newBoard));
    if (status === 'solved') {
      navigation.replace('Finish', {
        name: name,
        level: level,
        status: status,
      });
    }
  }

  function solveSudo() {
    let newBoard = { board: board };
    dispatch(solveBoard(newBoard));
  }

  function changePage() {
    if (status === 'solved') {
      navigation.replace('Finish', {
        name: name,
        level: level,
        status: status,
      });
    } else {
      alert("Sorry you haven't finished your game");
    }
  }

  return (
    <View style={styles.container}>
      <StatusBar style='auto' />

      <Text
        style={{
          margin: 10,
          fontSize: 26,
          fontWeight: 'bold',
          color: '#b68973',
        }}
      >
        HAPPY PLAYING !
      </Text>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
        }}
      >
        <Text
          style={{
            margin: 10,
            fontSize: 20,
            fontWeight: 'bold',
            color: '#b68973',
          }}
        >
          Name: {name}
        </Text>
        <Text
          style={{
            margin: 10,
            fontSize: 20,
            fontWeight: 'bold',
            color: '#b68973',
          }}
        >
          Difficulty: {level}
        </Text>
      </View>
      {loading ? (
        <Image source={LoadingGIF} style={{ width: 250, height: 250 }} />
      ) : (
        <View style={{ backgroundColor: '#b68973', padding: 10 }}>
          <View style={{ backgroundColor: 'white' }}>
            {localBoard?.map((row, irow) => {
              return (
                <View
                  style={{ flexDirection: 'row', alignItems: 'center' }}
                  key={irow}
                >
                  {row?.map((col, icol) => {
                    return (
                      <View key={icol}>
                        {board[irow][icol] !== 0 ? (
                          <TextInput
                            color='red'
                            style={styles.answerTextQuestion}
                            keyboardType='numeric'
                            maxLength={1}
                            value={col.toString()}
                            editable={false}
                          ></TextInput>
                        ) : (
                          <TextInput
                            color='red'
                            style={styles.answerText}
                            keyboardType='numeric'
                            maxLength={1}
                            value={col === 0 ? '' : col.toString()}
                            onChangeText={(text) => {
                              inputOnChange(text, irow, icol);
                            }}
                          ></TextInput>
                        )}
                      </View>
                    );
                  })}
                </View>
              );
            })}
          </View>
        </View>
      )}
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
        }}
      >
        <TouchableOpacity style={styles.button} onPress={validateSudo}>
          <Text style={styles.buttonText}>Validate</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={solveSudo}>
          <Text style={styles.buttonText}>Cheat?</Text>
        </TouchableOpacity>
      </View>
      <Text
        style={{
          margin: 10,
          fontSize: 20,
          fontWeight: 'bold',
          color: '#b68973',
        }}
      >
        Game status: {status}
      </Text>
      <TouchableOpacity
        style={styles.buttonSubmit}
        onPress={(e) => changePage()}
      >
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
      {/* <Text>localBoard {JSON.stringify(localBoard)}</Text>
      <Text>board {JSON.stringify(board)}</Text> */}
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
  answerText: {
    textAlign: 'center',
    margin: 2,
    fontSize: 20,
    fontWeight: 'bold',
    color: '#b68973',
    borderWidth: 1,
    height: (windowWidth - 72) / 9,
    width: (windowWidth - 72) / 9,
    borderRadius: 5,
  },
  answerTextQuestion: {
    textAlign: 'center',
    margin: 2,
    fontSize: 20,
    fontWeight: 'bold',
    color: 'red',
    borderWidth: 1,
    height: (windowWidth - 72) / 9,
    width: (windowWidth - 72) / 9,
    borderRadius: 5,
  },
  button: {
    backgroundColor: '#eabf9f',
    paddingHorizontal: 16,
    paddingVertical: 8,
    width: 150,
    borderRadius: 5,
    marginTop: 30,
    marginHorizontal: 20,
  },
  buttonSubmit: {
    backgroundColor: '#b68973',
    paddingHorizontal: 16,
    paddingVertical: 8,
    width: 150,
    borderRadius: 5,
    marginTop: 30,
    marginHorizontal: 20,
  },
  buttonText: {
    textAlign: 'center',
    fontSize: 20,
    color: '#fff',
    fontWeight: 'bold',
  },
});
