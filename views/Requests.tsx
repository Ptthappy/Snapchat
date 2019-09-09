import  React, { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator, TouchableOpacity, AsyncStorage } from 'react-native';
import { Button, Image } from 'react-native-elements';
import { NavigationContainerProps } from 'react-navigation';
import { useDispatch, useSelector } from 'react-redux';
import { SET_FRIEND_REQUESTS, SET_USER } from '../redux/actionTypes';

import AppHeader from '../components/AppHeader';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import * as firebase from 'firebase/app';
import 'firebase/database';
import LoadingView from './LoadingView';

const Requests: React.FC<NavigationContainerProps> = ({ navigation }) => {
  const friendRequests = useSelector(store => store.friendRequests);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false)

  const _user = useSelector(store => store.user);
  const dispatch = useDispatch();

  useEffect(() => {
    setLoading(true);
    getUsers();
  }, [friendRequests]);

  const getUsers = async () => {
    const result = []
    for(const i of friendRequests) {
      await firebase.database().ref('users/' + i).once('value').then(snap => {
        let x = snap.val();
        x.uid = i;
        result.push(x);
      }).catch(console.log);
    }
    setUsers(result);
    setLoading(false);
  }

  const accept = async (user) => {
    let index = friendRequests.indexOf(user.uid);
    friendRequests.splice(index, 1);
    let newRequests = [];
    for(let i of friendRequests) {
      newRequests[i] = true;
    }
    firebase.database().ref('requests/' + _user.uid).set(newRequests);

    firebase.database().ref('friends/' + _user.uid + '/' + user.uid).set(true);
    firebase.database().ref('friends/' + user.uid + '/' + _user.uid).set(true);
    firebase.database().ref('users/').child(_user.uid).update({ "friends": _user.friends + 1 })
    firebase.database().ref('users/').child(user.uid).update({ "friends": user.friends + 1 })

    let newUser = _user;
    newUser.friends += 1;
    dispatch({ type: SET_FRIEND_REQUESTS, payload:{ friendRequests: newRequests } });
    dispatch({ type: SET_USER, payload: { user: newUser } })
    await AsyncStorage.setItem('FRIEND-REQUESTS', JSON.stringify(newRequests));
    await AsyncStorage.setItem('USER', JSON.stringify(newUser));
  }

  const decline = async (uid) => {
    let index = friendRequests.indexOf(uid);
    friendRequests.splice(index, 1);
    let newRequests = [];
    for(let i of friendRequests) {
      newRequests[i] = true;
    }
    dispatch({ type: SET_FRIEND_REQUESTS, payload:{ friendRequests: newRequests } });
    await AsyncStorage.setItem('FRIEND-REQUESTS', JSON.stringify(newRequests));
    firebase.database().ref('requests/' + _user.uid).set(newRequests);
  }

  //TODO: Iterar los ids para traerse los users

  return (
    <View style={{ flex: 1, backgroundColor: '#292826' }}>
      {loading && <LoadingView />}
      <AppHeader
        title='Friend Requests'
        leftComponent={<Button
          icon={<Icon name='arrow-left' size={25} style={{ color: '#292826' }} />}
          buttonStyle={{ height: 35, width: 35, borderRadius: 1000, marginTop: -23, paddingRight: 5, backgroundColor: 'transparent' }}
          onPress={() => navigation.goBack() }
        /> }
      />

      {users.map((user, i) => 
        <View style={{ width: '100%', height: 100, backgroundColor: '#272624', flexDirection: 'row', alignItems: 'center' }} key={i}>
          <Image
            source={user.imgUrl === '' ? require('../assets/default.png') : { uri: user.imgUrl }}
            style={{ height: 75, width: 75, borderRadius: 100, borderWidth: 1, borderColor: '#FCE77D', marginHorizontal: 10 }}
            PlaceholderContent={<ActivityIndicator />}
          />
          <View style={{ flexDirection: 'column' }}>
            <Text style={{ fontFamily: 'Mont-Light', fontSize: 14, color: '#d0d0d0' }}>{user.name}</Text>
            <Text style={{ fontFamily: 'Mont-Light', fontSize: 14, color: '#d0d0d0' }}>@{user.username}</Text>
          </View>
          <TouchableOpacity style={{ marginLeft: 'auto' }} onPress={() => decline(user.uid)}>
            <Icon name='window-close' size={35} style={{ color: '#c71414' }} />
          </TouchableOpacity>
          <TouchableOpacity style={{ marginLeft: 20, marginRight: 20 }} onPress={() => accept(user)}>
            <Icon name='check' size={35} style={{ color: '#2ab04e' }} />
          </TouchableOpacity>
        </View>
      )}
    </View>
  )
}

export default Requests;