import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Login from '../pages/Login';
import ForgotPassword from '../pages/ForgotPassword';
import ForgotPasswordSuccess from '../pages/ForgotPasswordSuccess';
import Landing from '../pages/Landing';
import Profile from '../pages/Profile';
import GiveClasses from '../pages/GiveClasses';
import OnboardingStack from './OnboardingStack';
import RegistrationStack from './RegistrationStack';
import StudyTabs from './StudyTabs';

const { Navigator, Screen } = createStackNavigator();

function AppStack() {
  return (
    <NavigationContainer>
      <Navigator screenOptions={{ headerShown: false }}>
        <Screen name="OnboardingStack" component={OnboardingStack} />
        <Screen name="Login" component={Login} />
        <Screen name="ForgotPassword" component={ForgotPassword} />
        <Screen name="Landing" component={Landing} />
        <Screen name="Profile" component={Profile} />
        <Screen name="GiveClasses" component={GiveClasses} />
        <Screen name="ForgotPasswordSuccess" component={ForgotPasswordSuccess} />
        <Screen name="Study" component={StudyTabs} />
        <Screen name="Registration" component={RegistrationStack} />
      </Navigator>
    </NavigationContainer>
  );
}

export default AppStack;

