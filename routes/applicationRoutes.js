const Router = require('express').Router();
const {Applications} = require('./../models/application');
const _ = require('lodash');
const {authenticate} = require('./../middleware/authenticate');

Router.post("/apply", authenticate, (req, res) => {
    const body = {
        eventId: req.body.eventId,
        appliers: [{
            applierId: req.user._id,
            applierName: req.user.name
        }]
    }
    Applications.checkApplicationForEvent(req.body.eventId).then((application) => {
        if(!application.length) {
            var newApplication = new Applications(body);
            return newApplication.save();
        } else if (_.isMatch(_.find(application[0].appliers, ["applierName", req.user.name]), { applierName: req.user.name})) {
            res.send(application);
        } else {
            return application[0].addNewApplication(body.appliers[0]);
        }
    }).then((result) => {
        res.send(result)
    }).catch((err) => {
        console.log(err);
        res.send(err);
    });
});

Router.get("/getapplication/:eventId", authenticate, (req, res) => {
    const user = req.user;
    Applications.checkApplicationForUser(req.params.eventId, req.user._id).then((application) => {
        const response = {
            eventId: req.params.eventId,
            applier: _.find(application.appliers, ["applierName", user.name])
        };
        res.send(response);
    }).catch((e) => {
        res.send(e);
    });
});

Router.get("/numberofapplications/:eventId", authenticate, (req, res) => {
    Applications.checkApplicationForEvent(req.params.eventId).then((application) => {
        if(application.length) {
            res.send(application[0].appliers.length+"");
        } else {
            res.send("0");
        }
    }).catch((e) => {
        res.send(e);
    })
});



module.exports = Router;
