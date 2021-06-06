import React, { useState } from 'react'
import { View, StyleSheet, Button, SafeAreaView,TouchableOpacity,Text,Image, ActivityIndicator,LogBox,StatusBar, Keyboard } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import HeaderComponent from "../components/Header";
import {InputGroup,Input} from "native-base";
import * as firebase from 'firebase';
import axios from "axios";
import Colors from '../utils/colors'

export default function AramaSayfasi({navigation}) {
  const [textState,setText] = useState("");
  const [titleState,setTitle] = useState("En-Tr");
  const [searchState,setSearch] = useState("Translate your word...");
  const [colorState, setColor] = useState("#870573");
  const [answerState,setTranslate] = useState("");
  const [pictureState,setPicture] = useState("");
  const [favoriState,setFavori] = useState("ios-heart-empty");
  const [loadingState,setLoading] = useState(false);
  const User = firebase.auth().currentUser

// yerini bulamadım
  const changeTitle = () => {
    if(titleState=="En-Tr"){
      setTitle("Tr-En")
      setColor("#b600c6")
      setSearch("Kelime Çeviriniz...")
    }
    else {
      setTitle("En-Tr")
      setColor("#870573")
      setSearch("Translate your word...")
    }
  }

  const addFavori = () =>{
    if(favoriState=="ios-heart-empty"){
      setFavori("ios-heart") 
      firebase.database().ref('Users/'+ User.uid +('/Favoriler/') + answerState).set({
      arama:textState,
      cevap:answerState,
      image:pictureState,
      }) 
    }
    else{
      setFavori("ios-heart-empty")
      firebase.database().ref('Users/'+ uid +('/Favoriler/')+answerState).remove()
    }
  }

  const getPicture = (searchInput) => {
    const options = {
      method: 'GET',
      url: 'BİNG İMAGE APİ',
      params: {q: searchInput, count: '1'},
      headers: {
        'x-rapidapi-key': '',
        'x-rapidapi-host': ''
      }
    };
    
    axios.request(options).then(function (response) {
        setPicture(response.data.value[0].contentUrl)
    }).catch(function (error) {
        console.error(error);
    });
  }

  const translate = () => {
    setLoading(true)
    setFavori("ios-heart-empty")
    var first,second=""
    if(textState!=""){
      if(titleState=="En-Tr"){
        first="tr",
        second="en"
      }
      else{
        first="en"
        second="tr"
      }
      const options = {
        method: 'GET',
        url: 'GOOGLE TRANSLATE APİ',
        params: {text: textState, tl: first, sl: second},
        headers: {
          'x-rapidapi-key': '',
          'x-rapidapi-host': ''
        }
      };
      
      axios.request(options).then(function (response) {
          setTranslate(response.data.data.translation)
          getPicture(response.data.data.translation)
          setLoading(false)
          

      }).catch(function (error) {
          console.error(error);
      });
    }
  }
  return (
    <SafeAreaView style={styles.container}>
       <HeaderComponent navigation={navigation}/>
       <StatusBar barStyle="light-content" backgroundColor="black"/>  
        <View style={styles.searchStyle}>
          <InputGroup>   
            <TouchableOpacity>
              <Ionicons
              name="ios-search"
              color="grey"
              size={30}
              onPress={translate}
              />
              
            </TouchableOpacity>  
            
            <Input style ={styles.inputSearch} 
            placeholder={searchState} 
            multiline={true}
            numberOfLines={3} 
            returnKeyType="done"
            onChangeText={(value)=>setText(value)}
            onSubmitEditing={translate}
              />
            <Button 
              title = {titleState}
              onPress={changeTitle}
              color={colorState}
            />  
          </InputGroup>
        </View>
        {(loadingState==true) && (
          <View style={{justifyContent:'center',alignItems:'center', marginTop:"30%"}}>
            <ActivityIndicator size="large" color={Colors.red}/>
          </View>)
        }
        {(answerState!="" && pictureState !="" && loadingState==false) &&(
              <View style={styles.searchStyle}>
                {Keyboard.dismiss()}
                  <View style={{flexDirection:"column",alignItems:"center"}}>
                    <Text style={styles.textStyle}>{answerState}</Text>
                    <TouchableOpacity>
                      <Ionicons
                      name={favoriState}
                      color="black"
                      size={30}
                      
                      onPress={addFavori}
                      />
                    </TouchableOpacity>           
                  </View>
                  <Image source={{uri:pictureState}} style={styles.imageStyle}></Image> 
              </View>)
        }
    </SafeAreaView>
  );

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:Colors.page_background,
  },
  inputSearch:{
    fontSize:18,
    textTransform: "capitalize",
    flex:1,
    marginHorizontal:"3%",
  },
  searchStyle:{
    marginHorizontal:"2%",
    marginTop:"2%",
    paddingHorizontal:"2%",
    justifyContent:"center",
    borderRadius:8,
    backgroundColor:Colors.white
  },
  imageStyle:{
    width:300,
    height:200,
    margin:"2%",
    resizeMode:'cover',
    alignSelf:"center"
  },
  textStyle:{
    fontSize:20,
    color: "black",
    textTransform: "capitalize",
    fontWeight: "bold"
  },
});





















LogBox.ignoreLogs([
  'Encountered two children with the same key',
])