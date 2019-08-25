import React, { useState } from 'react';
import { View, TouchableOpacity, KeyboardAvoidingView, ScrollView, AsyncStorage } from 'react-native';
import { Image, Button, Input } from 'react-native-elements';
import { NavigationContainerProps } from 'react-navigation';
import { LinearGradient } from 'expo-linear-gradient';
import { useDispatch } from 'react-redux';

import AppHeader from '../components/AppHeader';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import { SET_USER } from '../redux/actionTypes';

const Register: React.FC<NavigationContainerProps> = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [_password, _setPassword] = useState('');

  const dispatch = useDispatch();

  const attemptRegister = async () => {
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(async data => {
        await AsyncStorage.setItem('USER', JSON.stringify(firebase.auth().currentUser));
        dispatch({ type: SET_USER, payload: { user: firebase.auth().currentUser } });
        navigation.navigate('App');
      })
  }

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior='padding'>
      <ScrollView style={{ backgroundColor: '#292826', width: '100%', height: '100%' }} contentContainerStyle={{ alignItems: 'center' }}>
        <AppHeader
          title='Register User'
          leftComponent={<Button
            icon={<Icon name='arrow-left' size={25} style={{ color: '#292826' }} />}
            buttonStyle={{ height: 35, width: 35, borderRadius: 1000, marginTop: -23, paddingRight: 5, backgroundColor: 'transparent' }}
            onPress={() => navigation.goBack()}
          /> }
        />

        <View style={{ marginTop: 40 }}>
          <Image
            source={require('../assets/default.png')}
            style={{ width: 180, height: 180, borderWidth: 2, borderRadius: 1000, borderColor: '#FCE77D' }}
          />

          <TouchableOpacity style={{ position: 'relative', height: 50, width: 50, borderRadius: 30, backgroundColor: '#FFDB24', bottom: 52, left: 130,
            alignItems: 'center', justifyContent: 'center', elevation: 5 }}>
            <Icon name='camera' size={32} style={{ color: '#FFF', elevation: 8, shadowColor: '#000', shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.5, shadowRadius: 2, }}/>
          </TouchableOpacity>
        </View>

        <Input
            placeholder='Email'
            placeholderTextColor='#A0A0A0'
            leftIcon={<Icon name='email' color='#FFDB24' size={26} style={{ right: 10 }} />}
            containerStyle={{ borderWidth: 1, borderRadius: 30, width: '85%', height: 46, borderColor: '#FCE77D', backgroundColor: '#EAEAEA', justifyContent: 'center' }}
            inputContainerStyle={{ borderBottomWidth: 0 }}
            inputStyle={{ fontFamily: 'Mont' }}
            autoCapitalize='none'
            onChange={(event) => { setEmail(event.nativeEvent.text) }}
            value={email}
            spellCheck={false}
          />

          <Input
            placeholder='Name'
            placeholderTextColor='#A0A0A0'
            leftIcon={<Icon name='account-card-details' color='#FFDB24' size={26} style={{ right: 10 }} />}
            containerStyle={{ borderWidth: 1, borderRadius: 30, marginTop: 10, width: '85%', borderColor: '#FCE77D', height: 46, backgroundColor: '#EAEAEA', justifyContent: 'center' }}
            inputContainerStyle={{ borderBottomWidth: 0 }}
            inputStyle={{ fontFamily: 'Mont' }}
            autoCapitalize='none'
            onChange={(event) => { setName(event.nativeEvent.text) }}
            value={name}
            spellCheck={false}
          />

          <Input
            placeholder='Username'
            placeholderTextColor='#A0A0A0'
            leftIcon={<Icon name='account-circle' color='#FFDB24' size={26} style={{ right: 10 }} />}
            containerStyle={{ borderWidth: 1, borderRadius: 30, marginTop: 10, width: '85%', borderColor: '#FCE77D', height: 46, backgroundColor: '#EAEAEA', justifyContent: 'center' }}
            inputContainerStyle={{ borderBottomWidth: 0 }}
            inputStyle={{ fontFamily: 'Mont' }}
            autoCapitalize='none'
            onChange={(event) => { setUsername(event.nativeEvent.text) }}
            value={username}
            spellCheck={false}
          />

          <Input
            placeholder='Password'
            placeholderTextColor='#A0A0A0'
            leftIcon={<Icon name='lock' color='#FFDB24' size={26} style={{ right: 10 }} />}
            containerStyle={{ borderWidth: 1, borderRadius: 30, borderColor: '#FCE77D', marginTop: 10, width: '85%', height: 46, backgroundColor: '#EAEAEA', justifyContent: 'center' }}
            inputContainerStyle={{ borderBottomWidth: 0 }}
            inputStyle={{ fontFamily: 'Mont' }}
            autoCapitalize='none'
            onChange={(event) => { setPassword(event.nativeEvent.text) }}
            value={password}
            spellCheck={false}
            secureTextEntry
          />

          <Input
            placeholder='Verify Password'
            placeholderTextColor='#A0A0A0'
            leftIcon={<Icon name='lock' color='#FFDB24' size={26} style={{ right: 10 }} />}
            containerStyle={{ borderWidth: 1, borderRadius: 30, marginTop: 10, borderColor: '#FCE77D', width: '85%', height: 46, backgroundColor: '#EAEAEA', justifyContent: 'center' }}
            inputContainerStyle={{ borderBottomWidth: 0 }}
            inputStyle={{ fontFamily: 'Mont' }}
            autoCapitalize='none'
            onChange={(event) => { _setPassword(event.nativeEvent.text) }}
            value={_password}
            spellCheck={false}
            secureTextEntry
          />

        <LinearGradient colors={['#dec12f', '#fae473']} style={{ width: '90%', height: 42, marginTop: 40, marginBottom: 40, borderRadius: 30,
          alignItems: 'center', justifyContent: 'center' }} start={[0, 0]}>
          <Button containerStyle={{ backgroundColor: 'transparent', width: '100%', height: '100%' }} buttonStyle={{ backgroundColor: 'transparent', width: '100%', height: '100%' }} 
            titleStyle={{ fontFamily: 'Mont-Bold', color: '#FFF' }} title="Register" onPress={() => attemptRegister()}/>
        </LinearGradient>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

export default Register;