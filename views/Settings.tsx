import React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainerProps } from 'react-navigation';
import { Button } from 'react-native-elements';

import AppHeader from '../components/AppHeader';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const Settings: React.FC<NavigationContainerProps> = ({ navigation }) => {
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

      <Button
        title='Edit Profile'
        type='outline'
        buttonStyle={{ height: 120, width: '100%', borderRightWidth: 0, borderLeftWidth: 0, justifyContent: 'flex-start', borderColor: '#fff' }}
        titleStyle={{ fontFamily: 'Mont', fontSize: 27, color: '#fff', textAlign: 'left', paddingLeft: 15 }}
        icon={<Icon name='account-edit' size={40} style={{ color: '#fff', marginLeft: 18, marginRight: 10 }} />}
        onPress={() => navigation.navigate('EditProfile')}
      />

      <Button
        title='Secondary Color'
        type='outline'
        buttonStyle={{ height: 120, width: '100%', borderRightWidth: 0, borderLeftWidth: 0, justifyContent: 'flex-start', borderColor: '#fff' }}
        titleStyle={{ fontFamily: 'Mont', fontSize: 27, color: '#fff', textAlign: 'left', paddingLeft: 15 }}
        icon={<Icon name='account-edit' size={40} style={{ color: '#fff', marginLeft: 18, marginRight: 10 }} />}
        onPress={() => console.log('Desplegar modal con los colorcitos jeje')}
      />

      <Button
        title='Logout'
        type='outline'
        buttonStyle={{ height: 120, width: '100%', borderRightWidth: 0, borderLeftWidth: 0, justifyContent: 'flex-start', borderColor: '#fff' }}
        titleStyle={{ fontFamily: 'Mont', fontSize: 27, color: '#d93636', textAlign: 'left', paddingLeft: 15 }}
        icon={<Icon name='exit-to-app' size={40} style={{ color: '#fff', marginLeft: 18, marginRight: 10 }} />}
        onPress={() => navigation.dangerouslyGetParent().navigate('Auth')}
      />
    </View>
  );
}

export default Settings;