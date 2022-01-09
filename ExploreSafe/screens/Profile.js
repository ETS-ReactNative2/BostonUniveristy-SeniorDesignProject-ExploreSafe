import React, {Component} from 'react';
import {SafeAreaView, StyleSheet, ScrollView, View, Text, StatusBar, Button, ImageBackground, TouchableOpacity, TextInput, Dimensions, Image} from 'react-native';
import { Avatar, Accessory } from 'react-native-elements';
import Modal from 'react-native-modal';
import {BasicHomeButtonB} from '../components/HomeButtons';
import {BasicHomeButton} from '../components/HomeButtons';
import {BasicAntButton} from '../components/PlanningButtons';
import {BasicItemButton} from '../components/PlanningButtons';
import {BasicUtilButton} from '../components/PlanningButtons';
import FormInput from '../components/FormInput';
import FormButton from '../components/FormButton';

//SQLite
import LocalDatabase from '../LocalDatabase';

const db_loc = new LocalDatabase();

//RemoteDatabase.js
import RemoteDatabase from '../RemoteDatabase';

const db_rem = new RemoteDatabase();

//Firebase For Reviews
import firebase from '@react-native-firebase/app';
import database from '@react-native-firebase/database';

export default class Profile extends Component {
    constructor() {
      super()
      this.state={
        user: {},
        isLoading: false,
        gTrip: {},
        ownReview: {},
        isModalVisible: false,
        nameInput: null,
        cityInput: null,
        emergencyInput: null,
      }
      this.userByStatus = this.userByStatus.bind(this);
      this.getGlobalTrip = this.getGlobalTrip.bind(this);
    }

    //modal

    openModal = () => {
      let connected = [];
      db_rem.connection_state().then((data) => {
        console.log('Connectivity state is: ', data.val());
        connected = data.val()
        if(connected === true){
          this.setState({isModalVisible: true})
        }else{
          alert('This feature is only availiable with network connectivity!')
        }
      })
    };

    closeModal = () => {
      this.setState({isModalVisible: false})
    };

    //profile updates

    updateProfile = () => {
      //feature only Availiable with network connectivity -> extra step
      let nm = this.state.user.name;
      let ct = this.state.user.city;
      let em = this.state.user.emergency;
      if(this.state.user.name !== this.state.nameInput){
        //update name
        nm = this.state.nameInput;
      }
      else if(this.state.user.city !== this.state.cityInput){
        //update city
        ct = this.state.cityInput
      }
      else if(this.state.user.emergency !== this.state.emergencyInput){
        //update emergency
        em = this.state.emergencyInput;
      }
      let dataU = {
        name: nm,
        email: this.state.user.email,
        uid: this.state.user.uid,
        city: ct,
        emergency: em,
        is_active: 1,
      }
      //update locally
      db_loc.updateUser(this.state.user.uid,data).then((result) => {
        console.log(result);
      }).catch((err) => {
        console.log(err);
      });
      //update on remote -> if not updated here, updates will only happen on signOut
      //this feature only works if connected to the network
      db_rem.update_profile(dataU.name, dataU.emergency, dataU.email, dataU.city, 1);
    }

    handleName = (text) => {
      this.setState({nameInput: text})
    };
    handleCity = (text) => {
      this.setState({cityInput: text})
    };
    handleEmergency = (text) => {
      this.setState({emergencyInput: text})
    };

    //database access

    componentDidMount(){
      this.userByStatus();
      this.getGlobalTrip();
    }

    userByStatus(){
      let local = [];
      db_loc.userByStatus(1).then((data) => {
        local = data;
        console.log('Returned User By Status is...', local);
        if (local.is_active === 1){
          this.setState({
            user: local,
          });
          console.log('Loaded Local User Data as...!', this.state.user);
        } else {
          this.setState({
            user: {},
            isLoading: false,
          });
          console.log('Did not Load any Local User Data...!');
        }
      }).catch((err) => {
        console.error(err);
        this.setState({
          isLoading: false,
        });
      })
    }

    getGlobalTrip(){
      //load current global trip
      let trip = [];
      db_loc.listGlobalTrip().then((data) => {
        trip = data;
        console.log("Loaded Global Trip Data as :", trip)
        //trip here is an array of objects, want just the object itself
        this.setState({
          gTrip: trip[0],
        })
        console.log('gTrip set as: ', this.state.gTrip);
      }).catch((err) => {
        console.log(err);
      })
    }

