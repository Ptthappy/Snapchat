import React, { useState, useEffect } from 'react';
import { View, Text, BackHandler } from 'react-native';
import { Button } from 'react-native-elements';
import { NavigationContainerProps } from 'react-navigation';
import { useSelector } from 'react-redux';
import * as ImagePicker from 'expo-image-picker';
import LoadingView from './LoadingView';

import AppHeader from '../components/AppHeader';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import * as firebase from 'firebase/app';
import 'firebase/firestore';

const options = {
  mediaTypes: ImagePicker.MediaTypeOptions.Images,
  allowsEditing: true,
  aspect: [1, 1]
};

const Timeline: React.FC<NavigationContainerProps> = ({ navigation }) => {
  const [img, setImg] = useState('');
  const user = useSelector(store => store.user);

  return (
    <View style={{ flex: 1, backgroundColor: '#292826' }}>
      <AppHeader
        title='Snap Application'
      />

    </View>
  );
}

export default Timeline;