const mongoose = require('mongoose');
const _ = require('lodash');

var CommentSchema = new mongoose.Schema({
    eventId: {
        type: mongoose.Schema.Types.ObjectId,
        trim: true,
        required: true,
        minlength: 5
    },
    commentedby: {
        type: mongoose.Schema.Types.ObjectId,
        trim: true,
        required: true,
        minlength: 5
    },
    comment: {
        type: String,
        trim: true,
        required: true,
        minlength: 5,
        maxLength: 100
    },
    replies: [
        repliedby: {
            type: mongoose.Schema.Types.ObjectId,
            trim: true,
            minlength: 5,
            maxLength: 100
        },
        reply: {
            type: String,
            trim: true,
            minlength: 5,
            maxLength: 100
        }
    ]

} , {usePushEach: true});

var EventComments = mongoose.model('EventComments', CommentSchema);

module.exports = {EventComments};
