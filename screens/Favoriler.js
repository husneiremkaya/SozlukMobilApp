import React, { useState, useEffect } from 'react'
import { View, StyleSheet, SafeAreaView,TouchableOpacity,Text,Image,FlatList,ActivityIndicator,StatusBar } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import {Body, Right} from "native-base";
import * as firebase from 'firebase';
import HeaderComponent from "../components/Header";
import Colors from '../utils/colors'


export default function FavorilerSayfasi({navigation}) {
  const [list,setList] = useState([]);
  const [loadingState,setLoading] = useState(true);
  const User = firebase.auth().currentUser

  function removeFavori (del) {
    firebase.database().ref('Users/'+ User.uid +('/Favoriler/') + del).remove()
  }

  useEffect(() => {
    const li = []; 
    firebase.database().ref('Users/'+ User.uid +'/Favoriler').on('value',function (data) {
          data.forEach((child)=>{               
              li.push({
                  arama:child.val().arama,
                  cevap:child.val().cevap,
                  image:child.val().image,
                  key: child.val().arama,
              });   
            });
            setList(li); 
            setLoading(false);
      });
}, []);

  
  return (
  <SafeAreaView style={styles.container}>
    <StatusBar barStyle="light-content" backgroundColor="black"/>
    <View style={styles.container}>
      <HeaderComponent navigation={navigation}/>  
      {(loadingState==true) && (
        <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
          <ActivityIndicator size="large" color={Colors.red}/>
        </View>)
      }
      <FlatList
      data={list}
      renderItem={({ item }) => (
      <View style={styles.searchStyle}>
        <View style={{flexDirection:"row"}}>
          <Body style={{flexDirection:"column",marginHorizontal:10,marginTop:5,alignItems:"flex-start"}}>
              <Text style={styles.textStyle}>{item.arama}</Text>                           
              <TouchableOpacity >
                <Ionicons
                name="ios-heart"
                color="black"
                size={30}
        
                onPress={() => removeFavori(item.cevap)}
                />
                <Text style={styles.textStyle}>{item.cevap}</Text> 
              </TouchableOpacity>             
          </Body>
          <Right style={styles.profileImage}>
            <Image source={{uri:item.image}} style={styles.imageStyle}></Image> 
          </Right>
        </View>
      </View>
      )}
    />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:Colors.page_background,
  },
  searchStyle:{
    marginHorizontal:"2%",
    marginTop:"2%",
    padding:"1%",
    justifyContent:"center",
    borderRadius:8,
    backgroundColor:Colors.white,
    alignSelf:'auto', 
    alignItems:"stretch",
  },
  imageStyle:{
    width:150,
    height:100,
    margin:"2%",
    resizeMode:'cover',
    alignSelf:"flex-end"
  },
  textStyle:{
    fontSize:20,
    color: "black",
    textTransform: "capitalize",
    fontWeight: "bold",
    marginVertical:"1%"
  },
  profileImage: {
    overflow: "hidden",
    alignItems:"stretch",
    justifyContent:'center',
},
});