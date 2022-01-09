import database from '@react-native-firebase/database';


export const submitUser = (Id, Name, Email) => {
    return new Promise(function(resolve, reject) {
      let key;
      if (Id != null) {
        key = Id;
      } else {
        key = database()
          .ref()
          .push().key;
      }
      let dataToSave = {
        Id: key,
        Name: Name,
        Email: Email,
      };
      database()
        .ref('users/' + key)
        .update(dataToSave)
        .then(snapshot => {
          resolve(snapshot);
        })
        .catch(err => {
          reject(err);
        });
    });
  };
  