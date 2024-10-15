const MessageModel = require('../model/model.js');

class MessageService {
    static async sendMessage(senderName, receiverName, message) {
        try {
            const newMessage = new MessageModel({
                senderName: senderName,
                receiverName: receiverName,
                message: message
            });
            return await newMessage.save();
        } catch (error) {
            throw error;
        }
    }

    static async getMessages(senderName, receiverName) {
        try {
            return await MessageModel.find({ senderName, receiverName });
        } catch (error) {
            throw error;
        }
    }
}
module.exports = MessageService;

/*
// MessageModel importu
const MessageModel = require('../model/model.js');

class MessageService {
    static async sendMessage(senderName, receiverName, message) {
        try {
            // Değişken adını "messageContent" olarak değiştirdim
            const newMessage = new MessageModel({
                senderName: senderName,
                receiverName: receiverName,
                message: message  // Burada "messageContent" kullanılıyor
            });
            return await newMessage.save();
        } catch (error) {
            throw error;
        }
    }

    static async getMessages(senderName, receiverName) {
        try {
            return await MessageModel.find({ senderName: senderName, receiverName: receiverName });
        } catch (error) {
            throw error;
        }
    }
}

module.exports = MessageService;
*/




/*
//MessageModel importu
const MessageModel = require('../model/model.js');

class MessageService{
    static async sendMessage(senderId, receiverId, message){
        try {
            const message = new MessageModel({senderId: senderId, receiverId: receiverId, message: message});
            return await message.save();
        } catch (error) {
            throw error;
        }
    }
    static  async getMessages(senderId, receiverId){
        try {
            return await MessageModel.find({receiverId: receiverId, senderId: senderId});
        } catch (error) {
            throw error;
        }
    }
}

module.exports = MessageService;
*/