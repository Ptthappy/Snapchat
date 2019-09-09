import React from 'react';
import { View, Text } from 'react-native'
import { Image, Button } from 'react-native-elements';
import { NavigationContainerProps } from 'react-navigation';
import { useSelector } from 'react-redux';

const GetStarted: React.FC<NavigationContainerProps> = ({ navigation }) => {
  const colors = useSelector(store => store.color);
  
  return (
    <View style={{ flex: 1, flexDirection: 'column', backgroundColor: colors.primary, alignItems: 'center', justifyContent: 'center' }}>
      <Image
        source={require('../assets/icon.png')}
        style={{ width: 288, height: 288, marginTop: -40 }}
      />
      <View style={{ flexDirection: 'row', marginTop: 62 }}>
        <Button title='Sign In' type='outline' buttonStyle={{ borderColor: colors.secondary, borderWidth: 0.7272, height: 40, width: 100 }}
          titleStyle={{ fontFamily: 'Mont', fontSize: 16, color: colors.secondary }} onPress={() => navigation.navigate('Login')} />
        <Text style={{ fontFamily: 'Mont-Bold', fontSize: 27, color: colors.secondary, marginHorizontal: 20 }}>or</Text>
        <Button title='Sign Up' type='outline' buttonStyle={{ borderColor: colors.secondary, borderWidth: 0.7272, height: 40, width: 100 }}
          titleStyle={{ fontFamily: 'Mont', fontSize: 16, color: colors.secondary }} onPress={() => navigation.navigate('Register')} />
      </View>
      <View style={{ height: 0.363636, width: '85%', backgroundColor: colors.secondary, marginTop: 22 }} />
    </View>
  );
}

export default GetStarted;