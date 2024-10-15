const dotenv = require('dotenv');
//const UserModel = require('../model/user_model');
const connection = require('./config/db.js')
const app = require('./app.js');
const setupSocket = require('./SocketService/socket.js');
const http = require('http');
// dotenv'in config fonksiyonunu çalıştıralım, bu bizim .env içindeki elemanları okumamaızı sağlayacaktır
dotenv.config();
//connection to the database, burada database'ye bağlandık
connection();
//localhostta bir mesaj yazdıralım
app.get('/', (req,res)=>{
    res.send("this server is wwwwwwwwworking bro ")
})

const server = http.createServer(app);
setupSocket(server); // Socket.IO'yu başlat

//port
const port = 3000;
app.listen(port,(req,res)=>{
    console.log(`server is running on port ${port}`)
});

/*const dotenv = require('dotenv');
const connection = require('./config/db.js');
const app = require('./app.js');
const http = require('http');
const setupSocket = require('./SocketService/socket.js'); // Socket.io setup path

dotenv.config();
const port = process.env.PORT || 3000; // Port numarasını .env dosyasından alabiliriz

const server = http.createServer(app);
setupSocket(server); // Socket.IO'yu başlat

server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
*/
/*
// index.js

const dotenv = require('dotenv');
const connection = require('./config/db.js');
const app = require('./app.js');
const http = require('http');
const setupSocket = require('./SocketService/socket.js'); // Socket.io setup path
// dotenv'in config fonksiyonunu çalıştıralım, bu bizim .env içindeki elemanları okumamızı sağlayacaktır
dotenv.config();
// connection to the database, burada database'ye bağlandık
connection();
// localhostta bir mesaj yazdıralım
app.get('/', (req, res) => {
    res.send("this server is wwwwwwwwworking bro ");
});
// port
const port = 3000;
app.listen(port, () => {
    console.log(`server is running on port ${port}`);
});
setupSocket(server); // Initialize Socket.IO

*/


/*
const express = require('express');
const http = require('http');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const setupSocket = require('./path_to_socket_js'); // Socket.io setup path

dotenv.config();

const app = express();
const server = http.createServer(app);

const PORT = process.env.PORT || 3000;
const DB_URI = process.env.DB_URI;

mongoose.connect(DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log(`Connected to database, The URI is: ${DB_URI}`))
.catch((err) => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
});

app.listen(PORT, () => {
    console.log(`Sunucu ${PORT} portunda çalışıyor`);
});

setupSocket(server); // Initialize Socket.IO

*/


/*
const dotenv = require('dotenv');
//const UserModel = require('../model/user_model');
const connection = require('./config/db.js')
const app = require('./app.js');

// dotenv'in config fonksiyonunu çalıştıralım, bu bizim .env içindeki elemanları okumamaızı sağlayacaktır
dotenv.config();
//connection to the database, burada database'ye bağlandık
connection();
//localhostta bir mesaj yazdıralım
app.get('/', (req,res)=>{
    res.send("this server is wwwwwwwwworking bro ")
})

//port
const port = 3000;
app.listen(port,(req,res)=>{
    console.log(`server is running on port ${port}`)
});
*/