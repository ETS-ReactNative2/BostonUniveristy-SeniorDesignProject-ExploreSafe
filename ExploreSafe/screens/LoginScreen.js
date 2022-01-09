import React, {useContext,useState, useEffect, useReducer} from 'react';
import {//SafeAreaView,
        StyleSheet,
        View,
        Text,
        Button,
        TouchableOpacity,
        Platform,
        Image,
      } from 'react-native';

import FormInput from '../components/FormInput';
import FormButton from '../components/FormButton';
import SocialButton from '../components/SocialButton';
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

//LoginContext

import LoginContext from '../Contexts/LoginContext';

const log_con = new LoginContext();

//Restart
import RNRestart from 'react-native-restart';


const LoginScreen = ({navigation, route}) => {

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  const [localU, setLocalU] = useState();



  function onAuthStateChanged(user){
    setUser(user);
    if(initializing) setInitializing(false);
  }


  callEmailSignIn = () => {
    log_con._emailSignIn(email, password);
    //Here, I should update the props from App.js
    //console.log('Navigation is: ', navigation)
    console.log('Props are: ', route.params)
    //Execute Call
    setTimeout(function(){
      route.params.handleCallBack();
    }, 1500);
    //route.params.handleCallBack();
  }

  calliOSGoogleSignIn = () => {
    alert('Coming Soon!');
  }

  callAndroidGoogleSignIn = () => {
    alert('Coming Soon!');
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  if (initializing) return null;

    return (
        <View style={styles.container}>
            <Image source={require('logos/mainLogo.png')} style = {styles.logoAsIcon} />
            <Text style = {styles.text}> Welcome to Explore Safe </Text>
            <FormInput
              labelValue={email}
              onChangeText={(userEmail) => setEmail(userEmail)}
              placeholderText="Email"
              iconType="mail"
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
            />

          <FormInput
            labelValue={password}
            onChangeText={(userPassword) => setPassword(userPassword)}
            placeholderText="Password"
            iconType="lock"
            secureTextEntry={true}
          />

          <FormButton
            buttonTitle="Sign In"
            onPress = {this.callEmailSignIn}
          />

          {Platform.OS === 'android' ? (
            <View>
              <SocialButton
                buttonTitle="Sign In with Google"
                btnType="google"
                color="#de4d41"
                backgroundColor="#f5e7ea"
                onPress = {() => this.callAndroidGoogleSignIn}
              />
            </View>
          ) : (
            <View>
              <SocialButton
                buttonTitle="Sign In with Google"
                btnType="google"
                color="#de4d41"
                backgroundColor="#f5e7ea"
                onPress = {this.calliOSGoogleSignIn}
              />
            </View>
          )
        }
          <TouchableOpacity style={styles.forgotButton} onPress={() => navigation.navigate('ForgotPassword')}>
            <Text style={styles.navButtonText}>Forgot Password?</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.forgotButton}
            onPress={() => navigation.navigate('SignUp')}>
            <Text style={styles.navButtonText}>Don't have an acount? Create here</Text>
          </TouchableOpacity>
          </View>
       );
};

export default LoginScreen;



 const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f9fafd',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  logo: {
    height: 150,
    width: 150,
    resizeMode: 'cover',
  },
  text: {
    fontSize: 28,
    marginBottom: 10,
    color: '#051d5f',
  },
  navButton: {
    marginTop: 15,
  },
  forgotButton: {
    marginVertical: 20,
  },
  navButtonText: {
    fontSize: 18,
    fontWeight: '500',
    color: '#2e64e5',
  },
  logoAsIcon:{
    alignSelf: 'center',
    flex: 1,
    width: 200,
    height: 200,
  },
  errorMessageContainerStyle: {
    marginBottom: 8,
    backgroundColor: '#fee8e6',
    padding: 8,
    borderRadius: 4,
  },
  errorMessageTextStyle: {
    color: '#db2828',
    textAlign: 'center',
    fontSize: 12,
  },
});
