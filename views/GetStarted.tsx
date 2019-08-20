import React from 'react';
import { View, Text } from 'react-native'
import { Image, Button } from 'react-native-elements';

const GetStarted: React.FC = () => {
  return (
    <View style={{ flex: 1, flexDirection: 'column', backgroundColor: '#292826', alignItems: 'center', justifyContent: 'center' }}>
      <Image
        source={require('../assets/icon.png')}
        style={{ width: 288, height: 288 }}
      />
      <View style={{ flexDirection: 'row', marginTop: 42 }}>
        <Button title='Sign In' type='outline' buttonStyle={{ borderColor: '#FCE77D', borderWidth: 0.7272, height: 40, width: 100 }}
          titleStyle={{ fontFamily: 'Mont', fontSize: 16, color: '#FCE77D' }} />
        <Text style={{ fontFamily: 'Mont-Bold', fontSize: 27, color: '#FCE77D', paddingBottom: 5, marginHorizontal: 20 }}>or</Text>
        <Button title='Sign Up' type='outline' buttonStyle={{ borderColor: '#FCE77D', borderWidth: 0.7272, height: 40, width: 100 }}
          titleStyle={{ fontFamily: 'Mont', fontSize: 16, color: '#FCE77D' }} />
      </View>
      <View style={{ height: 0.363636, width: '85%', backgroundColor: '#FCE77D', marginTop: 22 }} />
    </View>
  );
}

export default GetStarted;