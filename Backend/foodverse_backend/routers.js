const router = require('express').Router();
const FoodController = require('./FoodService/controller/food_controller');
const UserController = require('./AuthService/controller/user_controller');
const savedFoodController = require('./FoodService/controller/food_save_controller');
const MessageController = require('./MessageService/controller/controller.js');
const BioController = require('./BioService/controller/controller.js');
const BlockedUsersController = require('./BlockService/controller.js');
router.post('/foods', (req, res, next) => {
    FoodController.addFood(req, res, next);
});
router.post('/find-foods', (req, res, next) => {
    FoodController.findFoodsByIngredients(req, res, next);
});
router.post('/registration', (req, res, next) => {
    UserController.register(req, res, next);
});
router.post('/login', (req, res, next) => {
    UserController.login(req, res, next);
});
router.post('/saved-foods',(req,res,nest)=>{
    savedFoodController.saveFood(req, res, nest);
})
router.post('/isuser-exist',(req, res, next) => {
    UserController.isUserExist(req, res, next);
})
router.post('/get-savedfoods',(req,res,next)=>{
    savedFoodController.getSavedFood(req,res,next);
})
router.post('/get-addedfoods',(req,res,next)=>{
    FoodController.getAddedFoods(req,res,next);
})
router.post('/get-adderbyfood',(req,res,next)=>{
    FoodController.getAdderByFood(req,res,next);
})
router.post('/find-food-only-by-ingredient',(req,res,next)=>{
    FoodController.findFoodsByOnlyIngredients(req,res,next);
})
router.post('/get-all-food-by-category',(req,res,next)=>{
    FoodController.returnAllFoodByCategory(req,res,next);
})
router.post('/get-all-foods',(req,res,next)=>{
    FoodController.returnAllFoods(req,res,next);
})
router.post('/update-email',(req,res,next)=>{
    UserController.UpdateEmail(req,res,next);
})
router.post('/send-message', (req, res) => {
    MessageController.sendMessage(req, res);
});
router.post('/get-messages', (req, res) => {
    MessageController.getMessages(req, res);
});
router.post('/get-userid', (req, res) => {
    UserController.getUserId(req, res);
});
router.post('/get-senders', (req, res) => {
    MessageController.getSenders(req, res);
});
router.post('/get-receivers', (req, res) => {
    MessageController.getReceivers(req, res);
});
//match için gönderen ve alıcıları
router.post('/get-users-involved-in-messages', (req, res) => {
    MessageController.getUsersInvolvedInMessages(req, res);
});
router.post('/get-userprofiles', (req, res) => {
    UserController.getUserByEmail(req, res);
});
router.post('/get-userbyid', (req,res)=>{
    UserController.getUserById(req,res);
});
router.post('/save-bio',(req,res,next)=>{
    BioController.createBio(req,res,next);
});
router.post('/get-bio',(req,res,next)=>{
    BioController.getBio(req,res,next);
});
router.post('/update-bio',(req,res,next)=>{
    BioController.updateBio(req,res,next);
});
router.post('/block-user',(req,res,next)=>{
    BlockedUsersController.BlockUser(req,res,next);
});
router.post('/unblock-user',(req,res,next)=>{
    BlockedUsersController.UnblockUser(req,res,next);
});
router.post('/get-blocked-users',(req,res,next)=>{
    BlockedUsersController.GetBlockedUsers(req,res,next);
});
router.post('/check-blocked',(req,res,next)=>{
    BlockedUsersController.CheckBlocked(req,res,next);
});
module.exports = router;