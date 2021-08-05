const router = require('express').Router();
const { User } = require('../models');
//const sequelize = require('../config/connection');
//const { Post } = require('../models'); later
const withAuth = require('../utils/auth'); //redirect to login if not logged in

router.get('/', withAuth, async (req, res) => {
//router.get('/',(req, res) => {

    res.render('test')
  });

  router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
      res.redirect('/');
      return;
    }
  
    res.render('login');
  });

  
  router.get('/signup', (req, res) => {
    if (req.session.loggedIn) {
      res.redirect('/');
      return;
    }
  
    res.render('signup');
  });

  router.get('/logout', (req, res) => {
    console.log("logged out")
    //res.render('login')
  });

  


module.exports = router;