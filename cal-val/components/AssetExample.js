import React, { useState } from 'react';
import { useHistory } from 'react-router-native';
import * as SecureStore from 'expo-secure-store';
import {
    Text, 
    View, 
    TouchableOpacity, 
    StyleSheet,
    Image,
    TextInput,
    KeyboardAvoidingView,
    TouchableWithoutFeedback,
    Platform,
    Keyboard,
    ActivityIndicator,
} from 'react-native';

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#262834',
    borderColor: '#565757',
    borderTopWidth: '1px',
    borderLeftWidth: '1px',
    padding: '15px',
    height: '46px',
    width: '25%',
  },
  buttonLabel: {
    color: 'white',
    textAlign: 'center',
  },
  operatorButton: {
    padding: '13px',
    backgroundColor: '#ff9e0a',
  },
  operatorButtonLabel: {
    fontSize: '20px'
  },
  rightMostButton: {
    borderRightWidth: '1px',
  },
  bottomMostButton: {
    borderBottomWidth: '1px',
  },
  topMostButton: {
    backgroundColor: '#616463',
    width:'125px'
  },
  screen: {
    fontSize: '24px',
    textAlign: 'right',
    backgroundColor: '#262834',
    color: 'white',
    paddingRight: '10px',
    paddingLeft: '10px',
    paddingBottom: '10px',
    paddingTop: 0,
  },
  lastStateScreen: {
    backgroundColor:'#262834',
    fontSize: '12px',
    paddingLeft: '10px',
    paddingTop: '10px',
    paddingRight: '10px',
    paddingBottom: 0,
  },
});


function App() {

    const history = useHistory();

    const [loading, setLoading] = useState(false);

    const loginUser = () => {
       
          history.push('/Main');
        }
 
  const [lastState, setLastState] = useState(0);
  const [currentState, setCurrentState] = useState(0);
  const [lastOperator, setLastOperator] = useState('');

  const clearAll = () => {
    setLastState(0);
    setCurrentState(0);
    setLastOperator('');
  };


  const deleteLast = () => {
    let s = currentState.toString();
    s = s.substr(0, s.length - 1);
    if (s) {
      setCurrentState(parseInt(s));
    } else {
      setCurrentState(0);
    }
  };

  const numericButtonPressed = (value) => {
    return () => {
      setCurrentState(parseInt(currentState + value));
    };
  };

  const operatorPressed = (operator) => {
    return () => {
      applyOperator().then(() => {
        setLastState(currentState);
        setCurrentState(0);
        setLastOperator(operator);
      });
    };
  };

  const applyOperator = () => {
    return new Promise((resolve) => {
      if (lastOperator === '/') {
        setCurrentState(lastState / currentState, resolve);
      } else if (lastOperator == '*') {
        setCurrentState(lastState * currentState, resolve);
      } else if (lastOperator == '+') {
        setCurrentState(lastState + currentState, resolve);
      } else if (lastOperator == '-') {
        setCurrentState(lastState - currentState, resolve);
      } else {
        resolve();
      }

      setLastState(0);
    });
    
  };

  return (
    <View>
      <Text style={[styles.screen, styles.lastStateScreen]}>{lastState}</Text>
      <Text style={styles.screen}>{currentState}</Text>
      <View style={{flex: 1, flexDirection: 'row'}}>
        
        <TouchableOpacity style={[styles.button, styles.topMostButton]} onPress={clearAll}>
          <Text style={styles.buttonLabel}>C</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.topMostButton]} onPress={deleteLast}>
          <Text style={styles.buttonLabel}>DEL</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.operatorButton, styles.rightMostButton]} onPress={operatorPressed('/')}>
          <Text style={[styles.buttonLabel, styles.operatorButtonLabel]}>÷</Text>
        </TouchableOpacity>
      </View>
      <View style={{flex: 1, flexDirection: 'row'}}>
        <TouchableOpacity style={styles.button} onPress={numericButtonPressed('7')}>
          <Text style={styles.buttonLabel}>7</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={numericButtonPressed('8')}>
          <Text style={styles.buttonLabel}>8</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={numericButtonPressed('9')}>
          <Text style={styles.buttonLabel}>9</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.operatorButton, styles.rightMostButton]} onPress={operatorPressed('*')}>
          <Text style={[styles.buttonLabel, styles.operatorButtonLabel]}>*</Text>
        </TouchableOpacity>
      </View>
      <View style={{flex: 1, flexDirection: 'row'}}>
        <TouchableOpacity style={styles.button} onPress={numericButtonPressed('4')}>
          <Text style={styles.buttonLabel}>4</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={numericButtonPressed('5')}>
          <Text style={styles.buttonLabel}>5</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={numericButtonPressed('6')}>
          <Text style={styles.buttonLabel}>6</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.operatorButton, styles.rightMostButton]} onPress={operatorPressed('-')}>
          <Text style={[styles.buttonLabel, styles.operatorButtonLabel]}>-</Text>
        </TouchableOpacity>
      </View>
      <View style={{flex: 1, flexDirection: 'row'}}>
        <TouchableOpacity style={styles.button} onPress={numericButtonPressed('1')}>
          <Text style={styles.buttonLabel}>1</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={numericButtonPressed('2')}>
          <Text style={styles.buttonLabel}>2</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={numericButtonPressed('3')}>
          <Text style={styles.buttonLabel}>3</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.operatorButton, styles.rightMostButton]} onPress={operatorPressed('+')}>
          <Text style={[styles.buttonLabel, styles.operatorButtonLabel]}>+</Text>
        </TouchableOpacity>
      </View>
      <View style={{flex: 1, flexDirection: 'row'}}>
        <TouchableOpacity style={[styles.button, {width: '50%'}, styles.bottomMostButton]} onPress={numericButtonPressed('0')}>
          <Text style={styles.buttonLabel}>0</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.bottomMostButton]}>{
          <Text style={styles.buttonLabel} onPress={loginUser} >.</Text>}
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.operatorButton, styles.rightMostButton, styles.bottomMostButton]} onPress={applyOperator}>
          <Text style={[styles.buttonLabel, styles.operatorButtonLabel]}>=</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default App;