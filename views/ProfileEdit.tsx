import React, { useState } from 'react';
import { View, Text, AsyncStorage } from 'react-native';
import { Button, Image } from 'react-native-elements';
import { NavigationContainerProps } from 'react-navigation';
import { useSelector, useDispatch } from 'react-redux';
import { SET_USER } from '../redux/actionTypes';

import AppHeader from '../components/AppHeader';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import * as ImagePicker from 'expo-image-picker';
import * as firebase from 'firebase/app';
import 'firebase/firestore';

const options = {
  mediaTypes: ImagePicker.MediaTypeOptions.Images,
  allowsEditing: true,
  aspect: [1, 1],
};

const ProfileEdit: React.FC<NavigationContainerProps> = ({ navigation }) => {
  const [changeUser, setChangeUser] = useState(false);
  const [changeUsername, setChangeUsername] = useState(false);
  
  const user = useSelector(store => store.user);
  const colors = useSelector(store => store.color);

  let imgUrl = '';

  const dispatch = useDispatch();

  const changeField = async (value) => {

  }

  const selectPicture = async () => {
    ImagePicker.launchImageLibraryAsync(options)
      .then(async res => {
        if(!res.cancelled) {
          console.log(user)
          await uploadPicture(res.uri);
          console.log('1.....')
          const newUser = { uid: user.uid, name: user.name, username: user.username, imgUrl: imgUrl };
          dispatch({ type: SET_USER, payload: { user: newUser } });
          console.log('2.....')
          await AsyncStorage.removeItem('USER');
          await AsyncStorage.setItem('USER', JSON.stringify(newUser));
          console.log('3.....')
        } else {
          console.log('cancelled')
        }
      }).catch(console.log);
  }

  const uploadPicture = async (uri) => {
    const response = await fetch(uri);
      response.blob()
        .then(async _blob => {
          firebase.storage().ref().child(user.uid).put(_blob).catch(console.log)
    }).catch(console.log);
    await firebase.storage().ref().child(user.uid).getDownloadURL().then(url => {
      imgUrl = url
      console.log(imgUrl);
      console.log(url);
    });
  }

  return (
    <View style={{ flex: 1, backgroundColor: colors.primary, alignItems: 'center' }}>
      <AppHeader
        title='Edit Profile'
        color={colors.secondary}
        leftComponent={<Button
          icon={<Icon name='arrow-left' size={25} style={{ color: colors.primary }} />}
          buttonStyle={{ height: 35, width: 35, borderRadius: 1000, marginTop: -23, paddingRight: 5, backgroundColor: 'transparent' }}
          onPress={() => navigation.goBack() }
        /> }
      />

      <Image
        source={user.imgUrl !== '' ? { uri: user.imgUrl } : require('../assets/default.png')}
        style={{ width: 300, height: 300, borderRadius: 2, borderWidth: 2, borderColor: colors.secondary, marginTop: 32, marginBottom: 32, backgroundColor: user.imgUrl === '' ? '#4a76d4' : 'transparent' }}
      />

      <Button
        title='Change Profile Photo'
        buttonStyle={{ width: 200, height: 48, borderRadius: 30, backgroundColor: colors.secondary }}
        titleStyle={{ fontFamily: 'Mont', fontSize: 16, color: colors.primary }}
        onPress={selectPicture}
      />

      <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%', alignItems: 'center', marginTop: 30 }}>
        <Text style={{ fontFamily: 'Mont', fontSize: 19, color: colors.fonts, paddingLeft: 20 }}>{user.username}</Text>
        <Button
          title='Change Username'
          buttonStyle={{ backgroundColor: 'transparent', marginRight: 25 }}
          titleStyle={{ fontFamily: 'Mont', fontSize: 16, color: colors.secondary }}
          onPress={() => console.log('Felicidades eres gai')}
        />
      </View>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%', alignItems: 'center', marginTop: 18 }}>
        <Text style={{ fontFamily: 'Mont', fontSize: 19, color: colors.fonts, paddingLeft: 20 }}>{user.name}</Text>
        <Button
          title='Change Name'
          buttonStyle={{ backgroundColor: 'transparent', marginRight: 25 }}
          titleStyle={{ fontFamily: 'Mont', fontSize: 16, color: colors.secondary }}
          onPress={() => console.log('Felicidades eres gai')}
        />
      </View>
    </View>
  );
}

export default ProfileEdit;