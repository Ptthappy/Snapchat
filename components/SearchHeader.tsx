import React, { useState } from 'react'
import { View, Dimensions, TouchableOpacity } from 'react-native';
import { Header, Input } from 'react-native-elements'

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

interface SearchHeaderProps {
  search: Function
  cancel: Function
}

const SearchHeader: React.FC<SearchHeaderProps> = ({ search, cancel }) => {
  const [input, setInput] = useState('');
  return (
    <Header
      backgroundColor='#FFF'
      centerComponent=
        {<View style={{ width: Dimensions.get('window').width + 1, height: 52, justifyContent: 'center', flexDirection: 'row', backgroundColor: '#FFF',
          marginTop: -24, marginLeft: -1 }}>
            <TouchableOpacity style={{ width: '18%', height: '100%', backgroundColor: 'transparent', alignItems: 'center', justifyContent: 'center' }}
              onPress={() => cancel()}>
              <Icon name='arrow-left' size={25} style={{ color: '#000' }} />
            </TouchableOpacity>
            <Input
              placeholder='Search'
              placeholderTextColor='#E0E0E0'
              containerStyle={{ width: '64%', height: '100%', backgroundColor: 'transparent' }}
              inputStyle={{ fontFamily: 'Mont' }}
              inputContainerStyle={{ borderBottomWidth: 0, marginTop: 5 }}
              onChange={(event) => setInput(event.nativeEvent.text) }
              value={input}
              spellCheck={false}
            />
            
            <TouchableOpacity style={{ width: '18%', height: '100%', backgroundColor: 'transparent', alignItems: 'center', justifyContent: 'center' }}
              onPress={() => search(input)}>
              <Icon name='arrow-right' size={25} style={{ color: '#000' }} />
            </TouchableOpacity>
        </View>}
      containerStyle={{ borderBottomWidth: 0, margin: 0, height: 52, zIndex: 5,
        shadowColor: '#ff0000', shadowOpacity: 0.3, shadowOffset: { height: 10, width: 0 }, shadowRadius: 5, elevation: 3 }}
      
    />
  );
}

export default SearchHeader;