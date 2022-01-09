import React, {Component} from 'react';
import {SafeAreaView, StyleSheet, View, ScrollView, Text, StatusBar,Image, Button, TouchableOpacity} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import {BasicHomeButton} from '../components/HomeButtons';
//neha



export default class InformationPage extends Component {
    constructor() {
        super()
        this.state = {
            threat: 'threat',
            recomm: 'corresponding action be taken!'
        }
    }


    renderElement = () => {
        if (this.state.threat == 'Black Bear')
            return <Text style={styles.itemTitle}>Black Bear</Text>;
        else if (this.state.threat == 'Eastern Garter Snake')
            return <Text style={styles.itemTitle}>Eastern Garter Snake</Text>;
        else if (this.state.threat == 'threat')
            return <Text style={styles.itemTitle}>Nature can be dangerous! Find out how by selecting an item from the dropdown menu!</Text>;
        else if (this.state.threat == 'Moose')
            return <Text style={styles.itemTitle}>Moose</Text>;
        else if (this.state.threat == 'Poison Ivy')
            return <Text style={styles.itemTitle}>Poison Ivy</Text>;
        return null;
    }
    renderImage = () => {
        if (this.state.threat == 'Black Bear')
            return <Image style={styles.animal}
                source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/0/08/01_Schwarzb%C3%A4r.jpg' }}
            />
        else if (this.state.threat == 'Eastern Garter Snake')
            return <Image style={styles.animal}
                source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/f/f7/Thamnophis_sirtalis_sirtalis_Wooster.jpg' }}
            />
        else if (this.state.threat == 'Moose')
            return <Image style={styles.animal}
                source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/8/8b/Moose_superior.jpg' }}
            />
        else if (this.state.threat == 'Poison Ivy')
            return <Image style={styles.animal}
                source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/0/08/Toxicodendron_radicans%2C_leaves.jpg' }}
            />
        return null;
    }
    render() {
        const gTrip = this.props.route.params;
        //console.log('gTrip info is ', gTrip)
        return (
            <SafeAreaView style={styles.container}>
              <ScrollView style={styles.scrollView}>
                <View style={styles.dropdownWrapper}>
                  <View style={styles.pickerBox}>
                  <Text style={styles.sectionTitle}>Define a Regional Threat</Text>
                  <Picker
                      selectedValue={this.state.threat}
                      prompt = "Select a threat"
                      style={styles.picker}
                      itemStyle = {styles.pickerItem}
                      onValueChange={(itemValue) => this.setState({ threat: itemValue, loading:true })
                      }>
                      <Picker.Item label="Threats Overview" value="threat" />
                      <Picker.Item label="Black Bear" value="Black Bear" />
                      <Picker.Item label="Eastern Garter Snake" value="Eastern Garter Snake" />
                      <Picker.Item label="Moose" value="Moose" />
                      <Picker.Item label="Poison Ivy" value="Poison Ivy" />
                    </Picker>
                    </View>
                    <View style={styles.infoBox}>
                    <View style={styles.itemTitle}>
                        {this.renderElement()}
                    </View>
                    {this.renderImage()}
                    </View>
                    <View style={styles.threatsInfoBox}>
                      <Text style={styles.sectionText}>When dealing with a {this.state.threat} it is recommended that {this.state.recomm}</Text>
                    </View>
                    <BasicHomeButton
                      title = "Region Map"
                      onPress = {() => this.props.navigation.navigate('MapPage', {itemId: gTrip.itemId, loc: gTrip.loc, isG: gTrip.isG})}
                    />
                    <BasicHomeButton
                      title = "Trip Planning"
                      onPress = {() => this.props.navigation.navigate('Planning')}
                    />
                    <BasicHomeButton
                      title = "Home Page"
                      onPress = {() => this.props.navigation.navigate('HomePage')}
                    />
                  </View>
                </ScrollView>
              </SafeAreaView>

        );
    }
}

const styles = StyleSheet.create({
    container: {
        minWidth: '0%', //70
        maxWidth: '100%', //90
        alignItems: 'stretch',
        alignContent: 'center',
        flex: 1,
        flexDirection: 'column'
    },
    animal: {
        width: 200,
        height: 200,
        marginBottom: 15,
        justifyContent: 'center',
        alignSelf: 'center'
    },
    buttonWrapper: {
        flex: 1,
        position: 'absolute',
        alignContent: 'center',
        marginHorizontal: 0,
    },
    dropdownWrapper: {
        flex: 1,
        position: 'absolute',
        alignContent: 'center',
        marginHorizontal: 10,
        alignSelf: 'center'
    },
    sectionTitle: {
      fontSize: 24,
      fontWeight: '600',
      color: 'rgb(0,0,0)',
      marginTop: 20,
      textAlign: 'center',
    },
    pickerItem:{
      height: 44,
    },
    picker:{
      width: "100%",
      height: 44
    },
    itemTitle: {
      fontSize: 18,
      fontWeight: '500',
      color: 'rgb(0,0,0)',
      textAlign: 'center',
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
    pickerBox:{
      height: '35%',
      flex: 1,
      flexDirection: 'column',
      backgroundColor: '#63b395',
      padding: 10,
      marginVertical: 12,
      marginHorizontal: 16,
      borderRadius: 10,
    },
    infoBox:{
      height: '35%',
      flex: 1,
      flexDirection: 'column',
      backgroundColor: '#63b395',
      padding: 10,
      marginVertical: 12,
      marginHorizontal: 16,
      borderRadius: 10,
    },
    threatsInfoBox:{
      height: '35%',
      flex: 1,
      flexDirection: 'column',
      backgroundColor: '#63b395',
      padding: 10,
      marginVertical: 12,
      marginHorizontal: 16,
      borderRadius: 10,
    },
    scrollView: {
      backgroundColor: 'white',
      marginHorizontal: 5,
    },
});
