import React, {Component, useContext,useState, useEffect, useReducer, setState} from 'react';

//Auth Modules

import auth from '@react-native-firebase/auth';
import {GoogleSignin} from '@react-native-community/google-signin';

//Firebase Database
import firebase from '@react-native-firebase/app';
import database from '@react-native-firebase/database';

//SQLite LocalDatabase.js
import LocalDatabase from '../LocalDatabase';

const db_loc = new LocalDatabase();

//RemoteDatabase.js
import RemoteDatabase from '../RemoteDatabase';

const db_rem = new RemoteDatabase();

//Restart
//import RNRestart from 'react-native-restart';

export default class LoginContext extends Component{
  constructor(props) {
      super(props)
      this.state={
        user: {},
        localU: {},
        isLoading: {},
        initializing: {},
      }
    }

    onAuthStateChanged = (user) => {
      this.setState({
        user: user,
      })
    }

    _passwordReset = async (email) => {
      console.log('Password Reset Called!');
      auth().sendPasswordResetWithEmail(email).then(() => {
        console.log('Password Reset Email Sent!');
      }).catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          console.log('That email address is already in use!');
        }

        if (error.code === 'auth/invalid-email') {
          console.log('That email address is invalid!');
        }

        console.error(error);
      });
    }

    _emailCreateSignIn = async (email, password, name, emergency, city) => {
      console.log('Create Called');
      auth().createUserWithEmailAndPassword(email, password).then(() => {
        //add extra information to remote database
        db_rem.submitUser(name, emergency, email, city, 1);
        //add information to local database
        let data = {
          name: name,
          email: email,
          uid: firebase.auth().currentUser.uid,
          city: city,
          emergency: emergency,
          is_active: 1,
        }
        db_loc.addUser(data).then((result) => {
          console.log(result);
          //RNRestart.Restart();
        }).catch((err) => {
          console.log(err);
        });
        //set auth status to 1
        console.log('User account created & signed in!');
      })
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          console.log('That email address is already in use!');
        }

        if (error.code === 'auth/invalid-email') {
          console.log('That email address is invalid!');
        }

        console.error(error);
      });
    };

    _emailSignIn = async (email, password) => {
      auth().signInWithEmailAndPassword(email, password).then(() => {
        /*UPDATE INFORMATION TO THE REMOTE DATABASE*/
        //fetch current information from the remote
        let fetch = [];
        db_rem.fetch_profile().then((data) => {
          console.log('SignIn snapshot results is: ', data.val());
          fetch = data.val();
          console.log('Fetch is: ', fetch);
          /*UPDATE INFORMATION ON THE REMOTE DATABASE*/
          console.log('Trying to update information on the remote...');
          db_rem.update_profile(fetch.name, fetch.emergency, fetch.email, fetch.city, 1);
          /*LOAD INFORMATION TO THE LOCAL DATABASE*/
          console.log('Trying to ADD user to the local database...');
          let inData = {
            name: fetch.name,
            emergency: fetch.emergency,
            email: fetch.email,
            city: fetch.city,
            is_active: 1,
            uid: firebase.auth().currentUser.uid,
          };
          db_loc.addUser(inData).then((result) => {
            console.log(result);
            //RNRestart.Restart();
          }).catch((err) => {
            console.log(err);
          });
          console.log('User account signed in!');
        })
      }) //END OF .THEN FROM SIGNINWITHEMAILANDPASS
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          alert('Looks like that email address is already in use, try recover password instead!');
          console.log('That email address is already in use!');
        }

        if (error.code === 'auth/invalid-email') {
          console.log('That email address is invalid!');
          alert('That email address is invalid!');
        }
        console.error(error);
      });
    };

    //
    //SignOut should call this function, it executes, and then calls the SignOut function
    _dbSignOutRestructure = async () => {
      console.log('Initializing SignOut DB Updates...')
      //fetch existing profile from local storage
      let local = [];
      db_loc.userById(firebase.auth().currentUser.uid).then((data) => {
        local = data;
      }).catch((err) => {
        console.log(err);
      })
      //update needed fields on remote database -> is_active = 0
      console.log('SignOut Procedures local is: ', local)
      db_rem.update_profile(local.name, local.emergency, local.email, local.city, 0);
      //comprehensively sinchronize database information
      /*NOT YET IMPLEMENTED*/
      //remove user from local database
      db_loc.deleteUser(firebase.auth().currentUser.uid).then((result) => {
        console.log(result);
        console.log('Completed SignOut DB Updates...');
        //RNRestart.Restart();
      }).catch((err) => {
        console.log(err);
      })
      //call the signOut method --> error possibly here
      this.signOut();
    }


    signOut = async () => {
      auth().signOut().then(() => {
        console.log('User Signed Out!');
      })
    }

    _iOSGoogleSignIn = async () => {

    }

    _AndroidGoogleSignIn = async () => {

    }

    componentDidMount(){
      const subscriber = auth.onAuthStateChanged(onAuthStateChanged);
      return subscriber; //unsubscribe on unmount
      this._emailSignIn;
      this._emailCreateSignIn;
      this._dbSignOutRestructure;
      this.signOut;
      this._passwordReset;
    }

  };
//end of class
