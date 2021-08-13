const router = require('express').Router();
const { User, Post, Comment } = require('../models');
const sequelize = require('../config/connection');
//const { Post } = require('../models'); later
const withAuth = require('../utils/auth'); //redirect to login if not logged in

router.get('/', withAuth, async (req, res) => {
  Post.findAll({
    attributes: [
      'id',
      'title',
      'created_at',
      'post_content'
    ],
    include: [
      {
        model: Comment,
        attributes: [
        'id', 
        'comment_text', 
        'post_id', 
        'user_id', 
        'created_at'
      ],
        include: {
          model: User,
          attributes:['email']
        }
      },
      {
        model: User,
        attributes: ['email']
      }
    ]
  })
    .then(dbPostData => {
      const posts = dbPostData.map(post => post.get({ plain: true })); //posts is referred here on partials
      res.render('home', {
          posts,
          loggedIn: req.session.loggedIn,
        });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
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