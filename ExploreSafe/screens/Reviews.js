import React, {Component} from 'react';
import {TextInput,SafeAreaView, StyleSheet, ScrollView, View, Text, StatusBar, Button, ImageBackground, TouchableOpacity} from 'react-native';

import firebase from '@react-native-firebase/app';
import database from '@react-native-firebase/database';
import { FlatList } from 'react-native-gesture-handler';
import Modal from 'react-native-modal';
import { withTheme } from 'react-native-elements';

import {BasicItemButton} from '../components/PlanningButtons';
import {BasicHomeButton} from '../components/HomeButtons';

//SQLite
import LocalDatabase from '../LocalDatabase';

const db_loc = new LocalDatabase();

export default class Reviews extends Component {
  constructor(props) { //move this
    super(props)
    this.state={
      isLoading: true,
      dataSource: null,
      isModalVisible: false,
      isRender: false,
      inputText: {},
      editItem: {},
      user: {},
      gTrip: {},
      reviewLocation: null,
    };
    this.userByStatus = this.userByStatus.bind(this);
    this.getGlobalTrip = this.getGlobalTrip.bind(this);
    //this.mountReviewsFromSource = this.mountReviewsFromSource.bind(this);
  }

  async componentDidMount(){
    this.mountReviewsFromSource();
    this.userByStatus();
    this.getGlobalTrip();
  }

