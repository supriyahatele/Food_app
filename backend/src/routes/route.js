const express=require("express");
const { getFoodCat, createFoodCat } = require("../controllers/foodCatagoryController");
const { createMenu, getAllData } = require("../controllers/menuController");
const { register, login } = require("../controllers/userController");
const router=express.Router();

router.post("/createuser",register);
router.post("/login",login);

router.post("/createmenu",createMenu);
router.get("/getmenu",getAllData);

router.post("/createfoodcat",createFoodCat);
router.get("/getfoodcat",getFoodCat);

module.exports =router;