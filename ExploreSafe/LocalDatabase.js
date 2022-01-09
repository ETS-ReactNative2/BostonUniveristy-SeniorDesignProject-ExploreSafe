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
        console.log("Integrity check passed ...");
        console.log("Opening database ...");
        SQLite.openDatabase(
          {
          name: 'LocalStorage.db',
          location: 'default',
          createFromLocation: 1,
          },
          this.openCB,
          this.errorCB,
        )
          .then(DB => {
            dbu = DB;
            console.log("Database OPEN");
            dbu.executeSql('SELECT 1 FROM LoginContext LIMIT 1').then(() => {
                console.log("Database is ready ... executing query ...");
            }).catch((error) =>{
                console.log("Received error: ", error);
                console.log("Database not yet ready ... populating data");
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
        console.log("echoTest failed - plugin not functional");
      });
    });
};

closeDatabaseU(dbu) {
  if (dbu) {
    console.log("Closing DB");
    dbu.close()
      .then(status => {
        console.log("Database CLOSED");
      })
      .catch(error => {
        this.errorCB(error);
      });
  } else {
    console.log("Database was not OPENED");
  }
};

userById(id) {
  console.log(id);
  return new Promise((resolve) => {
    this.initUserDB().then((dbu) => {
      dbu.transaction((tx) => {
        tx.executeSql('SELECT * FROM LoginContext WHERE uid = ?', [id]).then(([tx,results]) => {
          console.log(results);
          if(results.rows.length > 0) {
            let row = results.rows.item(0);
            resolve(row);
          }
        });
      }).then((result) => {
        console.log('Fetched User on Local User Database by id: ', id);
        this.closeDatabaseU(dbu);
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
          console.log(results);
          if(results.rows.length > 0) {
            let row = results.rows.item(0);
            resolve(row);
          }else{
            resolve({});
          }
        });
      }).then((result) => {
        console.log('Fetched User on Local Database by Active Status: ', status);
        this.closeDatabaseU(dbu);
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
        console.log('Added User to Local Database: ', user);
        this.closeDatabaseU(dbu);
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
        console.log('Updated User Information on Local Database for id: ', id);
        this.closeDatabaseU(dbu);
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
        console.log('Removed User from Local Database!');
        this.closeDatabaseU(dbu);
      }).catch((err) => {
        console.log(err);
      });
    }).catch((err) => {
      console.log(err);
    });
  });
}

//tripside

initTripDB() {
let db;
return new Promise((resolve) => {
  console.log("Plugin integrity check ...");
  SQLite.echoTest()
    .then(() => {
      console.log("Integrity check passed ...");
      console.log("Opening database ...");
      SQLite.openDatabase(
        {
        name: 'LocalStorage.db',
        location: 'default',
        createFromLocation: '1',
        },
        this.openCB,
        this.errorCB,
      )
        .then(DB => {
          db = DB;
          console.log("Database OPEN");
          db.executeSql('SELECT 1 FROM LocalTrips LIMIT 1').then(() => {
              console.log("Database is ready ... executing query ...");
          }).catch((error) =>{
              console.log("Received error: ", error);
              console.log("Database not yet ready ... populating data");
              db.transaction((tx) => {
                  tx.executeSql('CREATE TABLE IF NOT EXISTS LocalTrips (latitude, longitude, location, id, recommended, expected)');
              }).then(() => {
                  console.log("Table created successfully");
              }).catch(error => {
                  console.log(error);
              });
          });
          resolve(db);
        })
        .catch(error => {
          console.log(error);
        });
    })
    .catch(error => {
      console.log("echoTest failed - plugin not functional");
    });
  });
};

closeDatabaseT(db) {
if (db) {
  console.log("Closing DB");
  db.close()
    .then(status => {
      console.log("Database CLOSED");
    })
    .catch(error => {
      this.errorCB(error);
    });
} else {
  console.log("Database was not OPENED");
}
};

listLocalTrips() {
return new Promise((resolve) => {
  const trips = [];
  this.initTripDB().then((db) => {
    db.transaction((tx) => {
      tx.executeSql('SELECT t.latitude, t.longitude, t.location, t.id, t.recommended, t.expected FROM LocalTrips t', []).then(([tx,results]) => {
        console.log("Query completed");
        var len = results.rows.length;
        //console.log("Set LEN to: ", len);
        for (let i = 0; i < len; i++) {
          let row = results.rows.item(i);
          console.log(`TID: ${row.id}, Location: ${row.location}`);
          const { id, location, latitude, longitude, recommended, expected} = row;
          trips.push({
            id,
            location,
            latitude,
            longitude,
            recommended,
            expected
          });
        }
        console.log(trips);
        resolve(trips);
      });
    }).then((result) => {
      this.closeDatabaseT(db);
    }).catch((err) => {
      console.log(err);
    });
  }).catch((err) => {
    console.log(err);
  });
});
}

tripById(id) {
console.log("Trying to load ID: ", id);
return new Promise((resolve) => {
  this.initTripDB().then((db) => {
    db.transaction((tx) => {
      tx.executeSql("SELECT * FROM LocalTrips WHERE id = ?", [id]).then(([tx,results]) => {
        console.log("Loaded trip with id: ", id);
        console.log(results);
        if(results.rows.length > 0) {
          let row = results.rows.item(0);
          resolve(row);
        }else{
          resolve({});
        }
      });
    }).then((result) => {
      this.closeDatabaseT(db);
    }).catch((err) => {
      console.log(err);
    });
  }).catch((err) => {
    console.log(err);
  });
});
}

