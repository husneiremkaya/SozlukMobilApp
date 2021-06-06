import React,{ useState } from 'react';
import { View,SafeAreaView,ScrollView,LogBox,StyleSheet,StatusBar} from "react-native";
import HeaderComponent from "../components/Header";
import Colors from '../utils/colors'
import Photo from '../components/Firebase/storagePhoto'
import Change from '../components/Firebase/changeEmailPassword'

export default function ProfilAyarlari({navigation}) {
  return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="light-content" backgroundColor="black"/>
        <HeaderComponent navigation={navigation}/>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.titleBar,{justifyContent:"space-between",marginTop:"10%"}}>
              <View style={styles.profileImage}>
                <Photo style={styles.profileImage}></Photo>
              </View>
              <Change/>
            </View>
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
  textview:{
    alignItems:"center",
    marginTop:"7%"
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
    alignItems:"center",
    flexDirection: "column",
    padding:20
  },
});















LogBox.ignoreLogs([
  'Setting a timer for a long period of time',
  'Possible Unhandled Promise',
  'Cant perform a React state update on an unmounted component.',
])