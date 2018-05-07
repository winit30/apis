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

//Get comments request
Router.get('/getComments/:eventId', authenticate, (req, res) => {
  	EventComments.findCommentsByEventId(req.params.eventId).then((comments) => {
  		res.send(comments);
  	});
});

//Delete comment request
Router.get('/deleteComment/:id', authenticate, (req, res) => {
  	EventComments.findAndDeleteComment(req.params.id, req.user._id).then((comments) => {
  		res.send(comments);
  	}).catch((err) => {
  		console.log(err);
  		res.send(err);
  	});
});

module.exports = Router;
