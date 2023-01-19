const foodCategoryModel = require("../models/foodCategoryModel");


const createFoodCat = async function(req,res){
    try{
        let body = req.body;
        let data = await foodCategoryModel.create(body);

        return res.status(201).send({ status: true, data: data });
    }catch (err) {
        return res.status(500).send({ status: false, message: err.message });
    }
}


const getFoodCat = async function (req, res) {
    try {
        let dataFound = await foodCategoryModel.find();
        return res.status(200).send({ status: true, data: dataFound });
    } catch (err) {
        return res.status(500).send({ status: false, message: err.message });
    }
};
module.exports = { createFoodCat,getFoodCat };