import React, { useState } from 'react';
import { StyleSheet,Image,View,Text,StatusBar } from 'react-native';
import * as Yup from 'yup';
import Colors from '../utils/colors';
import SafeView from '../components/SafeView';
import Form from '../components/Forms/Form';
import FormField from '../components/Forms/FormField';
import FormButton from '../components/Forms/FormButton';
import IconButton from '../components/IconButton';
import FormErrorMessage from '../components/Forms/FormErrorMessage';
import { registerWithEmail, pushProfil } from '../components/Firebase/firebase';
import { ScrollView } from 'react-native-gesture-handler';

const validationSchema = Yup.object().shape({
  ad: Yup.string()
    .required('Lütfen adınızı giriniz.')
    .label('Ad'),
  soyad: Yup.string()
    .required('Lütfen soyadınızı giriniz.')
    .label('Soyad'),
  email: Yup.string()
    .required('Lütfen e-mail adresini giriniz.')
    .email()
    .label('Email'),
  sifre: Yup.string()
    .required('Lütfen şifrenizi giriniz.')
    .min(6, 'Şifre en az 6 karakterden oluşmalıdır')
    .label('Şifre'),
  sifretekrar: Yup.string()
    .oneOf([Yup.ref('sifre')], 'Şifreleriniz eşleşmiyor')
    .required('Şifreniz boş olamaz')
});

export default function RegisterScreen({ navigation }) {

  const [passwordVisibility, setPasswordVisibility] = useState(true);
  const [rightIcon, setRightIcon] = useState('eye');
  const [confirmPasswordIcon, setConfirmPasswordIcon] = useState('eye');
  const [confirmPasswordVisibility, setConfirmPasswordVisibility] = useState(
    true
  );
  const [registerError, setRegisterError] = useState('');

  function handlePasswordVisibility() {
    if (rightIcon === 'eye') {
      setRightIcon('eye-off');
      setPasswordVisibility(!passwordVisibility);
    } else if (rightIcon === 'eye-off') {
      setRightIcon('eye');
      setPasswordVisibility(!passwordVisibility);
    }
  }

  function handleConfirmPasswordVisibility() {
    if (confirmPasswordIcon === 'eye') {
      setConfirmPasswordIcon('eye-off');
      setConfirmPasswordVisibility(!confirmPasswordVisibility);
    } else if (confirmPasswordIcon === 'eye-off') {
      setConfirmPasswordIcon('eye');
      setConfirmPasswordVisibility(!confirmPasswordVisibility);
    }
  }

  async function handleOnSignUp(values, actions) {
    const {ad, soyad, email, sifre } = values;
    var uid;
    try {
      await registerWithEmail(email, sifre).then((User)=>uid=User.user.uid);
    } catch (error) {
      setRegisterError(error.message);
    }
    pushProfil (uid, ad, soyad, email );
  }

  return (
    <SafeView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="black"/>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.logoContainer}>
          <Text style={styles.subtitle}>Sözlük</Text>
        </View>
        <View style={styles.buttonContainer}>
        <Form
          initialValues={{
            ad: '',
            soyad: '',
            email: '',
            sifre: '',
            sifretekrar: ''
          }}
          validationSchema={validationSchema}
          onSubmit={values => handleOnSignUp(values)}
        >
          <FormField
            name="ad"
            leftIcon="account"
            placeholder="Adınızı girin"
            autoFocus={false}
          />
          <FormField
            name="soyad"
            leftIcon="account"
            placeholder="Soyadınızı girin"
            autoFocus={false}
          />
          <FormField
            name="email"
            leftIcon="email"
            placeholder="E-mailinizi girin"
            autoCapitalize="none"
            keyboardType="email-address"
            textContentType="emailAddress"
          />
          <FormField
            name="sifre"
            leftIcon="lock"
            placeholder="Şifrenizi girin"
            autoCapitalize="none"
            autoCorrect={false}
            secureTextEntry={passwordVisibility}
            textContentType="password"
            rightIcon={rightIcon}
            handlePasswordVisibility={handlePasswordVisibility}
          />
          <FormField
            name="sifretekrar"
            leftIcon="lock"
            placeholder="Şifrenizi tekrar girin"
            autoCapitalize="none"
            autoCorrect={false}
            secureTextEntry={confirmPasswordVisibility}
            textContentType="password"
            rightIcon={confirmPasswordIcon}
            handlePasswordVisibility={handleConfirmPasswordVisibility}
          />
          <FormButton title={'Kaydol'} />
          {<FormErrorMessage error={registerError} visible={true} />}
        </Form>
        <IconButton
          style={styles.backButton}
          iconName="keyboard-backspace"
          color={Colors.white}
          size={30}
          onPress={() => navigation.goBack()}
        />
        </View>      
      </ScrollView>
    </SafeView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 15,
    backgroundColor: '#870573',
  },
  backButton: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10
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
  buttonContainer: {
    padding: 15,
    paddingTop:"15%",
  },
});
