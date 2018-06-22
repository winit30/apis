const Router = require('express').Router();
const {Event} = require('./../models/event');
const {EventComments} = require('./../models/eventComments');
const _ = require('lodash');
const {authenticate} = require('./../middleware/authenticate');

Router.post('/create', authenticate, (req, res) => {
	var body = req.body;
			body.organizerId = req.user._id;
	var event = new Event(body);
	event.save().then((event) => {
		 res.send(event);
	}).catch((e) => {
		res.send(e);
	});
});

//Get events request
Router.get('/events', authenticate, (req, res) => {
	Event.findEventsByOrganizerId(req.user._id).then((events) => {
		res.send(events);
	});
});

//Get event by id request
Router.get('/event/:id', authenticate, (req, res) => {
	Event.findEventById(req.params.id).then((event) => {
		res.send(event);
	});
});

//Get events request
Router.get('/events/:city', authenticate, (req, res) => {
	Event.findEventsByCity(req.params.city).then((events) => {
		res.send(events);
	});
});

//api update by id request
Router.put('/updateEvent/:_id', authenticate, (req, res) => {
	console.log(req.body);
	Event.updateEvent(req.params._id, req.user._id, req.body).then((event) => {
		res.send(event);
	}).catch((err) => {
		res.send(err);
	});
});

//api delete by id request
Router.delete('/delete/:_id', authenticate, (req, res) => {
	eventId = req.params._id;
	Event.findAndDelete(eventId, req.user._id).then((result) => {
		if(!result) {
				res.send("unable to delete");
				return false;
		}
		const deleteQuery = {
				eventId: eventId
		}
		EventComments.findAndDeleteComment(deleteQuery);
		res.send(result);
	}).catch((err) => {
		console.log(err);
		res.send(err);
	});
});

module.exports = Router;
