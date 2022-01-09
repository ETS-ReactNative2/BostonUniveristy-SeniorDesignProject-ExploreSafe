import React, {Component} from 'react';
import MapView, { PROVIDER_GOOGLE, Marker, ProviderPropType, Callout, LocalTile } from 'react-native-maps';
import {SafeAreaView, StyleSheet, ScrollView, View, Text, TextInput, StatusBar, Button, ImageBackground, TouchableOpacity, Dimensions} from 'react-native';
import firebase from '@react-native-firebase/app';
import database from '@react-native-firebase/database';

//mohammed

const { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width/height;
const LATITUDE = 42.3270;
const LONGITUDE = -71.1117;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
let id;

//SQLite
import LocalDatabase from '../LocalDatabase';

const db_loc = new LocalDatabase();

//RemoteDatabase.js
import RemoteDatabase from '../RemoteDatabase';

const db_rem = new RemoteDatabase();

export default class MapPage extends Component {
    constructor(props) {
      super(props);
      this.state = {
        region: {
          latitude: LATITUDE,
          longitude: LONGITUDE,
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA,
        },
        user: {},
        markers: [],
        title: 'Title for pin',
        description: 'Short description for pin',
        gTrip: {},
        forceRefresh: {},
        trip: {}
      };
      this.handleTitle = this.handleTitle.bind(this);
      this.handleDescription = this.handleDescription.bind(this);
      this.getUser = this.getUser.bind(this);
      this.setLocation = this.setLocation.bind(this);
    }

    //
    componentDidMount(){
      this.getUser();
      this.setLocation();
    }

    //given navigation parameters, set the background map tile accordingly
    setLocation(){
      const locSource = this.props.route.params;
      this.props.navigation.setOptions({
        title: locSource.loc,
      });
      if(locSource.isG === true){
        //load information from global trip
        console.log('Trying to load map by global trip')
        let trip = [];
        let local = []
        let reg = [];
        db_loc.listGlobalTrip().then((data) => {
          trip = data[0];
          //console.log('Trip is: ', trip)
          this.setState({
            gTrip: trip,
            isLoading: false,
          })
        }).catch((err) => {
          console.log(err);
        })
        //get trip data by the global id -> just the id to query for is the issue //OK
        //console.log('Trip id is: ', trip.id)
        db_loc.tripById(locSource.itemId).then((data) => {
          //console.log("Data is: ", data);
          local = data;
          //console.log("Local is: ", local);
          reg = {
            latitude: local.latitude,
            longitude: local.longitude,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA,
          }
          //console.log('Reg is:', reg)
          this.setState({
            trip: local,
            region: reg,
            isLoading: false,
            forceRefresh: Math.floor(Math.random() * 100)
          })
        }).catch((err) => {
          console.log(err);
          this.setState = {
            isLoading: false
          }
        })
      }else{
        //load information from locSource.loc location -> from the remote, since this page so far only works from the remote
        console.log('Trying to load map by location')
        let local = [];
        let reg = [];
        db_rem.fetch_trip_info(locSource.loc).then((data) => {
          //console.log('Data is: ', data);
          local = data.val();
          //console.log('New Latitude is: ',local.latitude);
          //console.log('New Longitude is: ', local.longitude);
          reg = {
            latitude: parseFloat(local.latitude),
            longitude: parseFloat(local.longitude),
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA,
          }
          //console.log('Reg is: ', reg)
          this.setState({
            region: reg,
            isLoading: false,
            forceRefresh: Math.floor(Math.random() * 100)
          });
          console.log('New Region Is: ', this.state.region)
        }).catch((err) => {
          console.log(err);
          this.setState({
            isLoading: false
          })
        })
      } //else
    } //function

    //get current local user
    getUser(){
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
          });
          console.log('Did not Load any Local User Data...!');
        }
      }).catch((err) => {
        console.error(err);
      })
    }

    //verify user pin ownership and executes set action --> needs some additional work
    callDelete = (pin_id) => {
      //given a pin key i need to verify pin uid, then
      let man = true
      if(man === false){
        //call delete
      }else{
        alert('It looks like you are not the owner of this pin! Cannot proceed with this action!')
      }
    }

    callMove = (pin_id, coord) => {
      //given a pin key i need to verify pin uid, then
      let man = true
      if(man === false){
        //call move
      }else{
        alert('It looks like you are not the owner of this pin! Cannot proceed with this action!')
      }
    }

    callUpdate = (title, description, pin_id) => {
      //given a pin key i need to verify pin uid, then
      console.log('Pin UID is:', pin_id)
      let man = true
      if(man === false){
        //call update
      }else{
        alert('It looks like you are not the owner of this pin! Cannot proceed with this action!')
      }
    }

    submitpin = (longitude,latitude,title, description) => {

      const uid = firebase.auth().currentUser.uid;
      //the push keyword will generate a unique id to distinguish each pin in database
      const pinkey = firebase.database().ref('PIN_INFO/').push().key;

      let pin_data = {
        pinkey:pinkey,
        uid:uid,
        longitude: longitude,
        latitude:latitude,
        title:title,
        description:description,
      };

      //update pin_data to 'PIN_INFO' node
      let store_path = {};
      store_path['PIN_INFO/'+pinkey] = pin_data;

      firebase.database().ref().update(store_path)
                          .then(()=>{alert('Successfully submitted the pin. Refresh to show new pin');})
                          .catch(error => {alert('check error in console log!'); console.log('error in submitpin: ',error);})
    }

    fetch_all_pin = () => {

      const pin_ref = firebase.database().ref('PIN_INFO');
      let pin_key_array = [];
      let pin_content_array= [];
      let marker_array = [];
      let marker_val;
      let marker_cordinates;

      pin_ref.once('value', (pins) => {
        pins.forEach(pin => {
          pin_key_array.push(pin.key);
          pin_content_array.push(pin.val());
          marker_coordinates = {latitude: pin.val().latitude, longitude: pin.val().longitude, latitudeDelta: LATITUDE_DELTA, longitudeDelta: LONGITUDE_DELTA};
          marker_val = {
            coordinate: marker_coordinates,
            key: pin.key,
            title: pin.val().title,
            description: pin.val().description
          };
          marker_array.push(marker_val);
        })

        this.setState({
          markers: marker_array
        })

        //alert('Successfully fetched pins!');
        console.log('the pin_key_array is: ', pin_key_array);
        console.log('the pin_content_array is: ', pin_content_array);
      })

      .catch(error => {console.log('error in fetch_all_pin: ', error);})
    };

    delete_by_key = (pin_key) => {
      firebase.database().ref('PIN_INFO/'+pin_key).remove(() =>{alert('Deleted the selected pin. Refresh to show changes');})
      .catch(error => {alert('Error in deleating pin! Please try again!'); console.log('error in delete_by_key: ',error);})
    };

    update_pin_location = (coordinate, key) => {
      const uid = firebase.auth().currentUser.uid;
      firebase.database().ref('PIN_INFO/'+key).update(
        {
          longitude: coordinate.longitude,
          latitude: coordinate.latitude,
        })
        .catch(error => {console.log('error in update_pin: ', error);})
    };

    update_pin = (title, description,pin_key) => {

      const uid = firebase.auth().currentUser.uid;

      firebase.database().ref('PIN_INFO/'+pin_key).update(
        {
          title:title,
          description:description,
        })
        .then(() => {alert('Edit successful. Refresh to show changes')})
        .catch(error => {console.log('error in update_pin: ', error);})
    };

    get_pin_key = (key) => {
      id = key;
    }

    handleTitle(c) {
      this.setState({
        title: c
      });
    }

    handleDescription(d) {
      this.setState({
        description: d
      });
    }

    render() {
        return (

              <View style={styles.container}>
                <MapView
                  key={this.state.forceRefresh}
                  provider={PROVIDER_GOOGLE}
                  style={styles.map}
                  initialRegion={this.state.region}
                  showsUserLocation={true}
                  zoomEnabled={true}
                >
                  {this.state.markers.map(marker => (
                    <Marker
                      key={marker.key}
                      coordinate={marker.coordinate}
                      title={marker.title}
                      description={marker.description}
                      draggable
                      onDragEnd={(e) => {this.update_pin_location(e.nativeEvent.coordinate, marker.key)}}
                      onPress={() => {this.get_pin_key(marker.key)}}
                    />
                  ))}
                </MapView>
                <View style={styles.textInputContainer}>
                  <TextInput
                    style={styles.textInput}
                    onChangeText={this.handleTitle}
                    value={this.state.title}
                    />
                </View>
                <View style={styles.textInputContainer}>
                  <TextInput
                    style={styles.textInput}
                    onChangeText={this.handleDescription}
                    value={this.state.description}
                  />
                </View>
                <View style={styles.bContainer}>
                  <View style={styles.buttonLeftContainer}>
                    <TouchableOpacity
                      onPress={() => this.fetch_all_pin()}
                      style={styles.bubble}
                    >
                      <Text>Refresh Pins</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => this.submitpin(this.state.region.longitude, this.state.region.latitude, this.state.title, this.state.description)}
                      style={styles.bubble}
                    >
                      <Text>Create Pin</Text>
                    </TouchableOpacity>
                  </View>
                  <View style={styles.buttonRightContainer}>
                    <TouchableOpacity
                      onPress={() => this.update_pin(this.state.title, this.state.description, id)}
                      style={styles.bubble}
                    >
                      <Text>Edit Pin</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => this.delete_by_key(id)}
                      style={styles.bubble}
                    >
                      <Text>Delete Pin</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    bContainer: {
      marginTop: 5,
      marginHorizontal: 10,
      marginVertical: 10,
      flexDirection: 'row',
      alignItems: 'stretch',
      justifyContent: 'center',
    },
    bubble: {
        backgroundColor: 'rgba(255,255,255,0.7)',
        paddingHorizontal: 18,
        paddingVertical: 12,
        borderRadius: 20,
        marginVertical: 5,
        marginHorizontal: 5,
        alignItems: 'center',
    },
    button: {
        width: 80,
        paddingHorizontal: 12,
        alignItems: 'center',
        marginHorizontal: 10,
    },
    buttonLeftContainer:{
      flex: 1,
      flexDirection: 'column',
      alignContent: 'center',
      backgroundColor: 'transparent',
    },
    buttonRightContainer:{
      flex: 1,
      flexDirection: 'column',
      alignContent: 'center',
      backgroundColor: 'transparent',
    },
    selectionGroupContainer: {
        flexDirection: 'column',
        backgroundColor: 'white',
        alignContent: 'flex-end',
    },
    textInputContainer: {
        flexDirection: 'row',
        marginVertical: 0,
        backgroundColor: 'white',
    },
    sectionTitle: {
      fontSize: 24,
      fontWeight: '600',
      color: 'rgb(0,0,0)',
      textAlign: 'center',
    },
    sectionDescription: {
      fontSize: 20,
      fontWeight: '200',
      color: 'rgb(0,0,0)',
      textAlign: 'center',
    },
    textInput: {
      fontSize: 15,
      fontWeight: '200',
      color: 'rgb(0,0,0)',
      textAlign: 'center',
    },
    map: {
    ...StyleSheet.absoluteFillObject,
    },
});
