import React, { useState } from 'react';
import { View, Text, ActivityIndicator, TouchableOpacity } from 'react-native';
import { Button, Image } from 'react-native-elements';
import { NavigationContainerProps, ScrollView } from 'react-navigation';
import { useSelector } from 'react-redux';

import AppHeader from '../components/AppHeader';
import SearchHeader from '../components/SearchHeader';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import * as firebase from 'firebase/app';
import 'firebase/database';
import LoadingView from './LoadingView';

const Search: React.FC<NavigationContainerProps> = ({ navigation }) => {
  const [isSearchBarOpened, setSearchBarOpened] = useState(false);
  const [query, setQuery] = useState('');
  const [users, setUsers] = useState(null);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const user = useSelector(store => store.user);
  const colors = useSelector(store => store.color);

  const db = firebase.database();

  const search = async (input) => {
    let fetchedUsers;
    setQuery(input);
    setSearchBarOpened(false);
    if(!users) {
      await db.ref('users/').once('value').then(snap => {
        fetchedUsers = snap.val();
        setUsers(snap.val());
      })
    } else fetchedUsers = users;
    let result = [];
    for(const x in fetchedUsers) {
      if((fetchedUsers[x].username.toLowerCase().indexOf(input.toLowerCase()) !== -1
        || fetchedUsers[x].name.toLowerCase().indexOf(input.toLowerCase()) !== -1) && x !== user.uid) {
          fetchedUsers[x].uid = x;
          result.push(fetchedUsers[x]);
        }
    }
    console.log(result);
    setResults(result);
  }

  const sendFriendRequest = async (uid) => {
    setLoading(true);
    await firebase.database().ref('requests/' + uid).once('value').then(async snap => {
      console.log(snap.val());
      let body = snap.val();
      if(body === null) body = {};
      body[user.uid] = true;
      await firebase.database().ref('requests/' + uid).set(body);
      setLoading(false);
    }).catch(err => {
      console.log(err);
      setLoading(false);
    })
  }

  return (
    <View style={{ flex: 1, backgroundColor: colors.primary }}>
      {loading && <LoadingView />}
      {!isSearchBarOpened &&
        <AppHeader 
          title={query === '' ? 'People' : query}
          color={colors.secondary}
          leftComponent={<Button
            icon={<Icon name='arrow-left' size={25} style={{ color: colors.primary }} />}
            buttonStyle={{ height: 35, width: 35, borderRadius: 1000, marginTop: -23, paddingRight: 5, backgroundColor: 'transparent' }}
            onPress={() => navigation.goBack() }
          /> }
          rightComponent={<Button
            icon={<Icon name='magnify' size={25} style={{ color: colors.primary }} />}
            buttonStyle={{ height: 35, width: 35, borderRadius: 1000, marginTop: -23, paddingLeft: 2, backgroundColor: 'transparent' }}
            onPress={() => setSearchBarOpened(true) }
          /> }
        />
      }
      {isSearchBarOpened && 
        <SearchHeader cancel={() => setSearchBarOpened(false)} search={search} />
      }

      <ScrollView>
        {results.map((_user, i) => 
          <View style={{ width: '100%', height: 100, backgroundColor: colors.bolder, flexDirection: 'row', alignItems: 'center' }} key={i}>
            <Image
              source={_user.imgUrl === '' ? require('../assets/default.png') : { uri: _user.imgUrl }}
              style={{ height: 75, width: 75, borderRadius: 100, borderWidth: 1, borderColor: colors.secondary, marginHorizontal: 10 }}
              PlaceholderContent={<ActivityIndicator />}
            />
            <View style={{ flexDirection: 'column' }}>
              <Text style={{ fontFamily: 'Mont-Light', fontSize: 14, color: colors.fonts }}>{_user.name}</Text>
              <Text style={{ fontFamily: 'Mont-Light', fontSize: 14, color: colors.fonts }}>@{_user.username}</Text>
            </View>
            <TouchableOpacity style={{ marginLeft: 'auto', marginRight: 20 }} onPress={() => sendFriendRequest(_user.uid)}>
              <Icon name='account-plus' size={35} style={{ color: colors.secondary }} />
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
      
    </View>
  );
}

export default Search;