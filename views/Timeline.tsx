import React, { useState, useEffect } from 'react';
import { View, Text, BackHandler } from 'react-native';
import { Button } from 'react-native-elements';
import { NavigationContainerProps } from 'react-navigation';

import AppHeader from '../components/AppHeader';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const Timeline: React.FC<NavigationContainerProps> = ({ navigation }) => {

  return (
    <View style={{ flex: 1, backgroundColor: '#292826' }}>
      <AppHeader
        title='Snap Application'
      />
    </View>
  );
}

export default Timeline;