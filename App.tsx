import React, { useState, useEffect } from 'react';
import { StatusBar, View, StyleSheet, Platform, AsyncStorage } from 'react-native';
import { createStackNavigator, createAppContainer, NavigationContainer, createBottomTabNavigator } from 'react-navigation';
import { Provider, useDispatch, useSelector, connect } from 'react-redux'
import { AppLoading } from 'expo';
import { SET_USER, SET_CREDENTIALS, SET_FRIEND_REQUESTS, SET_FRIENDS, SET_COLOR } from './redux/actionTypes'
import { yellow_black } from './utils/colors';

import StackViewStyleInterpolator from 'react-navigation-stack/src/views/StackView/StackViewStyleInterpolator';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import * as SecureStore from 'expo-secure-store';
import * as firebase from 'firebase/app';
import * as Font from 'expo-font';
import store from './redux/store'

import GetStarted from './views/GetStarted';
import Login from './views/Login';
import Register from './views/Register';
import Timeline from './views/Timeline';
import Profile from './views/Profile';
import Story from './views/Story';
import FriendList from './views/FriendList';
import RecentChats from './views/RecentChats';
import Chat from './views/Chat';
import Search from './views/Search';
import Settings from './views/Settings';
import ProfileEdit from './views/ProfileEdit';
import AccountManagement from './views/AccountManagement';
import PictureView from './views/PictureView';
import Requests from './views/Requests';

const firebaseConfig = {
  apiKey: "AIzaSyBkDM9-ucB-5OzwCJhinVuqJg-zNVZ1kew",
  authDomain: "snap-back-18e40.firebaseapp.com",
  databaseURL: "https://snap-back-18e40.firebaseio.com",
  projectId: "snap-back-18e40",
  storageBucket: "gs://snap-back-18e40.appspot.com",
  messagingSenderId: "98179254214",
  appId: "1:98179254214:web:7c86821c9055c54d"
}

