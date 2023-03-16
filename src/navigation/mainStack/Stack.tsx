import React from 'react';
import {RootStackParamList, ScreenId} from './ScreenIDs';
import Home from '@app/screens/Home';
import {createSharedElementStackNavigator} from 'react-navigation-shared-element';
import UserProfile from '@app/screens/UserProfile';

const {Navigator, Screen} = createSharedElementStackNavigator<RootStackParamList>();

const Stack = () => {

  return (
    <Navigator screenOptions={{headerShown: false}}>
      <Screen name={ScreenId.Home} {...Home} />
      <Screen name={ScreenId.UserProfile} {...UserProfile} />
    </Navigator>
  );
};

export default Stack;
