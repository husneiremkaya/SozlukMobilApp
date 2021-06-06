import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, Text, View , Image,StatusBar } from 'react-native';
import * as Yup from 'yup';
import Colors from '../utils/colors';
import SafeView from '../components/SafeView';
import Form from '../components/Forms/Form';
import FormField from '../components/Forms/FormField';
import FormButton from '../components/Forms/FormButton';
import IconButton from '../components/IconButton';
import { loginWithEmail } from '../components/Firebase/firebase';
import FormErrorMessage from '../components/Forms/FormErrorMessage';

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

  function handlePasswordVisibility() {
    if (rightIcon === 'eye') {
      setRightIcon('eye-off');
      setPasswordVisibility(!passwordVisibility);
    } else if (rightIcon === 'eye-off') {
      setRightIcon('eye');
      setPasswordVisibility(!passwordVisibility);
    }
  }

  async function handleOnLogin(values) {
    const { email, password } = values;

    try {
      await loginWithEmail(email, password);
    } catch (error) {
      setLoginError(error.message);
    }
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
