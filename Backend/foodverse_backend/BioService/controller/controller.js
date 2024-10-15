const BioModel = require('../model/model.js');

exports.createBio = async function (req,res,next){
    try {
        const{bio, user} = req.body;
        const bioData = new BioModel({bio:bio, user:user});
        await bioData.save();
    } catch (error) {
        next(error);
    }
}

exports.getBio = async function (req,res,next){
    try {
        const {user} = req.body;
        const bio = await BioModel.findOne({user:user});
        res.json(bio);
    } catch (error) {
        next(error);
    }
}

exports.updateBio = async function (req,res,next){
    try {
        const {user, bio} = req.body;
        const newbio = await BioModel.findOneAndUpdate({user:user}, {$set: {bio: bio}});
        res.json(newbio);
    } catch (error) {
        next(error);
    }
}