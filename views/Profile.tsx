import React, { useState, useEffect } from 'react';
import { View, Text, Dimensions, ScrollView } from 'react-native';
import { Button, Image } from 'react-native-elements';
import { NavigationContainerProps } from 'react-navigation';

import AppHeader from '../components/AppHeader';
import StoryCard from '../components/StoryCard';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const Profile: React.FC<NavigationContainerProps> = ({ navigation }) => {
  const [name, setName] = useState('Siul Petrella');
  const [username, setUsername] = useState('ptthappy');
  const [status, setStatus] = useState('Lorem ipsum dolor sit, amet consectetur adipisicing elit. Tempore quasi qui ducimus necessitatibus eligendi deleniti delectus ut aliquid, minima quas, possimus harum, explicabo minus.');
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
        <Image
          source={require('../assets/default.png')}
          style={{ width: width / 2.35, height: width / 2.35, marginHorizontal: 15, marginTop: 30, borderWidth: 2, borderColor: '#FCE77D', borderRadius: 1000 }}
        />
        <View style={{ width: width - 30 - (width / 2.35) }}>
          <Text style={{ paddingRight: 10, paddingLeft: 20, paddingBottom: 10, paddingTop: 47, textAlign: 'left', fontFamily: 'Mont', fontSize: 26, color: '#fff' }}>{username}</Text>
          <Text style={{ paddingRight: 10, paddingLeft: 20, paddingBottom: 20, textAlign: 'left', fontFamily: 'Mont', fontSize: 22, color: '#fff' }}>{name}</Text>
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