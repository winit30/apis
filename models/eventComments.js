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
    commenter: {
        type: String,
        trim: true,
        required: true,
        minlength: 1
    },
    comment: {
        type: String,
        trim: true,
        required: true,
        minlength: 5,
        maxLength: 100
    },
    replies: [
        {
            repliedby: {
                type: mongoose.Schema.Types.ObjectId,
                trim: true,
                minlength: 5,
                maxLength: 100
            },
            replied: {
              type: String,
              trim: true,
              minlength: 1,
              maxLength: 100
            },
            reply: {
                type: String,
                trim: true,
                minlength: 1,
                maxLength: 100
            }
        }
    ]

} , {usePushEach: true});

CommentSchema.methods.toJSON = function() {
  	var comment = this;
  	var commentObject = comment.toObject();
  	return _.pick(commentObject, ['_id' , 'eventId', 'commentedby', 'commenter', 'comment', 'replies']);
};

CommentSchema.statics.findCommentsByEventId = function(eventId) {
    var EventComment = this;
    return EventComment.find({eventId});
};

CommentSchema.statics.findCommentById = function(_id) {
    var EventComment = this;
    return EventComment.findOne({_id});
}

CommentSchema.methods.saveCommentReply = function(body) {
    var comment = this;
    comment.replies.push(body);
    return comment.save().then(() => {
        return comment;
    });
}

// Find by id and delete
CommentSchema.statics.findAndDeleteComment = function(body) {
  console.log(body);
  var EventComment = this;
  return EventComment.remove(body);
}

CommentSchema.methods.deleteCommentReply = function(body) {
    var comment = this;
    return comment.update({
      $pull: {
        replies: body
      }
    });
}

var EventComments = mongoose.model('EventComments', CommentSchema);

module.exports = {EventComments};