  userByStatus = () => {
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
          isLoading: false,
        });
        console.log('Did not Load any Local User Data...!');
      }
    }).catch((err) => {
      console.error(err);
      this.setState({
        isLoading: false,
      });
    })
  }

  getGlobalTrip(){
    //load current global trip
    let trip = [];
    db_loc.listGlobalTrip().then((data) => {
      trip = data;
      console.log("Loaded Global Trip Data as :", trip)
      //trip here is an array of objects, want just the object itself
      this.setState({
        gTrip: trip[0],
      })
      console.log('gTrip set as: ', this.state.gTrip);
    }).catch((err) => {
      console.log(err);
    })
  }




  mountReviewsFromSource = () => {
    const revSource = this.props.route.params;

    //reviews are all explore safe stored reviews
    if(revSource.isU === false && revSource.isLoc === false){
      //OK
      this.fetch_all_review2();
      this.setState({
        reviewLocation: revSource.loc,
      });
    }
    //reviews are all user only stored reviews
    else if (revSource.isU === true && revSource.isLoc === false){
      //OK!
      //console.log('Searching All Reviews For User ID ', firebase.auth().currentUser.uid)
      this.read_own_review();
      this.setState({
        reviewLocation: revSource.loc,
      });
    }
    //reviews are all explore safe by Location
    else if (revSource.isU === false && revSource.isLoc === true){
      //console.log('Searching All Reviews For ', revSource.loc)
      //OK
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

  //modal
  openModal = () => {this.setState({isModalVisible: true})};
  closeModal = () => {this.setState({isModalVisible: false})};

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

  //begin of trip review function
  /////////////////////////////////////////////////////////////

  submitReview2 = (username, location, review) => {
    const UID = firebase.auth().currentUser.uid;
    //initialize the post upvote counts
    let upvote_count = {
          counts:0
        };
    //create a post_id for new post
    let post_id = firebase.database().ref('TRIP_REVIEW/'+'ALL_POST').push().key;

    let month = new Date().getMonth() + 1;
          let date = new Date().getDate();
          let year = new Date().getFullYear();
          let hours = new Date().getHours();
          let min = new Date().getMinutes();
          let sec = new Date().getSeconds();

    const reviewtime = month+'/'+date+'/'+year+'  '+hours+':'+min+':'+sec;

    //for post data
    let post_data = {
            post_id: post_id,
            uid:UID,
            location:location,
            review:review,
            username:username,
            review_date:reviewtime
            //reviewer_name: user_name (need to be fetch from local database)
          };

    //write to both ALL_POST, USER_POST and UPVOTE_COUNT simutaneously
    let post_path = {};
    post_path['TRIP_REVIEW/'+'ALL_POST/'+post_id] = post_data;
    //post_path['USERS/'+UID+'/USER_POST/' +post_id] = post_data;
    post_path['TRIP_REVIEW/'+'UPVOTE_COUNT/' + post_id] = upvote_count;
    //save user's post to database
    firebase.database().ref().update(post_path).then(() => {alert('Review Submitted!');}).catch((error) => {alert('Error in Review Submission', error); console.log('error in submitReview2: ', error);})

  };

  //
  fetch_all_review2 = () =>{
    const TripReview = firebase.database().ref('TRIP_REVIEW/'+'ALL_POST');
    var post_id_arr = [];
    var review_arr = [];

    TripReview.once('value', (all_post) => {
      let post_id, post_data;
      //iterate through each post
      all_post.forEach((post) => {
        post_id = post.key;
        post_data = post.val();

        post_id_arr.push(post.key);
        review_arr.push(post.val());
        }
      )
      this.setState({
        dataSource: review_arr,
        isLoading: false,
      })
      if(this.state.dataSource[0] === {}){
        alert('Looks like there are no recorded reviews on our database just yet!')
      }
    }).catch(error => {console.log('Error reading all reviews: ',error);})
  };


  //DOUBLE CHECK
  fetch_all_review_location = (loc) => {
    const TripReview = firebase.database().ref('TRIP_REVIEW/'+'ALL_POST');
    var post_id_arr = [];
    var review_arr = [];

    TripReview.once('value', (all_post) => {
      let post_id, post_data;
      //iterate through each post
      all_post.forEach((post) => {
        post_id = post.key;
        post_data = post.val();

        if(post_data.location == loc){
          post_id_arr.push(post.key);
          review_arr.push(post.val());
        }
      })
      this.setState({
        dataSource: review_arr,
        isLoading: false,
      })
      if(this.state.dataSource[0] === {}){
        alert('Looks like there are no recorded reviews for this location on our database just yet!')
      }
    }).catch(error => {console.log('error in reading ALL_POST',error);})
  }

  //delete a selected review by post_id
  //u should check if the user id are the same as the stored user_id in the database
  //to ensure that the user is deleting his own review in remote database
  //same logic applys to the update_own_review2 function
  delete_review2 = (post_id) => {
    uid = firebase.auth().currentUser.uid;
     //firebase.database().ref('USERS/' + uid+'/USER_POST/'+post_id).remove();
     firebase.database().ref('TRIP_REVIEW/ALL_POST/' + post_id).remove();
     firebase.database().ref('ALL_POST_VOTE/'+post_id).remove();
     firebase.database().ref('TRIP_REVIEW/UPVOTE_COUNT/'+post_id).remove();
  };

  //update a seleted review by post_id
  update_own_review2 = (username, location, review, post_id) => {
    const UID = firebase.auth().currentUser.uid;

    //new review time
    let month = new Date().getMonth() + 1;
    let date = new Date().getDate();
    let year = new Date().getFullYear();
    let hours = new Date().getHours();
    let min = new Date().getMinutes();
    let sec = new Date().getSeconds();

    const reviewtime = month+'/'+date+'/'+year+'  '+hours+':'+min+':'+sec;

    let update_data = {
      post_id: post_id,
      uid:UID,
      location:location,
      review:review,
      username:username,
      review_date:reviewtime
    //user_name:poster_name, u may want to fetch the user name from local database
    };

    //update to both ALL_POST and USER_POST simutaneously
    let post_path = {};
    post_path['TRIP_REVIEW/'+'ALL_POST/'+post_id] = update_data;
    //post_path['USERS/'+UID+'/USER_POST/'+post_id] = update_data;

    firebase.database().ref().update(post_path).then(()=>{alert('Review Sucessfully Updated')}).catch(error => {alert('Error Updating Reviews: ', error)})

  };

  ////////////////////////////////////////////////////////////////////////////////////

  //Read Personal Reviews
  read_own_review = () => {
    //console.log('Reading User Personal Reviews')
    const TripReview = firebase.database().ref('TRIP_REVIEW/'+'ALL_POST');
    var post_id_arr = [];
    var review_arr = [];

    TripReview.once('value', (all_post) => {
      let post_id, post_data;
      //iterate through each post
      all_post.forEach((post) => {
        post_id = post.key;
        post_data = post.val();

        //console.log('Post UID is ', post_data.uid)
        if(post_data.uid == firebase.auth().currentUser.uid){
          post_id_arr.push(post.key);
          review_arr.push(post.val());
        }
      })
      this.setState({
        dataSource: review_arr,
        isLoading: false,
      })
      if(this.state.dataSource[0] === {}){
        alert('Looks like you dont have any reviews just yet!')
      }
    }).catch(error => {console.log('Error reading OWN REVIEWS: ',error);})
  }

  read_own_review_location = (loc) => {
    //console.log('Reading User Personal Reviews')
    const TripReview = firebase.database().ref('TRIP_REVIEW/'+'ALL_POST');
    var post_id_arr = [];
    var review_arr = [];

    TripReview.once('value', (all_post) => {
      let post_id, post_data;
      //iterate through each post
      all_post.forEach((post) => {
        post_id = post.key;
        post_data = post.val();

        //console.log('Post UID is ', post_data.uid)
        if(post_data.uid == firebase.auth().currentUser.uid && post_data.location == loc){
          post_id_arr.push(post.key);
          review_arr.push(post.val());
        }
      })
      this.setState({
        dataSource: review_arr,
        isLoading: false,
      })
      if(this.state.dataSource === {}){
        alert('Looks like you dont have any reviews for this location just yet!')
      }
    }).catch(error => {console.log('Error reading OWN REVIEWS: ',error);})
  }



upvote_post = () => {
  const UID = firebase.auth().currentUser.uid;
  const post_ref = firebase.database().ref('TRIP_REVIEW/'+'ALL_POST');
  var post_id_arr = [];
  var review_arr = [];

  //fetch all the post and display to the user
  //so that the user can select
  post_ref.once('value', (all_post) => {
    let post_id, post_data;
    //iterate through each post and store each post_id and post_data into post_id_arr and review_arr separately
    all_post.forEach((post) => {
      post_id = post.key;
      post_data = post.val();

      post_id_arr.push(post_id);
      review_arr.push(post_data);
      }
    )

    /********************************************************** */
    //here I just console log out the post id and data you will display to the user with your UI
    //Thus, you need to replace the console.log with you UI to display
      alert('check the console log');
     console.log('the post_id array is: ',post_id_arr);
     console.log('the post_array is: ', review_arr);

    //for example, the user wants to upvote the first post (upvote_post_id =post_id[0])
      let upvote_post_id = post_id_arr[0];
      let upvote_ref = firebase.database().ref('ALL_POST_VOTE/'+ upvote_post_id +'/'+UID);
     //the reference to the UPVOTE_COUNT
     let upvote_count_ref = firebase.database().ref('TRIP_REVIEW/'+'UPVOTE_COUNT/'+upvote_post_id).child('counts');
      upvote_ref.once('value',(post_info) => {
        //the user has not upvoted the selected post yet
        if(!post_info.exists() || post_info.child('upvote').val()===false){
          console.log('Just upvote the selected post!');
          upvote_ref.update({upvote: true});
          //atomically increment the upvote count
          upvote_count_ref.transaction((upvote_count) => {
              return (upvote_count || 0)+1;
              //if(upvote_count === null) return 1;
              //upvote_count['counts'] = upvote_count.counts + 1;
              // return upvote_count;
          }).catch(error=>{console.log('error in upvote transaction: ',error)})
        }

        //the user has upvoted
        else if(post_info.child('upvote').val() === true){
          //undo the upvote here, you can add your UI here
           console.log('the user has upvoted this post, so just undo upvote!');
           upvote_ref.update({upvote:false});
           //atomically decrement the upvote count
           upvote_count_ref.transaction((upvote_count) => {
            return (upvote_count || 0)-1;
            //  if(upvote_count === null) return 1;
             // upvote_count['counts'] = upvote_count.counts - 1;
            // return upvote_count;
           }).catch(error=>{console.log('error in upvote transaction: ',error)})
        }
      }).catch(error => {console.log('error in read upvote_ref: ',error);})
  }).catch(error => {console.log('error in reading ALL_POST',error);})
};

//fetch all the upvote count
fetch_all_upvote = () => {
  const upvote_count_ref = firebase.database().ref('TRIP_REVIEW/'+'UPVOTE_COUNT');
  let post_id, post_vote_count;
  let post_id_arr = [];
  let post_vote_count_arr = [];
  upvote_count_ref.once('value',(upvote_count) => {
      upvote_count.forEach(post => {
        post_id = post.key;
        post_vote_count = post.val();

        post_id_arr.push(post_id);
        post_vote_count_arr.push(post_vote_count);
      })
      //alert('check the console');
      console.log('the post_id_arr is: ',post_id_arr);
      console.log('the post_vote_count_arr is: ', post_vote_count_arr);
  }).catch(error => {console.log('error in fetch_all_upvote: ', error);})
};

/////////////////////////////////////////////////////////

    FlatListItemSeparator = () => {
      return (
        <View style={{
            height: 10,
            width: '100%',
            backgroundColor: 'white',
          }}
        />
      );
    };

    renderItem = ({ item, index }) => (
      <ScrollView style={styles.scrollView}>
        <View style={styles.reviewItemContainer}>
          <Text style={styles.PlaceOne}>Location: {item.location}</Text>
          <Text style={styles.WrittenReviewOne}>Review:{'\n'}{item.review}</Text>
          <Text style={styles.ReviewOne}>User: {item.username}</Text>
          <Text style={styles.WrittenReviewOne}> Date: {item.review_date}</Text>
          <Button
            title = "Delete"
            onPress = {() => this.callDelete(item.post_id, item.uid)}
          />
          <Button
            title = "Edit"
            onPress = {() => {console.log('Called Edit'); this.openModal()}}
          />
          <Modal isVisible={this.state.isModalVisible} style ={styles.modalTag} onBackdropPress={()=>this.closeModal()} propagateSwipe={true}>
            <View style={styles.modalView}>
                <TextInput
                  placeholder = "<Updated Review>"
                  backgroundColor = "lightgray"
                  accessibilityLabel = "PostLocation"
                  multiline = {true}
                  onChangeText = {(review)=>this.setState({review})}
                />
                <Button
                  title = "Save"
                  onPress = {() => {this.callUpdate(item.username, item.location, this.state.review, item.post_id, item.uid);this.closeModal();}}
                />
              </View>
            </Modal>
          </View>
        </ScrollView>
  );

  render() {
    const revSource = this.props.route.params;
    console.log('passed revsource to reviews is:');
    console.log(revSource);
    if(revSource.isLoc === false){

    }
    return (
        <SafeAreaView style={styles.pageContainer}>
          <Text style={styles.sectionTitle}>Submit Review</Text>
          <View style={styles.writeReviewContainer}>
            <Text style={styles.itemTitle}>Name: </Text>
            <Text style={styles.itemTitle}>{this.state.user.name}</Text>
            <Text style={styles.itemTitle}>Location:</Text>
            <Text style={styles.itemTitle}>{this.state.reviewLocation}</Text>
            <Text style={styles.itemTitle}>Review:</Text>
            <TextInput
              placeholder = "<Type Review Here>"
              backgroundColor = "lightgray"
              accessibilityLabel = "PostReview"
              multiline = {true}
              onChangeText = {(image) => this.setState({image})}
            />
            <Button
              title="Submit Review"
              color="blue"
              onPress = {() => this.submitReview2(this.state.user.name, this.state.reviewLocation, this.state.image)}
            />
            <View style={styles.reviewRefresher}>
              <Text style={styles.subText}>Refresh Reviews by</Text>
              <BasicItemButton
                title = "All Reviews"
                onPress = {() => {this.fetch_all_review2}}
                itemStyle="idcard"
              />
              <BasicItemButton
                title = "All User Reviews"
                onPress = {() => {this.read_own_review}}
                itemStyle="idcard"
              />
            </View>
          </View>
          <View style={styles.reviewListContainer}>
            <Text style={styles.sectionTitle}>Review List</Text>
            <FlatList
              data={this.state.dataSource}
              ItemSeparatorComponent={this.FlatListItemSeparator}
              renderItem={(item) => this.renderItem(item)}
              keyExtractor={item => item.review_date}
              refreshing={this.state.isLoading}
              onRefresh={this.mountReviewsFromSource}
            />
          </View>
          <BasicHomeButton
            title = "Home Page"
            onPress = {() => this.props.navigation.navigate('HomePage')}
          />
        </SafeAreaView>
    );
  } //end of render
} //end of class

const styles = StyleSheet.create({
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
  writeReviewContainer:{
    backgroundColor: '#63b395',
    padding: 15,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 10,
  },
  reviewItemContainer:{
    backgroundColor: '#63b395',
    padding: 15,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 10
  },
  sectionTitle:{
    fontSize: 24,
    fontWeight: '600',
    color: 'rgb(0,0,0)',
    marginTop: 20,
    textAlign: 'center',
  },
  sectionSubtitle:{
    fontSize: 20,
    fontWeight: '600',
    color: 'rgb(0,0,0)',
    marginTop: 10,
    textAlign: 'center',
  },
  itemTitle:{
    fontSize: 20,
    fontWeight: '600',
    color: 'white',
    textAlign: 'left',
  },
  subText:{
    fontSize: 18,
    fontWeight: '400',
    color: 'black',
    textAlign: 'left',
    padding: 0,
    marginTop: 5
  },
  textInput: {
    margin: 15,
    height: 40,
    borderColor: '#63b395',
    borderWidth: 1,
    textAlign: 'center',
    borderRadius: 10
  },
  modalView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white'
  },
  modalTag:{
    backgroundColor: 'white',
    maxHeight: '75%',
    borderRadius: 10,
    justifyContent: 'center',
    padding: 7
  },
  touchableSave: {
    backgroundColor: 'blue',
    paddingHorizontal: 100,
    alignItems: 'center',
    marginTop: 20
  },
  reviewListContainer:{
    flex: 1,
    flexDirection: 'column',
    alignContent: 'center',
    justifyContent: 'center',
  },
  reviewRefresher:{
    justifyContent: 'flex-start',
    elevation: 20,
    borderRadius: 10,
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#63b395',
  },
});
