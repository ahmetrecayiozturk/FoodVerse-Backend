const mongoose = require('mongoose');
const {Schema} = mongoose;

const blockSchema = new Schema({
    blocker:{
        type:String,
        required:true
    },
    blocked:{
        type:String,
        required:true
    }
})
const BlockModel = mongoose.model('BlockedUsers',blockSchema);
module.exports = BlockModel;