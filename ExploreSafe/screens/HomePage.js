import React, {Component} from 'react';
import {SafeAreaView, StyleSheet, ScrollView, View, Text, StatusBar, Button, ImageBackground, Image, TouchableOpacity} from 'react-native';
import {BasicHomeButton} from '../components/HomeButtons';
import {BasicLogoutButton} from '../components/HomeButtons';
import {BasicSettingsButton} from '../components/HomeButtons';

//LoginContext

import LoginContext from '../Contexts/LoginContext';

const log_con = new LoginContext();

//SQLite
import LocalDatabase from '../LocalDatabase';

const db_loc = new LocalDatabase();

export default class HomePage extends Component {
    constructor(props) {
      super(props)
      this.state= {
        isLoading: false,
        gTrip: {},
      }
      this.getGlobalTrip = this.getGlobalTrip.bind(this);
    }

    componentDidMount(){
      this.getGlobalTrip();
    }

    getGlobalTrip(){
      //load current global trip
      let trip = [];
      db_loc.listGlobalTrip().then((data) => {
        trip = data;
        //console.log("Loaded Global Trip Data as :", trip)
        //trip here is an array of objects, want just the object itself
        this.setState({
          gTrip: trip[0],
        })
        //console.log('gTrip set as: ', this.state.gTrip);
      }).catch((err) => {
        console.log(err);
      })
    }

    // checkGlobal = (item) => {
    //   if(item === {}){
    //     //set a temporaty global trip object
    //     let temp ={
    //       location: 'underfined',
    //       id: 'underfined',
    //     }
    //     this.setState({
    //       gTrip: temp,
    //     })
    //   }
    //   else{
    //     //do nothing
    //   }
    // }

    callSignOut = (route) => {
      //console.log('Called SignOut from Login Context');
      log_con._dbSignOutRestructure();
      //Here, I should update the props from App.js
      setTimeout(function(){
        route.handleCallBack();
      }, 1500);
    }


    render() {
        console.log('Params are: ', this.props.route.params)
        return (
            <View style={styles.titleContainer}>
              <Image source={require('logos/mainLogo.png')} style = {styles.logoAsIcon} />
              <View style={styles.container}>
                <View style= {styles.buttonLeftContainer}>
                  <BasicHomeButton
                    title = "Smart Camera"
                    onPress = {() => this.props.navigation.navigate('SmartCamera')}
                  />
                  <BasicHomeButton
                    title = "User Profile"
                    onPress = {() => this.props.navigation.navigate('Profile', {isG: true})}
                  />
                  <BasicHomeButton
                    title = "Trip Planning"
                    onPress = {() => this.props.navigation.navigate('Planning')}
                  />
                </View>
                <View style={styles.buttonRightContainer}>
                  <BasicHomeButton
                    title = "Region Map"
                    //onPress = {() => alert('Release Map Unacessible from Home! Coming Soon...')}
                    onPress = {() => this.props.navigation.navigate('MapPage', {itemId: this.state.gTrip.id, loc: this.state.gTrip.location, isG: true})}
                  />
                  <BasicHomeButton
                    title = "Information"
                    onPress = {() => this.props.navigation.navigate('InformationPage', {itemId: this.state.gTrip.id, loc: this.state.gTrip.location, isG: true})}
                  />
                  <BasicHomeButton
                    title = "User Health"
                    onPress = {() => alert('Coming Soon!')}
                  />
                </View>
              </View>
              <BasicSettingsButton
                title = "Settings"
                onPress = {() => alert('Coming Soon!')}
              />
              <BasicLogoutButton
                title = "Logout"
                onPress = {() => {this.callSignOut(this.props.route.params); console.log('PARAMS ', this.props.route.params)}}
              />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    titleContainer: {
      minWidth: '100%', //70
      maxWidth: '100%', //90
      justifyContent: 'center',
      elevation: 20,
      borderRadius: 10,
      flex: 1,
      flexDirection: 'column',
      backgroundColor: 'white',
    },
    container: {
        minWidth: '100%', //70
        maxWidth: '100%', //90
        alignItems: 'stretch',
        justifyContent: 'center',
        elevation: 20,
        borderRadius: 10,
        flex: 1,
        flexDirection: 'row',
        backgroundColor: 'white',
    },
    sectionTitle: {
      fontSize: 24,
      fontWeight: '600',
      color: 'rgb(0,0,0)',
      marginTop: 20,
      textAlign: 'center',
    },
    buttonLeftContainer:{
      flex: 1,
      flexDirection: 'column',
      width: '50%',
      alignContent: 'center',
    },
    buttonRightContainer:{
      flex: 1,
      flexDirection: 'column',
      width: '50%',
      alignContent: 'center',
    },
    logoAsIcon:{
      alignSelf: 'center',
      flex: 1,
      width: 200,
      height: 200,
    },
});
