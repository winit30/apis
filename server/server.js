const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const {mongoose} = require('./../db/db');
const userRoutes = require('./../routes/userRoutes');
const eventRoutes = require('./../routes/eventRoutes');
const commentsRoutes = require('./../routes/commentsRoutes');
const applicationRoutes = require('./../routes/applicationRoutes');

// app.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-auth");
//   next();
// });
//Set Request Method
app.use(bodyParser.json());
//Routes
app.use('/user', userRoutes);
app.use('/event', eventRoutes);
app.use('/event/comments', commentsRoutes);
app.use('/event/applications', applicationRoutes);
//Port
const port = process.env.PORT || 2000;
//Server code
app.listen(port, ()=> {
	console.log(`server is running on port ${port}`);
});
