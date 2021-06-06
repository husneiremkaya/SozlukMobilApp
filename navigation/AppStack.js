import React from 'react';
import { Ionicons} from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import {logout} from '../components/Firebase/firebase'
import Giris from '../screens/Giris'
import Arama from '../screens/Arama';
import Cumle from '../screens/Cumle';
import Favoriler from '../screens/Favoriler';
import Profil from '../screens/Profil';
import Duzenle from '../screens/ProfilAyarlari';
import Notlar from '../screens/Notlar'
import Colors from '../utils/colors';


const Tab = createBottomTabNavigator();
const drawer=  createDrawerNavigator();
export default function AppStack({navigation}) {

  function cikisYap() {
    logout()
    return(<Giris/>);
  }

  const home = ({navigation}) =>{

      function AramaSayfasi() {
        return (<Arama navigation={navigation}/>);
      }
      function CumleSayfasi() {
        return (<Cumle navigation={navigation}/>);
      }
      
      
      return (
          <Tab.Navigator
            screenOptions={({ route }) => ({
              tabBarIcon: ({ focused, color, size }) => {
                if (route.name === 'Arama') {
                  return (
                    <Ionicons
                      name={focused ? 'ios-search' : 'ios-search'} size={size} color={color} />
                  );
                }
                else{
                  return (
                    <Ionicons
                    name={focused ? 'ios-search' : 'ios-search'} size={size} color={color}/>
                  );
                }
              },
            })}
            tabBarOptions={{
              activeTintColor: Colors.black,
              inactiveTintColor: Colors.inactiveButton,
              activeBackgroundColor: Colors.tabbarBackgroundColor,
              inactiveBackgroundColor: Colors.tabbarBackgroundColor
            }}
          >
            <Tab.Screen name="Kelime Çevir" component={AramaSayfasi} />
            <Tab.Screen name="Cümle Çevir" component={CumleSayfasi} />
            
          </Tab.Navigator>
      );
    }
    

    return (

        <drawer.Navigator >
            <drawer.Screen name="Ana Sayfa" component={home} navigation={navigation} />
            <drawer.Screen name="Favoriler" component={Favoriler} />
            <drawer.Screen name="Profil" component={Profil} />
            <drawer.Screen name="Not Ekle" component={Notlar}/>
            <drawer.Screen name="Profil Düzenle" component={Duzenle} />
            <drawer.Screen name="Çıkış Yap" component={cikisYap} />
        </drawer.Navigator>
        
  );
  

}