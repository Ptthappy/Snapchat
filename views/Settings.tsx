import React, { useState } from 'react';
import { View, Text, TouchableOpacity, AsyncStorage } from 'react-native';
import { NavigationContainerProps } from 'react-navigation';
import { Overlay, Button, colors } from 'react-native-elements';
import { useDispatch, useSelector } from 'react-redux';
import { SET_USER, SET_CREDENTIALS, SET_FRIENDS, SET_FRIEND_REQUESTS, SET_COLOR } from '../redux/actionTypes';
import { yellow_black, blue_black, white_black, grey_black, red_black } from '../utils/colors';

import AppHeader from '../components/AppHeader';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import * as firebase from 'firebase/app';
import 'firebase/auth';

const Settings: React.FC<NavigationContainerProps> = ({ navigation }) => {
  const [isVisible, setVisible] = useState(false);
  const colors = useSelector(store => store.color);

  const dispatch = useDispatch();

  const logout = async () => {
    await firebase.auth().signOut()
      .then(async () => {
        await AsyncStorage.removeItem('SNAP-USER');
        await AsyncStorage.removeItem('SNAP-CREDENTIALS');
        await AsyncStorage.removeItem('SNAP-FRIEND-REQUESTS');
        await AsyncStorage.removeItem('SNAP-FRIENDS');
        dispatch({ type: SET_USER, payload: { user: null } });
        dispatch({ type: SET_CREDENTIALS, payload: { credentials: null } });
        dispatch({ type: SET_FRIENDS, payload: { friends: null } });
        dispatch({ type: SET_FRIEND_REQUESTS, payload: { friendRequests: null } });
        navigation.navigate('Auth');
      });
  }

  const setColor = async (obj ) => {
    await AsyncStorage.setItem('SNAP-COLOR', JSON.stringify(obj));
    dispatch({ type: SET_COLOR, payload: { color: obj } })
  }

  return (
    <View style={{ flex: 1, backgroundColor: '#292826' }}>
      <AppHeader 
        title='Settings'
        color={colors.secondary}
        leftComponent={<Button
          icon={<Icon name='arrow-left' size={25} style={{ color: '#292826' }} />}
          buttonStyle={{ height: 35, width: 35, borderRadius: 1000, marginTop: -23, paddingRight: 5, backgroundColor: 'transparent' }}
          onPress={() => navigation.goBack() }
        /> }
      />

      <Overlay isVisible={isVisible} overlayBackgroundColor='#494949' height={320} width='90%' 
        overlayStyle={{ alignItems: 'center' }} >
        <View style={{ width: '100%', alignItems: 'center', flexDirection: 'column' }}>
          <Text style={{ fontFamily: 'Mont-Bold', fontSize: 18, textAlign: 'center', paddingTop: 5, color: '#fff' }}>Set Secondary Color</Text>
          <View style={{ width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginBottom: 4, marginTop: 20 }}>
            <TouchableOpacity style={{ height: 60, width: 60, borderRadius: 40, backgroundColor: yellow_black.secondary, marginHorizontal: 9 }}
              onPress={() => setColor(yellow_black)} />
            <TouchableOpacity style={{ height: 60, width: 60, borderRadius: 40, backgroundColor: blue_black.secondary, marginHorizontal: 9 }}
              onPress={() => setColor(blue_black)} />
            <TouchableOpacity style={{ height: 60, width: 60, borderRadius: 40, backgroundColor: red_black.secondary, marginHorizontal: 9 }}
              onPress={() => setColor(red_black)} />
            <TouchableOpacity style={{ height: 60, width: 60, borderRadius: 40, backgroundColor: white_black.secondary, marginHorizontal: 9 }}
              onPress={() => setColor(white_black)} />
          </View>
          <View style={{ width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginVertical: 4 }}>
            <TouchableOpacity style={{ height: 60, width: 60, borderRadius: 40, backgroundColor: grey_black.secondary, marginHorizontal: 9 }}
              onPress={() => setColor(grey_black)} />
            <TouchableOpacity style={{ height: 60, width: 60, borderRadius: 40, backgroundColor: 'green', marginHorizontal: 9 }} />
            <TouchableOpacity style={{ height: 60, width: 60, borderRadius: 40, backgroundColor: 'purple', marginHorizontal: 9 }} />
            <TouchableOpacity style={{ height: 60, width: 60, borderRadius: 40, backgroundColor: 'blue', marginHorizontal: 9 }} />
          </View>
          <View style={{ width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginVertical: 4 }}>
            <TouchableOpacity style={{ height: 60, width: 60, borderRadius: 40, backgroundColor: 'orange', marginHorizontal: 9 }} />
            <TouchableOpacity style={{ height: 60, width: 60, borderRadius: 40, backgroundColor: 'blue', marginHorizontal: 9 }} />
            <TouchableOpacity style={{ height: 60, width: 60, borderRadius: 40, backgroundColor: 'magenta', marginHorizontal: 9 }} />
            <TouchableOpacity style={{ height: 60, width: 60, borderRadius: 40, backgroundColor: 'black', marginHorizontal: 9 }} />
          </View>
          <View style={{ width: '100%', justifyContent: 'flex-end', flexDirection: 'row' }}>
            <Button title='Cancel'
            buttonStyle={{ backgroundColor: 'transparent', height: 40, width: 90, marginBottom: 8, marginTop: 10 }}
            titleStyle={{ fontFamily: 'Mont-Bold', fontSize: 18 }}
            onPress={() => setVisible(false)} />
          </View>
        </View>
      </Overlay>

      <Button
        title='Edit Profile'
        type='outline'
        buttonStyle={{ height: 75, width: '100%', borderRightWidth: 0, borderLeftWidth: 0, justifyContent: 'flex-start', borderColor: '#999' }}
        titleStyle={{ fontFamily: 'Mont', fontSize: 24, color: '#fff', textAlign: 'left', paddingLeft: 15 }}
        icon={<Icon name='account-edit' size={40} style={{ color: '#fff', marginLeft: 18, marginRight: 10 }} />}
        onPress={() => navigation.navigate('ProfileEdit')}
      />

      <Button
        title='Color Settings'
        type='outline'
        buttonStyle={{ height: 75, width: '100%', borderRightWidth: 0, borderLeftWidth: 0, justifyContent: 'flex-start', borderColor: '#999' }}
        titleStyle={{ fontFamily: 'Mont', fontSize: 24, color: '#fff', textAlign: 'left', paddingLeft: 15 }}
        icon={<Icon name='palette' size={40} style={{ color: colors.secondary, marginLeft: 18, marginRight: 10 }} />}
        onPress={() => setVisible(true)}
      />

      <Button
        title='Logout'
        type='outline'
        buttonStyle={{ height: 75, width: '100%', borderRightWidth: 0, borderLeftWidth: 0, justifyContent: 'flex-start', borderColor: '#999' }}
        titleStyle={{ fontFamily: 'Mont-Bold', fontSize: 24, color: '#d93636', textAlign: 'left', paddingLeft: 15 }}
        icon={<Icon name='exit-to-app' size={40} style={{ color: '#fff', marginLeft: 18, marginRight: 10 }} />}
        onPress={() => logout()}
      />
    </View>
  );
}

export default Settings;