import React from 'react';
import { View, StyleSheet, Text, Image,StatusBar } from 'react-native';
import AppButton from '../components/AppButton';
import Colors from '../utils/colors';

export default function WelcomeScreen({ navigation }) {

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="black"/>
      <View style={styles.logoContainer}>
        <Text style={styles.subtitle}>Sözlük</Text>
      </View>
      <View style={styles.buttonContainer}>
        <AppButton 
        title="Oturum Aç" 
        onPress={() => navigation.navigate('Giris')} />
        <AppButton
          title="Kaydol"
          onPress={() => navigation.navigate('Kayit')}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#870573'
  },
  logoContainer: {
    position: 'absolute',
    top: "10%",
    alignItems: 'center'
  },
  logo: {
    width: 125,
    height: 125
  },
  subtitle: {
    fontSize: 30,
    fontWeight: '600',
    paddingVertical: 20,
    color: Colors.white
  },
  buttonContainer: {
    padding: 20,
    paddingBottom: 60,
    width: '100%'
  }
});