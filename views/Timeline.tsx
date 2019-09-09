import React, { useState, useEffect, useRef } from 'react';
import { View, Text, BackHandler, TouchableOpacity, Dimensions, KeyboardAvoidingView, ScrollView, Keyboard } from 'react-native';
import { Button, Image, Input } from 'react-native-elements';
import { NavigationContainerProps } from 'react-navigation';
import { useSelector } from 'react-redux';
import * as ImagePicker from 'expo-image-picker';
import LoadingView from './LoadingView';

import AppHeader from '../components/AppHeader';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import * as firebase from 'firebase/app';
import 'firebase/firestore';

const pickerOptions = {
  mediaTypes: ImagePicker.MediaTypeOptions.Images,
  allowsEditing: true,
  quality: 0.5,
  aspect: [3, 4]
};

const cameraOptions = {
  mediaTypes: ImagePicker.MediaTypeOptions.Images,
  allowsEditing: true,
  quality: 0.5,
  aspect: [3, 4]
}

const Timeline: React.FC<NavigationContainerProps> = ({ navigation }) => {
  const colors = useSelector(store => store.color);
  const [photo, setPhoto] = useState(null);
  const [description, setDescription] = useState('')
  const ref = useRef(null);

  const user = useSelector(store => store.user);

  const width = Dimensions.get('window').width

  useEffect(() => {
    navigation.addListener('didFocus', () => {
      Keyboard.addListener('keyboardDidShow', () => { ref.current.scrollToEnd({ animated: true }) })
    });
    navigation.addListener('didBlur', () => {
      Keyboard.removeAllListeners('keyboardDidShow')
    })
  }, [])

  const handleSelectPicture = () => {
    ImagePicker.launchImageLibraryAsync(pickerOptions)
      .then(res => {
        if(!res.cancelled) {
          setPhoto(res.uri);
        }
      })
  }

  const handleTakePicture = () => {
    ImagePicker.launchCameraAsync(cameraOptions)
      .then(res => {
        if(!res.cancelled) {
          setPhoto(res.uri);
        }
      })
  }

  const handleUpload = async () => {

  }
  
  if(!photo) {
    return (
      <View style={{ flex: 1, backgroundColor: colors.primary }}>
        <AppHeader
          title='Snap Application'
          color={colors.secondary}
          rightComponent={<Button
            icon={<Icon name='camera' type='Material' size={25} style={{ color: colors.primary }} />}
            buttonStyle={{ height: 35, width: 35, borderRadius: 1000, marginTop: -23, paddingLeft: 2, backgroundColor: 'transparent' }}
            onPress={handleTakePicture}
          /> }
        />

        <TouchableOpacity style={{ position: 'absolute', bottom: 20, right: 20, height: 60, width: 60, borderRadius: 30, backgroundColor: colors.secondary, 
          elevation: 10, alignItems: 'center', justifyContent: 'center' }} onPress={handleSelectPicture} >
          <Icon name='plus' size={33} style={{ color: colors.primary, bottom: 1 }} />
        </TouchableOpacity>

      </View>
    );
  } else {
    return(
      <KeyboardAvoidingView style={{ flex: 1, backgroundColor: colors.primary, alignItems: 'center' }} enabled behavior='padding'>
        <AppHeader
          title='Add Picture to Timeline'
          color={colors.secondary}
          fontColor={colors.fonts}
          leftComponent={<Button
            icon={<Icon name='arrow-left' size={25} style={{ color: colors.fonts }} />}
            buttonStyle={{ height: 35, width: 35, borderRadius: 1000, marginTop: -23, paddingRight: 5, backgroundColor: 'transparent' }}
            onPress={() => {setPhoto(null); setDescription('')}}
          /> }
          rightComponent={<Button
            icon={<Icon name='send' size={25} style={{ color: colors.fonts }} />}
            buttonStyle={{ height: 35, width: 35, borderRadius: 1000, marginTop: -23, paddingLeft: 2, backgroundColor: 'transparent' }}
            onPress={handleUpload}
          /> }
        />
        <ScrollView ref={ref}>
          <TouchableOpacity style={{ elevation: 5 }}
            onPress={() => navigation.navigate('PictureView', { uri: photo, name: '' })}>
            <Image
              source={{ uri: photo }}
              style={{ height: width * 1.25, width: width }}
            />
          </TouchableOpacity>

          <Input 
            placeholder='Add a description'
            placeholderTextColor={colors.placeholder}
            containerStyle={{ width: '100%', height: 50, backgroundColor: colors.primary, justifyContent: 'flex-start', borderBottomWidth: 1,
              borderColor: colors.tiny, marginTop: 12, marginBottom: 20 }}
            inputContainerStyle={{ borderBottomWidth: 0 }}
            inputStyle={{ fontFamily: 'Mont', color: colors.fonts }}
            onChange={(event) => setDescription(event.nativeEvent.text)}
            value={description}
          />
        </ScrollView>
      </KeyboardAvoidingView>
    )
  }
}

export default Timeline;