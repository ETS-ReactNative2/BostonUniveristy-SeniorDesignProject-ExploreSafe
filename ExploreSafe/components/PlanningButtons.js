import React from 'react';
import {StyleSheet, TouchableOpacity, Text, View} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';

  //BasicAntButton
  export function BasicAntButton({title, onPress, itemStyle}){
    return(
      <TouchableOpacity onPress={onPress}>
        <View style={styles.iconStyle}>
          <AntDesign name={itemStyle} size={15} color="#000000" />
        </View>
      </TouchableOpacity>
    )
  }
  //BasicItemButton
  export function BasicItemButton({title, onPress, itemStyle}){
    return(
      <TouchableOpacity onPress={onPress}>
        <View style={styles.iconStyleText}>
          <AntDesign name={itemStyle} size={25} color="#FFFFFF" />
          <Text style={styles.BasicButtonText}>{title}</Text>
        </View>
      </TouchableOpacity>
    )
  }
  //BasicUtilButton
  export function BasicUtilButton({title, onPress}){
    return(
      <TouchableOpacity onPress={onPress}>
        <View style={styles.utilButton}>
          <Text style = {styles.utilButtonText}>{title}</Text>
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
    BasicButtonText: {
      color: 'white',
      fontSize: 12,
      fontWeight: '500',
      alignSelf: 'center',
    },
    iconStyle: {
      padding: 10,
      height: '100%',
      justifyContent: 'center',
      alignItems: 'center',
      // borderRightColor: '#ccc',
      // borderRightWidth: 1,
      width: 37,
    },
    iconStyleText: {
      padding: 10,
      height: '100%',
      justifyContent: 'center',
      alignItems: 'center',
      // borderRightColor: '#ccc',
      // borderRightWidth: 1,
      width: 70,
    },
    utilButton:{
      backgroundColor: '#63b395',
      padding: 10,
      textAlign: 'center',
      borderRadius: 10,
      alignSelf: 'center',
      margin: 5
    },
    utilButtonText:{
      color: 'white',
      textAlign: 'center'
    },
  })
