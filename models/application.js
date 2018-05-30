const mongoose = require('mongoose');
const _ = require('lodash');

var ApplySchema = new mongoose.Schema({
    eventId: {
        type: mongoose.Schema.Types.ObjectId,
        trim: true,
        required: true,
        minlength: 5
    },
    appliers: [
        {
            applierId: {
                type: mongoose.Schema.Types.ObjectId,
                trim: true,
                minlength: 5,
                maxLength: 100
            },
            applierName: {
              type: String,
              trim: true,
              minlength: 1,
              maxLength: 100
            },
            status: {
              type: String,
              trim: true,
              enum: ["notseen", "seen", "approved", "rejected"],
              default: "notseen"
            },
            appliedDate: {
              type: Date,
              default: Date.now
            },
        }
    ]

} , {usePushEach: true});

ApplySchema.statics.checkApplicationForEvent = function(eventId) {
    var Application = this;
    return Application.find({eventId});
}

ApplySchema.methods.addNewApplication = function(body) {
    var application = this;
    application.appliers.push(body);
    return application.save().then(() => {
        return application;
    });
}

ApplySchema.statics.checkApplicationForUser = function(eventId, applierId) {
    var Application = this;
    return Application.findOne({"eventId": eventId, "appliers.applierId": applierId});
}

var Applications = mongoose.model('Applications', ApplySchema);

module.exports = {Applications};
