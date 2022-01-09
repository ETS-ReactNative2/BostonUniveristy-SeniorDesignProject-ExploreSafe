# **Software Report for the ExploreSafe Application**
<p align="center">
  <img src="https://github.com/BostonUniversitySeniorDesign/21-16-Explore-Safe/blob/master/ExploreSafe/Logos/mainLogo.png" width="250">
</p>

The ExploreSafe application is first and foremost a multi-platform, software component developed under the React-Native development environment. To this end, the basic platform setup can be found at:

* https://reactnative.dev/docs/environment-setup

Following the instructions under the React Native CLI Quickstart section given the corresponding operating system. In addition, as a part of the React-Native software stack, the project leverages *Node.js* as its main compilation platform.

# *Software Environment*
To meet the established requirements for project development, the ExploreSafe application leverages a collection of open source react native libraries managed through the [*npm*](https://www.npmjs.com/) package manager.
Among the installed software, we note the following components and their respective versions:

* [react-native-async-storage/async-storage](https://react-native-async-storage.github.io/async-storage/docs/install/) v. 1.14.1
* [react-native-community/google-signin](https://www.npmjs.com/package/@react-native-community/google-signin) v. 5.0.0
* [react-native-community/masked-view](https://www.npmjs.com/package/@react-native-community/masked-view) v. 0.1.10
* [react-native-community/picker](https://www.npmjs.com/package/@react-native-community/picker) v. 1.8.1
* [react-native-firebase/app](https://www.npmjs.com/package/@react-native-firebase/app) v. 11.2.0
* [react-native-firebase/auth](https://rnfirebase.io/auth/usage) v. 11.2.0
* [react-native-firebase/database](https://rnfirebase.io/database/usage) v. 11.2.0
* react-navigation/native v. 5.8.2
* react-navigation/stack v. 5.11.1
* path v. 0.12.7
* react v. 16.13.1
* react-native v. 0.63.3
* [react-native-camera](https://github.com/react-native-camera/react-native-camera) v. 3.40.0
* [react-native-dotenv](https://www.npmjs.com/package/react-native-dotenv) v. 2.5.3
* [react-native-dropdown-picker](https://www.npmjs.com/package/react-native-dropdown-picker) v. 3.8.3
* [react-native-elements](https://reactnativeelements.com/) v. 3.0.0-alpha.1
* [react-native-geocoding](https://www.npmjs.com/package/react-native-geocoding) v. 0.4.0
* [react-native-gesture-handler](https://docs.swmansion.com/react-native-gesture-handler/docs/) v. 1.8.0
* [react-native-maps](https://github.com/react-native-maps/react-native-maps) v. 0.27.1
* [react-native-modal](https://github.com/react-native-modal/react-native-modal) v. 11.7.0
* react-native-reanimated v. 1.13.1
* [react-native-restart](https://www.npmjs.com/package/react-native-restart) v. 0.0.22
* react-native-safe-area-context v. 3.1.8
* react-native-screens v. 2.12.0
* [react-native-sqlite-storage](https://github.com/andpor/react-native-sqlite-storage) v. 5.0.0
* [react-native-vector-icons](https://www.npmjs.com/package/react-native-vector-icons) v. 7.1.0
* [react-native-tflite](https://www.npmjs.com/package/tflite-react-native) v. 13.0.1
* [react-native-community/cameraroll](https://github.com/react-native-cameraroll/react-native-cameraroll) v. ?

# *Project Installation*
To properly install and run the ExploreSafe application you should follow the following steps:

* Download a development environment suitable for your operating system (i.e. XCode, Android Studio).
* Install the *npm* package manager. 
* Follow the instructions for installation of React-Native's development environment provided in the beggining of this document.
* Download the source files from Github (https://github.com/BostonUniversitySeniorDesign/21-16-Explore-Safe).
* Use the *npm* package manager to download the react native libraries mentioned above, keeping in mind the need to match the specified versions for compatibility.

    * Let it be noted that some of the mentioned libraries mentioned above have additional implementation and configuration steps depending on the target device operating system, and to that end, the developer should reference the linked documentation for each component.
    * We also note that on both the Details and Map pages, the installed components leverage separate API keys not included in this repository, and for implementation purposes the developer should acquire both a OpenWeatherAPI and GoogleAPI keys.

* If the target operating system is Mac OS, you need to run the following commands 'pod init' and 'pod install' in the iOS directory of the project before the application is initialized.
* Now the application is ready to get built and run on the development environment, with both target simulators or physical phone devices. 
    * Note that for the *SmartCamera.js* module functionality cannot be replicated via emulator, and can only be run on a physical device.


# *Project Structure*
While we will go into further detail of each development module of ExploreSafe under the *Software Modules* of this document, the following section establishes basic relationships between the individual software component modules.
In order to compartmentalize development, we have established a directory hierarchy that separates modules according to similar functionality, among which we should note:

* Contexts
    * Stores files that represent contexts used throughout the application to guarantee correct functionality and execution. In this particular case, it is solely responsible for storing [*LoginContext.js*](https://github.com/BostonUniversitySeniorDesign/21-16-Explore-Safe/blob/master/ExploreSafe/Contexts/LoginContext.js), a module that handles functionality for remote and local user authentication.
* Logos
    * Stores logos and visual identity components of the ExploreSafe brand and project group.
* Assets
    * Stores any related images needed for UI and execution implementation.
* Components
    * Stores several independent UI modules that can be used throughout the application as either buttons or text input components in order to guarantee a consistent visual identity and save coding space in the modules defining key functionality.
    * In this folder, we note the following files:
        * FormButton.js
        * FormInput.js
        * HomeButtons.js
        * PlanningButtons.js
        * ReviewButtons.js
        * SocialButton.js
* Screens
    * Stores all application screen modules, that is, the modules responsible for displaying and executing most of the application's functionality and UI. Let it be noted that as of 04/29/2021 not all modules are complete and some may be inaccessible over the application.
    * We list the following key modules:
        * Details.js
        * ForgotPassword.js
        * Health.js
        * HomePage.js
        * InformationPage.js
        * LoginScreen.js
        * MapPage.js
        * Planning.js
        * Profile.js
        * Reviews.js
        * Settings.js
        * SignUp.js
        * SmartCamera.js
        * SplashScreen.js

Additionally, we also have independent modules placed in the main directory of the application *"ExploreSafe"*, these being:

* App.js
* LocalDatabae.js
* RemoteDatabase.js

With these components in mind, following is a diagram detailing the workflow between each independent module, and any external contexts, components, assets or modules they may leverage.

<p align="center">
  <img src="ExploreSafe Workflow Chart.jpg" width="600">
</p>

# *Project Modules*
As represented above, this workflow can be represented by interactions between different modules and screen components, below, you can find a detailed description of each module component and its role in the application environment.

* *LoginContext.js*
```javascript
// leveraging the following modules and libraries
import React, {Component, useContext,useState, useEffect, useReducer, setState} from 'react';
//Auth Modules
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
//Restart
import RNRestart from 'react-native-restart';
```
Is responsible for keeping track of the applications current authentication state, and handling all authentication callbacks. It is referenced by *LoginScreen.js*, *SignUp.js*, *RecoverPassword.js* and *HomePage.js*.
It's main functionalities are defined upon the following functions:

```javascript
_passwordReset = async (email) => {
     console.log('Password Reset Called!');
     auth().sendPasswordResetWithEmail(email).then(() => {...
       
     ...});
   }

_emailCreateSignIn = async (email, password, name, emergency, city) => {
      console.log('Create Called');
      auth().createUserWithEmailAndPassword(email, password).then(() => {...
        
      ...})
    };

_emailSignIn = async (email, password) => {
      auth().signInWithEmailAndPassword(email, password).then(() => {...
        
    ...};
    }

_dbSignOutRestructure = async () => {...
      
      ...this.signOut();
    }


    signOut = async () => {
      auth().signOut().then(() => {
        console.log('User Signed Out!');
      })
    }
```
Each of which initially leverage components from Firebase's authentication module, and then executes the necessary database updates both locally and remotely. To this end, the create and signIn functions first fetch a user from the remote database, and then add said user information to the local database. The signOut function, on the other hand executes a reverse process, by first deleting the user from the local database, and then from the remote, severing user authentication on the device.

* FormButton.js
* FormInput.js
* SocialButton.js

Define, in tandem, the input forms and buttons utilized in the *LoginPage.js* file of the application by leveraging React-Native's [*TouchableOpacity*](https://reactnative.dev/docs/touchableopacity) and [*TextInput*](https://reactnative.dev/docs/textinput) components, in addition to Ant-Design icons defined in *Fonts* package added to the application. As these definitions follow the documentation layout with small adaptations to fit into ExploreSafe's visual identity, we will omit from going into further code definition detail.

* HomeButtons.js
* PlanningButtons.js
* ReviewButtons.js

Once again leveraging Firebase's components of
```javascript
import React from 'react';
import {StyleSheet, TouchableOpacity, Text, View} from 'react-native';
```
These modules are responsible for implementing the definitions of custom buttons utilized throughout the application. As the names of the modules imply, most of this use can be referenced in the Home, Planning and Review pages, but in some cases have been leveraged on external modules, in particular:
* The HomeButton defined in *HomeButton.js* is linked in all application pages as a way to navigate between different screen components.
* The BasicAntButton and BasicItemButton defined in *PlanningButtons.js* are also leveraged in Reviews, as some of its functionality follows a similar interface layout. In particular, this button leverages the library Vector Icons in the following format:
```javascript
import AntDesign from 'react-native-vector-icons/AntDesign';

//with JSX styling as:
iconStyle: {
      padding: 10,
      height: '100%',
      justifyContent: 'center',
      alignItems: 'center',
      width: 37,
    },
```
# 

With the definitions of these files, we must introduce three key application components that, as presented in the workflow diagram above, are leveraged throughout all pages of the application.

First, we have the file *RemoteDatabase.js*, located in the main directory of the application. That, excluding specific cases present in *Reviews.js* and *Map.js* holds all interaction functions between the client and the Firebase Database. At this instance, this implementation method was chosen in order to facilitate future reference of **user** and **trip** components throughout the application, simplifying callbacks and reducing the amount of duplicate code throughout the application.

In particular, most of this implementation was done leveraging Promise resolutions, in a manner where the Objects fetched to, and destined to the remote could safely be interpreted. In this context, there are two important subset of functions, the first of which is:

```javascript
//submits a user to the remote database
submitUser = (name, emergency, email,city,is_active) => {
   const UserProfileRef = firebase.database().ref('USERS/' + firebase.auth().currentUser.uid + '/PROFILE');
   UserProfileRef.set({
     ...
     }).then(
        ...
     }).catch(
     (error) => {console.log(error);
     })
 };

//updates user information in the remote database
 update_profile = (name, emergency, email,city,is_active) => {
   const UserProfileRef = firebase.database().ref('USERS/' + firebase.auth().currentUser.uid + '/PROFILE');
   UserProfileRef.update({
       ...
     }).then(
     ...
     }).catch(
     error => {console.log(error);
    })
 };

 //only read when it is called -> returns data in snapshot format
 fetch_profile = () =>{
   return new Promise((resolve) => {
     const userId = firebase.database().ref('USERS/' + firebase.auth().currentUser.uid + '/PROFILE')
     userId.once('value').then((snapshot) => {
       resolve(snapshot);
       }
     ).catch(
       error => {console.log(error);
      })
   })
 };

 //will delete the entire user profile of login user
 delete_profile = () => {
   const UserProfileRef = firebase.database().ref('USERS/' + firebase.auth().currentUser.uid + '/PROFILE')
   UserProfileRef.set(null).then(()=>{
     alert('Deleted User Profile!')
   }).catch(error => {
     console.log(error)
   })
 };
```
Responsible for handling all user profile interactions between both ends of the application.

Following this, we have the function subset that handles trip interactions between the client and database, that is, allows the user to search for, and render information pertaining to a desired location, as long as it is included in the database:
```javascript
  //fetch trip info based on the location
  //return trip info if stored in database, else null
  fetch_trip_info = (location) =>{
    return new Promise((resolve) => {
      const userId = firebase.database().ref('TRIPINFO/' + location.toUpperCase())
      userId.once('value').then((snapshot) => {
        resolve(snapshot);
        }
      ).catch(
        error => {console.log(error);}
      )
    })
  };

  //fetch all trips
  fetch_trip_info_all = () =>{
    return new Promise((resolve) => {
      const userId = firebase.database().ref('TRIPINFO/')
      userId.once('value').then((snapshot) => {
        resolve(snapshot);
        }
      ).catch(
        error => {console.log(error);}
      )
    })
  };

  //delete Trip From User based on location
  delete_user_trip_location = (location) =>{
    const ref = firebase.database().ref('USERS/' + firebase.auth().currentUser.uid + '/TRIPINFO/' +location.toUpperCase())
    ref.set(null)
    .then(()=>{
      alert('Removed Trip From User!')
    })
    .catch(error => {
      console.log(error)
    })
  };
```
We note that for the purposes of this explanation, some of the code has been omitted, in addition to the main administrator control functions that allow for Adding, Deleting, and Modifying trip information. In the future, we hope to implement a separate web client for administrator management of these procedures.

Following the definition of the Remote Database file, we have the file *LocalDatabase.js*, which in contrast to its counterpart handles all interactions of user stored data. In context, this file is separated between three different database instances, User Database, Trip Database and Global Trip Database, in such a way that, while they write and record information on the same file, simultaneous callbacks addressing different SQL types do not interfere with unrelated data. As this definition is quite extensive, the following excerpt details functionality for only one of these control function subsets, with the others being relatively similar.

```javascript
import SQLite from 'react-native-sqlite-storage';
import {openDatabase} from 'react-native-sqlite-storage';
SQLite.DEBUG(true);
SQLite.enablePromise(true);

export default class LocalDatabase{
  initUserDB() {
  let dbu;
  return new Promise((resolve) => {
    console.log("Plugin integrity check ...");
    SQLite.echoTest()
      .then(() => {
        SQLite.openDatabase(
          {
          ...
          },
          this.openCB,
          this.errorCB,
        )
          .then(DB => {
            dbu = DB;
            console.log("Database OPEN");
            dbu.executeSql('SELECT 1 FROM LoginContext LIMIT 1').then(() => {
                ...
            }).catch((error) =>{
                console.log("Received error: ", error);
                dbu.transaction((tx) => {
                    tx.executeSql('CREATE TABLE IF NOT EXISTS LoginContext (name, email, uid, emergency, city, is_active)');
                }).then(() => {
                    console.log("Table created successfully");
                }).catch(error => {
                    console.log(error);
                });
            });
            resolve(dbu);
          })
          .catch(error => {
            console.log("ERROR: " + error);
          });
      })
      .catch(error => {
      });
    });
};

closeDatabase(dbu) {
  if (dbu) {
    console.log("Closing DB");
    dbu.close()
      .then(status => {
        ...
      })
      .catch(error => {
        this.errorCB(error);
      });
  } else {
    ...
  }
};

userById(id) {
  console.log(id);
  return new Promise((resolve) => {
    this.initUserDB().then((dbu) => {
      dbu.transaction((tx) => {
        tx.executeSql('SELECT * FROM LoginContext WHERE uid = ?', [id]).then(([tx,results]) => {
          if(results.rows.length > 0) {
            let row = results.rows.item(0);
            resolve(row);
          }
        });
      }).then((result) => {
        this.closeDatabase(dbu);
      }).catch((err) => {
        console.log(err);
      });
    }).catch((err) => {
      console.log(err);
    });
  });
}

userByStatus(status) {
  console.log('Searching for User With Status...', status);
  return new Promise((resolve) => {
    this.initUserDB().then((dbu) => {
      dbu.transaction((tx) => {
        tx.executeSql('SELECT * FROM LoginContext WHERE is_active = ?', [status]).then(([tx,results]) => {
          if(results.rows.length > 0) {
            let row = results.rows.item(0);
            resolve(row);
          }else{
            resolve({});
          }
        });
      }).then((result) => {
        this.closeDatabase(dbu);
      }).catch((err) => {
        console.log(err);
      });
    }).catch((err) => {
      console.log(err);
    });
  });
}

addUser(user) {
  return new Promise((resolve) => {
    this.initUserDB().then((dbu) => {
      dbu.transaction((tx) => {
        tx.executeSql('INSERT INTO LoginContext VALUES (?, ?, ?, ?, ?, ?)', [user.name, user.email, user.uid, user.emergency, user.city, user.is_active]).then(([tx, results]) => {
          resolve(results);
        });
      }).then((result) => {
        this.closeDatabase(dbu);
      }).catch((err) => {
        console.log(err);
      });
    }).catch((err) => {
      console.log(err);
    });
  });
}

updateUser(id, user) {
  return new Promise((resolve) => {
    this.initUserDB().then((dbu) => {
      dbu.transaction((tx) => {
        tx.executeSql('UPDATE LoginContext SET name = ?, email = ?, city = ?, emergency = ?, is_active = ? WHERE uid = ?', [user.name, user.email, user.city, user.emergency, user.is_active, id]).then(([tx, results]) => {
          resolve(results);
        });
      }).then((result) => {
        this.closeDatabase(dbu);
      }).catch((err) => {
        console.log(err);
      });
    }).catch((err) => {
      console.log(err);
    });
  });
}

deleteUser(id) {
  return new Promise((resolve) => {
    this.initUserDB().then((dbu) => {
      dbu.transaction((tx) => {
        tx.executeSql('DELETE FROM LoginContext WHERE uid = ?', [id]).then(([tx, results]) => {
          console.log(results);
          resolve(results);
        });
      }).then((result) => {
        this.closeDatabase(dbu);
      }).catch((err) => {
        console.log(err);
      });
    }).catch((err) => {
      console.log(err);
    });
  });
}
```

Once again, we note that the resolution of these functions are set as Promise based, and thus avoid any inconsistencies in the passing of objects between different application pages. Additionally, all elements detailed in this file leverage and follow the standard [SQL syntax](https://dev.mysql.com/doc/).


Lastly, we have the file *App.js*, which following the standard React-Native structure, is the parent navigation controller for all screens and modules of the application. 

To implement this functionality, the files must import  key react modules in addition to each individual screen to be displayed, defined in the following fashion:

```javascript
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

//import screens
import LoginScreen from './screens/LoginScreen';
import HomePage from './screens/HomePage';
import SmartCamera from './screens/SmartCamera';
import Profile from './screens/Profile';
import Planning from './screens/Planning';
import MapPage from './screens/MapPage';
import InformationPage from './screens/InformationPage';
import Health from './screens/Health';
import Reviews from './screens/Reviews';
import Details from './screens/Details';
import SplashScreen from './screens/SplashScreen';
import SignUp from './screens/SignUp';
import ForgotPassword from './screens/ForgotPassword';
```

Allowing so the [**navigation container**](https://reactnavigation.org/) can view and interact with the components.

In addition to this, as part of the Authentication Hierarchy of the Application, App.js has access to the file *LocalDatabase.js* as an instance, 
```javascript
//SQLite LocalDatabase.js
import LocalDatabase from './LocalDatabase';
const db_loc = new LocalDatabase();
```
allowing it to subscribe to, and use its functions. This is done in order to allow for detection of users with active session keys stored to the local environment, allowing the application to determine if it should set its navigation structure only as the Authentication components, *LoginPage.js, SignUp.js* and *RecoverPassword.js* or all other modules establishing the bulk of functionality.

This is done, by establish three key [**state**](https://reactjs.org/docs/state-and-lifecycle.html) components in the class context, 
```javascript
this.state ={
      isLoading: true,
      localUser: {},
      is_active: false,
    }
```
each of which records, correspondingly:
* isLoading: Application is still loading information to determine course of action.
* localUser: What user did it find in the local application context.
* is_active: Is the found user active, and thus should bypass the Authentication hierarchy.

Finally, leveraging a navigation stack that adapts to the subscribed states:

```javascript
render() {

  if(this.state.isLoading){
    return <SplashScreen/>;
  }
  return(
    <NavigationContainer>
    <Stack.Navigator>
    {this.state.is_active == false ?(
      //no user found
      <>
        <Stack.Screen name = "LoginScreen" component={LoginScreen} options={{headerShown:false,}}/>
        <Stack.Screen name = "SignUp" component={SignUp} options={{headerShown:false,}}/>
        <Stack.Screen name = "ForgotPassword" component={ForgotPassword} options={{headerShown:false,}}/>
      </>
    ) : (
      //user found
      <>
        <Stack.Screen name = "HomePage" component ={HomePage} options={{headerShown:true, title: 'Welcome ' + this.state.localUser.name + '!'}}/>
        <Stack.Screen name = "SmartCamera" component ={SmartCamera} options={{headerShown:true, title: ' ',}}/>
        <Stack.Screen name = "Profile" component ={Profile} options={{headerShown:true, title: 'User Profile',}}/>
        <Stack.Screen name = "Planning" component ={Planning} options={{headerShown:true, title: 'Trip Planning',}}/>
        <Stack.Screen name = "MapPage" component ={MapPage} options={{headerShown:true, title: 'Current Trip: ',}}/>
        <Stack.Screen name = "InformationPage" component ={InformationPage} options={{headerShown:true, title: ' ',}}/>
        <Stack.Screen name = "Health" component ={Health} options={{headerShown:true, title: ' ',}}/>
        <Stack.Screen name = "Reviews" component ={Reviews} options={{headerShown:true, title: 'Reviews',}}/>
        <Stack.Screen name = "Details" component ={Details} options={{headerShown:true, title: ' ',}}/>
        <Stack.Screen name="AddTripDB" component={AddTripDB} options={{headerShown:true}}/>
      </>
    )}
    </Stack.Navigator>
    </NavigationContainer>
  );
  }
}
```
#
With the definition of the key components and modules that allow for the functioning execution of the ExploreSafe application out of the way, we have to cover our main screen components and their respective roles. 
   
Before we begin, we would like to highlight that in order to orchestrate an interactive and easy to use UI, most of the mentioned pages will have similar layouts and color schemes, in particular following our logo scheme!

Without further delaying, in the order mentioned above, here are the key ExploreSafe application components:

* *Details.js*
	
    The *Details.js* page leverages the OpenWeather API to get up-to-date weather information of the desired location. In consideration to this and its layout formation, following are the established imported modules:
    ```javascript
    import React, {Component} from 'react';
    import {SafeAreaView, StyleSheet, ScrollView, View, Text, Image,StatusBar, Button, ImageBackground, TouchableOpacity} from 'react-native';
    import { API_WEATH_KEY } from "@env"
    import {BasicHomeButton} from '../components/HomeButtons';
    //SQLite
    import LocalDatabase from '../LocalDatabase';
    const db_loc = new LocalDatabase();
    //RemoteDatabase.js
    import RemoteDatabase from '../RemoteDatabase';
    const db_rem = new RemoteDatabase();
    ```

    It utilizes a One Call API referencing latitude and longitude coordinates for maximum accuracy  of the information (in contrast to, for example, using information from the closest city). 
    
    To integrate this functionality with the rest of the application, accessing this page requires two navigation parameters, one detailing the location name, and the other detailing if it is a locally stored trip. From this, it gets the desired latitude and longitude information by accessing the following function (executed on page load).
    ```javascript
     readSetFromLocal = () => {
      const itemId = this.props.route.params

      if(itemId.isR === true){
        //if not a local trip, load from the remote
          let local = []
          db_rem.fetch_trip_info(itemId.loc).then((data) => {
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
        let local = [];
        db_loc.tripById(itemId.itemId).then((data) => {
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
    ```

    The OpenWeather API key, which is fetched from a .env file in the main project file, is then used within the API call with the latitude and longitude, specifying the units as metric as our default. 
    
    This call is done within an async function component called only after location information is fetched, where the JSON results of the API call are produced and then used to set state variables to be displayed to the interface. 
    
    API Call:
    ```javascript
    fetchWeather = async () => {
      const openweather_api = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + this.state.trip.latitude + '&lon=' + this.state.trip.longitude + '&exclude=minutely&units=metric&appid=' + API_WEATH_KEY;
      try {
          let response = await fetch(openweather_api);
          let responseJson = await response.json();
          this.setState({
              temperature: responseJson.daily[0].temp.day,
              desc: responseJson.daily[0].weather[0].description,
              icon: responseJson.daily[0].weather[0].icon,
          });
      } catch (err) {
          console.log(err);
      }
    }
    ```

* *ForgotPassword.js*

    As mentioned in the implementation for *LoginContext.js*, the forgot password module works by leveraging a call to the RecoverPassword method, and as such, the only job of this page is to record user mail input and pass it along as information upon function callback. 
    As an external module, passwordReset can be referenced as:
    ```javascript
    //LoginContext
    import LoginContext from '../Contexts/LoginContext';
    const log_con = new LoginContext();

    callResetPassword = () => {
     log_con._passwordReset(email);
    }
    ```
    
* *Health.js*

    As of this instance, *Health.js* is not yet implemented.
    
* *HomePage.js*

    As the central interface for ExploreSafe, the *HomePage.js* component leverages a design approach prioritizing simplicity and ease of access, and thus, leveraging the buttons previously defined in *HomeButtons.js*, it implements a simple, 'two-column' container layout that directly links users to desired application pages.
    
    In addition, it is also responsible for referencing *LoginContext.js* for user sign-out functionality, addressed in the **Logout** button at the bottom of the layout.

* *InformationPage.js*

	Initially meant to be dynamically updated, the *InformationPage.js* is a file responsible for displaying threat information and potential course of action in the case a user is faced with the unexpected. With further work needed on it, as of this instance, it works by leveraging the package '@react-native-picker/picker', imported as
	
    ```javascript
      import { Picker } from '@react-native-picker/picker';
    ```

	it is used to display a drop-down list of options of wildlife, with different information and images displayed depending on the chosen option. Originally, the information loaded for each option is meant to be loaded from either the remote or local database depending on network connectivity, but at this instance is statically defined. The images are stored locally to the project, in the screens folder, after being resized to take up less space. 
	
* *LoginScreen.js*

    In similar fashion to the *ForgotPassword.js* screen, the Login for ExploreSafe works by leveraging the implementations defined in *LoginContext.js*, leveraging  a call to the _emailSignIn method, and as such, the only job of this page is to record user email and password input and pass it along as information upon function callback. To this end, it utilizes previously defined  components in *FormButton.js* and *FormInput.js*
    As an external module, _emailSignIn can be referenced as:
    ```javascript
    //LoginContext
    import LoginContext from '../Contexts/LoginContext';
    const log_con = new LoginContext();
    
    callEmailSignIn = () => {
        log_con._emailSignIn(email, password);
      }
    ```
    In the future, we also hope to implement Sign In functionality leveraging SSO authentication through OAUTH, in particular through google, utilizing the form defined in *SocialButton.js*.


* *MapPage.js*

    The *MapPage.js* page utilizes the packages 'react-native-maps', '@react-native-firebase/app', and '@react-native-firebase/database' along with the Google Maps API to deliver real time information to the users about their surroundings. Through the pin functionality, users can share any significant event throughout their outing by dropping a pin at the desired location describing the event. The user can utilize the pin functionality as follows:
    * The two text boxes allows the user to write a title and description to either create a new pin or edit an existing one. 
    * After describing the event, the user can create a new pin by clicking on the 'Create Pin' button. This will create a pin at the user's location, which the user change by dragging the pin to the desired location. 
    * To edit an existing pin's content, a user should write the edited title and description in their respective text boxes, tap on the desired pin, and then click on the 'Edit Pin' button. 
    * To delete a dropped pin, the user can tap on the desired pin then click on the 'Delete Pin' button. 
    * To desplay the latest changes to the pins on the map, the user can click o the 'Refresh Pins' button. 

    To achieve this functionality, *MapPage.js* utilizes several state variables:
    ```javascript
    this.state = {
        region: {
          latitude: LATITUDE,
          longitude: LONGITUDE,
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA,
        },
        markers: [],
	id: ''
        title: 'Title for pin',
        description: 'Short description for pin',
      };
    ```
    
    Next, it defines several functions to manage the state variables and achieve the required functionalities, of which:
    * submitpin = (longitude,latitude,title, description) => {...}
    
        * This function is responsible for writing a pin to the realtime database. It takes in the user's coordinates along with the title and description of the pin, generates a unique key for the pin, and appends this information to the 'PIN_INFO' branch in the realtime database.

    * fetch_all_pin = () => {
        ...
    }

        * This function is responsible for updating the markers state varaible to align with the pin information in the realtime database. It reads pin information from the database and stroes it in the desired format in a local array which then sets markers state variable.

    * delete_by_key = (pin_key) => {
        ...
    }

        * This function is responsible to delete the pin information of a desired pin from the realtime database. It takes the pin's unique key as an argument, queries the database for the pin information corresponding to the unique key, and identifies if the desired pin was created by the same user trying to delete it. If the check passes the pin information is removed from the database, otherwise an alert would pop up to user asking them not to edit other users pins. 

    * update_pin_location = (coordinate, key) => {
        ...
    }

        * This function is responsible for editing the pins location in the realtime database after a pin is dragged to a new location. It takes the new coordinates and unique key as arguments, queries the database for the pin information corresponding to the pin's key, and identifies if the edited pin was created by the same user that editted it. If the check passes, the coordinates of the pin is updated in the database. Otherwise an alert would pop up to user asking them not to edit other users pins. Regardless, the pin would stay in the new location on the user's screen until they refresh the pin information, then it apear in the same location saved on the database. 

    * update_pin = (title, description,pin_key) => {
        ...
    }

        * This function is responsible for updating the title and description of a pin in the realtime database. It takes the new title and description of the pin along with its key as arguments, queries the database for the pin information corresponding to the pin's key, and identifies if the selected pin was created by the same user trying to edit it. If the check passes, the title and description of the pin is updated in the databse. Otherwise an alert would pop up to user asking them not to edit other users pins.

    * get_pin_key = (key) => {
        ...
    }
    
        * This function is responsible for setting the id state variable to correspond to the latest selected pin's unique key. By utilizing the onPress property of markers, this function is invoked whenever a user taps on a pin. It takes the pin's key as an argument and directly sets the state variable to its value.

    * handleTitle = (title) => {
      ...
    }; &
     handleDescription = (description) => {
      ...
    };
    
        * These function are responsible for setting the title and description state variables. After any change to the text boxes the corresponding handle function is envoked to update the state variable with the latest changes.

    To display all this information we map the markers state variable as follows: 
    ```javascript
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
    ```
    
* *Planning.js*
    
    As an application reliant on users begin able to choose different trip destinations from an available list, the *Planning.js* screen acts a central control point for all application functionality. The user can interact with this page as follows:
    * The search bar allows for users to look through the remote database for all available trip information, or by searching for specific locations. 
    * This information is displayed on the second component, a pop-up 'modal' window that displays elements in a list format, from which the user can utilize the ‘plus’ button on the top-right to save them into local storage. 
    * A similar list is displayed on the main planning page that stores locally saved trips. In this instance, users can use the ‘heart’ button, on the top-right to set a trip as pertaining to the global application context, or the ‘trash can’ button to remove them from local storage.
    * In addition, the user can reference the *Details, Reviews and Map* for specific trip locations by referencing buttons in individual list components. As of this instance, the *MapPage.js* is not yet equipped to handle varying parameters.
    
    To enable this functionality, Planning imports the following parameters, from which we can note instances of both the *LocalDatabase.js* and *RemoteDatabase.js* to enable inter-operation.:
    ```javascript
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
    ```

    Following, it defines a broad range of functions, utilized to manage each of the key operation components, among them:
    * getAllRem = (location) => {
        ...
    }
    
        * Based on a set search parameter, this function queries the Remote Database for matching information. As it handle both specific and global parameter searches, it defines two methods at once, both leveraged as instances from *RemoteDatabase.js*, referencing the instance *db_rem* defined in the initial page imports.
    * getTrips(){...}
    
        * This function is mainly responsible for executing code that, upon loading of the Planning page, queries the Local Database for any stored trip information, and in the case of detection includes the information in a state called *localData*, which is then rendered by a *FlatList* component native to react. Each of the elements in this state can be interpreted as independent *item*, that can be referenced by different functions to execute operations as needed. The function called in this method is leveraged as an instance from *LocalDatabase.js*, referencing the instance *db_loc* defined in the initial page imports.
        
    * removeFromLocal = (id) => {
        ...
    }
    
        * As implied by its name, this function removes a trip object from the local database list. To do this, it leverages  an instance from *LocalDatabase.js*, referencing the imported instance and calling the method *deleteTrip(id)*.
    * addToLocal = (item) => {
        ...
    }
    
        * Opposite to its counterpart, this function adds a trip object from the local database list. To do this, it leverages  an instance from *LocalDatabase.js*, referencing the imported instance and calling the method *addToLocal(data)*.
        * We should also note that since item is a complete object, we need to map key-value pairs before executing the function calls, defining data as
        ```javascript
        let data = {
          location: item.location,
          latitude: item.latitude,
          longitude: item.longitude,
          id: item.id,
          expected: item.expected,
          recommended: item.recommended,
        }
        ```

    * setMainContext = (item) => {
        ...
    }
    
        * In the scope of the application, this function is responsible for, upon user request, removing the previously set *Global Trip* SQL table values and re-introducing new, updated parameters. By doing this, it allows for control of the trip reflected on the main functions of the application.
    * handleQuery = (text) => {
      ...
    }; &
     search = (seachQuery) => {
      ...
    };
    
        * This pair of functions is responsible solely for handling inputs provided in the search bar and calling the appropriate function to fetch for data in the remote.
    * Assorted *Modal* control functions.
    
    As they are standard throughout the application, we should also highlight the definition for a trip list item, allowing for complete user control and interaction:
    ```javascript
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
           onPress = {() => {this.props.navigation.navigate('MapPage'); this.closeModal()}}
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
           onPress = {() => {this.props.navigation.navigate('Reviews'); this.closeModal()}}
           itemStyle="idcard"
         />
         </View>
         </View>
       </View>
       </View>
   );
    ```



* *Profile.js*

  The *Profile.js* page of the ExploreSafe application provides users with a centralized interface to control their personal information, and view details on the currently selected global trip, as well as accessing the *Reviews.js* page in three different ways.
  
    * For the first, users can choose to visualize reviews only for the selected global trip.
    * For the second, users can choose to visualize all reviews they have submitted throughout their usage of the ExploreSafe application (keyed by UID).
    * For the third, they can choose to visualize all submitted reviews to the application, independently of location or user.
    
  In this context, we are still missing functionality for the user to modify their own personal profile information, and change their authentication password. We hope to have these features implemented before our presentation on ECE Day, Monday, May 3rd 2021.
  
  Upon success, these features will be available in a *Modal* component that can be toggled on screen.
  
  As a page, *Profile* leverages a similar visual look as the rest of the application, with separate content boxes given for individual display items. It should also be noted that the *Global Trip* component was designed to mimic those found in *Planning.js*.
  
  The following are key imports and references utilized by this design:
  ```javascript
    import React, {Component} from 'react';
    import {SafeAreaView, StyleSheet, ScrollView, View, Text, StatusBar, Button, ImageBackground, TouchableOpacity, TextInput, Dimensions} from 'react-native';
    import { Avatar, Accessory } from 'react-native-elements';
    import Modal from 'react-native-modal';
    import {BasicHomeButtonB} from '../components/HomeButtons';
    import {BasicHomeButton} from '../components/HomeButtons';
    import {BasicAntButton} from '../components/PlanningButtons';
    import {BasicItemButton} from '../components/PlanningButtons';
    import {BasicUtilButton} from '../components/PlanningButtons';
    
    //SQLite
    import LocalDatabase from '../LocalDatabase';
    
    const db_loc = new LocalDatabase();
    
    //RemoteDatabase.js
    import RemoteDatabase from '../RemoteDatabase';
    
    const db_rem = new RemoteDatabase();
    ```
 
  
  
* *Reviews.js*

    As briefly touched upon in the description for the *Profile.js* module of ExploreSafe, *Reviews.js* allows for users to visualize content in different ways pending the manner in which the page is accessed. Among which are:
    
    * For the first, they can choose to visualize all submitted reviews to the application, independently of location or user.
    * For the second, users can choose to visualize all reviews they have submitted throughout their usage of the ExploreSafe application (keyed by UID).
    * For the third, users can choose to visualize all ExploreSafe reviews by specified trip location. 
    * For the fourth, users can choose to visualize all of their personal reviews stored on the ExploreSafe server by location.
    
    This functionality is enabled by the following function, which depending on received navigation props can load different *fetch* components.
    
    ```javascript
    mountReviewsFromSource = () => {
        const revSource = this.props.route.params;
        //reviews are all explore safe stored reviews
        if(revSource.isU === false && revSource.isLoc === false){
          //OK
          this.fetch_all_review2();
          this.setState({
            reviewLocation: this.state.gTrip.location,
          });
        }
        //reviews are all user only stored reviews
        else if (revSource.isU === true && revSource.isLoc === false){
          //OK!
          //console.log('Searching All Reviews For User ID ', firebase.auth().currentUser.uid)
          this.read_own_review();
          this.setState({
            reviewLocation: this.state.gTrip.location,
          });
        }
        //reviews are all explore safe by Location
        else if (revSource.isU === false && revSource.isLoc === true){
          console.log('Searching All Reviews For ', revSource.loc)
          this.fetch_all_review_location(revSource.loc);
          this.setState({
            reviewLocation: revSource.loc,
          });
        }
        //reviews are all user by Location
        else if(revSource.isU === true && revSource.isLoc === true){
          this.read_own_review_location(revSource.loc);
          this.setState({
            reviewLocation: revSource.loc,
          });
        }
      }
    ```
    There are three main functionalities within this page, submit, update and delete review. 
   
   Submit Review: 
   ```javascript 
   <Button
   	title="Submit Review"
   	color="blue"
   	onPress = {() => this.submitReview2(this.state.user.name, this.state.reviewLocation, this.state.image)}
   />
   ``` 
   
    In this snippet, the submitReview2 function takes in three parameters, the username, location and review. The username is retreived from the local database/SQLite database. The location is retreived from the app itself based on the locations that the user has traveled to. Lastly, the review is retrieved from the textbox that the user uses to enter in the review. Once this information is put into the submitReview2 function, it will then create a tree under the users unique UID in the Firebase real time database and place all this information in there, along with assigning the post a unique post ID. 
    
    Delete Review: 
    ```javascript 
   <Button
   	title = "Delete"
   	onPress = {() => this.callDelete(item.post_id, item.uid)}
   />
   <Button
   	title = "Edit"
   	onPress = {() => {console.log('Called Edit'); this.openModal()}}
   />
   
   <Button
   	title = "Save"
   	onPress = {() => {this.callUpdate(item.username, item.location, this.state.review, item.post_id, item.uid);this.closeModal();}}
   />
 
  callDelete = (post_id,uid) => {
    if(uid == firebase.auth().currentUser.uid) {
      this.delete_review2(post_id)
      alert('Deleted!')
      console.log(post_id)
    }
    else
      alert("You can't delete this content, are you sure this review is yours?")
  }

  callUpdate = (username,location,review,post_id,uid) => {
    if(uid == firebase.auth().currentUser.uid) {
      this.update_own_review2(username,location,review,post_id);
      this.fetch_all_review2();
      alert('Sucessfully Edited Review!');
    }
    else
      alert("You can't update this content, are you sure this review is yours?")
  }
    ``` 
    
    For the delete and update reviews features, they both work in a similar manner. When the "Delete" button is pressed on a post, it calls the callDelete function which will use the UID passed to check if it matches the UID in the database. If it does the function will pass the post ID to the delete_review2 function so that it can be deleted in the Firebase real time database. As for the update reviews feature, it is similar, when the "Edit" button is pressed on a post, a modal will pop up allowing the user to write a new review in the textbox. Once the review is written, the user can click the "Save" button in the modal. The callUpdate function will be called then the UID will be checked just like the callDelete function. If the user is authorized, then the username, location, review and post ID are passed to the Firebase real time database so the reviews section can of the tree can be altered appropriately.  

* *Settings.js*

    As of this version, *Settings.js* is not yet defined.
    
* *SignUp.js*

    In similar fashion to the *LoginScreen.js* screen, the account creation for ExploreSafe works by leveraging the implementations defined in *LoginContext.js*, executing  a call to the _emailCreateSignIn method, and as such, the only job of this page is to record user email, password, name, emergency and city input and pass it along as information upon function callback. To this end, it utilizes previously defined  components in *FormButton.js* and *FormInput.js*
    As an external module, _emailCreateSignIn can be referenced as:
    ```javascript
    //LoginContext
    import LoginContext from '../Contexts/LoginContext';
    const log_con = new LoginContext();
    
    callEmailCreateSignIn = () => {
        log_con._emailCreateSignIn(email, password, name, emergency, city);
      }
    ```
    
* *SmartCamera.js*

    The Smart Camera pages uses the packages ‘tflite-react-native’, ‘react-native-camera’, and ‘@react-native-community/cameraroll’ within its implementation. 
    When designing the image recognition functionality, a model using the TensorFlow Lite framework with a MobileNetV2 backbone was chosen as this would ensure that a lightweight model which required no internet access was produced. The Jupyter Notebook used to train the model is in the project repo, and is called plant.ipynb. It uses Anaconda with a Python3 environment, and depends on arcGIS 1.8.2, Fastai 1.0.60, and Pytorch 1.4.0. To train the model, the script was run on a computer with Radeon RX590 GPU with 8GB of memory, and an AMD Ryzen 5 3600X 6-core processor 33.8GHz base speed CPU. The training was done using the PlantCLEF data set, which has 100 classes and ~40,000 images. It can be found [here](https://www.imageclef.org/lifeclef/2017/plant), and we used the "trusted" training dataset. The dataset is first filtered and prepared using the following methods:
    ```python

    #to filter out non-RGB images that we don't want to train with
    for image_filepath in glob(os.path.join(data_path, 'images', '**','*.jpg')):
    if Image.open(image_filepath).mode != 'RGB':
        os.remove(image_filepath)
	
    #prepare data to prevent overfitting/train model better for the data size
    data = prepare_data(
	path=data_path,
   	dataset_type='Imagenet',
    	batch_size=64,
    	chip_size=300
    )
    ```

    The training is done over 25 epochs with training and validation loss both displayed in a table as the training proceeds. 
    
    In integrating this into the app, the package tflite-react-native was used due to the built-in image recognition functionality for running images taken by the user on the model, and due to the compatibility with the model previously produced. In our project, the model is located in the folder model folder under assets in the Android folder, and in the www folder for iOS.  Our project uses the load functionality from this package to load the model that was trained as such:
    
    ```javascript
    tflite.loadModel({
    model: 'models/plant-id-tflite.tflite',// required
    labels: 'models/plant-id-tflite.txt',  // required
    numThreads: 1,                              // defaults to 1  
	},
    //log results of loading model
    (err, res) => {
        if (err)
            console.log(err);
        else
            console.log(res);
    });
    ```
    We then used the runModelOnImage function, providing the captured image’s URI, along with default values to get predictions on plant species: 
    ```javascript
    tflite.runModelOnImage({
	path: this.state.path,  // required
	imageMean: 128.0, // default
	imageStd: 128.0,  // default
	numResults: 3,    // defaults to 5, use three for three predictions for user
	threshold: 0.05   // default
    },
    ```
    These predictions are displayed to the user via a modal UI element.
    
    React-native-camera was used to get user permission to access the camera, and then display the camera view to the user and allow them to capture an image and save it to cache memory using a URI that could later be passed to the image recognition function. Our project uses the built-in takePictureAsync method to capture an image when the user clicks the capture button by using it as an onClick event as such:

    ```javascript
	    takePicture = async () => {
		if (this.camera) {
		    const options = { quality: 0.5, base64: true };
		    const data = await this.camera.takePictureAsync(options);
		    console.log(data.uri);
		    this.setState({ path: data.uri })
    ```
    The previously mentioned runModelOnImage function is also called within this function, so that the recognition is done on image capture.
    
    @React-native-community/cameraroll was used to gain access to the user’s phone’s camera roll and then save a captured image to it. It should be noted that react-native-cameraroll should not be used, as this package is now deprecated. Our app leverages the CameraRoll.save function of the package to save the image using its URI to an album which we are able to specify as follows:
     ```javascript
	    saveImg() {
		var promise = CameraRoll.save(this.state.path, { type: 'photo', album: 'ExploreSafe' })
		promise.then(function (result) {
		    ToastAndroid.show("Saved", ToastAndroid.LONG);
		}).catch(function (error) {
		    console.log('save failed ' + error);
		});
	    }
    ```
    It should be noted that react-native-cameraroll should not be used, as this package is now deprecated. Our app leverages the save function of the package to save the image using its URI to an album which we are able to specify. PermissionsAndroid from ‘react-native’ is also utilized to request permission for writing to external storage of the user’s phone as such:
    
     ```javascript
		//check permissions for saving images 
		async function hasAndroidPermission() {
		const permission = PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE;

		const hasPermission = await PermissionsAndroid.check(permission);
	    	if (hasPermission) {
			return true;
   		}

	        const status = await PermissionsAndroid.request(permission);
	        return status === 'granted';
		}	
    ```

* *SplashScreen.js*

    The *SplashScreen.js* file is a simple rendition of the ExploreSafe logo as a full screen image, to be used as a temporary view for when the application is loading.
	







