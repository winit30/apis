const mongoose = require('mongoose');
const validator = require('validator');
const _ = require('lodash');

var EventSchema = new mongoose.Schema({
  title: {
    type: String,
    trim: true,
    required: true,
    minlength: 3
  },
  category: {
    type: String,
    trim: true,
    required: true,
    minlength: 3
  },
  date: {
    type: Date,
    trim: true,
    required: true
  },
  createdDate: {
    type: Date,
    default: Date.now
  },
  isActive: {
    type:Boolean ,
    default: false
  },
  description: {
    type: String,
    trim: true,
    required: true,
    minlength: 10,
    maxLength: 500
  },
  venue: {
      description: {
        type: String,
        trim: true,
        required: true
      },
      place_id: {
        type: String,
        trim: true,
        required: true
      },
      latlng: {
        lat: {
          type: Number,
          trim: true,
          required: true
        },
        lng: {
          type: Number,
          trim: true,
          required: true
        }
      }
  },
  organizerId: {
    type: mongoose.Schema.Types.ObjectId,
    trim: true,
    required: true,
    minlength: 5
  }
} , {usePushEach: true});

EventSchema.methods.toJSON = function() {
	var event = this;
	var eventObject = event.toObject();
	return _.pick(eventObject, ['_id' ,'title', 'category', 'date', 'description', 'venue', 'createdDate', 'organizerId', 'isActive']);
};

//Find by organizerId
EventSchema.statics.findEventsByOrganizerId = function(organizerId) {
  var Event = this;
  return Event.find({organizerId})
}

//Find by id
EventSchema.statics.findEventById = function(_id) {
  var Event = this;
  return Event.find({_id});
}

//Find by city
EventSchema.statics.findEventsByCity = function(city) {
  var Event = this;
  return Event.find({"venue.description": new RegExp(city, 'i')});
}

//Find by id and update (private)
EventSchema.statics.updateEvent = function(_id, organizerId, body) {
  const Event = this;
  return Event.update({_id, organizerId}, {$set:body}, {new: true});
}

// Find by id and delete
EventSchema.statics.findAndDelete = function(_id, organizerId) {
  var Event = this;
  return Event.remove({_id, organizerId});
}

var Event = mongoose.model('Event', EventSchema);

module.exports = {Event};
