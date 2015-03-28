var express = require('express');
var router = express.Router();
var Category = require('../models/category');

var isAuthenticated = function (req, res, next) {
  // if user is authenticated in the session, call the next() to call the next request handler
  // Passport adds this method to request object. A middleware is allowed to add properties to
  // request and response objects
  if (req.isAuthenticated())
    return next();
  // if the user is not authenticated then redirect him to the login page
  res.redirect('/');
}

module.exports = function(passport){

  /* GET login page. */
  // router.get('/', function(req, res) {
  //     // Display the Login page with any flash message, if any
  //   res.render('index2', { message: req.flash('message') });
  // });

  router.get('/', function(req, res) {
    res.render('index', {message: req.flash('message')});
  });

  /* Handle Login POST */
  router.post('/login', passport.authenticate('login', {
    successRedirect: '/home',
    failureRedirect: '/',
    failureFlash : true
  }));

  /* GET Registration Page */
  router.get('/signup', function(req, res){
    res.render('register',{message: req.flash('message')});
  });

  /* Handle Registration POST */
  router.post('/signup', passport.authenticate('signup', {
    successRedirect: '/home',
    failureRedirect: '/signup',
    failureFlash : true
  }));

  /* GET Home Page */
  router.get('/home', isAuthenticated, function(req, res){
    res.render('home', { user: req.user });
  });

  /* Handle Logout */
  router.get('/signout', function(req, res) {
    req.logout();
    res.redirect('/');
  });

  /* GET Category Page */
  router.get('/category', isAuthenticated, function(req, res){
    Category.find({'beloneTo': req.session.user_id}, function(err, categorys) {
      res.render('category', {
        user_id: req.session.user_id,
        categorys: categorys,
        user: {
          email: req.session.email,
        }
      });
    });
  });

  /* Handle Category POST */
  router.post('/category', isAuthenticated, function(req, res){
    var beloneTo = req.session.user_id;
    var name = req.param('add_category');

    Category.findOne(
      {
        'beloneTo': beloneTo,
        'name': name
      },
      function(err, category) {

        if (err){
          console.log('Error in SignUp: '+err);
        }

        if (category) {
          console.log('Category already exists');
        }
        else {
            var new_category = new Category();
            console.log(beloneTo);
            console.log(name);

            // set the user's local credentials
            new_category.name = name;
            new_category.beloneTo = beloneTo;

            // save the user
            new_category.save(function(err) {
              if (err){
                  console.log('Error in Saving user: '+err);
              }

              console.log('Category Add succesful');

              res.send(
                (err === null) ? { msg: 'ok' } : { msg: err }
              );
            });
        }
      }
    );
  });

  return router;
}