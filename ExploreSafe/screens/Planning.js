import React, {Component, setState} from 'react';
import {SafeAreaView, StyleSheet, View, Text, StatusBar, Button, TouchableOpacity, FlatList, TextInput} from 'react-native';
import { Avatar, Accessory } from 'react-native-elements';
import Modal from 'react-native-modal';
import {BasicAntButton} from '../components/PlanningButtons';
import {BasicItemButton} from '../components/PlanningButtons';
import {BasicUtilButton} from '../components/PlanningButtons';
import {BasicHomeButton} from '../components/HomeButtons';

//SQLite
import LocalDatabase from '../LocalDatabase';

const db_loc = new LocalDatabase();

//RemoteDatabase.js
import RemoteDatabase from '../RemoteDatabase';

const db_rem = new RemoteDatabase();


export default class Planning extends Component {
    constructor(props) {
      super(props);
      this.state={
        seachQuery: 'Global',
        localData: [],
        isModalVisible: false,
        isLoading: true,
        isLoadingTwo: true,
        dataSource: null,
      };
      this.getTrips = this.getTrips.bind(this);
    }

      //sqlite database
      componentDidMount() {
        this.getTrips();
      }

      //getAllRem
      getAllRem = (location) => {
        console.log('location is: ...', location)
        if(location === 'Global' || location === null){
          console.log('Searching for Global Trips...')
          let found = [];
          //search and fetch all trips on the remote
          db_rem.fetch_trip_info_all().then((data) => {
            found = data.val();
            console.log('All Trip snapshot results is: ', found);
            /*WHY IS THE STATE NOT UPDATING? -> component not updating?, gets rewritten, but no updated*/
            this.setState({
              dataSource: Object.values(found),
              isLoadingTwo: false
            });
            //then, execute necessary updates
            console.log('All Trip dataSource is: ', this.state.dataSource);
          })
        }else{
          let foundB = [];
          console.log('Searching for Localized Trip...')
          //search and fetch trip on the remote
          db_rem.fetch_trip_info(location).then((data) => {
            console.log('Trip snapshot results is: ', data.val());
            try{
              foundB.push(data.val())
              this.setState({
                //dataSource: Object.values(foundB),
                dataSource: foundB,
                isLoadingTwo: false
              })
            } catch(ex) {
              console.error(ex);
            }
            console.log('Trip dataSource is: ', this.state.dataSource);
          }).catch((err) => {
            console.log(err);
          })
          //then, execute necessary updates
        }
      }



      //fetch item list
      getTrips() {
        let local = [];
        db_loc.listLocalTrips().then((data) => {
          local = data;
          this.setState({
            localData: local,
            isLoading: false,
          });
        }).catch((err) => {
          console.log(err);
          this.setState({
            isLoading: false
          });
        })
        console.log("Loaded Local Data!")
      }

      //delete item from list
      removeFromLocal = (id) => {
        console.log("Called Remove with id: ", id);
        this.setState({
          isLoading: true
        });
        db_loc.deleteTrip(id).then((result) => {
          console.log(result);
          this.setState={
            isLoading:false
          }
        }).catch((err) => {
          console.log(err);
          this.setState={
            isLoading: false
          }
        })
      };

      //add item to local list/database
      addToLocal = (item) => {
        console.log("Called Add with item: ", item);
        let data = {
          location: item.location,
          latitude: item.latitude,
          longitude: item.longitude,
          id: item.id,
          expected: item.expected,
          recommended: item.recommended,
        }
        db_loc.addTrip(data).then((result) => {
          console.log(result);
        }).catch((err) => {
          console.log(err);
        })
      };

      //set a trip as the main data point for application -> create a SQLite table that holds only this information
      setMainContext = (item) => {
          console.log("Called SET Global with item: ", item);
          let newData = {
            location: item.location,
            id: item.id,
          }
            //delete current global trip
            db_loc.deleteGlobalTrip().then((result) => {
              console.log(result);
            }).catch((err) => {
              console.log(err);
            })
          //add new trip
          db_loc.addGlobalTrip(newData).then((result) => {
            console.log(result);
          }).catch((err) => {
            console.log(err);
          })
      }

      //end of

    openModal = () => {
      this.setState({isModalVisible: true})
    };

    closeModal = () => {
      this.setState({isModalVisible: false})
    };

    handleQuery = (text) => {
      this.setState({seachQuery: text})
    };

    //called when the button is pressed
    search = (seachQuery) => {
      console.log('Searching For:', seachQuery);
      //is it a specific trip or all --> if seachQuery == global || != global
      this.getAllRem(seachQuery);
    };

    FlatListItemSeparator = () => {
      return (
        <View
          style={{
            height: 0.25,
            width: '100%',
            backgroundColor: 'white', //to be white in the future
          }}
        />
      );
    };

