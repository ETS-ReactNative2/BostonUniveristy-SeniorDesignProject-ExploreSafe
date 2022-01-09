import React, {Component} from 'react';
import {SafeAreaView, StyleSheet, ScrollView, View, Text, StatusBar, Button, ImageBackground, TouchableOpacity} from 'react-native';
import { withSafeAreaInsets } from 'react-native-safe-area-context';

//carlos

export default class Health extends Component {
    constructor() {
      super()
    }

    render() {
        return (
          //update background layout/contructor color - done
              // <View style={styles.container}>
              //                  <View style={styles.containerone}>
              //       <View style={styles.boxone}></View>
              //       <View style={styles.boxtwo}>
              //           <Text style={styles.name}>Hi, Marissa!</Text>
              //           <Text style={styles.subtitle}>How are you today?</Text>
              //       </View>
              //       <View style={styles.boxthree}>
              //           <ImageBackground source={require('../assets/trees.jpg')} style={{width:360,height:'100%'}}/>
              //       </View>
              //       <View style={styles.boxfour}>
              //       </View>
              //   </View>
              //   <View style={styles.containertwo}>
              //       <View style={styles.line}></View>
              //       <View style={styles.progress}>
              //           <Text style={styles.textone}>My Progress</Text>
              //           </View>
              //           </View>
              // </View>
              <View style={styles.outercontainer}>

                        <View style={styles.topcontainer}>
                              <Text style={styles.introduction}>
                                    Welcome Marissa!
                              </Text>

                              {/* <ImageBackground source={require('../assets/himage.jpeg')} style={{width:'100%',height:'75%'}}/> */}
                        </View>


                        <View style={styles.dividertop}>

                        </View>

                        <View style={styles.bottomcontainer}>
                                <View style={styles.bcontainerone}>
                                  <Text style={styles.heartrate}>
                                      Heart Rate:
                                  </Text>
                                </View>

                                <View style={styles.dividerone}>

                                </View>

                                <View style={styles.bcontainertwo}>
                                  <Text style={styles.steps}>
                                      Steps:
                                  </Text>
                                </View>

                                <View style={styles.dividertwo}>

                                </View>

                                <View style={styles.bcontainerthree}>
                                  <Text style={styles.distancewr}>
                                      Distance Walked + Running:
                                  </Text>
                                </View>

                                {/* <View style={styles.bcontainerfour}>

                                </View>

                                <View style={styles.bcontainerfive}>

                                </View>  */}
                        </View>
              </View>
        );
    }
}

const styles = StyleSheet.create({

  outercontainer:
    {
        minWidth: '100%', //70
        maxWidth: '100%', //90
        minHeight: '100%', //90
        maxHeight: '100%', //90
        //alignItems: 'stretch',
        //justifyContent: 'center',
        //elevation: 20,
        //borderRadius: 10,
        //flex: 1,
        backgroundColor: 'white',
        paddingLeft: 15,
    },

    topcontainer:
    {
        flexDirection: 'column',
        backgroundColor: 'white',
        alignContent: 'flex-end',
        paddingLeft: 15,
        paddingTop: 15,
    },

    introduction:
    {
        fontSize: 35,
        fontWeight: 'bold',
    },

    imgBackg:
    {
        width: '100%',
        height: '50%',
        flex: 1
    },

    bcontainerone:
    {
        width: '95%',
        height: 150,
        backgroundColor: '#63b395',
        borderRadius: 20,
        paddingLeft: 15,
        paddingTop: 15,
    },

    heartrate:
    {
        fontSize: 25,
    },

    bcontainertwo:
    {
        width: '95%',
        height: 150,
        backgroundColor: '#63b395',
        borderRadius: 20,
        paddingLeft: 15,
        paddingTop: 15,
    },

    steps:
    {
        fontSize: 25,
    },

    bcontainerthree:
    {
        width: '95%',
        height: 150,
        backgroundColor: '#63b395', 
        borderRadius: 20,
        paddingLeft: 15,
        paddingTop: 15,
    },

    distancewr:
    {
        fontSize: 25,
    },

    dividerone:
    {
        width: '100%',
        height: 25,
    },

    dividertwo:
    {
        width: '100%',
        height: 25,
    },

    dividertop:
    {
        width: '100%',
        height: 15,
    }
});
