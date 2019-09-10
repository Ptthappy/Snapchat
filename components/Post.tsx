import React, { useEffect, useState } from 'react';
import{ View, Dimensions } from 'react-native';
import { Image, Text, colors } from 'react-native-elements';
import { useSelector } from 'react-redux';
import { getTime } from '../utils/index';

import * as firebase from 'firebase/app';
import 'firebase/database';

interface PostProps {
  post: any
}

const Post: React.FC<PostProps> = ({ post  }) => {
  const width = Dimensions.get('window').width;

  const _user = useSelector(store => store.user)
  const [user, setUser] = useState(_user);

  const friends = useSelector(store => store.friends);
  
  useEffect(() => {
    for (const i of friends) {
      if(i.uid === post.uid) setUser(i);
    }
    if(user === null) useSelector(store => setUser(store.user));
  }, [])

  return (
    <View style={{ width: width }}>
      <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
        <Image
          source={{ uri: user.imgUrl }}
          style={{ borderRadius: 40, width: 54, height: 54, margin: 12, marginRight: 18 }}
        />
        <View>
          <Text style={{ fontFamily: 'Mont', fontSize: 17, color: '#fff' }}>{user.username}</Text>
          <Text style={{ fontFamily: 'Mont-Light', fontSize: 15, color: '#fff' }}>{user.name}</Text>
        </View>
        <Text style={{ fontFamily: 'Mont-Light', marginLeft: 'auto', marginRight: 12, color: '#fff' }}>{getTime(post.date)}</Text>
      </View>
      <Text style={{ fontFamily: 'Mont-Light', paddingHorizontal: 18, color: '#fff', paddingBottom: 6 }}>{post.description}</Text>
      <Image
        source={{ uri: post.url }}
        style={{ width: width, height: width * 3/4, backgroundColor: '#666' }}
      />
    </View>
  )
}

export default Post;