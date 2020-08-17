import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Teachers from '../pages/Onboarding/Teachers';
import Classes from '../pages/Onboarding/Classes';

const { Navigator, Screen } = createStackNavigator();

function OnboardingStack() {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name="Teachers" component={Teachers} />
      <Screen name="Classes" component={Classes} />
    </Navigator>
  );
}

export default OnboardingStack;