    render() {
        return (
          <SafeAreaView style={styles.container}>
          <ScrollView style={styles.scrollView}>

            <View style={styles.userWelcomeBox}>
            <View style={styles.listItemAvatarContainer}>
              <View style={styles.listItemContentContainer}>
              <View style={styles.listTitleButtonContainer}>
                <Text style={styles.itemTitle}>{'Welcome '}{this.state.user.name}!</Text>
                <View style ={styles.listItemAddDelContainer}>
                  <BasicAntButton
                    title="Edit"
                    onPress={() => this.openModal()}
                    itemStyle = "edit"
                  />
                </View>
              </View>
                <Text style={styles.sectionSubtitle}> Email: {this.state.user.email}</Text>
                <Text style={styles.sectionSubtitle}> City: {this.state.user.city}</Text>
                <Text style={styles.sectionSubtitle}> Number: {this.state.user.emergency}</Text>
              </View>
            </View>
            </View>

            <View style={styles.listItem}>
            <View style={styles.listItemAvatarContainer}>
              <View style={styles.listItemContentContainer}>
              <View style={styles.listTitleButtonContainer}>
                <Text style={styles.itemTitle}>{'Global Trip: '}{this.state.gTrip.location}</Text>
              </View>
              <View style={styles.listItemButtonsContainer}>
              <BasicItemButton
                title = "Map"
                onPress = {() => {this.props.navigation.navigate('MapPage', {itemId: this.state.gTrip.id, loc: this.state.gTrip.location, isG: true}); }}
                itemStyle="pushpin"
              />
              <BasicItemButton
                title = "Details"
                onPress = {() => {this.props.navigation.navigate('Details', {itemId: this.state.gTrip.id, loc: this.state.gTrip.location, isR: false}); }}
                itemStyle="info"
              />
              <BasicItemButton
                title = "Reviews"
                onPress = {() => {this.props.navigation.navigate('Reviews', {itemId: this.state.gTrip.id, loc: this.state.gTrip.location, isU: false, isLoc: true}); }}
                itemStyle="idcard"
              />
              <BasicItemButton
                title = "Planning"
                onPress = {() => {this.props.navigation.navigate('Planning'); }}
                itemStyle="book"
              />
              </View>
              </View>
            </View>
            </View>

            <BasicHomeButton
              title = "User Reviews"
              onPress = {() => this.props.navigation.navigate('Reviews', {isU: true, isLoc: false})}
            />
            <BasicHomeButton
              title = "All Explore Safe Reviews"
              onPress = {() => this.props.navigation.navigate('Reviews', {isU: false, isLoc: false})}
            />
            <BasicHomeButton
              title = "Home Page"
              onPress = {() => this.props.navigation.navigate('HomePage')}
            />
            <Modal isVisible={this.state.isModalVisible} style ={styles.modalTag} onBackdropPress={()=>this.closeModal()} propagateSwipe={true}>
              <View style = {styles.modal}>
                <Image source={require('logos/mainLogo.png')} style = {styles.logoAsIcon} />

                  <FormInput
                    onChangeText={this.handleName}
                    placeholderText={this.state.user.name}
                    iconType="user"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoCorrect={false}
                  />
                  <FormInput
                    onChangeText={this.handleCity}
                    placeholderText={this.state.user.city}
                    iconType="pushpin"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoCorrect={false}
                  />
                  <FormInput
                    onChangeText={this.handleEmergency}
                    placeholderText={this.state.user.emergency}
                    iconType="phone"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoCorrect={false}
                  />
                  <FormButton
                    buttonTitle="Submit"
                    onPress = {() => {this.updateProfile(); this.closeModal()}}
                  />
                  <FormButton
                    buttonTitle="Close"
                    onPress = {() =>  this.closeModal()}
                  />
              </View>
            </Modal>
          </ScrollView>
          </SafeAreaView>
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
    },
    sectionTitle: {
      fontSize: 20,
      fontWeight: '400',
      color: 'white',
      marginTop: 20,
      textAlign: 'left',
    },
    sectionTitleB: {
      fontSize: 20,
      fontWeight: '400',
      color: 'black',
      marginTop: 20,
      textAlign: 'center',
    },
    AvatarContainer: {
      minWidth: '100%', //70
      maxWidth: '100%', //90
      borderRadius: 10,
      justifyContent: 'center',
      flex: 1,
      flexDirection: 'row',
      backgroundColor: '#63b395',
      alignItems: 'center',
    },
    ContentContainer: {
      justifyContent: 'flex-start',
      elevation: 20,
      borderRadius: 10,
      flex: 1,
      padding: 10,
      flexDirection: 'column',
      backgroundColor: '#63b395',
    },
    informationContainer:{
      justifyContent: 'flex-start',
      borderRadius: 10,
      flex: 1,
      flexDirection: 'column',
      backgroundColor: '#63b395',
      alignItems: 'flex-start',
    },
    userWelcomeBox:{
      backgroundColor: '#63b395',
      padding: 15,
      marginVertical: 8,
      marginHorizontal: 16,
      flexDirection: 'row',
      borderRadius: 10
    },
    sectionText:{
      fontSize: 18,
      fontWeight: '400',
      color: 'rgb(0,0,0)',
      marginTop: 20,
      textAlign: 'left',
      flex: 1,
    },
    sectionSubtitle:{
      fontSize: 16,
      fontWeight: '400',
      color: 'white',
      padding: 0,
      marginTop: 5,
      textAlign: 'left',
      flex: 1,
    },
    sectionSubtitleB:{
      fontSize: 16,
      fontWeight: '400',
      color: 'black',
      padding: 0,
      marginTop: 10,
      textAlign: 'center',
      flex: 1,
    },
    scrollView: {
      backgroundColor: 'white',
      marginHorizontal: 5,
    },
    itemTitle: {
      fontSize: 18,
      fontWeight: '500',
      color: 'white',
      textAlign: 'left',
    },
    subText: {
      fontSize: 12,
      fontWeight: '400',
      color: 'rgb(128,128,128)',
      textAlign: 'center',
      padding: 0,
      marginTop: 5
    },
    listItem: {
      backgroundColor: '#63b395',
      padding: 15,
      marginVertical: 8,
      marginHorizontal: 16,
      flexDirection: 'row',
      borderRadius: 10
    },
    listItemAvatarContainer: {
      minWidth: '100%', //70
      maxWidth: '100%', //90
      borderRadius: 10,
      justifyContent: 'center',
      flex: 1,
      flexDirection: 'row',
      backgroundColor: '#63b395',
    },
    listItemContentContainer: {
      justifyContent: 'flex-start',
      elevation: 20,
      borderRadius: 10,
      flex: 1,
      flexDirection: 'column',
      backgroundColor: '#63b395',
    },
    listItemButtonsContainer:{
      justifyContent: 'flex-start',
      elevation: 20,
      borderRadius: 10,
      flex: 1,
      flexDirection: 'row',
      backgroundColor: '#63b395',
    },
    listItemAddDelContainer:{
      justifyContent: 'flex-end',
      elevation: 20,
      borderRadius: 10,
      flex: 1,
      flexDirection: 'row',
      backgroundColor: '#63b395',
    },
    textInput:{
      margin: 15,
      height: 40,
      borderColor: '#63b395',
      borderWidth: 1,
      textAlign: 'center',
      borderRadius: 10
    },
    submitButton:{
      backgroundColor: '#63b395',
      padding: 10,
      textAlign: 'center',
      borderRadius: 10,
      alignSelf: 'center'
    },
    submitButtonText:{
      color: 'white',
      textAlign: 'center'
    },
    modal:{
      flex: 1,
      textAlign: 'center',
      justifyContent: 'center',
    },
    modalTag:{
      backgroundColor: 'white',
      maxHeight: '75%',
      borderRadius: 10,
      justifyContent: 'center',
      padding: 7,
      flex: 1
    },
    listTitleButtonContainer:{
      justifyContent: 'flex-start',
      borderRadius: 10,
      flex: 1,
      flexDirection: 'row',
      backgroundColor: '#63b395',
      alignItems: 'center',
    },
    logoAsIcon:{
      alignSelf: 'center',
      flex: 1,
      width: 300,
      height: 300,
      marginTop: 10,
    }
});
