import React, {Component} from 'react';
import {SafeAreaView, StyleSheet, ScrollView, View, Text, Image,StatusBar, Button, ImageBackground, TouchableOpacity} from 'react-native';
import { API_WEATH_KEY } from "@env"
import { GEO_KEY } from "@env"

import Geocoder from 'react-native-geocoding';

import {BasicHomeButton} from '../components/HomeButtons';

//SQLite
import LocalDatabase from '../LocalDatabase';

const db_loc = new LocalDatabase();

//RemoteDatabase.js
import RemoteDatabase from '../RemoteDatabase';

const db_rem = new RemoteDatabase();

//neha

//from planning page - send lat and long to this page

export default class Details extends Component {
    constructor(props) {
        super(props)
        this.state = {
            temperature: null,
            desc: null,
            icon: null,
            city: null,
            alerts: null,
            trip: {},
            isLoading: true,
        }

    }


    //if else that read from remote if not on local
    readSetFromLocal = () => {
      const itemId = this.props.route.params

      if(itemId.isR === true){
        //if not a local trip, load from the remote
          let local = []
          console.log("Passed Item to details is: ", itemId)
          console.log("Location is: ", itemId.loc)
          db_rem.fetch_trip_info(itemId.loc).then((data) => {
            console.log('Data is: ', data);
            local = data.val();
            this.setState({
              trip: local,
              isLoading: false
            });
            this.fetchWeather();
          }).catch((err) => {
            console.log(err);
            this.setState({
              isLoading: false
            })
          })
      }else{
        console.log("Passed ID to details is: ", itemId)
        console.log("Id is: ", itemId.itemId)
        let local = [];
        db_loc.tripById(itemId.itemId).then((data) => {
          console.log("Data is: ", data);
          local = data;
          this.setState({
            trip: local,
            isLoading: false,
          });
          this.fetchWeather();
        }).catch((err) => {
          console.log(err);
          this.setState = {
            isLoading: false
          }
        })
      }
    };


    renderImage() {
        if (this.state.desc != null && this.state.icon != null)
            return <Image style={styles.icon}
                source={{ uri: 'http://openweathermap.org/img/w/' + this.state.icon + '.png' }}
            />
        return null;
    }

    fetchWeather = async () => {
      console.log('Called Fetch Weather')
      const openweather_api = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + this.state.trip.latitude + '&lon=' + this.state.trip.longitude + '&exclude=minutely&units=metric&appid=' + API_WEATH_KEY;

      try {
          let response = await fetch(openweather_api);
          let responseJson = await response.json();
          console.log('data', responseJson.daily[0])
          this.setState({
              temperature: responseJson.daily[0].temp.day,
              desc: responseJson.daily[0].weather[0].description,
              icon: responseJson.daily[0].weather[0].icon,
          });

      } catch (err) {
          console.log(err);
      }
    }

    async componentDidMount() {
        this.readSetFromLocal();
        //console.log('API Call Lat is: ', this.state.trip.latitude);
        const openweather_api = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + this.state.trip.latitude + '&lon=' + this.state.trip.longitude + '&exclude=minutely&units=metric&appid=' + API_WEATH_KEY;

        try {
            let response = await fetch(openweather_api);
            let responseJson = await response.json();
            console.log('data', responseJson.daily[0])
            this.setState({
                temperature: responseJson.daily[0].temp.day,
                desc: responseJson.daily[0].weather[0].description,
                icon: responseJson.daily[0].weather[0].icon,
            });

        } catch (err) {
            console.log(err);
        }
    }

    render() {
        console.log("Trip is: ",this.state.trip)
        console.log("Latitude is: ",this.state.trip.latitude)
        console.log("Longitude is: ",this.state.trip.longitude)
        return (
              <SafeAreaView style={styles.container}>
              <ScrollView style={styles.scrollView}>
                <View style={styles.temperatureWelcomeBox}>
                  <Text style={styles.sectionTitle}>Welcome to {this.state.trip.location}!</Text>
                  <View style={styles.dailyTempFeedback}>
                    {this.renderImage()}
                    <Text style={styles.sectionText}>Current forecast is {this.state.temperature} Celcius with {this.state.desc}.</Text>
                  </View>
                </View>
                <View style={styles.acessoryRecomendationsBox}>
                  <Text style={styles.sectionTitle2}>What should you bring:</Text>
                  <Text style={styles.sectionText}> For this region, it is recommended that you bring {this.state.trip.recommended}</Text>
                </View>
                <View style={styles.commonThreatsBox}>
                  <Text style={styles.sectionTitle2}>What to expect:</Text>
                  <Text style={styles.sectionText}> In {this.state.trip.location}, you can expect to find {this.state.trip.expected}</Text>
                </View>
                <BasicHomeButton
                  title = "Region Map"
                  onPress = {() => this.props.navigation.navigate('MapPage', {itemId: this.state.trip.id, loc: this.state.trip.location, isG: false})}
                />
                <BasicHomeButton
                  title = "Threat Information"
                  onPress = {() => this.props.navigation.navigate('InformationPage')}
                />
                <BasicHomeButton
                  title = "Home Page"
                  onPress = {() => this.props.navigation.navigate('HomePage')}
                />
              </ScrollView>
              </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
      alignItems: 'stretch',
      justifyContent: 'center',
      elevation: 20,
      borderRadius: 10,
      flex: 1,
      flexDirection: 'column',
      backgroundColor: 'white',
    },
    temperatureWelcomeBox:{
      height: '45%',
      flex: 1,
      flexDirection: 'column',
      backgroundColor: '#63b395',
      padding: 10,
      marginVertical: 12,
      marginHorizontal: 16,
      borderRadius: 10,
    },
    acessoryRecomendationsBox:{
      height: '35%',
      flex: 1,
      flexDirection: 'column',
      backgroundColor: '#63b395',
      padding: 10,
      marginVertical: 12,
      marginHorizontal: 16,
      borderRadius: 10,
    },
    commonThreatsBox:{
      height: '35%',
      flex: 1,
      flexDirection: 'column',
      backgroundColor: '#63b395',
      padding: 10,
      marginVertical: 12,
      marginHorizontal: 16,
      borderRadius: 10,
    },
    icon: {
        width: 75,
        height: 75,
        marginBottom: 2,
        justifyContent: 'flex-start',
        alignSelf: 'flex-start'
    },
    sectionTitle: {
      fontSize: 24,
      fontWeight: '600',
      color: 'rgb(0,0,0)',
      marginTop: 20,
      textAlign: 'left',
    },
    sectionTitle2: {
      fontSize: 20,
      fontWeight: '500',
      color: 'rgb(0,0,0)',
      marginTop: 15,
      textAlign: 'left',
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
      fontSize: 20,
      fontWeight: '400',
      color: 'rgb(0,0,0)',
      marginTop: 20,
      textAlign: 'left',
      flex: 1,
    },
    dailyTempFeedback:{
      flex: 1,
      flexDirection: 'row',
      backgroundColor: '#63b395',
      padding: 15,
      borderRadius: 10,
    },
    scrollView: {
      //minWidth: '100%', //70
      //maxWidth: '100%', //90
      backgroundColor: 'white',
      marginHorizontal: 5,
    },
});
