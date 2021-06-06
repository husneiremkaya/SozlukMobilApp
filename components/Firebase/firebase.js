import * as firebase from 'firebase';
import 'firebase/auth';

import firebaseConfig from './firebaseConfig';

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export const auth = firebase.auth();

export const loginWithEmail = (email, password) =>
  auth.signInWithEmailAndPassword(email, password);

export const registerWithEmail = (email, password) =>
  auth.createUserWithEmailAndPassword(email, password);

export const logout = () => auth.signOut();

export const passwordReset = email => auth.sendPasswordResetEmail(email);

export const pushProfil = (uid, name, surname,email) => 
firebase.database().ref('Users/'+ uid +('/ProfileInformation')).set({
  uid:uid,
  name:name,
  surname:surname,
  email:email,
  profilePhoto:'https://firebasestorage.googleapis.com/v0/b/reactdictionaryapp.appspot.com/o/images%2Flogo.png?alt=media&token=316440a1-4467-4567-9cf7-b48f925eb385', //default uygulama logosu eklenmiş
});