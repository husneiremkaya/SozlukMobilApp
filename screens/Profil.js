import React, { useState, useEffect } from 'react'
import { Text, View, SafeAreaView, Image, ScrollView,LogBox,StyleSheet,Switch,StatusBar} from "react-native";
import HeaderComponent from "../components/Header";
import Notification from '../components/Firebase/notification'
import * as firebase from 'firebase';
import Colors from '../utils/colors';
import Reminder from '../components/Reminder';

export default function ProfilSayfasi({navigation}) {
  const [userstate,setUser] = useState({});
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);
  const User = firebase.auth().currentUser
  
  useEffect(() => {
    var user ={email:'',name:'',surname:'',image:'',notifications:''};
    firebase.database().ref('Users/'+ User.uid +'/ProfileInformation').once('value', function (snapshot) {
      user.name = (snapshot.val() && snapshot.val().name) || 'Anonymous';
      user.surname = (snapshot.val() && snapshot.val().surname) || 'Anonymous';
      user.email = (snapshot.val() && snapshot.val().email) || 'Anonymous';
      user.image=(snapshot.val() && snapshot.val().profilePhoto);
      setUser(user);
  });
})
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="black"/>
    <HeaderComponent navigation={navigation}/>  
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.titleBar}></View>
        <View style={styles.profileImage}>
                <Image source={{uri:userstate.image}} style={styles.image} resizeMode="stretch"></Image> 
        </View>
        <View style={styles.textview}>
          <Text style={[{ color: "black", fontSize: 22  }]}> Ad: {userstate.name}</Text>
          <Text style={[{ color: "black", fontSize: 22  }]}> Soyad: {userstate.surname}</Text>
          <Text style={[{ color: "black", fontSize: 22  }]}> Mail: {userstate.email}</Text>
        </View>
        <View style={styles.switchStyle}>
        
          <Reminder/>
        </View>
        {isEnabled==true&&
        <Notification/>
        }      
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  titleBar: {
    flexDirection: "column",
    height: 180,
    backgroundColor:Colors.inactiveButton
  },
  switchStyle: {
    flex:2,
    alignItems: "center",
    justifyContent: "center",
    flexDirection:"row",
    marginTop:"7%",
  },
  textview:{
    alignItems:"center",
    marginTop:"7%",
  },
  image: {
    flex: 1,
    width: null,
    alignSelf: "stretch",
    borderRadius:50,
    backgroundColor:"black"
  },
  profileImage: {
    width: 180,
    height: 180,
    borderRadius: 100,
    overflow: "hidden",
    alignSelf:"center",
    marginTop:-95
  },  
});













LogBox.ignoreLogs([
  'Setting a timer for a long period of time',
  'Can\'t perform a React state update on an unmounted component.',
])