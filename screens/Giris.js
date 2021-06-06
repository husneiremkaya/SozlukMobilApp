import React, { useState, useEffect } from 'react';
import { StyleSheet, TouchableOpacity, Text, View , Image,StatusBar,Alert, Platform, Button } from 'react-native';
import * as Yup from 'yup';
import Colors from '../utils/colors';
import SafeView from '../components/SafeView';
import Form from '../components/Forms/Form';
import FormField from '../components/Forms/FormField';
import FormButton from '../components/Forms/FormButton';
import IconButton from '../components/IconButton';
import { loginWithEmail } from '../components/Firebase/firebase';
import FormErrorMessage from '../components/Forms/FormErrorMessage';
import Arama from '../screens/Arama';
import Constants  from 'expo-constants';
import * as LocalAuthentication from 'expo-local-authentication';

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .required('Lütfen kayıtlı mailinizi girin.')
    .email()
    .label('Email'),
  password: Yup.string()
    .required('Lütfen şifrenizi girin')
    .min(6, 'Şifre en az 6 karakter içermelidir.')
    .label('Şifre')
});


export default function LoginScreen({ navigation }) {

  const [passwordVisibility, setPasswordVisibility] = useState(true);
  const [rightIcon, setRightIcon] = useState('eye');
  const [loginError, setLoginError] = useState('');
  const [compatible, setCompatible]=useState(false);
  const [fingerprints, setFingerprints]=useState(false);
  const [result, setResult]=useState('');

  useEffect(() => {
    async function yap(){
    compatible = await LocalAuthentication.hasHardwareAsync();
    setCompatible({ compatible });
    fingerprints = await LocalAuthentication.isEnrolledAsync();
    setFingerprints({ fingerprints });
    }
    yap();
  },[]);


  async function scanFingerprint (){
    console.log('z'); 
    let result = await LocalAuthentication.authenticateAsync(
      'Scan your finger.',
      navigation.navigate('Arama')

 );
 console.log('y'); 
    console.log('Scan Result:', result);
    setResult({
      result: JSON.stringify(result),
    });
    console.log('x'); 
  };

  showAndroidAlert = () => {
    
    Alert.alert(
      'Fingerprint Scan',
      'Place your finger over the touch sensor and press scan.',
      [
        {
          text: 'Scan',
          onPress: ()=> scanFingerprint()
        },
        {
          text: 'KAPAT',
          onPress: () => console.log('KAPAT'),
          style: 'cancel',
        },
        console.log('c')
      ]
    );
    
  };

  function handlePasswordVisibility() {
    if (rightIcon === 'eye') {
      console.log('d'); 
      setRightIcon('eye-off');
      setPasswordVisibility(!passwordVisibility);
    } else if (rightIcon === 'eye-off') {
      setRightIcon('eye');
      console.log('e'); 
      setPasswordVisibility(!passwordVisibility);
    }
  }

  async function handleOnLogin(values) {
    const { email, password } = values;
    console.log('h');
    try {
      await loginWithEmail(email, password);
      console.log('g');
    } catch (error) {
      setLoginError(error.message);
      console.log('f'); 
    }
    console.log('m');

  }

  return (
    <SafeView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="black"/>
        <View style={styles.logoContainer}>
        <Text style={styles.subtitle}>Sözlük</Text>
        </View>
      <View>
      <Form
        initialValues={{ email: '', password: '' }}
        validationSchema={validationSchema}
        onSubmit={values => handleOnLogin(values)}
      >
        <FormField
          name="email"
          leftIcon="email"
          placeholder="E-mailinizi girin"
          autoCapitalize="none"
          keyboardType="email-address"
          textContentType="emailAddress"
          autoFocus={false}
        />
        <FormField
          name="password"
          leftIcon="lock"
          placeholder="Şifrenizi girin"
          autoCapitalize="none"
          autoCorrect={false}
          secureTextEntry={passwordVisibility}
          textContentType="password"
          rightIcon={rightIcon}
          handlePasswordVisibility={handlePasswordVisibility}
        />
        
        <Button title={'Parmak izi'} onPress={()=>scanFingerprint()} ></Button>
        
        <FormButton title={'Oturum Aç'} />
        {<FormErrorMessage error={loginError} visible={true} />}
      </Form>
      <View style={styles.footerButtonContainer}>
        <TouchableOpacity onPress={() => navigation.navigate('SifreYenileme')}>
          <Text style={styles.forgotPasswordButtonText}>Şifrenizi mi unuttunuz?</Text>
        </TouchableOpacity>
      </View>
      <IconButton
        style={styles.backButton}
        iconName="keyboard-backspace"
        color="white"
        size={30}
        onPress={() => navigation.goBack()}
      />
      </View>
    </SafeView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 15,
    justifyContent: 'space-between',
    backgroundColor: '#870573'
  },
  text: {
    fontSize: 18,
    textAlign: 'center',
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 150,
    height: 60,
    backgroundColor: '#056ecf',
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 30,
    color: '#fff',
  },
  footerButtonContainer: {
    marginVertical: 15,
    justifyContent: 'center',
    alignItems: 'center'
  },
  forgotPasswordButtonText: {
    color: Colors.white,
    fontSize: 18,
    fontWeight: '600'
  },
  backButton: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  logoContainer: {
    top: "3%",
    alignItems: 'center',
    alignSelf:"center"
  },
  logo: {
    width: 125,
    height: 125
  },
  subtitle: {
    fontSize: 30,
    fontWeight: '600',
    paddingVertical: 10,
    color: Colors.white
  },
});
