import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import WhoAreYou from '../pages/Registration/WhoAreYou';
import EmailAndPassword from '../pages/Registration/EmailAndPassword';
import Success from '../pages/Registration/Success';

const { Navigator, Screen } = createStackNavigator();

function RegistrationStack() {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name="WhoAreYou" component={WhoAreYou} />
      <Screen name="EmailAndPassword" component={EmailAndPassword} />
      <Screen name="Success" component={Success} />
    </Navigator>
  );
}

export default RegistrationStack;

