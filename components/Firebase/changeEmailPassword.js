import React from 'react';
import { ScrollView, StyleSheet, TextInput, StatusBar, Alert, } from 'react-native';
import * as firebase from 'firebase';
import AppButton from '../../components/ChangeButton';

export default class Change extends React.Component {
  static navigationOptions = {
    header: null,
  };
  constructor(props) {
    super(props);
    this.state = {
      currentPassword: "",
      newPassword: "",
      newEmail: "",
    };
  }

  reauthenticate = (currentPassword) => {
    var user = firebase.auth().currentUser;
    var cred = firebase.auth.EmailAuthProvider.credential(user.email, currentPassword);
    return user.reauthenticateWithCredential(cred);
  }

  onChangePasswordPress = () => {
    if(this.state.currentPassword==""){
      Alert.alert("Değişiklik yapmak için mevcut şifrenizi girmelisiniz.");
    }
      else {
      this.reauthenticate(this.state.currentPassword).then(() => {
        var user = firebase.auth().currentUser;
        user.updatePassword(this.state.newPassword).then(() => {
          Alert.alert("Şifre değiştirildi");
        }).catch((error) => { console.log(error.message); });
      }).catch((error) => { console.log(error.message) });
    }
  }

  onChangeEmailPress = () => {
    if(this.state.currentPassword==""){
      Alert.alert("Değişiklik yapmak için mevcut emailinizi girmelisiniz");
    }
    else {
      this.reauthenticate(this.state.currentPassword).then(() => {
        var user = firebase.auth().currentUser;
        user.updateEmail(this.state.newEmail).then(() => {
          Alert.alert("Email değiştirildi");
          firebase.database().ref('Users/'+ user.uid +('/ProfileInformation')).update({
          email:this.state.newEmail,
          });
        }).catch((error) => { console.log(error.message); });
      }).catch((error) => { console.log(error.message) });
    }
  }
  
  render() {
    return (
      <ScrollView style={{flex: 1, flexDirection: "column", paddingVertical: "3%", paddingHorizontal: "5%",marginTop:30}}>
        <StatusBar barStyle="light-content" backgroundColor="black"/>
        <TextInput style={styles.textInput} value={this.state.currentPassword}
          placeholder="Mevcut şifre" autoCapitalize="none" secureTextEntry={true}
          onChangeText={(text) => { this.setState({currentPassword: text}) }}
        />

        <TextInput style={styles.textInput} value={this.state.newPassword}
          placeholder="Yeni şifre" autoCapitalize="none" secureTextEntry={true}
          onChangeText={(text) => { this.setState({newPassword: text}) }}
        />

        <AppButton title="Şifreyi Değiştir" onPress={this.onChangePasswordPress} />


        <TextInput style={styles.textInput2} value={this.state.newEmail}
          placeholder="Yeni email" autoCapitalize="none" keyboardType="email-address"
          onChangeText={(text) => { this.setState({newEmail: text}) }}
        />
        <AppButton title="Emaili Değiştir" onPress={this.onChangeEmailPress} />

      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
    text: { 
        color: "white", 
        fontWeight: "bold", 
        fontSize: 20, 
    },
    textInput: {
        borderWidth:1, 
        borderColor:"gray", 
        borderRadius: 30,
        marginVertical: 10, 
        padding:10, 
        height:40, 
        alignSelf: "stretch", 
        fontSize: 18, 
        textAlign: "center", 
    },
    textInput2: {
      borderWidth:1, 
      borderColor:"gray", 
      borderRadius: 30,
      marginVertical: 10,
      marginTop:25, 
      padding:10, 
      height:40, 
      alignSelf: "stretch", 
      fontSize: 18, 
      textAlign: "center", 
  },
});