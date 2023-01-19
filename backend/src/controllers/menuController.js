const menuModel = require("../models/menuModel");
const foodCategoryModel = require("../models/foodCategoryModel");

const isValid = function (x) {
    if (typeof x === "undefined" || x === null) return false;
    if (typeof x === "string" && x.trim().length === 0) return false;
    return true;
};

const isValidBody = function (x) {
    return Object.keys(x).length > 0;
};


const createMenu = async function (req, res) {
    try {
        let data = req.body

        if (!isValidBody(data)) return res.status(400).send({ status: false, message: "Invalid Request Parameter, Please Provide Another Details" });

        let { CategoryName, name, img, options, description } = data;

        if (!isValid(CategoryName)) {
            return res.status(400).send({ status: false, message: "CategoryName is Required" })
        }
        CategoryName = CategoryName.trim();

        if (!isValid(name)) {
            return res.status(400).send({ status: false, message: "name is Required" })
        }
        name = name.trim();

        if (!isValid(img)) {
            return res.status(400).send({ status: false, message: "img is Required" })
        }
        img = img.trim();

        if (!isValid(options)) {
            return res.status(400).send({ status: false, message: "options is Required" })
        }

        if (!isValid(description)) {
            return res.status(400).send({ status: false, message: "img is Required" })
        }
        description = description.trim();

        let newMenu = await menuModel.create(data)
        return res.status(201).send({ status: true, data: newMenu })
    } catch (err) {
        return res.status(500).send({ status: false, message: err.message })
    }
};


const getAllData = async function (req, res) {
    try {
        let food_items = await menuModel.find();
        let foodCatagory = await foodCategoryModel.find();

        // console.log([food_items,foodCatagory]);

        return res.status(200).send([food_items,foodCatagory]);
        // return res.status(200).send({ status: true, data: food_items });
    } catch (err) {
        return res.status(500).send({ status: false, message: err.message });
    }
}


module.exports = { createMenu, getAllData };