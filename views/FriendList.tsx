import React from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Button, Image } from 'react-native-elements';
import { NavigationContainerProps } from 'react-navigation';
import { useSelector } from 'react-redux';

import AppHeader from '../components/AppHeader';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const FriendList: React.FC<NavigationContainerProps> = ({ navigation }) => {
  const friends = useSelector(store => store.friends);

  return (
    <View style={{ flex: 1, backgroundColor: '#292826' }}>
      <AppHeader
        title='Friends'
        leftComponent={<Button
          icon={<Icon name='arrow-left' size={25} style={{ color: '#292826' }} />}
          buttonStyle={{ height: 35, width: 35, borderRadius: 1000, marginTop: -23, paddingRight: 5, backgroundColor: 'transparent' }}
          onPress={() => navigation.goBack()}
        /> }
      />

      {friends.map((user, i) => 
        <TouchableOpacity style={{ width: '100%', height: 100, backgroundColor: '#272624', flexDirection: 'row', alignItems: 'center' }} key={i}
          onPress={() => navigation.navigate('Chat', { user })}>
          <Image
            source={user.imgUrl === '' ? require('../assets/default.png') : { uri: user.imgUrl }}
            style={{ height: 75, width: 75, borderRadius: 100, borderWidth: 1, borderColor: '#FCE77D', marginHorizontal: 10 }}
            PlaceholderContent={<ActivityIndicator />}
          />
          <View style={{ flexDirection: 'column' }}>
            <Text style={{ fontFamily: 'Mont', fontSize: 16, color: '#d0d0d0' }}>{user.name}</Text>
            <Text style={{ fontFamily: 'Mont-Light', fontSize: 14, color: '#d0d0d0' }}>@{user.username}</Text>
          </View>
        </TouchableOpacity>
      )}
    </View>
  );
}

export default FriendList;