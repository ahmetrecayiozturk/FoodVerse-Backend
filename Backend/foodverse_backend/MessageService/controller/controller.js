const messageService = require('../service/service.js');;
const MessageModel = require('../model/model.js');
const UserModel = require('../../AuthService/model/user_model.js');
const mongoose = require('mongoose');
exports.sendMessage = async function(req, res, next) {
    try {
        const { message, receiverName, senderName } = req.body;
        await messageService.sendMessage( senderName, receiverName,message );
        res.status(200).json({ success: true, message: 'Message sent successfully' });
    } catch (error) {
        console.error('Hata:', error);
        res.status(500).json({ success: false, message: 'Failed to send message' });
    }
};
//match için tüm gönderen ve alıcıları
exports.getUsersInvolvedInMessages = async function(req, res, next) {
    try {
        const { email } = req.body;

        // Hem gönderilen hem de alınan mesajları al
        const sentMessages = await MessageModel.find({ senderName: email });
        const receivedMessages = await MessageModel.find({ receiverName: email });

        // Gönderen ve alıcı email adreslerini topla
        const senderNames = sentMessages.map(message => message.receiverName);
        const receiverNames = receivedMessages.map(message => message.senderName);

        // Benzersiz email adreslerini elde et
        const allUserEmails = [...new Set([...senderNames, ...receiverNames])];

        // Kullanıcı bilgilerini al
        const users = await UserModel.find({ email: { $in: allUserEmails } });

        res.json(users);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send({ message: "Server error" });
    }
};
/*
exports.getMessages = async function(req,res,next){
    try {
        const {senderName, receiverName} = req.body;
        const messages = await messageService.getMessages(senderName,receiverName);
        res.json(messages);
    } catch (error) {
        console.error('Hata:', error);
    }
}*/
exports.getMessages = async function(req, res, next){
    try {
        console.log('Request Body:', req.body);  // Gelen veriyi kontrol edin
        const {senderName, receiverName} = req.body;
        const messages = await messageService.getMessages(senderName, receiverName);
        console.log('Retrieved Messages:', messages);  // Mesajları kontrol edin
        res.json(messages);
    } catch (error) {
        console.error('Hata:', error);
        res.status(500).json({ message: "Server error" });
    }
}
/*
exports.getReceivedMessage = async function(req, res, next) {
    try {
        const { receiverName } = req.body;
    } catch (error) {
        
    }
}*/
exports.getSenders = async function(req, res, next) {
    try {
        const { receiverName } = req.body;

        // receiverName'e sahip mesajlardan senderName'leri alın
        const messages = await MessageModel.find({ receiverName });

        // Eğer mesajlar bulunamazsa, uygun bir yanıt döndür
        if (messages.length === 0) {
            return res.status(404).json({ message: 'No messages found for this receiverName' });
        }

        // Mesajlardan senderName'leri çıkartın ve benzersiz hale getirin
        const senderNames = [...new Set(messages.map(message => message.senderName))];

        // senderName'lerle kullanıcı bilgilerini alın
        const senders = await UserModel.find({ email: { $in: senderNames } });

        // Kullanıcı bilgilerini JSON formatında döndür
        res.json(senders);
    } catch (error) {
        // Hata durumunda logla ve bir hata mesajı döndür
        console.error('Hata:', error);
        res.status(500).send({ message: "Server error" });
    }
};


exports.getReceivers = async function(req, res, next) {
    try {
        const { senderName } = req.body;
        const messages = await MessageModel.find({ senderName });

        if (messages.length === 0) {
            return res.status(404).json({ message: 'No messages found for this senderName' });
        }

        const receiverNames = [...new Set(messages.map(message => message.receiverName))];
        const receivers = await UserModel.find({ email: { $in: receiverNames } });

        res.json(receivers);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send({ message: "Server error" });
    }
};
/*exports.sendMessage = async function(req,res,next) {
    try {
        const{message, receiverId, senderId} = req.body;
        await messageService.sendMessage({message:message,receiverId:receiverId,senderId:senderId});
    } catch (error) {
        console.error('Hata:', error);

    }

}*/

// messagecontroller.js
/*
exports.getSenders = async function(req, res, next) {
    try {
        const { receiverId } = req.body;
        const messages = await MessageModel.find({ receiverId: receiverId }).distinct('senderId');
        res.json(messages.receiverId);
    } catch (error) {
        console.error('Hata:', error);
        res.status(500).send({ message: "Server error" });
    }
};
*/

/*
exports.getSenders = async function(req, res, next) {
    try {
        const { receiverId } = req.body;
        // SenderId'leri alın
        const senderIds = await MessageModel.find({ receiverId: receiverId }).distinct('senderId');

        // SenderId'lerle kullanıcı bilgilerini alın
        const senders = await UserModel.find({ _id: { $in: senderIds } });

        // Yanıt olarak kullanıcıları döndürün
        res.json(senders);
    } catch (error) {
        console.error('Hata:', error);
        res.status(500).send({ message: "Server error" });
    }
};
*/

/*
exports.getSenders = async function(req, res, next) {
    try {
        const { receiverId } = req.body;

        // receiverId'ye sahip mesajlardan senderId'leri alın
        const senderIds = await MessageModel.find({ receiverId: receiverId }).distinct('senderId');

        // Eğer senderIds boşsa, uygun bir yanıt döndür
        if (senderIds.length === 0) {
            return res.status(404).json({ message: 'No senders found for this receiverId' });
        }

        // ObjectId formatına dönüştürün (Bu şekilde bir ObjectId oluşturabilirsiniz)
        const objectIds = senderIds.map(id => mongoose.Types.ObjectId(id));

        // SenderId'lerle kullanıcı bilgilerini alın
        const senders = await UserModel.find({ _id: { $in: objectIds } });

        // Kullanıcı bilgilerini JSON formatında döndür
        res.json(senders);
    } catch (error) {
        // Hata durumunda logla ve bir hata mesajı döndür
        console.error('Hata:', error);
        res.status(500).send({ message: "Server error" });
    }
};
*/



/*
exports.getSenderName = async function(req,res,next){
    try {
        const senders = await MessageModel.findOne({receiverId: receiverId});

    } catch (error) {
        next(error);
    }
}
*/




/*
exports.getSenderName = async function(req,res,next){
    try {
        const {senderId} = req.body;
        const sender = await MessageModel.findOne({senderId:senderId});
        res.json(sender);
    } catch (error) {
        console.error('Hata:', error);
    }
}
*/