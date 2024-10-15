const mongoose = require('mongoose');

const { Schema } = mongoose;

const bioSchema = new Schema({
    user: {type: String, required: true},
    bio: {type: String, required: true},
})

const BioSchema = mongoose.model('BioSchema',bioSchema);
module.exports = BioSchema;
/*
const {Schema} = mongoose

const BioSchme = mongoose.Schema({
    name: {type: String, required: true},
    bio: {type: String, required: true},
    image: {type: String, required: true},
    dateOfBirth: {type: Date, required: true},
    location: {type: String, required: true},
});
*/