import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';
import * as firebase from 'firebase';
import React, { useState, useEffect, useRef } from 'react';
import { Text, View, TouchableOpacity, Platform,StatusBar } from 'react-native';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export default function App() {
  const notificationListener = useRef();
  const responseListener = useRef();
  const [list,setList] = useState([]);

  useEffect(() => {
    var user = firebase.auth().currentUser;
    const li = []; 
    firebase.database().ref('Users/'+ user.uid +'/Favoriler').on('value',function (data) {
          data.forEach((child)=>{               
              li.push({
                  arama:child.val().arama,
                  cevap:child.val().cevap,
                  image:child.val().image,
                  key: child.val().arama,
              });   
            });
            setList(li);            
      });
}, []);

  useEffect(() => {
    registerForPushNotificationsAsync().then(token => setExpoPushToken(token));

    notificationListener.current = Notifications.addNotificationReceivedListener();

    responseListener.current = Notifications.addNotificationResponseReceivedListener();

    return () => {
      Notifications.removeNotificationSubscription(notificationListener);
      Notifications.removeNotificationSubscription(responseListener);
    };
  }, []);

  async function send() {
    var index = Math.floor(Math.random() * list.length) ;
    if(list.length > 0){
      var arama,cevap="";
      arama = list[index].arama
      cevap = list[index].cevap
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "Dictionary",
        body: arama + " - " + cevap,
      },
      trigger: { seconds: 1 },
    });
    }
    
    else{
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "Dictionary",
        body: "Favorilerde kelime yok",
      },
      trigger: { seconds: 1 },
    });
    }
}
async function registerForPushNotificationsAsync() {
  let token;
  if (Constants.isDevice) {
    const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log(token);
  } else {
    alert('Must use physical device for Push Notifications');
  }

  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  return token;
}
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        borderColor:'black',
        borderWidth:2,
        alignItems:"center",
        alignSelf:"center",
        borderRadius:50,
        marginTop:10,
        paddingHorizontal:10,
        backgroundColor:"#870573"
      }}>
        <StatusBar barStyle="light-content" backgroundColor="black"/>
        <TouchableOpacity onPress={async () => {await send();}}>
          <Text style={{fontSize:20, color:"white"}}> Hatırlat </Text>
        </TouchableOpacity>
    </View>
  );
}
