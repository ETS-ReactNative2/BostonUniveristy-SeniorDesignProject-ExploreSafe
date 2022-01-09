import 'react-native-gesture-handler';
import React, {Component,useState} from 'react';
import {
  StyleSheet,
  StatusBar,
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';


//firebase connection

//local sqlite

//import screens
import LoginScreen from './screens/LoginScreen';
import HomePage from './screens/HomePage';
import SmartCamera from './screens/SmartCamera';
import Profile from './screens/Profile';
import Planning from './screens/Planning';
import MapPage from './screens/MapPage';
import InformationPage from './screens/InformationPage';
import Health from './screens/Health';
import Reviews from './screens/Reviews';
import Details from './screens/Details';
import SplashScreen from './screens/SplashScreen';
import SignUp from './screens/SignUp';
import ForgotPassword from './screens/ForgotPassword';
import AddTripDB from './screens/AddTripDB';

//Firebase Database
import firebase from '@react-native-firebase/app';
import database from '@react-native-firebase/database';

//SQLite LocalDatabase.js
import LocalDatabase from './LocalDatabase';

const db_loc = new LocalDatabase();

//RemoteDatabase.js

import RemoteDatabase from './RemoteDatabase';

const db_rem = new RemoteDatabase();

//LoginContext

import LoginContext from './Contexts/LoginContext';

const log_con = new LoginContext();

//const AppContext = React.createContext();

const Stack = createStackNavigator();

class App extends Component {
  constructor(props) {
    super(props);
    this.state ={
      isLoading: false,
      localUser: {},
      is_active: false,
      user: {},
    }
    this.getUserInfo = this.getUserInfo.bind(this);
  }


  //SQLite database

  componentDidMount() {
    this.getUserInfo();
  }

  //From App.js --> prop passed to: Login, Create and Home --> if this prop is updated, callback to App.js
  //Here I need to define something that listens to this.. when it does: re-render [aka just update any state] -> call getUserInfo
  handleCallBack = () =>{
    console.log('Handling CallBack...')
    this.getUserInfo();
  }


  getUserInfo(){
    let local = [];
    db_loc.userByStatus(1).then((data) => {
      local = data;
      console.log('Returned User By Status is...', local);
      if (local.is_active === 1){
        this.setState({
          localUser: local,
          isLoading: false,
          is_active: true,
        });
        //possible error setting the is_active state at this stage, aslo possible error on userByStatus return value
        console.log('Loaded Local User Data as...!', this.state.localUser);
      }
      else{
        console.log('Inside ELSE...!');
        this.setState({
          localUser: null,
          isLoading: false,
          is_active: false,
        });
        console.log('Did not Load any Local User Data...!');
      }
    }).catch((err) => {
      console.error(err);
      this.setState({
        isLoading: false,
      });
    })
    console.log('Done Get User Info');
  }

  render() {
  const screenProps={
    handleCallBack: this.handleCallBack,
  }
  console.log('APP.js screenProps is: ', screenProps)
  if(this.state.isLoading){
    return <SplashScreen/>;
  }
  return(
    <NavigationContainer>
    <Stack.Navigator>
    {this.state.is_active == false ?(
      //no user found
      <>
        <Stack.Screen name = "LoginScreen" component={LoginScreen} options={{headerShown:false,}} initialParams={screenProps}/>
        <Stack.Screen name = "SignUp" component={SignUp} options={{headerShown:false,}} initialParams={screenProps}/>
        <Stack.Screen name = "ForgotPassword" component={ForgotPassword} options={{headerShown:false,}}/>
      </>
    ) : (
      //user found
      <>
        <Stack.Screen name = "HomePage" component ={HomePage} options={{headerShown:true, title: 'Welcome ' + this.state.localUser.name + '!'}} initialParams={screenProps}/>
        <Stack.Screen name = "SmartCamera" component ={SmartCamera} options={{headerShown:true, title: ' ',}}/>
        <Stack.Screen name = "Profile" component ={Profile} options={{headerShown:true, title: 'User Profile',}}/>
        <Stack.Screen name = "Planning" component ={Planning} options={{headerShown:true, title: 'Trip Planning',}}/>
        <Stack.Screen name = "MapPage" component ={MapPage} options={{headerShown:true, title: 'Region Map',}}/>
        <Stack.Screen name = "InformationPage" component ={InformationPage} options={{headerShown:true, title: ' ',}}/>
        <Stack.Screen name = "Health" component ={Health} options={{headerShown:true, title: ' ',}}/>
        <Stack.Screen name = "Reviews" component ={Reviews} options={{headerShown:true, title: 'Reviews',}}/>
        <Stack.Screen name = "Details" component ={Details} options={{headerShown:true, title: ' ',}}/>
        <Stack.Screen name="AddTripDB" component={AddTripDB} options={{headerShown:true}}/>
      </>
    )}
    </Stack.Navigator>
    </NavigationContainer>
  );
  }
}

const styles = StyleSheet.create({
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
});

export default App;
