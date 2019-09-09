import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { Button } from 'react-native-elements';
import { NavigationContainerProps } from 'react-navigation';
import { useSelector } from 'react-redux';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AppHeader from '../components/AppHeader';

const RecentChats: React.FC<NavigationContainerProps> = ({ navigation }) => {

  const colors = useSelector(store => store.color);

  return (
    <View style={{ flex: 1, backgroundColor: colors.primary }}>
      <AppHeader
        title='Chats'
        color={colors.secondary}
        rightComponent={<Button
          icon={<Icon name='account-plus' size={25} style={{ color: colors.primary }} />}
          buttonStyle={{ height: 35, width: 35, borderRadius: 1000, marginTop: -23, paddingLeft: 2, backgroundColor: 'transparent' }}
          onPress={() => navigation.navigate('Search')}
        /> }
      />

      <TouchableOpacity style={{ position: 'absolute', bottom: 20, right: 20, height: 60, width: 60, borderRadius: 30, backgroundColor: colors.secondary, 
        elevation: 10, alignItems: 'center', justifyContent: 'center' }} onPress={() => navigation.navigate('FriendList')} >
        <Icon name='account' size={28} style={{ color: '#292826', bottom: 1 }} />
      </TouchableOpacity>

      {/* Primero un boton que lleve a las friend request y luego los chats como tal */}
      <TouchableOpacity 
        style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', height: 100, width: '100%', backgroundColor: colors.bolder }}
        onPress={() => navigation.navigate('Requests')}>
          <Icon name='account-clock' size={35} style={{ color: colors.secondary, paddingHorizontal: 20 }} />
        <Text style={{ fontFamily: 'Mont-Bold', fontSize: 20, color: colors.fonts }}>Manage Friend Requests</Text>
      </TouchableOpacity>
      <View style={{ height: 0.5, width: '100%', backgroundColor: '#999' }} />
    </View>
  );
}

export default RecentChats;