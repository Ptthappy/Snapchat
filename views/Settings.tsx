import React, { useState } from 'react';
import { View, Text, TouchableOpacity, AsyncStorage } from 'react-native';
import { NavigationContainerProps } from 'react-navigation';
import { Overlay, Button, colors } from 'react-native-elements';
import { useDispatch } from 'react-redux';
import { SET_USER } from '../redux/actionTypes';

import AppHeader from '../components/AppHeader';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import * as firebase from 'firebase/app';
import 'firebase/auth';

const Settings: React.FC<NavigationContainerProps> = ({ navigation }) => {
  const [isVisible, setVisible] = useState(false);

  const dispatch = useDispatch();

  const logout = async () => {
    await firebase.auth().signOut()
      .then(async () => {
        await AsyncStorage.removeItem('USER');
        dispatch({ type: SET_USER, payload: { user: null } });
        navigation.navigate('Auth');
      });
  }

  return (
    <View style={{ flex: 1, backgroundColor: '#292826' }}>
      <AppHeader 
        title='Settings'
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
            <TouchableOpacity style={{ height: 60, width: 60, borderRadius: 40, backgroundColor: 'white', marginHorizontal: 9 }} />
            <TouchableOpacity style={{ height: 60, width: 60, borderRadius: 40, backgroundColor: 'blue', marginHorizontal: 9 }} />
            <TouchableOpacity style={{ height: 60, width: 60, borderRadius: 40, backgroundColor: 'red', marginHorizontal: 9 }} />
            <TouchableOpacity style={{ height: 60, width: 60, borderRadius: 40, backgroundColor: 'yellow', marginHorizontal: 9 }} />
          </View>
          <View style={{ width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginVertical: 4 }}>
            <TouchableOpacity style={{ height: 60, width: 60, borderRadius: 40, backgroundColor: 'yellow', marginHorizontal: 9 }} />
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
        buttonStyle={{ height: 100, width: '100%', borderRightWidth: 0, borderLeftWidth: 0, justifyContent: 'flex-start', borderColor: '#fff' }}
        titleStyle={{ fontFamily: 'Mont', fontSize: 27, color: '#fff', textAlign: 'left', paddingLeft: 15 }}
        icon={<Icon name='account-edit' size={40} style={{ color: '#fff', marginLeft: 18, marginRight: 10 }} />}
        onPress={() => navigation.navigate('ProfileEdit')}
      />

      <Button
        title='Secondary Color'
        type='outline'
        buttonStyle={{ height: 100, width: '100%', borderRightWidth: 0, borderLeftWidth: 0, justifyContent: 'flex-start', borderColor: '#fff' }}
        titleStyle={{ fontFamily: 'Mont', fontSize: 27, color: '#fff', textAlign: 'left', paddingLeft: 15 }}
        icon={<Icon name='account-edit' size={40} style={{ color: '#fff', marginLeft: 18, marginRight: 10 }} />}
        onPress={() => setVisible(true)}
      />

      <Button
        title='Logout'
        type='outline'
        buttonStyle={{ height: 100, width: '100%', borderRightWidth: 0, borderLeftWidth: 0, justifyContent: 'flex-start', borderColor: '#fff' }}
        titleStyle={{ fontFamily: 'Mont', fontSize: 27, color: '#d93636', textAlign: 'left', paddingLeft: 15 }}
        icon={<Icon name='exit-to-app' size={40} style={{ color: '#fff', marginLeft: 18, marginRight: 10 }} />}
        onPress={() => logout()}
      />
    </View>
  );
}

export default Settings;