import React, {Component} from 'react';
import { SafeAreaView, StyleSheet, ScrollView,View, Alert, Text, Image,StatusBar, Button, ImageBackground, Dimensions, TouchableOpacity } from 'react-native';
import { RNCamera } from 'react-native-camera'

//neha

export default class SmartCamera extends Component {
    constructor() {
        super()

        this.state = {
            path: null,
        }
    }


    renderImage() {
        if (this.state.path != null) {
            return (<View>
                <Image style={styles.pic}
                    source={{ uri: this.state.path }}
                />
                <View style={styles.snapWrapper}>
                <TouchableOpacity onPress={() => this.setState({ path: null })} style={styles.capture}>
                    <Text style={styles.snapText}> CLOSE </Text>
                </TouchableOpacity>
                </View>
            </View>

            );
        }
        return null;
    }
    render() {
        return (
          //update background layout/contructor color - done
            <SafeAreaView style={styles.safeWrapper}>
            <View style={styles.container}>
                <RNCamera
                        style={styles.camera}
                        captureAudio={false}
                    ref={ref => {
                        this.camera = ref
                    }}
                    />
                    <View style = {styles.buttonWrapper}>
                <Button
                    title="Information"
                    onPress={() => this.props.navigation.navigate('InformationPage')}
                        />
                    </View>
                    <View style={styles.snapWrapper}>
                    <TouchableOpacity onPress={this.takePicture.bind(this)} style={styles.capture}>
                            <Text style={styles.snapText}> SNAP </Text>
                    </TouchableOpacity>
                </View>
                </View>
                {this.renderImage()}
            </SafeAreaView>

        );
    }

    takePicture = async () => {
        if (this.camera) {
            const options = { quality: 0.5, base64: true };
            const data = await this.camera.takePictureAsync(options);
            console.log(data.uri);
            this.setState({ path: data.uri })
        }
    };
}

const styles = StyleSheet.create({
    safeWrapper: {
        flex: 1,
    },
    pic: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
        marginBottom: 15,
        justifyContent: 'center',
        alignSelf: 'center'
    },
    cancel: {
        position: 'absolute',
        right: 150,
        top: 600,
        backgroundColor: 'transparent',
        color: 'black',
        fontWeight: '600',
        fontSize: 30,
    },
    buttonWrapper: {
        flex: 0,
        position: 'absolute',
        top: 0,
        left: 50,
        right: 50,
        marginHorizontal: 0,
    },
    camera: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'black',
        position: 'relative',
    },
    selectionGroupContainer: {
        flexDirection: 'column',
        backgroundColor: 'white',
        alignContent: 'flex-end',
    },
    sectionTitle: {
      fontSize: 24,
      fontWeight: '600',
      color: 'rgb(0,0,0)',
      marginTop: 20,
      textAlign: 'center',
    },
    capture: {
        flex: 0,
        backgroundColor: 'white',
        borderRadius: 5,
        padding: 15,
        paddingHorizontal: 20,
        alignSelf: 'center',
        margin: 1,
    },
    snapWrapper: {
        flex: 0,
        flexDirection: 'row',
        justifyContent: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0)',
        position: 'absolute',
        top: 600,
        left: 16,
        right: 16,
    },
    snapText: {
        fontSize: 18,
        color: '#006837',
        fontWeight: '600',
    },
});
