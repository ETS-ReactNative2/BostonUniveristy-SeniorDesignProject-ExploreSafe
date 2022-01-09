import React from 'react';
import {StyleSheet, TouchableOpacity, Text, View} from 'react-native';

//BasicReviewButtonB
export function BasicReviewButtonB({title, onPress}){
  return(
    <TouchableOpacity onPress={onPress}>
      <View style={styles.BasicHomeButtonContainerB}>
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
  BasicButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
    alignSelf: 'center',
  },
})
