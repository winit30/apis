const Router = require('express').Router();
const {EventComments} = require('./../models/eventComments');
const _ = require('lodash');
const {authenticate} = require('./../middleware/authenticate');

Router.post('/addComment', authenticate, (req, res) => {
  	var body = req.body;
  	var comment = new EventComments(body);
  	comment.save().then((comment) => {
  		 res.send(comment);
  	}).catch((e) => {
  		res.send(e);
  	});
});

module.exports = Router;
