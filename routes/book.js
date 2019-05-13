var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Book = require('../models/Book.js');

var serviceAccount = require("../carpool-key.json");
var admin = require('firebase-admin');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://carpool-46b66.firebaseio.com"
  });


  /* GET USERS */
router.get('/users', function(req, res) {
  listAllUsers(null);
  function listAllUsers(nextPageToken) {
    // List batch of users, 1000 at a time.
    admin.auth().listUsers(1000, nextPageToken)
        .then(function(listUsersResult) {
        listUsersResult.users.forEach(function(userRecord) {
            res.send('user', userRecord.toJSON());
        });
        if (listUsersResult.pageToken) {
            // List next batch of users.
            listAllUsers(listUsersResult.pageToken);
        }
        })
        .catch(function(error) {
        res.send('Error listing users:', error);
    });
    }
})   
  
/* GET ALL BOOKS */
router.get('/', function(req, res, next) {
  Book.find(function (err, products) {
    if (err) return next(err);
    res.json(products);
  });
});

/* GET SINGLE BOOK BY ID */
router.get('/:id', function(req, res, next) {
  Book.findById(req.params.id, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* SAVE BOOK */
router.post('/', function(req, res, next) {
  Book.create(req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* UPDATE BOOK */
router.put('/:id', function(req, res, next) {
  Book.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* DELETE BOOK */
router.delete('/:id', function(req, res, next) {
  Book.findByIdAndRemove(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

module.exports = router;
