import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { Button, Image } from 'react-native-elements';
import { NavigationContainerProps } from 'react-navigation';

import AppHeader from '../components/AppHeader';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const ProfileEdit: React.FC<NavigationContainerProps> = ({ navigation }) => {
  const [name, setName] = useState('Julieta Tallaferro');
  const [username, setUsername] = useState('wondergirl')
  return (
    <View style={{ flex: 1, backgroundColor: '#292826', alignItems: 'center' }}>
      <AppHeader
        title='Edit Profile'
        leftComponent={<Button
          icon={<Icon name='arrow-left' size={25} style={{ color: '#292826' }} />}
          buttonStyle={{ height: 35, width: 35, borderRadius: 1000, marginTop: -23, paddingRight: 5, backgroundColor: 'transparent' }}
          onPress={() => navigation.goBack() }
        /> }
      />

      <Image
        source={require('../assets/default.png')}
        style={{ width: 300, height: 300, borderRadius: 2, borderWidth: 2, borderColor: '#FCE77D', marginTop: 32, marginBottom: 32 }}
      />

      <Button
        title='Change Profile Photo'
        buttonStyle={{ width: 200, height: 48, borderRadius: 30, backgroundColor: '#F9D342' }}
        titleStyle={{ fontFamily: 'Mont', fontSize: 16, color: '#000' }}
        onPress={() => console.log('Change Profile Photo')}
      />

      <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%', alignItems: 'center', marginTop: 30 }}>
        <Text style={{ fontFamily: 'Mont', fontSize: 19, color: '#fff', paddingLeft: 20 }}>{username}</Text>
        <Button
          title='Change Username'
          buttonStyle={{ backgroundColor: 'transparent', marginRight: 25 }}
          titleStyle={{ fontFamily: 'Mont', fontSize: 16, color: '#F9D342' }}
          onPress={() => console.log('Felicidades eres gai')}
        />
      </View>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%', alignItems: 'center', marginTop: 18 }}>
        <Text style={{ fontFamily: 'Mont', fontSize: 19, color: '#fff', paddingLeft: 20 }}>{name}</Text>
        <Button
          title='Change Name'
          buttonStyle={{ backgroundColor: 'transparent', marginRight: 25 }}
          titleStyle={{ fontFamily: 'Mont', fontSize: 16, color: '#F9D342' }}
          onPress={() => console.log('Felicidades eres gai')}
        />
      </View>
    </View>
  );
}

export default ProfileEdit;