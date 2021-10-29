// Lite större user-schema
const mongoose = require('mongoose');       // Här använder vi mongoose för att göra en 'Schema' (blueprint-grejen)
const userSchema = new mongoose.Schema({
    
    name: {
        type: String,
        required: true,
        min: 6,
        max: 255
    },

    email: {
        type: String,
        required: true,
        min: 6,
        max: 255
    },

    password: {
        type: String,
        required: true,
        min: 6,
        max: 1024
    },

    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('User', userSchema);
