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

//Firebase Database
import firebase from '@react-native-firebase/app';
import database from '@react-native-firebase/database';

//SQLite LocalDatabase.js
import LocalDatabase from '../LocalDatabase';

const db_loc = new LocalDatabase();

//RemoteDatabase.js

import RemoteDatabase from '../RemoteDatabase';

const db_rem = new RemoteDatabase();


const AddTripDB = ({navigation}) => {

  const [latitude, setLatitude] = useState();
  const [longitude, setLongitude] = useState();
  const [location, setLocation] = useState({});
  const [expected, setExpected] = useState();
  const [recommended, setRecommeded] = useState();
  const [id, setID] = useState();

  submitTripDB = async () => {
    db_rem.submit_trip_db(latitude, longitude, location, id, recommended, expected).then(() => {
      alert('Added Location' + location + 'to TRIPINFO Database');
    })
  };

    return (
        <View style={styles.container}>
            <Text style = {styles.text}> Add Trip to Database </Text>
            <FormInput
              labelValue={location}
              onChangeText={(location) => setLocation(location)}
              placeholderText="Location"
              iconType="pushpin"
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
            />
            <FormInput
              labelValue={latitude}
              onChangeText={(latitude) => setLatitude(latitude)}
              placeholderText="Latitude"
              iconType="pushpin"
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
            />
            <FormInput
              labelValue={longitude}
              onChangeText={(longitude) => setLongitude(longitude)}
              placeholderText="Longitude"
              iconType="pushpin"
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
            />
            <FormInput
              labelValue={id}
              onChangeText={(id) => setID(id)}
              placeholderText="Trip ID"
              iconType="question"
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
            />
            <FormInput
              labelValue={expected}
              onChangeText={(expected) => setExpected(expected)}
              placeholderText="Expected"
              iconType="question"
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
            />
            <FormInput
              labelValue={recommended}
              onChangeText={(recommended) => setRecommeded(recommended)}
              placeholderText="Recommeded"
              iconType="question"
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
            />


          <FormButton
            buttonTitle="Submit"
            onPress = {this.submitTripDB}
          />
          <FormButton
            buttonTitle="Back to Planning"
            onPress = {()=>navigation.navigate('Planning')}
          />
          <Text></Text>
          <Text></Text>
          <Text></Text>
          <Text></Text>
          </View>
       );

  //end of render

};
//end of function class

export default AddTripDB;



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
