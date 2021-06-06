import React from 'react';
import { StyleSheet, Alert, TouchableOpacity,Text,StatusBar} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import * as firebase from 'firebase';
var image='https://firebasestorage.googleapis.com/v0/b/taxbill-e4abb.appspot.com/o/images%2Flogo.png?alt=media&token=f7aee502-f1c1-4b78-852c-81138730b66f'

export default class Photo extends React.Component {

  onChooseImagePress = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      quality: 1,
      aspect: [4, 4],
    });
    var user = firebase.auth().currentUser;
    if (!result.cancelled) {
        image=result.uri
        this.uploadImage(result.uri, user.uid)
        .then(() => {
          Alert.alert("Profil fotoğrafı değiştirildi.");
          this.getLink(user)
        })
        .catch((error) => {
          Alert.alert(error);
        });
    }
  }
  
  uploadImage = async (uri, imageName) => {
    const response = await fetch(uri);
    const blob = await response.blob();
    var ref = firebase.storage().ref().child("images/" + imageName);
    return ref.put(blob);
  }
  
  getLink = async (uid) => {
    const url = await firebase.storage().ref().child("images/" + uid.uid).getDownloadURL().catch((error) => { throw error });
    firebase.database().ref('Users/'+ uid.uid +('/ProfileInformation')).update({
    profilePhoto:url,
    });
    uid.Object.photoURL=url
  }

  render() {
    return (
        <TouchableOpacity style={styles.avatarPlaceHolder} onPress={this.onChooseImagePress}>   
        <StatusBar barStyle="light-content" backgroundColor="black"/>         
            <Ionicons name="ios-add" size={40} color="black" />
            <Text>Fotoğraf Ekle</Text>
        </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    paddingTop: 50, 
    alignItems: "center", 
},
  avatarPlaceHolder:{
    width:150,
    height:150,
    backgroundColor:"#E1E2E6",
    borderRadius:70,
    justifyContent:"center",
    alignItems:"center"
  },
  avatar:{
    position:"absolute",
    width:100,
    height:100,
    borderRadius:50
  },
  image: {
    flex: 1,
    height: undefined,
    width: undefined
},
});