addTrip(trip) {
return new Promise((resolve) => {
  this.initTripDB().then((db) => {
    db.transaction((tx) => {
      tx.executeSql('INSERT INTO LocalTrips VALUES (?, ?, ?, ?, ?, ?)', [trip.latitude, trip.longitude, trip.location, trip.id, trip.recommended, trip.expected]).then(([tx, results]) => {
        resolve(results);
      });
    }).then((result) => {
      this.closeDatabaseT(db);
    }).catch((err) => {
      console.log(err);
    });
  }).catch((err) => {
    console.log(err);
  });
});
}

updateTrip(id, trip) {
return new Promise((resolve) => {
  this.initUserDB().then((db) => {
    db.transaction((tx) => {
      tx.executeSql('UPDATE LocalTrips SET latitude = ?, longitude = ?, location = ?, recommended = ?, expected = ? WHERE id = ?', [trip.latitude, trip.longitude, trip.location, trip.recommended, trip.expected, id]).then(([tx, results]) => {
        resolve(results);
      });
    }).then((result) => {
      this.closeDatabaseT(db);
    }).catch((err) => {
      console.log(err);
    });
  }).catch((err) => {
    console.log(err);
  });
});
}

deleteTrip(id) {
return new Promise((resolve) => {
  this.initTripDB().then((db) => {
    db.transaction((tx) => {
      tx.executeSql('DELETE FROM LocalTrips WHERE id = ?', [id]).then(([tx, results]) => {
        console.log(results);
        resolve(results);
      });
    }).then((result) => {
      this.closeDatabaseT(db);
    }).catch((err) => {
      console.log(err);
    });
  }).catch((err) => {
    console.log(err);
  });
});
}

//globalTrip

initGlobalTripDB() {
let dbg;
return new Promise((resolve) => {
  console.log("Plugin integrity check ...");
  SQLite.echoTest()
    .then(() => {
      console.log("Integrity check passed ...");
      console.log("Opening database ...");
      SQLite.openDatabase(
        {
        name: 'LocalStorage.db',
        location: 'default',
        createFromLocation: '1',
        },
        this.openCB,
        this.errorCB,
      )
        .then(DB => {
          dbg = DB;
          console.log("Database OPEN");
          dbg.executeSql('SELECT 1 FROM GlobalTrip LIMIT 1').then(() => {
              console.log("Database is ready ... executing query ...");
          }).catch((error) =>{
              console.log("Received error: ", error);
              console.log("Database not yet ready ... populating data");
              dbg.transaction((tx) => {
                  tx.executeSql('CREATE TABLE IF NOT EXISTS GlobalTrip (location, id)');
              }).then(() => {
                  console.log("Table created successfully");
              }).catch(error => {
                  console.log(error);
              });
          });
          resolve(dbg);
        })
        .catch(error => {
          console.log(error);
        });
    })
    .catch(error => {
      console.log("echoTest failed - plugin not functional");
    });
  });
};

closeDatabaseG(dbg) {
if (dbg) {
  console.log("Closing DB");
  dbg.close()
    .then(status => {
      console.log("Database CLOSED");
    })
    .catch(error => {
      this.errorCB(error);
    });
} else {
  console.log("Database was not OPENED");
}
};

listGlobalTrip() {
return new Promise((resolve) => {
  const gTrips = [];
  this.initGlobalTripDB().then((dbg) => {
    dbg.transaction((tx) => {
      tx.executeSql('SELECT g.location, g.id FROM GlobalTrip g', []).then(([tx,results]) => {
        console.log("Query completed");
        var len = results.rows.length;
        //console.log("Set LEN to: ", len);
        for (let i = 0; i < len; i++) {
          let row = results.rows.item(i);
          console.log(`TID: ${row.id}, Location: ${row.location}`);
          const { id, location } = row;
          gTrips.push({
            id,
            location,
          });
        }
        console.log(gTrips);
        resolve(gTrips);
      });
    }).then((result) => {
      this.closeDatabaseG(dbg);
    }).catch((err) => {
      console.log(err);
    });
  }).catch((err) => {
    console.log(err);
  });
});
}

addGlobalTrip(trip) {
return new Promise((resolve) => {
  this.initGlobalTripDB().then((dbg) => {
    dbg.transaction((tx) => {
      tx.executeSql('INSERT INTO GlobalTrip VALUES (?, ?)', [trip.location, trip.id]).then(([tx, results]) => {
        resolve(results);
      });
    }).then((result) => {
      this.closeDatabaseG(dbg);
    }).catch((err) => {
      console.log(err);
    });
  }).catch((err) => {
    console.log(err);
  });
});
}

deleteGlobalTrip() {
return new Promise((resolve) => {
  this.initGlobalTripDB().then((dbg) => {
    dbg.transaction((tx) => {
      tx.executeSql('DELETE FROM GlobalTrip').then(([tx, results]) => {
        console.log(results);
        resolve(results);
      });
    }).then((result) => {
      this.closeDatabaseG(dbg);
    }).catch((err) => {
      console.log(err);
    });
  }).catch((err) => {
    console.log(err);
  });
});
}

} // class


//PINS
