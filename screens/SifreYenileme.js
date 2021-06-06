import React, { useState } from 'react';
import { StyleSheet,Image,View,Text,Alert,StatusBar } from 'react-native';
import * as Yup from 'yup';
import Colors from '../utils/colors';
import SafeView from '../components/SafeView';
import Form from '../components/Forms/Form';
import FormField from '../components/Forms/FormField';
import FormButton from '../components/Forms/FormButton';
import IconButton from '../components/IconButton';
import { passwordReset } from '../components/Firebase/firebase';
import FormErrorMessage from '../components/Forms/FormErrorMessage';


const validationSchema = Yup.object().shape({
  email: Yup.string()
    .label('Email')
    .email('Lütfen geçerli bir mail girin.')
    .required('Lütfen kayıtlı mailinizi girin.')
});

export default function ForgotPasswordScreen({ navigation }) {

  const [customError, setCustomError] = useState('');

  async function handlePasswordReset(values) {
    const { email } = values;

    try {
      await passwordReset(email);
      Alert.alert("Emailinize gelen linki takip ederek şifrenizi değiştirebilirsiniz.");
      navigation.navigate('HosgeldinEkrani');
    } catch (error) {
      setCustomError(error.message);
    }
  }

  return (
    <SafeView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="black"/>
      <View style={styles.logoContainer}>
          <Text style={styles.subtitle}>Sözlük</Text>
      </View>
      <View style={styles.buttonContainer}>
        <Form
          initialValues={{ email: '' }}
          validationSchema={validationSchema}
          onSubmit={values => handlePasswordReset(values)}
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
          <FormButton 
          title="Şifremi Unuttum" />
          {<FormErrorMessage error={customError} visible={true} />}
        </Form>
        <IconButton
          style={styles.backButton}
          iconName="keyboard-backspace"
          color={Colors.white}
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
    alignItems:"center"
  },
});
