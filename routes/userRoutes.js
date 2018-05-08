const Router = require('express').Router();
const {User} = require('./../models/user');
const _ = require('lodash');
const {authenticate} = require('./../middleware/authenticate');

//Signup request
Router.post('/create', (req, res) => {
	console.log("create");
	var body = req.body;
	var user = new User(body);
	user.save().then(()=>{
		return user.generateAuthToken();
	}).then((token)=>{
		res.header('x-auth', token).send(user);
	}).catch((e)=>{
		res.send(e);
	});
});

//Get user request
Router.get('/user', authenticate , (req, res) => {
	res.send(req.user);
});

//Get user request
Router.post('/username', authenticate , (req, res) => {
	const body = req.body;
	User.findOne({_id: body._id}).then((user) => {
			console.log(user);
			res.send(user.name);
	}).catch((e) => {
			res.status(400).send(e);
	})
});

//Login request
Router.post('/login', (req, res) => {
	var body = _.pick(req.body, ['email', 'password']);
	User.findByCredentials(body.email, body.password).then((user) => {
		return user.generateAuthToken().then((token) => {
			res.header('x-auth', token).send(user);
		});
	}).catch((e) => {
		res.status(400).send(e);
	});
});

//logout request
Router.delete('/logout', authenticate, (req, res) => {
	req.user.removeToken(req.token).then(()=>{
		res.status(200).send("user logged out");
	}, () => {
		res.status(400).send();
	})
});

module.exports = Router;
