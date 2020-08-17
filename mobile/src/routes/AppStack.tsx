import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Onboarding from '../pages/Onboarding';
import Login from '../pages/Login';
import Landing from '../pages/Landing';
import GiveClasses from '../pages/GiveClasses';
import Registration from './RegistrationStack';
import StudyTabs from './StudyTabs';

const { Navigator, Screen } = createStackNavigator();

function AppStack() {
  return (
    <NavigationContainer>
      <Navigator screenOptions={{ headerShown: false }}>
        <Screen name="Onboarding" component={Onboarding} />
        <Screen name="Login" component={Login} />
        <Screen name="Registration" component={Registration} />
        <Screen name="Landing" component={Landing} />
        <Screen name="GiveClasses" component={GiveClasses} />
        <Screen name="Study" component={StudyTabs} />
      </Navigator>
    </NavigationContainer>
  );
}

export default AppStack;

