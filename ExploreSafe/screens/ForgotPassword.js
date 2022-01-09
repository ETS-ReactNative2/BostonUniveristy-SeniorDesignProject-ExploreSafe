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

//LoginContext

import LoginContext from '../Contexts/LoginContext';

const log_con = new LoginContext();


const ForgotPassword = ({navigation}) => {

  const [email, setEmail] = useState();

  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  callResetPassword = () => {
    log_con._passwordReset(email);
  }

    return (
        <View style={styles.container}>
            <Text style = {styles.text}> Recover Your Password </Text>
            <Text style ={styles.subText}> {'Entering a valid email address will \n provide a password recovery link.'} </Text>
            <FormInput
              labelValue={email}
              onChangeText={(userEmail) => setEmail(userEmail)}
              placeholderText="Email"
              iconType="mail"
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
            />

          <FormButton
            buttonTitle="Recover"
            //onPress = {() => navigation.navigate('LoginScreen')}
            onPress={() => this.callResetPassword}
          />
          <FormButton
            buttonTitle="Back to Login"
            onPress = {()=>navigation.navigate('LoginScreen')}
          />
          </View>
       );

};

export default ForgotPassword;



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
  subText:{
    fontSize: 16,
    marginBottom: 10
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
