import React from 'react';
import { View, TouchableOpacity } from 'react-native';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const StoryCard: React.FC = () =>  {
  return (
    <TouchableOpacity style={{ height: 160, width: 110, backgroundColor: '#C0C0C0', borderRadius: 12, elevation: 5, alignItems: 'center', justifyContent: 'center' }}>
      <Icon name='plus-circle' size={65} style={{ color: '#D8D8D8' }} />
    </TouchableOpacity>
  );
}

export default StoryCard;