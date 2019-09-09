import React from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Button, Image } from 'react-native-elements';
import { NavigationContainerProps } from 'react-navigation';
import { useSelector } from 'react-redux';

import AppHeader from '../components/AppHeader';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const FriendList: React.FC<NavigationContainerProps> = ({ navigation }) => {
  const friends = useSelector(store => store.friends);
  const colors = useSelector(store => store.color);

  return (
    <View style={{ flex: 1, backgroundColor: '#292826' }}>
      <AppHeader
        title='Friends'
        color={colors.secondary}
        leftComponent={<Button
          icon={<Icon name='arrow-left' size={25} style={{ color: colors.primary }} />}
          buttonStyle={{ height: 35, width: 35, borderRadius: 1000, marginTop: -23, paddingRight: 5, backgroundColor: 'transparent' }}
          onPress={() => navigation.goBack()}
        /> }
      />

      {friends.map((user, i) => 
        <TouchableOpacity style={{ width: '100%', height: 100, backgroundColor: colors.bolder, flexDirection: 'row', alignItems: 'center' }} key={i}
          onPress={() => navigation.navigate('Chat', { user })}>
          <Image
            source={user.imgUrl === '' ? require('../assets/default.png') : { uri: user.imgUrl }}
            style={{ height: 75, width: 75, borderRadius: 100, borderWidth: 1, borderColor: colors.secondary, marginHorizontal: 10 }}
            PlaceholderContent={<ActivityIndicator />}
          />
          <View style={{ flexDirection: 'column' }}>
            <Text style={{ fontFamily: 'Mont', fontSize: 16, color: colors.fonts }}>{user.name}</Text>
            <Text style={{ fontFamily: 'Mont-Light', fontSize: 14, color: colors.fonts }}>@{user.username}</Text>
          </View>
        </TouchableOpacity>
      )}
    </View>
  );
}

export default FriendList;