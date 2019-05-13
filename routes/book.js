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
router.get('/users', function(req, res, next) {
  var allUsers = [];
  return admin.auth().listUsers()
      .then(function(listUsersResult) {
        console.log('getting each user record');
        listUsersResult.users.forEach(function(userRecord) {
          var userData = userRecord.toJSON();
          allUsers.push(userData);
        });
        res.status(200).send(JSON.stringify(allUsers));
      })
      .catch(function(error) {
      res.send('Error listing users:', error);
      });
});
  
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