    //item definition
    //can probably do an if statement for add an delete
    renderItem = ({ item }) => (
        <View style={styles.listItem}>
        <View style={styles.listItemAvatarContainer}>

          <View style={styles.listItemContentContainer}>
          <View style={styles.listTitleButtonContainer}>
            <Text style={styles.itemTitle}>{'  '}{item.location}</Text>
            <View style ={styles.listItemAddDelContainer}>
              {this.state.isModalVisible ? (
                <BasicAntButton
                  title="Add"
                  onPress={() => {this.addToLocal(item); this.closeModal()}}
                  itemStyle = "pluscircle"
                />
              ): (
                <>
                <BasicAntButton
                  title="Favorite"
                  onPress={() => this.setMainContext(item)}
                  itemStyle = "heart"
                />
                <BasicAntButton
                  title="Delete"
                  onPress={() => this.removeFromLocal(item.id)}
                  itemStyle = "delete"
                />
                </>
              )}
            </View>
          </View>
          <View style={styles.listItemButtonsContainer}>
          <BasicItemButton
            title = "Map"
            onPress = {() => {this.props.navigation.navigate('MapPage', {itemId: item.id, loc: item.location, isG: false}); this.closeModal()}}
            itemStyle="pushpin"
          />
          {this.state.isModalVisible ? (
            <BasicItemButton
              title = "Details"
              onPress = {() => {this.props.navigation.navigate('Details', {itemId: item.id, loc: item.location, isR: true}); this.closeModal()}}
              itemStyle="info"
            />
          ): (
            <BasicItemButton
              title = "Details"
              onPress = {() => {this.props.navigation.navigate('Details', {itemId: item.id, loc: item.location, isR: false}); this.closeModal()}}
              itemStyle="info"
            />
          )}
          <BasicItemButton
            title = "Reviews"
            onPress = {() => {this.props.navigation.navigate('Reviews', {itemId: item.id, loc: item.location, isU: false, isLoc: true}); this.closeModal()}}
            itemStyle="idcard"
          />
          </View>
          </View>
        </View>
        </View>
    );


    render() {
        return (
            <SafeAreaView style={styles.pageContainer}>
              <View style={styles.planTripContainer}>
              <Text style={styles.sectionSubtitle}>{'Plan a Trip'}</Text>
              <Text style={styles.subText}>{'Search Global For a List of All Availiable Trips'}</Text>
                <TextInput style ={styles.textInput}
                  underlineColorAndroid = "transparent"
                  placeholder = " Search For A Trip"
                  placeholderTextColor = "#63b395"
                  autoCapitalize = "none"
                  onChangeText = {this.handleQuery}
                />
                <TouchableOpacity
                  style = {styles.submitButton}
                  onPress = {
                    () => {this.search(this.state.seachQuery); this.openModal();}
                  }>
                  <Text style={styles.submitButtonText}>Search</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.plannedTripContainer}>
                <Text style={styles.sectionSubtitle}>{`Planned Trips`}</Text>
                <FlatList
                  data={this.state.localData}
                  ItemSeparatorComponent={this.FlatListItemSeparator}
                  renderItem={(item) => this.renderItem(item)}
                  keyExtractor={item => item.id}
                  refreshing={this.state.isLoading}
                  onRefresh={this.getTrips}
                  />
              </View>
              <BasicHomeButton
                title = "Home Page"
                onPress = {() => this.props.navigation.navigate('HomePage')}
              />
              <Modal isVisible={this.state.isModalVisible} style ={styles.modalTag} onBackdropPress={()=>this.closeModal()} propagateSwipe={true}>
                <View style = {styles.modal}>
                  <Text style ={styles.sectionSubtitle}>Search Results for {this.state.seachQuery}</Text>
                  <FlatList
                    data={this.state.dataSource}
                    ItemSeparatorComponent={this.FlatListItemSeparator}
                    renderItem={(item) => this.renderItem(item)}
                    keyExtractor={item => item.id}
                    refreshing={this.state.isLoadingTwo}
                    //onRefresh={this.getAllRem(this.state.searchQuery)}
                    />
                    <BasicUtilButton
                      title="Close Window"
                      onPress = {() => this.closeModal()}
                    />
                </View>
              </Modal>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    titleContainer: {
      minWidth: '0%', //70
      maxWidth: '100%', //90
      justifyContent: 'center',
      elevation: 20,
      borderRadius: 10,
      flex: 1,
      flexDirection: 'column',
      backgroundColor: 'white',
    },
    pageContainer: {
      minWidth: '100%', //70
      maxWidth: '100%', //90
      alignItems: 'stretch',
      justifyContent: 'center',
      elevation: 20,
      borderRadius: 10,
      flex: 1,
      flexDirection: 'column',
      backgroundColor: 'white',
    },
    sectionTitle: {
      fontSize: 24,
      fontWeight: '600',
      color: 'rgb(0,0,0)',
      marginTop: 20,
      textAlign: 'center',
    },
    sectionSubtitle: {
      fontSize: 20,
      fontWeight: '600',
      color: 'rgb(0,0,0)',
      marginTop: 10,
      textAlign: 'center',
    },
    planTripContainer:{
      flex: 1,
      flexDirection: 'column',
      alignContent: 'center',
      maxHeight: '23%',
    },
    plannedTripContainer:{
      flex: 1,
      flexDirection: 'column',
      alignContent: 'center',
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
      padding: 7
    },
    listTitleButtonContainer:{
      justifyContent: 'flex-start',
      borderRadius: 10,
      flex: 1,
      flexDirection: 'row',
      backgroundColor: '#63b395',
      alignItems: 'center',
    },
});
