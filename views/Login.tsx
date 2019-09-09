import React, { useState, useEffect } from 'react';
import { View, Text, AsyncStorage, Keyboard } from 'react-native';
import { Button, Image, Input } from 'react-native-elements';
import { NavigationContainerProps } from 'react-navigation';
import { LinearGradient } from 'expo-linear-gradient';
import { useDispatch, useSelector } from 'react-redux';

import * as firebase from 'firebase';
import "firebase/auth";
import AppHeader from '../components/AppHeader';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { SET_USER, SET_CREDENTIALS, SET_FRIEND_REQUESTS, SET_FRIENDS } from '../redux/actionTypes';
import LoadingView from './LoadingView';

const Login: React.FC<NavigationContainerProps> = ({ navigation }) => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [imgUrl, setImgUrl] = useState('');

  const dispatch = useDispatch();
  const colors = useSelector(store => store.color);

  const login = async () => {
    setLoading(true);
    Keyboard.dismiss();
    await firebase.auth().signInWithEmailAndPassword(email, password)
      .then(async data => {
        if(data) {
          firebase.database().ref('users/' + data.user.uid).once('value').then(async snap => {
            const username = snap.val().username;
            const name = snap.val().name;
            const friends = snap.val().friends;
            const stories = snap.val().stories;
            const imgUrl = snap.val().imgUrl;
            //Friend requests
            await firebase.database().ref('requests/' + firebase.auth().currentUser.uid).once('value').then(async friendSnap => {
              let requests = [];
              for(const x in friendSnap.val()) {
                requests.push(x);
              }
              await AsyncStorage.setItem('SNAP-FRIEND-REQUESTS', JSON.stringify(requests));
              dispatch({ type: SET_FRIEND_REQUESTS, payload: { friendRequests: requests } })
            })

            //Friends
            await firebase.database().ref('friends/' + firebase.auth().currentUser.uid).once('value').then(async friendSnap => {
              let friends = [];
              for(const i in friendSnap.val()) {
                await firebase.database().ref('users/' + i).once('value').then(async userSnap => {
                  friends.push(userSnap.val());
                })
              }
              console.log(friends);
              await AsyncStorage.setItem('SNAP-FRIENDS', JSON.stringify(friends));
              dispatch({ type: SET_FRIENDS, payload: { friends: friends } })
            });

            await AsyncStorage.setItem('SNAP-CREDENTIALS', JSON.stringify(firebase.auth().currentUser));
            await AsyncStorage.setItem('SNAP-USER', JSON.stringify({ username: username, name: name, uid: firebase.auth().currentUser.uid, imgUrl: imgUrl, friends: friends, stories: stories }));
            dispatch({ type: SET_CREDENTIALS, payload: { credentials: firebase.auth().currentUser } });
            dispatch({ type: SET_USER, payload: { user: { username: username, name: name, uid: firebase.auth().currentUser.uid, imgUrl: imgUrl, friends: friends, stories: stories } } })
            navigation.navigate('App');
          }).catch(console.log);
        } else {
          console.log('Login Error');
        }
      }).catch(console.log);
      setLoading(false);
  }

  return (
    <View style={{ flex: 1, backgroundColor: colors.primary, alignItems: 'center' }}>
      <AppHeader
        title='Snap Application'
        color={colors.secondary}
        leftComponent={<Button
          icon={<Icon name='arrow-left' size={25} style={{ color: colors.primary }} />}
          buttonStyle={{ height: 35, width: 35, borderRadius: 1000, marginTop: -23, paddingRight: 5, backgroundColor: 'transparent' }}
          onPress={() => navigation.goBack()}
        /> }
      />

      {loading && <LoadingView /> }

      <Image
        source={require('../assets/icon.png')}
        style={{ height: 100, width: 100, marginTop: 40 }}
      />

      <Input 
        placeholder='Email' keyboardType='email-address'
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

      <LinearGradient colors={[colors.secondary, colors.secondary]} style={{ width: '90%', height: 42, marginTop: 20, borderRadius: 30,
        alignItems: 'center', justifyContent: 'center' }} start={[0, 0]}>
        <Button containerStyle={{ backgroundColor: 'transparent', width: '100%', height: '100%' }} buttonStyle={{ backgroundColor: 'transparent', width: '100%', height: '100%' }} 
          titleStyle={{ fontFamily: 'Mont-Bold', color: '#FFF' }} title="Login" onPress={() => login()}/>
      </LinearGradient>

      <Text style={{ fontFamily: 'Mont', fontSize: 17, color: colors.fonts, marginVertical: 10, marginRight: 20, marginLeft: 30 }}>Do not have an account? 
        Create one <Text style={{ color: colors.secondary, fontFamily: 'Mont-Bold' }} onPress={() => navigation.navigate('Register')}>here</Text></Text>
    </View>
  );
}

export default Login;