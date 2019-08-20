import React, { useState, useEffect } from 'react';
import { Text, StatusBar, View, StyleSheet, Platform } from 'react-native';
import { createStackNavigator, createAppContainer, NavigationContainer } from 'react-navigation';
import { Provider, useDispatch, useSelector, connect } from 'react-redux'
import { AppLoading } from 'expo';
import {  } from './redux/actionTypes'

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import * as SecureStore from 'expo-secure-store';
import * as firebase from 'firebase/app';
import * as Font from 'expo-font';
import store from './redux/store'

import GetStarted from './views/GetStarted';

const firebaseConfig = {
  apiKey: "AIzaSyBkDM9-ucB-5OzwCJhinVuqJg-zNVZ1kew",
  authDomain: "snap-back-18e40.firebaseapp.com",
  databaseURL: "https://snap-back-18e40.firebaseio.com",
  projectId: "snap-back-18e40",
  storageBucket: "",
  messagingSenderId: "98179254214",
  appId: "1:98179254214:web:7c86821c9055c54d"
}

const ConsumerApp: React.FC = () => {
  //Dev
  console.disableYellowBox = true;

  const dispatch = useDispatch();
  const user = useSelector(state => state.user);
  
  const [ready, setReady] = useState(false);

  const _startAsync = async () => {
    firebase.initializeApp(firebaseConfig);
    await Font.loadAsync({
      'Mont-Bold': require('./assets/Montserrat-Bold.ttf'),
      'Mont': require('./assets/Montserrat-Regular.ttf'),
      'Mont-ExtraLight': require('./assets/Montserrat-ExtraLight.ttf'),
      'Mont-Light': require('./assets/Montserrat-Light.ttf')
    });
  }

  const _retrieveState = async () => {

  }

  if(!ready) {
    return (
      <AppLoading 
        startAsync={_startAsync}
        onError={console.warn}
        onFinish={() => setReady(true)}
      />
    )
  } else {
    return (
      <GetStarted/>
    );
  }
}

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <View style={[styles.statusBar, { backgroundColor: '#000' } ]}>
        <StatusBar translucent backgroundColor={'#000'} barStyle='light-content' />
      </View>
      {/* <StatusBar barStyle='light-content' backgroundColor='#666666' /> */}
      <ConsumerApp/>
    </Provider>
  );
}

const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : StatusBar.currentHeight;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  statusBar: {
    height: STATUSBAR_HEIGHT,
  }
});

export default App;