const ConsumerApp: React.FC = () => {
  //Dev
  console.disableYellowBox = true;

  const dispatch = useDispatch();
  const credentials = useSelector(state => state.credentials);
  const colors = useSelector(store => store.color);
  
  const [ready, setReady] = useState(false);

  const _startAsync = async () => {
    firebase.initializeApp(firebaseConfig);
    await Font.loadAsync({
      'Mont-Bold': require('./assets/Montserrat-Bold.ttf'),
      'Mont': require('./assets/Montserrat-Regular.ttf'),
      'Mont-ExtraLight': require('./assets/Montserrat-ExtraLight.ttf'),
      'Mont-Light': require('./assets/Montserrat-Light.ttf')
    });
  }

  const _retrieveState = async () => {
    //Dev
    // await AsyncStorage.removeItem('SNAP-CREDENTIALS');
    // await AsyncStorage.removeItem('SNAP-USER');
    // await AsyncStorage.setItem('SNAP-COLOR', JSON.stringify({ primaryColor: '#292826', secondaryColor: '#F9D342', tiny: '#111', fonts: '#d0d0d0', placeholder: '#666' }))
    // await AsyncStorage.removeItem('SNAP-COLOR');
    // await AsyncStorage.removeItem('SNAP-COLOR');
    // await AsyncStorage.setItem('SNAP-COLOR', JSON.stringify(yellow_black))

    const _credentials = await AsyncStorage.getItem('SNAP-CREDENTIALS');
    const _user = await AsyncStorage.getItem('SNAP-USER');
    const _color = await AsyncStorage.getItem('SNAP-COLOR');
    dispatch({ type: SET_COLOR, payload: { color: JSON.parse(_color) } })
    if(_credentials !== null) {
      const _friendRequests = await AsyncStorage.getItem('SNAP-FRIEND-REQUESTS');
      const _friends = await AsyncStorage.getItem('SNAP-FRIENDS');
      dispatch({ type: SET_CREDENTIALS, payload: { credentials: JSON.parse(_credentials) } })
      dispatch({ type: SET_USER, payload: { user: JSON.parse(_user) } });
      dispatch({ type: SET_FRIEND_REQUESTS, payload: { friendRequests: JSON.parse(_friendRequests) } })
      dispatch({ type: SET_FRIENDS, payload: { friends: JSON.parse(_friends) } })
    }
  }

  useEffect(() => {
    _retrieveState();
  }, []);

  //Navigators
  const AuthStack: NavigationContainer = createStackNavigator({
    GetStarted: GetStarted,
    Login: Login,
    Register: Register
  }, {
    transitionConfig: () => ({
      screenInterpolator: StackViewStyleInterpolator.forHorizontal
    }),
    headerMode: 'none',
    initialRouteName: 'GetStarted'
  });

  const AuthContainer: NavigationContainer = createAppContainer(AuthStack);

  const FeedStack: NavigationContainer = createStackNavigator({
    Timeline: Timeline,
    Profile: Profile,
    PictureView: PictureView,
    Story: Story
  }, { 
    headerMode: 'none',
    transitionConfig: () => ({
      screenInterpolator: StackViewStyleInterpolator.forHorizontal
    }),
   });
  const FriendsStack: NavigationContainer = createStackNavigator({
    Chats: RecentChats,
    FriendList: FriendList,
    Chat: Chat,
    Search: Search,
    Profile: Profile,
    PictureView: PictureView,
    Requests: Requests
  }, { 
    headerMode: 'none',
    transitionConfig: () => ({
      screenInterpolator: StackViewStyleInterpolator.forHorizontal
    }),
   });
  const UserStack: NavigationContainer = createStackNavigator({
    OwnProfile: Profile,
    PictureView: PictureView,
    Settings: Settings,
    ProfileEdit: ProfileEdit,
    AccountManagement: AccountManagement
  }, { 
    headerMode: 'none',
    transitionConfig: () => ({
      screenInterpolator: StackViewStyleInterpolator.forHorizontal
    }),
   });

  const TabNav = createBottomTabNavigator({
    Feed: FeedStack,
    Friends: FriendsStack,
    User: UserStack
  }, {
    initialRouteName: 'Feed',
    tabBarOptions: {
      style: {
        borderTopWidth: 0.2,
        borderTopColor: colors.secondary
      },
      activeTintColor: colors.secondary,
      labelStyle: { fontFamily: 'Mont-Light', top: 0 },
      activeBackgroundColor: colors.primary,
      inactiveBackgroundColor: colors.primary,
    }, defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, tintColor }) => {
        const { routeName } = navigation.state;
        switch(routeName) {
          case 'Feed': return <Icon name={focused ? 'home' : 'home-outline'} size={28} color={tintColor} style={{ top: 4 }} />;
          case 'Friends': return <Icon name={focused ? 'account-multiple' : 'account-multiple-outline'} size={28} color={tintColor} style={{ top: 4 }} />;
          case 'User': return <Icon name={focused ? 'account-circle' : 'account-circle-outline'} size={28} color={tintColor} style={{ top: 4 }} />;
          default: return null;
        }

      }, tabBarVisible: !(excludedTabView.indexOf(navigation.state.routes[navigation.state.index].routeName) >= 0)
    })
  }); const excludedTabView = ['Search', 'FriendList', 'Settings', 'EditProfile', 'Story', 'Camera',
        'AddPicture', 'Chat', 'Profile', 'PictureView'];

  const TabContainer: NavigationContainer = createAppContainer(TabNav);

  const AppStack: NavigationContainer = createStackNavigator({
    Auth: AuthContainer,
    App: TabContainer
  }, {
    transitionConfig: () => ({
      screenInterpolator: StackViewStyleInterpolator.forHorizontal
    }),
    headerMode: 'none',
    initialRouteName: credentials ? 'App' : 'Auth'
  })

  const AppContainer = createAppContainer(AppStack);

  if(!ready) {
    return (
      <AppLoading 
        startAsync={_startAsync}
        onError={console.warn}
        onFinish={() => setReady(true)}
      />
    )
  } else {
    return (
      <AppContainer/>
    );
  }
}

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <View style={[styles.statusBar, { backgroundColor: '#000' } ]}>
        <StatusBar translucent backgroundColor={'#000'} barStyle='light-content' />
      </View>
      {/* <StatusBar barStyle='light-content' backgroundColor='#666666' /> */}
      <ConsumerApp/>
    </Provider>
  );
}

const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : StatusBar.currentHeight;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  statusBar: {
    height: STATUSBAR_HEIGHT,
  }
});

export default App;