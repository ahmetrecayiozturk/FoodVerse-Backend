// user_controller.js
//-----------eklenen yemekleri kullanıcı silinirse ekleyeni sistem yapmak------------------
const UserService = require('../service/user_services');
const UserModel = require('../model/user_model.js');
const FoodModel = require('../../FoodService/model/food_model.js');
const BioModel = require('../../BioService/model/model.js');
exports.register = async function(req, res, next) {
    try {
        const { email, password } = req.body;
        const user = await UserService.registerUser(email, password);

        res.status(201).json({
            message: "User registration executed successfully",
            user
        });
    } catch (error) {
        next(error);
    }
};

exports.login = async function(req, res, next) {
    try {
        const { email, password } = req.body;
        const user = await UserService.checkUser(email);

        if (!user) {
            throw new Error("User not found");
        }

        const isMatch = await user.comparePassword(password);

        if (!isMatch) {
            throw new Error("Wrong password");
        }

        let tokenData = { _id: user._id, email: user._email };
        const token = await UserService.generateToken(tokenData, "secretKey", "1h");

        res.status(200).json({ status: true, token });
    } catch (error) {
        next(error);
    }
};

exports.isUserExist = async function(req, res, next) {
    try {
        const { email } = req.body;
        const user = await UserService.checkUser(email);

        if (user) {
            res.send({ Id: user.Id });
        } else {
            res.status(404).send({ message: "User not found" });
        }
    } catch (error) {
        res.status(500).send({ message: "Server error" });
    }
};

exports.UpdateEmail = async function (req,res,next){
   try {
        const {email, newemail} = req.body;
        const user = await UserService.UpdateEmail(email, newemail);
        res.json(user);
   } catch (error) {
         next(error);
   }
}

exports.getUserId = async function (req,res,next){
    try {
        const {email} = req.body;
        const user = await UserModel.findOne({email: email});
        res.json(user.Id);
    } catch (error) {

    }
}
exports.getUserByEmail = async function (req,res,next){
    try {
        const {email} = req.body;
        const user = await UserModel.findOne({email: email});
        res.json(user);
    } catch (error) {
        next(error);
    }
}
exports.getUserById = async function (req,res,next){

    try {
        const {userId} = req.body;
        const user = await UserModel.findOne({Id: userId});
        res.json(user);
    } catch (error) {
        next(error);
    }
}
exports.deleteUser = async function(req, res, next) {
    try {
        const { email } = req.body;
        console.log(`Deleting user with email: ${email}`);
        
        const user = await UserModel.findOneAndDelete({ email: email });
        console.log(`User deleted: ${user}`);
        
        const bio = await BioModel.findOneAndDelete({ user: email });
        console.log(`Bio deleted: ${bio}`);
        
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        
        await FoodModel.updateMany(
            { adder: email },
            { $set: { adder: 'sistem' } }
        );
        console.log(`Foods updated for user: ${email}`);
        
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        console.error(`Error deleting user: ${error}`);
        next(error);
    }
}






/*-----------eklenen yemekleri kullanıcı silinirse ekleyeni sistem yapmak.
// user_controller.js

const UserService = require('../service/user_services');
const UserModel = require('../model/user_model.js');
exports.register = async function(req, res, next) {
    try {
        const { email, password } = req.body;
        const user = await UserService.registerUser(email, password);

        res.status(201).json({
            message: "User registration executed successfully",
            user
        });
    } catch (error) {
        next(error);
    }
};

exports.login = async function(req, res, next) {
    try {
        const { email, password } = req.body;
        const user = await UserService.checkUser(email);

        if (!user) {
            throw new Error("User not found");
        }

        const isMatch = await user.comparePassword(password);

        if (!isMatch) {
            throw new Error("Wrong password");
        }

        let tokenData = { _id: user._id, email: user._email };
        const token = await UserService.generateToken(tokenData, "secretKey", "1h");

        res.status(200).json({ status: true, token });
    } catch (error) {
        next(error);
    }
};

exports.isUserExist = async function(req, res, next) {
    try {
        const { email } = req.body;
        const user = await UserService.checkUser(email);

        if (user) {
            res.send({ Id: user.Id });
        } else {
            res.status(404).send({ message: "User not found" });
        }
    } catch (error) {
        res.status(500).send({ message: "Server error" });
    }
};

exports.UpdateEmail = async function (req,res,next){
   try {
        const {email, newemail} = req.body;
        const user = await UserService.UpdateEmail(email, newemail);
        res.json(user);
   } catch (error) {
         next(error);
   }
}

exports.getUserId = async function (req,res,next){
    try {
        const {email} = req.body;
        const user = await UserModel.findOne({email: email});
        res.json(user.Id);
    } catch (error) {

    }
}
exports.getUserByEmail = async function (req,res,next){
    try {
        const {email} = req.body;
        const user = await UserModel.findOne({email: email});
        res.json(user);
    } catch (error) {
        next(error);
    }
}
exports.getUserById = async function (req,res,next){

    try {
        const {userId} = req.body;
        const user = await UserModel.findOne({Id: userId});
        res.json(user);
    } catch (error) {
        next(error);
    }
}
exports.deleteUser = async function(req, res, next) {
    try {
        const { email } = req.body;
        const user = await UserModel.findOneAndDelete({ email: email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        next(error);
    }
}
*/


/*
//we handle the request and response from frontend at the this page
const UserService = require('../service/user_services');
const UserModel = require('../model/user_model.js');
exports.register = async function(req, res, next) {
    try {
        const { email, password } = req.body;
        const user = await UserService.registerUser(email, password); // successRes yerine user değişkenini kullandım
        res.status(201).json({
            message: "user createddddddd",
            user
        });
    } catch (error) {
        next(error);
    }
};

exports.login = async function(req, res, next) {
    try {
        
        const { email, password } = req.body;

        const user = await UserService.checkUser(email);

        if(!user) {
            throw new Error("User not found");
        } 

        const isMatch = await user.comparePassword(password);

        if(isMatch ===false){
            throw new Error("Wrong password");
        }

        let tokenData = {_id:user._id, email:user._email}

        const token = await UserService.generateToken(tokenData,"secretKey","1h");

        res.status(200).json({status:true, token:token})
        
    } catch (error) {
        next(error);
    }
    
};

exports.isUserExist = async function(req, res, next) {
    try {
        const {email} = req.body;
        const user = await UserModel.findOne({email: email});
        if(user){
            res.send({Id: user.Id}); // user varsa, user'ın ID'sini döndür
        }
        else{
            res.status(404).send({message: "User not found"}); // user yoksa, hata mesajı döndür
        }
    } catch (error) {
        res.status(500).send({message: "Server error"}); // Sunucu hatası oluşursa, hata mesajı döndür
    }
}
*/