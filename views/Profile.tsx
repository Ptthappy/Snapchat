import React, { useState, useEffect } from 'react';
import { View, Text, Dimensions, ScrollView, TouchableOpacity } from 'react-native';
import { Button, Image } from 'react-native-elements';
import { NavigationContainerProps } from 'react-navigation';

import AppHeader from '../components/AppHeader';
import StoryCard from '../components/StoryCard';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const Profile: React.FC<NavigationContainerProps> = ({ navigation }) => {
  const [name, setName] = useState('Julieta Tallaferro');
  const [username, setUsername] = useState('wondergirl');

  const width = Dimensions.get('window').width;

  return (
    <View style={{ flex: 1, backgroundColor: '#292826' }}>
      <AppHeader
        title='Profile'
        rightComponent={<Button
          icon={<Icon name='settings' size={25} style={{ color: '#292826' }} />}
          buttonStyle={{ height: 35, width: 35, borderRadius: 1000, marginTop: -23, paddingLeft: 2, backgroundColor: 'transparent' }}
          onPress={() => navigation.navigate('Settings')}
        /> }
      />

      <View style={{ width: width, height: 220, flexDirection: 'row', backgroundColor: '#262523', elevation: 10 }}>
        <TouchableOpacity 
          style={{ width: width / 2.35, height: width / 2.35, marginHorizontal: 15, marginTop: 30, 
          borderWidth: 2, borderColor: '#FCE77D', borderRadius: 1000 }}
          onPress={() => navigation.navigate('PictureView')}
          ><Image
            source={require('../assets/default.png')}
            style={{ width: '100%', height: '100%', borderRadius: 1000 }}
          />
        </TouchableOpacity>
        
        <View style={{ width: width - 30 - (width / 2.35) }}>
          <Text style={{ paddingRight: 10, paddingLeft: 20, paddingBottom: 10, paddingTop: 47, textAlign: 'left', fontFamily: 'Mont', fontSize: 24, color: '#fff' }}>{username}</Text>
          <Text style={{ paddingRight: 10, paddingLeft: 20, paddingBottom: 20, textAlign: 'left', fontFamily: 'Mont', fontSize: 20, color: '#fff' }}>{name}</Text>
          <View style={{ width: '100%', flexDirection: 'row' }}>
            <View style={{ width: '42%', height: 100, flexDirection: 'column', marginLeft: 4 }}>
              <Text style={{ textAlign: 'center', fontFamily: 'Mont-Bold', fontSize: 17, color: '#fff', paddingBottom: 5 }}>15</Text>
              <Text style={{ textAlign: 'center', fontFamily: 'Mont', fontSize: 15, color: '#fff' }}>Friends</Text>   
            </View>
            <View style={{ width: '42%', height: 100, flexDirection: 'column' }}>
              <Text style={{ textAlign: 'center', fontFamily: 'Mont-Bold', fontSize: 17, color: '#fff', paddingBottom: 5 }}>160</Text>
              <Text style={{ textAlign: 'center', fontFamily: 'Mont', fontSize: 15, color: '#fff' }}>Stories</Text>
            </View>
          </View>
        </View>
      </View>

      <ScrollView>
        <View style={{ width: '100%', height: 12 }} />
        <View style={{ width: '100%', height: 180, flexDirection: 'row' }}>
          <View style={{ width: '33.3333%', height: '100%', alignItems: 'center', justifyContent: 'center' }}>
            <StoryCard />
          </View>
        </View>

        {/* <View style={{ width: '100%', height: 180, flexDirection: 'row' }}>
          <View style={{ width: '33.3333%', height: '100%', alignItems: 'center', justifyContent: 'center' }}>
            <StoryCard />
          </View>
          <View style={{ width: '33.3333%', height: '100%', alignItems: 'center', justifyContent: 'center' }}>
            <StoryCard />
          </View>
          <View style={{ width: '33.3333%', height: '100%', alignItems: 'center', justifyContent: 'center' }}>
            <StoryCard />
          </View>
        </View>

        <View style={{ width: '100%', height: 180, flexDirection: 'row' }}>
          <View style={{ width: '33.3333%', height: '100%', alignItems: 'center', justifyContent: 'center' }}>
            <StoryCard />
          </View>
          <View style={{ width: '33.3333%', height: '100%', alignItems: 'center', justifyContent: 'center' }}>
            <StoryCard />
          </View>
          <View style={{ width: '33.3333%', height: '100%', alignItems: 'center', justifyContent: 'center' }}>
            <StoryCard />
          </View>
        </View> */}
      </ScrollView>

      {/* <ScrollView style={{ width: '100%', backgroundColor: 'red' }} showsVerticalScrollIndicator={false} >
        
      </ScrollView> */}

    </View>
  );
}

export default Profile;