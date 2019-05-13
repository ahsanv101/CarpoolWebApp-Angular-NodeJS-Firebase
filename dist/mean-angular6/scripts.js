
// change path to carpool-key.json file in main folder
// const serviceAccount = require("C:/Users/Nisha/Documents/GitHub/HU_Carpool(latest)/carpool-key.json");
const serviceAccount = require("C:/Users/Nisha/Documents/GitHub/HU_Carpool(latest)/carpool-key.json");
var admin = require('firebase-admin');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://carpool-46b66.firebaseio.com"
  });

function listAllUsers(nextPageToken) {
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
;
//# sourceMappingURL=scripts.js.map