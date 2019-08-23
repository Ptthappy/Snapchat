import React from 'react'
import { Header } from 'react-native-elements'

interface HeaderProps {
  title: string;
  color?: string;
  leftComponent?: {};
  rightComponent?: {};
  shadow?: boolean;
  fontColor?: string;
  barStyle?: string;
}

const AppHeader: React.FC<HeaderProps> = ({ title, color, leftComponent, rightComponent, shadow, fontColor }) => {

  return (
    <Header
      placement='left'
      backgroundColor={typeof color === 'undefined' ? '#F9D342' : color }
      centerComponent={{ text: title, style: { color: typeof fontColor === 'undefined' ? '#292826': fontColor, 
        fontFamily: 'Mont', fontSize: 19, marginBottom: 24, marginLeft: 5 } }}
      containerStyle={{ borderBottomWidth: 0, margin: 0, height: 52, zIndex: 5,
        shadowColor: '#ff0000', shadowOpacity: shadow ? 0.3 : 0, shadowOffset: { height: 10, width: 0 }, shadowRadius: 5, elevation: 10 }}
      leftComponent={leftComponent}
      rightComponent={rightComponent}
    />
  );
}

export default AppHeader;