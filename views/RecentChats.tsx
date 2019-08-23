import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Button } from 'react-native-elements';
import { NavigationContainerProps } from 'react-navigation';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AppHeader from '../components/AppHeader';

const RecentChats: React.FC<NavigationContainerProps> = ({ navigation }) => {

  return (
    <View style={{ flex: 1, backgroundColor: '#292826' }}>
      <AppHeader
        title='Chats'
        rightComponent={<Button
          icon={<Icon name='account-plus' size={25} style={{ color: '#292826' }} />}
          buttonStyle={{ height: 35, width: 35, borderRadius: 1000, marginTop: -23, paddingLeft: 2, backgroundColor: 'transparent' }}
          onPress={() => navigation.navigate('Search')}
        /> }
      />

      <TouchableOpacity style={{ position: 'absolute', bottom: 20, right: 20, height: 60, width: 60, borderRadius: 30, backgroundColor: '#FFDB24', 
        elevation: 10, alignItems: 'center', justifyContent: 'center' }} onPress={() => navigation.navigate('FriendList')} >
        <Icon name='account' size={28} style={{ color: '#292826', bottom: 1 }} />
      </TouchableOpacity>
    </View>
  );
}

export default RecentChats;