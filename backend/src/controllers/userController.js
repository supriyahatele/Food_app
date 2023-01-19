const userModel = require("../models/userModel");
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")

let nameRegex = /^([a-zA-Z])+$/;
let passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,15}$/;
let emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const saltRounds = 10;

const isValid = function (x) {
    if (typeof x === "undefined" || x === null) return false;
    if (typeof x === "string" && x.trim().length === 0) return false;
    return true;
};

const isValidBody = function (x) {
    return Object.keys(x).length > 0;
};

//-----------------------------------create user--------------------------
const register = async function (req, res) {
    // res.setHeader('Access-Control-Allow-Origin', '*');
    try {
        let body = req.body;

        if (!isValidBody(body)) return res.status(400).send({ status: false, message: "Invalid Request Parameter, Please Provide Another Details" });

        let { name, location, email, password } = body;

        if (!isValid(name)) {
            return res.status(400).send({ status: false, message: "Name is Required" });
        }
        name = name.trim();

        if (!isValid(location)) {
            return res.status(400).send({ status: false, message: "Location is Required" });
        }
        location = location.trim();

        if (!isValid(email)) {
            return res.status(400).send({ status: false, message: "Email is Required" });
        }
        email = email.trim();

        if (!isValid(password)) {
            return res.status(400).send({ status: false, message: "Password is Required" })
        }
        password = password.trim();


        if (!nameRegex.test(name)) return res.status(400).send({ status: false, message: "name is not valid, only characters are allow" });
        if (!nameRegex.test(location)) return res.status(400).send({ status: false, message: "location is not valid, only characters are allow" });
        if (!emailRegex.test(email)) return res.status(400).send({ status: false, message: "Email is not valid" });
        if (!passwordRegex.test(password)) return res.status(400).send({ status: false, message: "Your password must contain atleast one number,uppercase,lowercase and special character[ @ $ ! % * ? & # ] and length should be min of 8-15 charachaters" });


        let checkEmail = await userModel.findOne({ email: email });
        if (checkEmail) return res.status(400).send({ status: false, message: "email already exists" });

        let encryptedPassword = await bcrypt.hash(password, saltRounds);

        let validData = { name, location, email, password: encryptedPassword };

        let newUser = await userModel.create(validData);
        return res.status(201).send({ status: true, data: newUser });
    } catch (err) {
        return res.status(500).send({ status: false, message: err.message });
    }

};

const login = async function (req, res) {
    // res.setHeader('Access-Control-Allow-Origin', '*');
    try {
        let data = req.body;
        if (!isValidBody(data)) return res.status(400).send({ status: false, message: "Invalid Request Parameter, Please Provide Another Details" });

        let { email, password } = data;

        if (!isValid(email)) {
            return res.status(400).send({ status: false, message: "email is Required" });
        }
        email = email.trim();

        if (!isValid(password)) {
            return res.status(400).send({ status: false, message: "password is Required" });
        }
        password = password.trim();

        if (!emailRegex.test(email)) return res.status(400).send({ status: false, message: "Email is not valid" });
        if (!passwordRegex.test(password)) return res.status(400).send({ status: false, message: "Your password must contain atleast one number,uppercase,lowercase and special character[ @ $ ! % * ? & # ] and length should be min of 8-15 charachaters" });

        let checkUser = await userModel.findOne({ email: email });
        if (!checkUser) return res.status(404).send({ status: false, msg: "user not found" });

        let verifiedPassword = await bcrypt.compare(password, checkUser.password);
        //console.log(verifiedPassword);
        if (!verifiedPassword) return res.status(400).send({ status: false, message: "Invalid credentials" });


        let token = jwt.sign(
            {
                userId: checkUser._id.toString(),
            },
            "hjkuhsiwhjkdhqkdjhdh-secretKey",
            { expiresIn: '24h' }

        );
        return res.status(200).send({ status: true, message: "User login successfull", token: token });

    } catch (err) {
        return res.status(500).send({ status: false, message: err.message });
    }

}

module.exports = { register, login }