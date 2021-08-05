const router = require('express').Router();
const { User } = require('../models');
//const sequelize = require('../config/connection');
//const { Post } = require('../models'); later

router.get('/',(req, res) => {
  //console.log(req.session);
  res.render('test')

  });


module.exports = router;