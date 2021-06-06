import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import HosgeldinEkrani from '../screens/HosgeldinEkrani';
import Kayit from '../screens/Kayit';
import Giris from '../screens/Giris';
import SifreYenileme from '../screens/SifreYenileme';
import home from './AppStack';

const Stack = createStackNavigator();

export default function AuthStack() {
  return (
    <Stack.Navigator initialRouteName="HosgeldinEkrani" headerMode="none">
      <Stack.Screen name="HosgeldinEkrani" component={HosgeldinEkrani} />
      <Stack.Screen name="Giris" component={Giris} />
      <Stack.Screen name="Kayit" component={Kayit} />
      <Stack.Screen name="SifreYenileme" component={SifreYenileme} />
      <Stack.Screen name="Arama" component={home} />
    </Stack.Navigator>
  );
}
