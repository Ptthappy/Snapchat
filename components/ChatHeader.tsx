import React from 'react'
import { Header, Button } from 'react-native-elements';
import { NavigationScreenProp, NavigationParams } from "react-navigation";

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

interface ChatHeaderProps {
  name: string,
  navigation: NavigationScreenProp<{}, NavigationParams>
}

const ChatHeader: React.FC<ChatHeaderProps> = ({ name, navigation }) => {
  return (
    <Header 
      backgroundColor='rgba(255, 255, 255, 0.9)'
      containerStyle={{ shadowColor: '#DCDEF4', borderBottomWidth: 0.2, margin: 0, zIndex: 10, borderBottomColor: '#AAAAAA' }}
      centerComponent={{ text: name, style: { color: '#000', fontFamily: 'Mont-Bold', fontSize: 20 } }}
      leftComponent={<Button
        icon={<Icon name='arrow-left' size={25} style={{ color: '#292826' }} />}
        buttonStyle={{ height: 35, width: 35, borderRadius: 1000, paddingRight: 5, backgroundColor: 'transparent' }}
        onPress={() => navigation.goBack()}
      /> }
    />
  );
}

export default ChatHeader;