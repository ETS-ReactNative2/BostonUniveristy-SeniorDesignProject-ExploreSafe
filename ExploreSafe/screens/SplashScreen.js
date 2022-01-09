import React, {Component} from 'react';
import {SafeAreaView, StyleSheet, ScrollView, View, Text, StatusBar, Button, ImageBackground, TouchableOpacity} from 'react-native';

export default class SplashScreen extends Component {
    constructor(props) {
      super(props)
    }

    render() {
        return (
            <View style={styles.container}>
              <ImageBackground source={require('logos/mainLogo.png')} resizeMode='contain' style={styles.imgBackg}>
              </ImageBackground>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        minWidth: '100%', //70
        maxWidth: '100%', //90
        alignItems: 'stretch',
        justifyContent: 'center',
        elevation: 20,
        borderRadius: 10,
        flex: 1,
        backgroundColor: 'white'
    },
    imgBackg:{
      width: '100%',
      height: '100%',
      flex: 1,
      resizeMode: 'stretch'
    }
});
