import  React, { useState } from 'react';
import { View } from 'react-native';
import { Button } from 'react-native-elements';
import { NavigationContainerProps } from 'react-navigation';

import AppHeader from '../components/AppHeader';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const Requests: React.FC<NavigationContainerProps> = ({ navigation }) => {
  

  return (
    <View style={{ flex: 1, backgroundColor: '#292826' }}>
      <AppHeader 
        title='Friend Requests'
        leftComponent={<Button
          icon={<Icon name='arrow-left' size={25} style={{ color: '#292826' }} />}
          buttonStyle={{ height: 35, width: 35, borderRadius: 1000, marginTop: -23, paddingRight: 5, backgroundColor: 'transparent' }}
          onPress={() => navigation.goBack() }
        /> }
      />
    </View>
  )
}

export default Requests;