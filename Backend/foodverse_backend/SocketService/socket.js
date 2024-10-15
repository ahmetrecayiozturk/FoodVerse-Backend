const socketIo = require('socket.io');
const UserModel = require('../AuthService/model/user_model.js');
const MessageModel = require('../MessageService/model/model');

function setupSocket(server) {
    const io = socketIo(server);

    io.on('connection', (socket) => {
        console.log(`Kullanıcı bağlandı: ${socket.id}`);

        socket.on('join', async ({ email }) => {
            try {
                const user = await UserModel.findOne({ email: email });
                if (user) {
                    const userId = user._id.toString(); // Kullanıcı ID'sini string olarak alıyoruz
                    socket.join(userId);
                    console.log(`Kullanıcı ${userId} odaya katıldı.`);
                } else {
                    console.log('Kullanıcı bulunamadı.');
                }
            } catch (error) {
                console.error('Hata:', error);
            }
        });

        socket.on('sendMessage', async ({ senderEmail, receiverEmail, message }) => {
            try {
                // Gönderici ve alıcıyı e-posta ile bul
                const senderUser = await UserModel.findOne({ email: senderEmail });
                const receiverUser = await UserModel.findOne({ email: receiverEmail });

                if (senderUser && receiverUser) {
                    const senderName = senderUser.email; // Gönderici adı olarak e-posta kullanılıyor
                    const receiverName = receiverUser.email; // Alıcı adı olarak e-posta kullanılıyor

                    // Mesajı Socket.IO ile gönder
                    io.to(receiverUser._id.toString()).emit('message', {
                        senderName: senderName,
                        senderEmail: senderEmail,
                        message: message,
                    });

                    // Mesajı MongoDB'ye kaydet
                    const newMessage = new MessageModel({ 
                        senderName: senderName, 
                        receiverName: receiverName, 
                        message: message 
                    });
                    await newMessage.save();
                } else {
                    console.log('Gönderici veya alıcı bulunamadı.');
                }
            } catch (error) {
                console.error('Hata:', error);
            }
        });

        socket.on('disconnect', () => {
            console.log(`Kullanıcı ayrıldı: ${socket.id}`);
        });
    });

    return io;
}

module.exports = setupSocket;

/*
const socketIo = require('socket.io');
const UserModel = require('../AuthService/model/user_model.js');
const MessageModel = require('../MessageService/model/model');

function setupSocket(server) {
    const io = socketIo(server);

    io.on('connection', (socket) => {
        console.log(`Kullanıcı bağlandı: ${socket.id}`);

        socket.on('join', async ({ email }) => {
            try {
                const user = await UserModel.findOne({ email: email });
                if (user) {
                    const userId = user._id.toString(); // Kullanıcı ID'sini string olarak alıyoruz
                    socket.join(userId);
                    console.log(`Kullanıcı ${userId} odaya katıldı.`);
                } else {
                    console.log('Kullanıcı bulunamadı.');
                }
            } catch (error) {
                console.error('Hata:', error);
            }
        });

        socket.on('sendMessage', async ({ senderEmail, receiverEmail, message }) => {
            try {
                // Gönderici ve alıcıyı e-posta ile bul
                const senderUser = await UserModel.findOne({ email: senderEmail });
                const receiverUser = await UserModel.findOne({ email: receiverEmail });

                if (senderUser && receiverUser) {
                    const senderName = senderUser.email; // Gönderici adı olarak e-posta kullanılıyor
                    const receiverName = receiverUser.email; // Alıcı adı olarak e-posta kullanılıyor

                    // Mesajı Socket.IO ile gönder
                    io.to(receiverUser._id.toString()).emit('message', {
                        senderName: senderName,
                        senderEmail: senderEmail,
                        message: message,
                    });

                    // Mesajı MongoDB'ye kaydet
                    const newMessage = new MessageModel({ 
                        senderName: senderName, 
                        receiverName: receiverName, 
                        message: message 
                    });
                    await newMessage.save();
                } else {
                    console.log('Gönderici veya alıcı bulunamadı.');
                }
            } catch (error) {
                console.error('Hata:', error);
            }
        });

        socket.on('disconnect', () => {
            console.log(`Kullanıcı ayrıldı: ${socket.id}`);
        });
    });

    return io;
}

module.exports = setupSocket;
*/