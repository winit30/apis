const Router = require('express').Router();
const {EventComments} = require('./../models/eventComments');
const {Event} = require('./../models/event');
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

//Reply comments request
Router.put('/replyComment/:id', authenticate, (req, res) => {
    var body = req.body;
  	EventComments.findCommentById(req.params.id).then((comment) => {
        return comment.saveCommentReply(body);
  	}).then((comment) => {
        res.send(comment);
    }).catch((e)=>{
  		res.send(e);
  	});
});

//Delete reply request
Router.put('/deleteReply/:id', authenticate, (req, res) => {
    var body = req.body;
    var comment;
    EventComments.findCommentById(req.params.id).then((result) => {
        comment = result;
        return Event.findEventById(comment.eventId);
    }).then((event) => {
        const deleteQuery = {
            _id: body._id
        }
        if(event.organizerId+"" !== req.user._id+"") {
            deleteQuery.repliedby = req.user._id;
        }
        return comment.deleteCommentReply(deleteQuery);
    }).then((result) => {
        res.send(result);
    }).catch((e)=>{
      res.send(e);
    });
});

//Delete comment request
Router.put('/deleteComment/:id', authenticate, (req, res) => {
    const body = req.body;
    Event.findEventById(body.eventId).then((event) => {
        const deleteQuery = {
            _id: req.params.id
        }
        if(event.organizerId+"" !== req.user._id+"") {
            deleteQuery.commentedby = req.user._id;
        }
        return EventComments.findAndDeleteComment(deleteQuery);
    }).then((comments) => {
  		  res.send(comments);
  	}).catch((err) => {
    		console.log(err);
    		res.send(err);
  	});
});

module.exports = Router;
