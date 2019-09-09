import React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainerProps } from 'react-navigation';

import ChatHeader from '../components/ChatHeader';

const Chat: React.FC<NavigationContainerProps> = ({ navigation }) => {
  const _user = navigation.getParam('user');

  return (
    <View style={{ flex: 1, backgroundColor: '#292826' }}>
      <ChatHeader navigation={navigation} name={_user.name} />
    </View>
  );
}

export default Chat;