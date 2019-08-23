import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { Button } from 'react-native-elements';
import { NavigationContainerProps } from 'react-navigation';

import AppHeader from '../components/AppHeader';
import SearchHeader from '../components/SearchHeader';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const Search: React.FC<NavigationContainerProps> = ({ navigation }) => {
  const [isSearchBarOpened, setSearchBarOpened] = useState(false);
  const [query, setQuery] = useState('');

  const search = async (input) => {
    setQuery(input);
    setSearchBarOpened(false);
  }
  return (
    <View style={{ flex: 1, backgroundColor: '#292826' }}>
      {!isSearchBarOpened &&
        <AppHeader 
          title={query === '' ? 'People' : query}
          leftComponent={<Button
            icon={<Icon name='arrow-left' size={25} style={{ color: '#292826' }} />}
            buttonStyle={{ height: 35, width: 35, borderRadius: 1000, marginTop: -23, paddingRight: 5, backgroundColor: 'transparent' }}
            onPress={() => navigation.goBack() }
          /> }
          rightComponent={<Button
            icon={<Icon name='magnify' size={25} style={{ color: '#292826' }} />}
            buttonStyle={{ height: 35, width: 35, borderRadius: 1000, marginTop: -23, paddingLeft: 2, backgroundColor: 'transparent' }}
            onPress={() => setSearchBarOpened(true) }
          /> }
        />
      }

      {isSearchBarOpened && 
        <SearchHeader cancel={() => setSearchBarOpened(false)} search={search} />
      }
    </View>
  );
}

export default Search;