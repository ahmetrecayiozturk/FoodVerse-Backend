const mongoose = require('mongoose');

const {Schema} = mongoose;

const MessageSchema = new Schema({
    senderName: {
        type: String,
        required: true
    },
    receiverName: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const MessageModel = mongoose.model('Messages', MessageSchema);

module.exports = MessageModel;