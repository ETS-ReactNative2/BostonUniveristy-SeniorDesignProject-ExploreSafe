import React, {useContext,useState, useEffect} from 'react';
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


const SignUp = ({navigation, route}) => {

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [name, setName] = useState();
  const [city, setCity] = useState();
  const [emergency, setEmergency] = useState();

  //new
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();


  function onAuthStateChanged(user){
    setUser(user);
    if(initializing) setInitializing(false);
  }


  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  callEmailCreateSignIn = () => {
    log_con._emailCreateSignIn(email, password, name, emergency, city);
    //Here, I should update the props from App.js
    console.log('Props are: ', route.params)
    //Execute Call
    setTimeout(function(){
      route.params.handleCallBack();
    }, 2000);

  }

  if (initializing) return null;

    return (
        <View style={styles.container}>
            <Text style = {styles.text}> Create your Account </Text>
            <FormInput
              labelValue={name}
              onChangeText={(userName) => setName(userName)}
              placeholderText="Name"
              iconType="user"
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
            />
            <FormInput
              labelValue={city}
              onChangeText={(city) => setCity(city)}
              placeholderText="City"
              iconType="pushpin"
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
            />
            <FormInput
              labelValue={emergency}
              onChangeText={(emergency) => setEmergency(emergency)}
              placeholderText="Emergency Contact"
              iconType="phone"
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
            />
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
            buttonTitle="Create Account"
            onPress = {this.callEmailCreateSignIn}
          />
          <FormButton
            buttonTitle="Back to Login"
            onPress = {()=>navigation.navigate('LoginScreen')}
          />
          <Text></Text>
          <Text></Text>
          <Text></Text>
          <Text></Text>
          </View>
       );
};

export default SignUp;



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
    marginVertical: 35,
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
  }
});
