const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const { Schema } = mongoose;

const foodSchema = new Schema({
    Id:{
        //random id
    type: String,
    default: uuidv4, // Generate a random UUID for the id
    unique: true // Ensure the id is unique
    },
    adder:{
        type: String,
        required: false
    },
    name:{
        type: String,
        required: true
    },
    ingredients: {
        type: [String],
        required: true
    },
    preparing: {
        type: String,
        required: true
    },
    category : {
        type : String,
        required: true,
        enum: ['Kahvaltı', 'Ana Yemek', 'Soğuk İçecek', 'Kahve','Tatlı','Sıcak İçecek'],
        //default: 'Genel'
    },
    type: {
        type: String,
        required: false,
        enum: ['Normal', 'Kalori Azaltma', 'Protein Kullanımı', 'Beslenme Kurallarına Uygun','Glutensiz'],
        //default: 'Normal'
    }
});

const FoodModel = mongoose.model('MyFoodDatabase', foodSchema);

module.exports = FoodModel;
