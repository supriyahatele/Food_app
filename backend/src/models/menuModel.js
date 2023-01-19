const mongoose = require('mongoose');

const menuSchema = new mongoose.Schema({
    CategoryName: {
        type: String,
        require: true
    },
    name: {
        type: String,
        require: true
    },
    img: {
        type: String,
        require: true
    },
    options: [{
        "half": {
            type: Number,
            require: true
        },
        "full": {
            type: Number,
            require: true
        }
    }],
    description: {
        type: String,
        require: true
    }
}, { timestamps: true });

module.exports = mongoose.model('Menu', menuSchema);