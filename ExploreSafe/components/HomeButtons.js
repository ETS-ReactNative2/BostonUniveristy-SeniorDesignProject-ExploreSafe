import React from 'react';
import { StyleSheet, TouchableOpacity, Text, View } from 'react-native';

//BasicHomeButton logic
export function BasicHomeButton({ title, onPress }) {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.BasicHomeButtonContainer}>
        <Text style={styles.BasicButtonText}>{title}</Text>
      </View>
    </TouchableOpacity>
  )
}

//BasicHomeButtonB
export function BasicHomeButtonB({ title, onPress }) {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.BasicHomeButtonContainerB}>
        <Text style={styles.BasicButtonText}>{title}</Text>
      </View>
    </TouchableOpacity>
  )
}

//BasicLogoutButton
export function BasicLogoutButton({ title, onPress }) {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.BasicLogoutButtonContainer}>
        <Text style={styles.BasicButtonText}>{title}</Text>
      </View>
    </TouchableOpacity>
  )
}

//BasicSettingsButton
export function BasicSettingsButton({ title, onPress }) {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.BasicSettingsButtonContainer}>
        <Text style={styles.BasicButtonText}>{title}</Text>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  BasicHomeButtonContainer: {
    backgroundColor: '#63b395',
    padding: 15,
    marginVertical: 12,
    marginHorizontal: 16,
    flexDirection: 'column',
    borderRadius: 10,
  },
  BasicHomeButtonContainerB: {
    backgroundColor: 'black',
    padding: 15,
    marginVertical: 12,
    marginHorizontal: 16,
    flexDirection: 'column',
    borderRadius: 10,
  },
  BasicLogoutButtonContainer: {
    backgroundColor: '#ff0000',
    padding: 15,
    marginVertical: 12,
    marginHorizontal: 16,
    flexDirection: 'column',
    borderRadius: 10,
    //maxWidth: 16,
    //maxHeight: 12,
    bottom: '23%',
  },
  BasicSettingsButtonContainer: {
    backgroundColor: '#7e7e7e',
    padding: 15,
    marginVertical: 12,
    marginHorizontal: 16,
    flexDirection: 'column',
    borderRadius: 10,
    //maxWidth: 16,
    //maxHeight: 12,
    bottom: '23%',
  },
  BasicButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
    alignSelf: 'center',
  },
})
