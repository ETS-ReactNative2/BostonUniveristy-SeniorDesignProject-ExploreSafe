import React, {Component} from 'react';
import {TextInput,SafeAreaView, StyleSheet, ScrollView, View, Text, StatusBar, Button, ImageBackground, TouchableOpacity} from 'react-native';


import firebase from '@react-native-firebase/app';
import database from '@react-native-firebase/database';


export default class RemoteDatabase extends Component {

  //check if the app connected to database
  //make this return boolean -> true or false connection
  connection_state = () => {
    return new Promise((resolve) => {
      let connect_state_ref = firebase.database().ref(".info/connected");
      connect_state_ref.once("value").then((snap) => {
        resolve(snap);
      })
    })
  };

  // profile page!!!!!!!
  //submit user profile data
  submitUser = (name, emergency, email,city,is_active) => {
    const UserProfileRef = firebase.database().ref('USERS/' + firebase.auth().currentUser.uid + '/PROFILE');

    //you may insert your prompt function here using if else
    //
    UserProfileRef.set
    (
      {
      name:name,
      emergency:emergency,
      email: email,
      city: city,
      is_active: is_active,
      }
    )
    .then
    (
      //you may want to put your own UI function here to replace the anonymous arrow function
      ()=>{console.log('User profile has been added to remote database!');}
    )
    .catch
    (
      (error) => {console.log(error);} //for debuging
    )

  };


    //updata or modify user profile
    //Steven works on image now
  update_profile = (name, emergency, email,city,is_active) => {
    const UserProfileRef = firebase.database().ref('USERS/' + firebase.auth().currentUser.uid + '/PROFILE');

    UserProfileRef.update
    (
      {
        name:name,
        emergency:emergency,
        email: email,
        city: city,
        is_active: is_active,
      }
    )
    .then
    (  //again you may replace with your UI function here!
      ()=>{console.log('Successfully updated user profile!');}
    )
    .catch
    (
      error => {console.log(error);}
    )

  };



  //only read when it is called -> returns data in snapshot format
  fetch_profile = () =>{
    return new Promise((resolve) => {
      const userId = firebase.database().ref('USERS/' + firebase.auth().currentUser.uid + '/PROFILE')
      userId.once('value').then((snapshot) => {
        resolve(snapshot);
        console.log("Profile Fetch Results Are: ", snapshot.val());
        }
      ).catch(
        error => {console.log(error);}
      )
    })
  };



  //will delete the entire user profile of login user
  delete_profile = () => {
    const UserProfileRef = firebase.database().ref('USERS/' + firebase.auth().currentUser.uid + '/PROFILE')

    UserProfileRef.set(null)
    .then(()=>{
      alert('delete user profile!')
    })
    .catch(error => {
      console.log(error)
    })

  };
 //end of user profile functions

 /*TRIP FUNCTIONS*/

 //submit trip info under user -> to keep track of -> current is in this case always 0 (not current trip)
  submit_trip_info = (location, id, current) => {
    const UserTripRef = firebase.database().ref('USERS/' + firebase.auth().currentUser.uid + '/TRIPINFO/' + location.toUpperCase())
      UserTripRef.set({
        location:location,
        id: id,
        current: current

      })
      .then(() => {
        //you may want to render your page here
        alert('submit user trip info')
      })
      .catch(error => {
        console.log(error)
      })

  };

  //submit trip to database TRIPINFO --> Admin Function
  submit_trip_db = (latitude, longitude, location, id, recommended, expected) => {
    const DBTripRef = firebase.database().ref('TRIPINFO/' + location.toUpperCase())
      DBTripRef.set({
        location:location,
        latitude:latitude,
        longitude:longitude,
        id: id,
        recommended: recommended,
        expected: expected

      })
      .then(() => {
        //you may want to render your page here
        alert('Trip Added to Database')
      })
      .catch(error => {
        console.log(error)
      })

  };


  //fetch trip info based on the location
  //return trip info if stored in database, else null
  fetch_trip_info = (location) =>{
    return new Promise((resolve) => {
      const userId = firebase.database().ref('TRIPINFO/' + location.toUpperCase())
      userId.once('value').then((snapshot) => {
        // var retArr = [];
        // snapshot.forEach(function(snap){
        //   var item = snap.val();
        //   item.key = snap.key;
        //   retArr.push(item);
        // })
        // resolve(retArr);
        resolve(snapshot);
        console.log("Trip Fetch Results Are: ", snapshot.val());
        }
      ).catch(
        error => {console.log(error);}
      )
    })
  };

  //fetch all trips
  fetch_trip_info_all = () =>{
    return new Promise((resolve) => {
      const userId = firebase.database().ref('TRIPINFO/')
      userId.once('value').then((snapshot) => {
        resolve(snapshot);
        console.log("All Fetch Results Are: ", snapshot.val());
        }
      ).catch(
        error => {console.log(error);}
      )
    })
  };

  //Update User Trip Info -> Change Current/Non Current Status [1/0]
  update_trip_user = (location, id, current) => {
    const UserProfileRef = firebase.database().ref('USERS/' + firebase.auth().currentUser.uid + '/TRIPINFO/' +location.toUpperCase())
    UserProfileRef.update({
      location:location,
      id: id,
      current: current
    })
    .then(()=>{
      alert('Successfully Updated User TripInfo to !', location)
    })
    .catch(error => {
      console.log(error)
    })
  };


  //Update Databse trip_info based on location --> Admin Function
  updata_trip_info = (latitude, longitude, location, id, recommended, expected) => {
    const UserProfileRef = firebase.database().ref('/TRIPINFO/' +location.toUpperCase())
    UserProfileRef.update({
      location:location,
      latitude:latitude,
      longitude:longitude,
      id: id,
      recommended: recommended,
      expected: expected
    })
    .then(()=>{
      //you may render other stuff here!!!!
      alert('Successfully update trip_info!')
    })
    .catch(error => {
      console.log(error)
    })
  };


  //delete Trip From User based on location
  delete_user_trip_location = (location) =>{
    const ref = firebase.database().ref('USERS/' + firebase.auth().currentUser.uid + '/TRIPINFO/' +location.toUpperCase())
    ref.set(null)
    .then(()=>{
      alert('Removed Trip From User!')
    })
    .catch(error => {
      console.log(error)
    })
  };

  //delete Trip From DB based on location --> ADM Control Function
  delete_db_trip_location = (location) =>{
    const ref = firebase.database().ref('/TRIPINFO/' +location.toUpperCase())
    ref.set(null)
    .then(()=>{
      alert('Removed Trip From Database!')
    })
    .catch(error => {
      console.log(error)
    })
  };
  //end of Planning page

  constructor() {
      super()
    }
}
//end of class
