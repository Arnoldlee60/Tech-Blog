const router = require('express').Router();
const { User } = require('../models');
//const sequelize = require('../config/connection');
//const { Post } = require('../models'); later
const withAuth = require('../utils/auth'); //redirect to login if not logged in

router.get('/', withAuth, async (req, res) => {
//router.get('/',(req, res) => {
  try {
    const userData = await User.findAll({
      attributes: { exclude: ['password'] },
      order: [['email', 'ASC']],
    });

    const users = userData.map((project) => project.get({ plain: true }));

    res.render('test', {
      users,
      // Pass the logged in flag to the template
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    res.status(500).json(err);
  }
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


  


module.exports = router;