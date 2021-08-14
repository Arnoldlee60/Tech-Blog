const router = require('express').Router();
const { User, Post, Comment } = require('../../models');
const sequelize = require('../../config/connection');
const withAuth = require('../../utils/auth');

router.get('/', withAuth, (req, res) => {
    Post.findAll({
        attributes: [
            'id',
            'title',
            'created_at',
            'post_content'
        ],
      order: [['created_at', 'DESC']],
      include: [
        {
          model: Comment,
          attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
          include: {
            model: User,
            attributes: ['email']
          }
        },
        {
          model: User,
          attributes: ['email']
        },
      ]
    })
      .then(dbPostData => res.json(dbPostData))
      .catch(err => {
      console.log(err);
      res.status(500).json(err);
      });
  });

  router.post('/', withAuth, (req, res) => { //createForm
    Post.create({
      title: req.body.title,
      post_content: req.body.post_content,
      user_id: req.session.user_id
    })
      .then(dbPostData => res.json(dbPostData))
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
});


  module.exports = router;