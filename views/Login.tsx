import React, { useState, useEffect } from 'react';
import { View, Text, AsyncStorage } from 'react-native';
import { Button, Image, Input } from 'react-native-elements';
import { NavigationContainerProps } from 'react-navigation';
import { LinearGradient } from 'expo-linear-gradient';
import { useDispatch } from 'react-redux';

import * as firebase from 'firebase';
import "firebase/auth";
import AppHeader from '../components/AppHeader';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { SET_USER } from '../redux/actionTypes';

const Login: React.FC<NavigationContainerProps> = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [ready, setReady] = useState(false);

  const dispatch = useDispatch();

  const login = async () => {
    setReady(false);
    await firebase.auth().signInWithEmailAndPassword(email, password)
      .then(async data => {
        console.log(firebase.auth().currentUser);
        await AsyncStorage.setItem('USER', JSON.stringify(firebase.auth().currentUser));
        dispatch({ type: SET_USER, payload: { user: firebase.auth().currentUser } });
        navigation.navigate('App');
      }).catch(console.log);
  }

  return (
    <View style={{ flex: 1, backgroundColor: '#292826', alignItems: 'center' }}>
      <AppHeader
        title='Snap Application'
        leftComponent={<Button
          icon={<Icon name='arrow-left' size={25} style={{ color: '#292826' }} />}
          buttonStyle={{ height: 35, width: 35, borderRadius: 1000, marginTop: -23, paddingRight: 5, backgroundColor: 'transparent' }}
          onPress={() => navigation.goBack()}
        /> }
      />

      <Image
        source={require('../assets/icon.png')}
        style={{ height: 100, width: 100, marginTop: 40 }}
      />

      <Input 
        placeholder='Email'
        placeholderTextColor='#A0A0A0'
        leftIcon={<Icon name='email' color='#FFDB24' size={26} style={{ right: 10 }} />}
        containerStyle={{ marginTop: 40, width: '90%', backgroundColor: '#EAEAEA', height: 46, justifyContent: 'center', borderRadius: 30, borderWidth: 1, borderColor: '#FCE77D' }}
        inputContainerStyle={{ borderBottomWidth: 0 }}
        inputStyle={{ fontFamily: 'Mont' }}
        autoCapitalize='none'
        onChange={(event) => { setEmail(event.nativeEvent.text); setLoginError(''); }}
        value={email}
        spellCheck={false}
      />
      <Input 
        placeholder='Password'
        placeholderTextColor='#A0A0A0'
        leftIcon={<Icon name='lock' color='#FFDB24' size={26} style={{ right: 10 }} />}
        containerStyle={{ marginTop: 10, width: '90%', backgroundColor: '#EAEAEA', height: 46, justifyContent: 'center', borderRadius: 30, borderWidth: 1, borderColor: '#FCE77D' }}
        inputContainerStyle={{ borderBottomWidth: 0 }}
        inputStyle={{ fontFamily: 'Mont' }}
        autoCapitalize='none'
        onChange={(event) => { setPassword(event.nativeEvent.text) }}
        value={password}
        spellCheck={false}  
        secureTextEntry    
      />

      <LinearGradient colors={['#dec12f', '#fae473']} style={{ width: '90%', height: 42, marginTop: 20, borderRadius: 30,
        alignItems: 'center', justifyContent: 'center' }} start={[0, 0]}>
        <Button containerStyle={{ backgroundColor: 'transparent', width: '100%', height: '100%' }} buttonStyle={{ backgroundColor: 'transparent', width: '100%', height: '100%' }} 
          titleStyle={{ fontFamily: 'Mont-Bold', color: '#FFF' }} title="Login" onPress={() => login()}/>
      </LinearGradient>

      <Text style={{ fontFamily: 'Mont', fontSize: 17, color: '#EAEAEA', marginVertical: 10, marginRight: 20, marginLeft: 30 }}>Do not have an account? 
        Create one <Text style={{ color: '#FCE77D', fontFamily: 'Mont-Bold' }} onPress={() => navigation.navigate('Register')}>here</Text></Text>
    </View>
  );
}

export default Login;