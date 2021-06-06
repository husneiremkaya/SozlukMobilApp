import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

import Colors from '../utils/colors';

export default function changeButton({ title, onPress,color = 'changeButtonColor' }) {
  return (
    <TouchableOpacity
      style={[styles.button, { backgroundColor: Colors[color] }]}
      onPress={onPress}
    >
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    marginVertical: 5,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: "center", 
    padding: 12,
    width: '100%'
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  }
});
