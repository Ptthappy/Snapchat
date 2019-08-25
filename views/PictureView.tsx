import React from 'react';
import { View } from 'react-native';
import AppHeader from '../components/AppHeader';
import { Button } from 'react-native-elements';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { NavigationContainerProps } from 'react-navigation';

const PictureView: React.FC<NavigationContainerProps> = ({ navigation }) => {
  return (
    <View style={{ flex: 1, backgroundColor: '#000' }}>
      <AppHeader
        title={ typeof navigation.getParam('name') === 'undefined' ? 'Profile Picture' : navigation.getParam('name')}
        color='#000'
        fontColor='#fff'
        leftComponent={<Button
          icon={<Icon name='arrow-left' size={25} style={{ color: '#fff' }} />}
          buttonStyle={{ height: 35, width: 35, borderRadius: 1000, marginTop: -23, paddingRight: 5, backgroundColor: 'transparent' }}
          onPress={() => navigation.goBack() }
        /> }
      />
    </View>
  );
}

export default PictureView;