
// change path to carpool-key.json file in main folder
// const serviceAccount = require("C:/Users/Nisha/Documents/GitHub/HU_Carpool(latest)/carpool-key.json");
import serviceAccount from "./carpool-key.json";
import * as admin from 'firebase-admin';

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://carpool-46b66.firebaseio.com"
  });

export function listAllUsers(nextPageToken) {
    // List batch of users, 1000 at a time.
    admin.auth().listUsers(1000, nextPageToken)
        .then(function(listUsersResult) {
        listUsersResult.users.forEach(function(userRecord) {
            console.log('user', userRecord.toJSON());
        });
        if (listUsersResult.pageToken) {
            // List next batch of users.
            listAllUsers(listUsersResult.pageToken);
        }
        })
        .catch(function(error) {
        console.log('Error listing users:', error);
    });
}

// module.exports = listAllUsers();