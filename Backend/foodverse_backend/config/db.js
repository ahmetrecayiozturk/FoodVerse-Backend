const mongoose = require('mongoose');

const connection = async () => {
    try {
        await mongoose.connect(process.env.DB_URI, {
            // useNewUrlParser ve useUnifiedTopology artık gerekli değil.
        });
        console.log('Connected to database, The URI is: ' + process.env.DB_URI);
    } catch (err) {
        console.error('MongoDB connection error:', err);
        throw err;
    }
};

module.exports = connection;

/*
const mongoose = require('mongoose');

const connection = async () => {
    try {
        await mongoose.connect(process.env.DB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Connected to database, The URI is: ' + process.env.DB_URI);
    } catch (err) {
        console.error('MongoDB connection error:', err);
        throw err;
    }
};

module.exports = connection;

*/
