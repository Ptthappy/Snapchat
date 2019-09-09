import React from 'react';
import { View, Dimensions } from 'react-native';
import { Image } from 'react-native-elements';
import AppHeader from '../components/AppHeader';
import { Button } from 'react-native-elements';
import { useSelector } from 'react-redux';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { NavigationContainerProps } from 'react-navigation';

const PictureView: React.FC<NavigationContainerProps> = ({ navigation }) => {
  const width = Dimensions.get('window').width;
  const user = navigation.getParam('user') ? navigation.getParam('user') : useSelector(store => store.user);

  const _uri = navigation.getParam('uri');

  return (
    <View style={{ flex: 1, backgroundColor: '#000', alignItems: 'center' }}>
      <AppHeader
        title={ typeof navigation.getParam('user') === 'undefined' ? typeof _uri === 'undefined' ? 'Profile Picture' : 'Preview' : user.name }
        color='#000'
        fontColor='#fff'
        leftComponent={<Button
          icon={<Icon name='arrow-left' size={25} style={{ color: '#fff' }} />}
          buttonStyle={{ height: 35, width: 35, borderRadius: 1000, marginTop: -23, paddingRight: 5, backgroundColor: 'transparent' }}
          onPress={() => navigation.goBack() }
        /> }
      />

      <Image
        source={_uri ? { uri: _uri } : user.imgUrl === '' ? require('../assets/default.png') : { uri: user.imgUrl }}
        style={{ width: width, height: typeof _uri === 'undefined' ? width : width * 1.25, marginTop: typeof _uri === 'undefined' ? '30%' : '20%' }}
      />
    </View>
  );
}

export default PictureView;