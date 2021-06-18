import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import { StatusBar } from 'expo-status-bar';
import { NativeRouter, Route } from 'react-router-native';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';


import AssetExample from './components/AssetExample';
import Main from './components/Main';
import pass from './components/pass';
function App() {
  return (
    <NativeRouter>
      <Route exact path="/" component={AssetExample} />
      <Route exact path="/Main" component = {Main} />
      <Route exact path="/pass" component = {pass} />


      <StatusBar style="auto" />
    </NativeRouter>
  );
}

export default App;
