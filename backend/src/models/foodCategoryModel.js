const mongoose = require('mongoose');

const foodCategorySchema = new mongoose.Schema({
    CategoryName: {
        type: String,
        require: true
    },

}, { timestamps: true });

module.exports = mongoose.model('FoodCategory', foodCategorySchema);