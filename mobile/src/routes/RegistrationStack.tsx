import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import WhoAreYou from '../pages/Registration/WhoAreYou';
import EmailAndPassword from '../pages/Registration/EmailAndPassword';

const { Navigator, Screen } = createStackNavigator();

function RegistrationStack() {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name="WhoAreYou" component={WhoAreYou} />
      <Screen name="EmailAndPassword" component={EmailAndPassword} />
    </Navigator>
  );
}

export default RegistrationStack;

