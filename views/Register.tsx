import React, { useState } from 'react';
import { View, TouchableOpacity, KeyboardAvoidingView, ScrollView, AsyncStorage } from 'react-native';
import { Image, Button, Input } from 'react-native-elements';
import { NavigationContainerProps } from 'react-navigation';
import { LinearGradient } from 'expo-linear-gradient';
import { useDispatch } from 'react-redux';
import { SET_USER, SET_CREDENTIALS } from '../redux/actionTypes';

import AppHeader from '../components/AppHeader';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/database';
import * as ImagePicker from 'expo-image-picker';
import  LoadingView from './LoadingView';

const options = {
  mediaTypes: ImagePicker.MediaTypeOptions.Images,
  allowsEditing: true,
  aspect: [1, 1]
};

const Register: React.FC<NavigationContainerProps> = ({ navigation }) => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('luis26-99@hotmail.com');
  const [name, setName] = useState('Luis Petrella');
  const [username, setUsername] = useState('Ptthappy');
  const [password, setPassword] = useState('101010');
  const [_password, _setPassword] = useState('101010');
  const [imgUri, setImgUri] = useState('');
  const [imgUrl, setImgUrl] = useState('')
  const database = firebase.database();

  const dispatch = useDispatch();

  const attemptRegister = async () => {
    try  {
      setLoading(true);
      if(password === _password) {
        console.log(email);
        firebase.auth().createUserWithEmailAndPassword(email, password)
          .then(async data => {
            let _url = '';
            if(imgUri !== '') {
              const response = await fetch(imgUri)
              await response.blob()
                .then(async _blob => {
                  await firebase.storage().ref().child(data.user.uid).put(_blob).catch(console.log)
                  await firebase.storage().ref().child(data.user.uid).getDownloadURL().then(url => {
                    console.log(url);
                    _url = url
                  })
                }).catch(console.log);
            }
            database.ref('users/' + data.user.uid).set({ name: name, username: username, friends: 0, stories: 0, imgUrl: _url })
            await AsyncStorage.setItem('CREDENTIALS', JSON.stringify(firebase.auth().currentUser));
            await AsyncStorage.setItem('USER', JSON.stringify({ uid: data.user.uid, username: username, name: name, imgUrl: _url, friends: 0, stories: 0 }));
            dispatch({ type: SET_CREDENTIALS, payload: { credentials: firebase.auth().currentUser } });
            dispatch({ type: SET_USER, payload: { user: { username: username, name: name, uid: data.user.uid, imgUrl: _url, friends: 0, stories: 0 } } });
            navigation.navigate('App');
          }).catch(console.log)
      }
    } catch (e) {
      setLoading(false);
      console.log(e);
    }
  }

  const selectPicture = () => {
    ImagePicker.launchImageLibraryAsync(options)
      .then(res => {
        if(!res.cancelled) {
          setImgUri(res.uri);
        }
      }).catch(console.log);
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

        {loading && <LoadingView />}

        <View style={{ marginTop: 40 }}>
          <Image
            source={ imgUri === '' ? require('../assets/default.png') : { uri: imgUri }}
            style={{ width: 180, height: 180, borderWidth: 2, borderRadius: 1000, borderColor: '#FCE77D' }}
          />

          <TouchableOpacity style={{ position: 'relative', height: 50, width: 50, borderRadius: 30, backgroundColor: '#FFDB24', bottom: 52, left: 130,
            alignItems: 'center', justifyContent: 'center', elevation: 5 }} onPress={selectPicture}>
            <Icon name='camera' size={32} style={{ color: '#FFF', elevation: 8, shadowColor: '#000', shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.5, shadowRadius: 2, }}/>
          </TouchableOpacity>
        </View>

        <Input
            placeholder='Email' keyboardType='email-address'
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